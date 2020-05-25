import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Hero from "../components/hero"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { FacebookProvider, Like } from "react-facebook"

export const query = graphql`
  query {
    wpgraphql {
      generalSettings {
        title
        description
      }
      page(id: "cGFnZTo4") {
        OurMission {
          title
          textBlock
          image {
            sourceUrl
            modified
            databaseId
            imageFile {
              childImageSharp {
                fluid(quality: 90, maxWidth: 387) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        VideoContent {
          tituloDeVideoSeccion
          subTitulo
          descripccion
          diaDePublicaccion
          video
          facebookUrl
          fieldGroupName
        }
      }
    }
  }
`

const HighlightBlue = styled.span`
  color: #26bce3;
`
const FacebookContent = styled.div`
  padding: 2rem 0;
  overflow: hidden;
`
const FacebookContentLink = styled.a`
  color: #005595;
  margin: 1rem 0;
  display: inline-block;
`

const HomeTemplate = ({ data }) => {
  const SiteData = data.wpgraphql.generalSettings
  const Mission = data.wpgraphql.page.OurMission
  const VideoStream = data.wpgraphql.page.VideoContent

  return (
    <div>
      <SEO title="Home" />
      <Hero>
        <h1>
          Agrupacion <HighlightBlue>Virgen</HighlightBlue> de{" "}
          <HighlightBlue>Lujan</HighlightBlue>
        </h1>
        <p dangerouslySetInnerHTML={{ __html: SiteData.description }} />
      </Hero>
      <Layout>
        <section className="container our-mission lg-divider">
          <div className="container mission-section">
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <div className="image-wrapper">
                  <Img
                    fluid={Mission.image.imageFile.childImageSharp.fluid}
                    alt={Mission.title}
                  />
                </div>
              </div>

              <div className="col-xs-12 col-md-6">
                <div className="home-mission-content">
                  <span className="half-line-thick" />

                  <h2 className="h2">{Mission.title}</h2>
                  <p>{Mission.textBlock}</p>

                  <span className="full-line-thin" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="video-section full-width-blue lg-divider">
          <div className="container video-description">
            <div className="video-content">
              <span className="half-line-thick" />
              <h2 className="h2">{VideoStream.tituloDeVideoSeccion}</h2>
              <span className="full-line-thin" />
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-6">
                <div
                  className="video-embed"
                  dangerouslySetInnerHTML={{ __html: VideoStream.video }}
                />
              </div>

              <div className="col-xs-12 col-md-6">
                <div className="video-info">
                  <h3 className="h3">{VideoStream.subTitulo}</h3>
                  <p>{VideoStream.descripccion}</p>
                  <FacebookContent>
                    <FacebookContentLink
                      href={VideoStream.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textAlign: "left",
                      }}
                    >
                      Haga click aqui para ver este video por facebook
                    </FacebookContentLink>

                    <FacebookProvider appId="1274555702729260">
                      <Like
                        href="https://www.facebook.com/Agrupacion-Virgen-de-Lujan-StLucy-NJ-194027464762506/"
                        colorScheme="dark"
                        showFaces
                      />
                    </FacebookProvider>
                  </FacebookContent>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  )
}

export default HomeTemplate
