import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

import Logo from "../components/logo"

const FooterTag = styled.footer`
  padding: 3rem 2rem;
`
const FooterContent = styled.div`
  margin: 1rem 0;
`
const FooterText = styled.p`
  font-size: 0.8rem;
  line-height: 1.8;
`

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  const { title, description } = data.wpgraphql.generalSettings

  return (
    <div>
      <FooterTag>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <FooterContent className="logo-content">
                <div className="logo-image">
                  <Logo />
                </div>
                <div className="logo-text">
                  <FooterText>{title}</FooterText>
                  <FooterText>{description}</FooterText>
                </div>
              </FooterContent>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <FooterContent>
                <FooterText>118 7th Ave #1897, Newark, NJ 07104</FooterText>
                <FooterText>
                  <strong>Tel: </strong>+(973) 803-4200
                </FooterText>
                <FooterText>
                  <strong>Email: </strong>contact@agrupacionvirgendelujan.com
                </FooterText>
              </FooterContent>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <div className="footer-col-03">
                <FooterText>
                  © {new Date().getFullYear()}, Agrupacion Virgen de Lujan
                  {` `}
                </FooterText>
              </div>
            </div>
          </div>
        </div>
      </FooterTag>
    </div>
  )
}

export default Footer
