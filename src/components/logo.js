import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        mediaItem(id: "YXR0YWNobWVudDoxOA==") {
          title
          id
          sourceUrl
          imageFile {
            childImageSharp {
              fixed(quality: 100, width: 64) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `)

  const logo = data.wpgraphql.mediaItem
  return (
    <>
      <Img
        fixed={
          logo.id === "YXR0YWNobWVudDoxOA=="
            ? logo.imageFile.childImageSharp.fixed
            : "wrong image"
        }
        alt="Agrupacion Virgen de Lujan"
      />
    </>
  )
}

export default Logo
