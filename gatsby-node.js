const path = require("path")
const { slash } = require(`gatsby-core-utils`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// Get all images from WP library and make the available to Gatsby for optimization
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  getNode,
  store,
  reporter,
}) => {
  const { createNode, touchNode } = actions

  // Add all media libary images so they can be queried by
  // childImageSharp
  createResolvers({
    WPGraphQL_MediaItem: {
      imageFile: {
        type: `File`,
        async resolve(source, args, context, info) {
          if (source.sourceUrl) {
            let fileNodeID
            let fileNode
            let sourceModified

            // Set the file cacheID, get it (if it has already been set)
            const mediaDataCacheKey = `wordpress-media-${source.databaseId}`
            const cacheMediaData = await cache.get(mediaDataCacheKey)

            if (source.modified) {
              sourceModified = source.modified
            }

            // If we have cached media data and it wasn't modified, reuse
            // previously created file node to not try to redownload
            if (cacheMediaData && sourceModified === cacheMediaData.modified) {
              fileNode = getNode(cacheMediaData.fileNodeID)

              // check if node still exists in cache
              // it could be removed if image was made private
              if (fileNode) {
                fileNodeID = cacheMediaData.fileNodeID
                // https://www.gatsbyjs.org/docs/node-creation/#freshstale-nodes
                touchNode({
                  nodeId: fileNodeID,
                })
              }
            }

            // If we don't have cached data, download the file
            if (!fileNodeID) {
              try {
                // Get the filenode
                fileNode = await createRemoteFileNode({
                  url: source.sourceUrl,
                  store,
                  cache,
                  createNode,
                  createNodeId,
                  reporter,
                })

                if (fileNode) {
                  fileNodeID = fileNode.id

                  await cache.set(mediaDataCacheKey, {
                    fileNodeID,
                    modified: sourceModified,
                  })
                }
              } catch (e) {
                // Ignore
                console.log(e)
                return null
              }
            }

            if (fileNode) {
              return fileNode
            }
          }
          return null
        },
      },
    },
  })
}

// Create required pages
exports.createPages = async ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions
  createRedirect({
    fromPath: "/",
    toPath: "/home",
    redirectInBrowser: true,
    isPermanent: true,
  })
  const result = await graphql(`
    {
      wpgraphql {
        pages {
          edges {
            node {
              id
              uri
              title
              slug
              content
              template {
                ... on WPGraphQL_HomeTemplateTemplate {
                  templateName
                }
              }
            }
          }
        }
        posts {
          edges {
            node {
              id
              uri
              title
              slug
              content
            }
          }
        }
      }
    }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Access query results via object destructuring
  const { pages, posts } = result.data.wpgraphql

  // const pages = result.data.wpgraphql.pages.nodes

  // Create Page pages.
  const pageTemplate = path.resolve(`./src/templates/page/page.js`)
  const homeTemplate = path.resolve(`./src/templates/home.js`)

  pages.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}`,
      component: slash(
        edge.node.template.templateName === "Home Template"
          ? homeTemplate
          : pageTemplate
      ),
      context: edge.node,
    })
  })

  // Create Blog Index Page
  const blogTemplate = path.resolve(`./src/templates/post/blog.js`)

  createPage({
    path: `/blog`,
    component: slash(blogTemplate),
    content: posts.edges.node,
  })

  // Create Post pages.
  const postTemplate = path.resolve(`./src/templates/post/post.js`)

  posts.edges.forEach(edge => {
    createPage({
      path: `/blog/${edge.node.slug}`,
      component: slash(postTemplate),
      context: edge.node,
    })
  })
}
