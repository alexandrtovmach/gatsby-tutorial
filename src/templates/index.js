import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({
  data: {
    allContentfulArticle: {
      edges: [{
        node: {
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