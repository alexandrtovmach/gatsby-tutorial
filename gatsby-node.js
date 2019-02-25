const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allContentfulArticle {
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
  `).then(({
    data: {
      allContentfulArticle: {
        edges
      }
    }
  }) => {
    edges.forEach(({ node }) => {
      createPage({
        path: node.link,
        component: path.resolve(`./src/templates/index.js`),
        context: {
          slug: node.link
        },
      })
    })
  })
}