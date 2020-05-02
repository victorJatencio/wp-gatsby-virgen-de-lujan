import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <div>
        <h2>Sorry, dead end!</h2>
      </div>
    </Layout>
  )
}

export default NotFoundPage
