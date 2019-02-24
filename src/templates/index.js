import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"
import styled from "styled-components"

import Layout from "../components/layout"

const Article = styled.article`
  max-width: 850px;
  width: 60%;
  margin-top: 5em;
`

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
      <Article dangerouslySetInnerHTML={{ __html: html }} />
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