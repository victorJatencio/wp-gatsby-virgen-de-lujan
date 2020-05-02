import React from "react"
import Header from "./header"
import Footer from "./footer"

import "@wordpress/block-library/build-style/style.css"
import "../styles/layout.scss"
import "../styles/flexboxgrid.scss"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
