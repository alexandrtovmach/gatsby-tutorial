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
  `).then(({
    data: {
      allContentfulArticle: {
        edges
      }
    }
  }) => {
    edges.forEach(({ node }) => {

      if (node.lang === `ru` && node.link === `/`) {
        createPage({
          path: node.link,
          component: path.resolve(`./src/templates/index.js`),
          context: {
            slug: node.link,
            lang: node.lang,
          },
        })
      }

      createPage({
        path: `${node.lang}${node.link || ""}`,
        component: path.resolve(`./src/templates/index.js`),
        context: {
          slug: node.link || "",
          lang: node.lang || "ru"
        },
      })
    })
  })
}