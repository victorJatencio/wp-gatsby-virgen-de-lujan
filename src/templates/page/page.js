import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const PageTemplate = ({ pageContext }) => {
  const { title, content } = pageContext

  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}

export default PageTemplate
