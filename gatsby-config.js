module.exports = {
  siteMetadata: {
    title: `Agrupacion Virgen de Lujan`,
    description: `Agrupacion Virgen de Lujan es un website creado para un grupo catolico de New Jersey.`,
    author: `Victor Atencio`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/vdl-icon.png`,
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `WPGraphQL`,
        fieldName: `wpgraphql`,
        // url: `http://agrupacionvirgendelujan/graphql`,
        url: `https://www.agrupacionvirgendelujan.com/graphql`,
      },
    },
  ],
}
