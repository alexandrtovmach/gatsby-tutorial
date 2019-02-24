import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"

export default ({
  data: {
    allContentfulArticle: {
      edges: [{
        node: {
          title,
          content: {
            childMarkdownRemark: {
              html
            }
          }
        }
      }]
    }
  }
}) => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    allContentfulArticle(filter: { link: { eq: $slug }}) {
      edges {
        node {
          title,
          link,
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`