const path = require(`path`)

/**
 * экспортируемая функция, которая перезапишет существующую по умолчанию
 * и будет вызвана для генерации страниц 
 */
exports.createPages = ({ graphql, actions }) => {
  /**
   * получаем метод для создания страницы из экшенов
   * чтобы избежать лишних импортов и сохранять контекст
   * страницы и функции
   */
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
    /**
     * для каждого из елементов из ответа
     * вызываем createPage() функцию и передаем
     * внутрь данные с помощью контекста
     */
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