import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      {
        allFile(filter: { name: { eq: "logo" } }) {
          edges {
            node {
              publicURL
            }
          }
        }
      }
    `}
    render={({
      allFile: {
        edges: [{
          node: {
            publicURL
          }
        }]
      }
    }) => (
      <header>
        <Link to="/">
          <img src={publicURL} alt="logo" width="60px" height="60px" />
        </Link>
        That's header
      </header>
    )}
  />
)
