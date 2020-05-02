import React from "react"
import { graphql, StaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import styled from "styled-components"

const Hero = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        wpgraphql {
          page(id: "cGFnZTo4") {
            title
            Hero_Media {
              fotoPortada {
                sourceUrl
                modified
                databaseId
                imageFile {
                  childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const imageData =
        data.wpgraphql.page.Hero_Media.fotoPortada.imageFile.childImageSharp
          .fluid
      return (
        <>
          <BackgroundImage
            Tag="section"
            backgroundColor={`#040e18`}
            fluid={imageData}
          >
            <BckgImage className="hero">
              <Overlay />
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-lg-12">
                    <TextInfo className="page-name">{children}</TextInfo>
                  </div>
                </div>
              </div>
            </BckgImage>
          </BackgroundImage>
        </>
      )
    }}
  />
)

const BckgImage = styled.div`
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TextInfo = styled.div`
  position: relative;
`

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

export default Hero
