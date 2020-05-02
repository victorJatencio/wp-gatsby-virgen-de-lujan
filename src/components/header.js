import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Logo from "../components/logo"

import "../styles/flexboxgrid.scss"

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
    query {
      wpgraphql {
        generalSettings {
          title
          url
        }
        menu(id: "TWVudToy") {
          menuItems {
            nodes {
              id
              url
              label
            }
          }
        }
      }
    }
  `)

  const { title, url } = data.wpgraphql.generalSettings
  const items = data.wpgraphql.menu.menuItems.nodes.map(item => ({
    ...item,
    url: item.url.replace(url, ""),
  }))

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Logo />
            <Link to="/home">{title}</Link>
          </div>
          <div className="header-nav">
            <nav className="nav">
              <ul className="main-nav">
                {items.map(item => (
                  <li key={item.id}>
                    <Link to={item.url}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
