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
          headerText,
          title,
          lang,
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
    <Layout headerText={headerText} lang={lang} >
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Article dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $lang: String! ) {
    allContentfulArticle(filter: { link: { eq: $slug }, lang: { eq: $lang } }) {
      edges {
        node {
          headerText,
          title,
          link,
          lang,
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