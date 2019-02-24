# Gatsby.js в деле
На одних бойлерплейтах далеко не уедешь, поэтому приходится лезть вглубь технологии, чтобы научится писать что то стоящее. В этой статье рассмотрены детали  Gatsby.js, знание которых позволит создавать и поддерживать сложные вебсайты и блоги.


> [Предыдущая статья о том как создать и опубликовать личный блог используя JAM-stack](https://habr.com/ru/post/439232/)

Темы рассмотренные далее:
- [Структура страниц и роутинг](#структура-страниц-и-роутинг)
- [Компоненты, шаблоны и их взаимодействие](#компоненты-шаблоны-и-их-взаимодействие)
- [Работа с данными](#работа-с-данными)
- [Плагины](#плагины)
- [Стилизация приложения](#стилизация-приложения)
- [SEO-оптимизация с использованием react-helmet](#seo-оптимизация)
- [Настройка PWA](#настройка-pwa)

## Подготовка
<details>
  <summary>Установка Gatsby на ПК</summary>
```bash
yarn global add gatsby-cli
```
</details>

<details>
  <summary>Клонирование минимального проекта</summary>
```bash
npx gatsby new gatsby-tutorial https://github.com/gatsbyjs/gatsby-starter-hello-world
cd gatsby-tutorial
```
</details>


<details>
  <summary>Инициализация репозитория</summary>
  ```bash
  git init
  git add .
  git commit -m "init commit"
  ```
</details>


<details>
  <summary>Проверка работоспособности</summary>
  ```
  yarn start
  ```
  Если в консоли нет ошибок, а в браузере по пути [http://localhost:8000](http://localhost:8000) виднеется "Hello world!" значит всё работает исправно. Можно попробовать изменить содержимое файла _/src/pages/index.js_, чтобы проверить hot-reload. 
</details>


## Структура страниц и роутинг
Чтобы создать страницу в Gatsby достаточно просто разместить новый файл в папку _/src/pages_, и он будет превращен в отдельную HTML-страницу. Важно заметить что путь к этой странице будет соответствовать фактическому пути с названием. Например, добавим еще несколько страниц:
```
src
└── pages
    ├── about.js
    ├── index.js
    └── tutorial
        ├── part-four.js
        ├── part-one.js
        ├── part-three.js
        ├── part-two.js
        └── part-zero.js

```
Контент пока не важен, поэтому можно использовать любой текст, чтобы различать страницы

```js
import React from "react"

export default () => <div>Welcome to tutorial/part-one</div>
```

Проверяем в браузере [http://localhost:8000/tutorial/part-one](http://localhost:8000/tutorial/part-one). Вот таким образом можно управляя структурой файлов одновременно решать вопросы роутинга. Также существует специальный **createPage API**, который позволяет более гибко управлять путями и названиями страниц, но для работы с ним понадобятся знания того как управлять данными в Gatsby, поэтому рассмотрим его чуть дальше в статье.

Страницы созданы, теперь научим их общаться между собой с помощью ссылок, для этого воспользуемся компонентом `<Link />` из пакета Gatsby, который создан специально для внутренней навигации. Для всех внешних ссылок следует использовать обычный `<a>` тег.

_/src/pages/index.js_
```js
import React from "react"
import { Link } from "gatsby"

export default () => (
  <div>
    <ul>
      <li><Link to="/about">about</Link></li>
      <li><Link to="/tutorial/part-zero">Part #0</Link></li>
      <li><Link to="/tutorial/part-one">Part #1</Link></li>
      <li><Link to="/tutorial/part-two">Part #2</Link></li>
      <li><Link to="/tutorial/part-three">Part #3</Link></li>
      <li><Link to="/tutorial/part-four">Part #4</Link></li>
    </ul>
  </div>
)
```

> `<Link>` под капотом имеет очень хитрый механизм созданный для оптимизации загрузки страниц и поэтому используется  вместо `<a>` для навигации по сайту. Детальнее можно почитать [здесь](https://www.gatsbyjs.org/docs/gatsby-link/).

![navigation](http://d.zaix.ru/aSG5.gif)

Страницы созданы ссылки добавлены, получается что с навигацией закончили.

## Компоненты, шаблоны и их взаимодействие
Как известно в любом проекте всегда есть повторяющиеся элементы, для вебсайтов это хедер, футер, навигационная панель и другие, а также сайты, для удобства пользователей, имеют определенную структуру на каждой странице, вне зависимости от контента. Gatsby это компилятор для React, следовательно здесь используется тот же компонентный подход для решения проблем выше.

Создадим компоненты для хедера и навигационной панели:

_/src/components/header.js_
```js
import React from "react"
import { Link } from "gatsby"

/**
 * обратите внимание на то что изображение для логотипа
 * импортируется также как и в обычном React-проекте.
 * Это временное и не оптимальное решение, потому что картинка
 * поставляется "как есть". Немного далее мы рассмотрим
 * как это делать "правильно" используя мощь GraphQL и gatsby-плагинов
 */
import logoSrc from "../images/logo.png"

export default () => (
  <header>
    <Link to="/">
      <img src={logoSrc} alt="logo" width="60px" height="60px" />
    </Link>
    That's header
  </header>
)
```

_/src/components/sidebar.js_
```js
import React from "react"
import { Link } from "gatsby"

export default () => (
  <div>
    <ul>
      <li><Link to="/about">about</Link></li>
      <li><Link to="/tutorial/part-zero">Part #0</Link></li>
      <li><Link to="/tutorial/part-one">Part #1</Link></li>
      <li><Link to="/tutorial/part-two">Part #2</Link></li>
      <li><Link to="/tutorial/part-three">Part #3</Link></li>
      <li><Link to="/tutorial/part-four">Part #4</Link></li>
    </ul>
  </div>
)
```

и добавим их в _/src/pages/index.js_
```js
import React from "react"

import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default () => (
  <div>
    <Header />
    <Sidebar />
    <h1>Index page</h1>
  </div>
)
```
Проверяем:
![index page](http://d.zaix.ru/aSJS.jpg)

Всё работет, но это по прежнему не удобно, так как нужно импортировать Header и Sidebar на каждую страницу отдельно. Чтобы решить это вопрос достаточно создать layout-компонент, и оборачивать ним каждую страницу.

> Gatsby layout == React container
> 
> да, именно нестрогое равенство, потому что это "почти" одно и тоже

_/src/components/layout.js_
```js
import React from "react"

import Header from "./header";
import Sidebar from "./sidebar";

export default ({ children }) => (
  <>
    <Header />
    <div style={{ margin: `0 auto`, maxWidth: 650, backgroundColor: `#eeeeee`}}>
      <Sidebar />
      {children}
    </div>
  </>
)
```
_/src/pages/index.js_ (и все остальные страницы)
```js
import React from "react"

import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>Index page</h1>
  </Layout>
)
```

Готово, смотрим в браузер:
![layout](http://d.zaix.ru/aSLX.gif)

> Почему названия файлов с маленькой буквы? Для начала определимся что namespacing для React выходит из того что "каждый файл это класс, а класс всегда называется с большой буквы". В Gatsby файлы по прежнему содержат классы, но есть одно "но" ― "каждый файл является потенциальной страницей, а его название URL к этой странице". Комьюнити пришло к выводу о том что ссылки вида `http://domain.com/User/Settings` это не _comme-il-faut_ и утвердили **cebab-case** для названий файлов.

<details>
  <summary>Структура файлов</summary>
  ```
  src
  ├── components
  │   ├── header.js
  │   ├── layout.js
  │   └── sidebar.js
  ├── images
  │   └── logo.png
  └── pages
      ├── about.js
      ├── index.js
      └── tutorial
          ├── part-eight.js
          ├── part-five.js
          ├── part-four.js
          ├── part-one.js
          ├── part-seven.js
          ├── part-six.js
          ├── part-three.js
          ├── part-two.js
          └── part-zero.js
  ```
</details>

## Работа с данными

Теперь, когда структура сайта готова, можно переходить к наполнению контентом. Классический "хардкод" подход не устраивал создателей JAM-стека, так же как и рендерить ответы из AJAX-запросов и поэтому они предложили заполнять сайты контентом во время компиляции. В случае с Gatsby за это отвечает GraphQL, который позволяет удобно работать с потоками данных из любых источников.

> Рассказать про GraphQL в двух словах невозможно, поэтому желательно изучить его самостоятельно либо подождать моей следующей статьи. Детальнее о работе с GraphQL можно почитать [здесь](https://www.howtographql.com)

Компонент `<StaticQuery />` поставляется в пакете `gatsby` со второй версии, и используется для удобной организации кода. Может использоватся как в страницах так и в простых компонентах и в этом его главное отличие от его предшественника `page query`.

Пока что наш сайт не соединен с какими то источниками данных, поэтому попробуем вывести метаданные страниц, для примера, а затем перейдем к более сложным вещам. Чтобы построить `query` нужно открыть [http://localhost:8000/___graphql](http://localhost:8000/___graphql), и пользуясь боковой панелью с документацией найти доступные данные о сайте или попробуйте автодополнение.

![graphql](http://d.zaix.ru/aTz2.gif)

_/src/components/sidebar.js_
```js
import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      {
        allSitePage {
          edges {
            node {
              id,
              path
            }
          }
        }
      }
    `}
    render={({
      allSitePage: {
        edges
      }
    }) => (
      <ul>
        {
          edges.map(({
            node: {
              id,
              path
            }
          }) => (
            <li key={id}>
              <Link to={path}>{id}</Link>
            </li>
          ))
        }
      </ul>
    )}
  />

)
```
Теперь мы обновили панель навигации таким образом, чтобы данные собирались автоматически, и больше не нужно переживать по поводу того что ссылка не будет соответствовать названию.

![queried_navigation_panel](http://d.zaix.ru/aTEj.jpg)

По факту это все данные, которые могут быть на нашем сайте без использования сторонних плагинов, поэтому мы плавно переходим в следующую тему нашей статьи ― плагины.

## Плагины
По своей сути Gatsby это компилятор с кучей плюшек, этими плюшками как раз и являются плагины. С помощью них можно настраивать обработку тех или иных файлов, типов данных и различных форматов.

Создадим на корневом уровне приложения файл _/gatsby-config.js_. который отвечает за конфигурацию компилятора в целом, и попробуем настроить первый плагин для работы с файлами:

_Установка плагина:_
```bash
yarn add gatsby-source-filesystem
```

_Конфигурация в файле /gatsby-config.js:_
```
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      }
    }
  ],
}
```

<details>
  <summary>Детальнее про файл выше</summary>
  ```js
  /**
   * gatsby-config.js это файл который должен
   * по умолчанию экспортировать объект JS
   * с конфигурацией для компилятора
   */
  module.exports = {
    /**
     * поле 'plugins' описывает pipeline процесса
     * компиляции, и состоит из набора плагинов
     */
    plugins: [
      /**
       * каждый плагин может быть указан в виде строки,
       * или в виде объекта для более точного описания
       * его настроек
       */
      `gatsby-example-plugin`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${__dirname}/src/images/`,
        }
      }
    ],
  }
  ```
</details>

Помните мы говорили про "правильный" импорт картинок в Gatsby?

_src/components/header.js_
```js
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
```

На сайте ничего не изменилось, но теперь картинка подставляется с помощью GraphQL вместо простого импорта. С первого взгляда, может показатся что конструкции слишком сложные и это были лишние телодвижения, но давайте не спешить с выводами, и снова отложим этот логотип на некоторое время и добавим еще несколько плагинов в проект для дальнейшей стилизации.

```bash
yarn add gatsby-plugin-typography react-typography typography typography-theme-noriega node-sass gatsby-plugin-sass gatsby-plugin-styled-components styled-components babel-plugin-styled-components
```

_gatsby-config.js_
```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      }
    },
     // add style plugins below
    `gatsby-plugin-typography`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
  ],
}
```

> На [официальном сайте](https://www.gatsbyjs.org/plugins/) можно найти плагин на любой вкус.

## Стилизация приложения

Приступим к стилизации приложения используя различные подходы. В предыдущем шаге мы уже установили плагины для работы с [SASS](https://sass-lang.com/), [styled-components](https://www.styled-components.com/) и библиотекой [typography.js](https://kyleamathews.github.io/typography.js/), при этом важно отметить что css.modules поддерживаются "из коробки".

Начнем работу с глобальных стилей, которые, как и остальные вещи относящиеся ко всему сайту, настраиваются в файле _gatsby-browser.js_:

```js
import "./src/styles/global.scss"
```
и собственно сами стили _/src/styles/global.scss_

```scss
body {
  background-color: lavenderblush;
}
```

В силу разных причин тенденции последних лет склоняются в сторону "CSS in JS" подхода, поэтому не стоит злоупотреблять глобальными стилями и лучше ограничится указанием шрифта и переиспользуемых классов. В этом конкретном проекте планируется использование Typography.js для этих целей, поэтому глобальные стили останутся пустыми.

Вы уже могли заметить изменения внешнего вида сайта? после добавления `gatsby-plugin-typography` в конфигурацию ― это потому что был применен его пресет по умолчанию, а сейчас мы сконфигурируем его под себя.

_src/utils/typography.js_
```js
import Typography from "typography"
import theme from "typography-theme-noriega"

const typography = new Typography(theme)

export default typography
```
> Можно выбрать любой другой пресет из [списка](https://github.com/KyleAMathews/typography.js#published-typographyjs-themes) или создать свой собственный ([пример](https://github.com/gatsbyjs/gatsby/blob/master/www/src/utils/typography.js) конфигурации официального сайта Gatsby)


_gatsby-config.js_
```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
  ],
}
```

И в зависимости от выбранного пресета глобальный стиль сайта будет изменен. Каким подходом настраивать глобальные стили решайте сами, это вопрос личных предпочтений и различий с технической точки зрения нет, а мы переходим к стилизации компонентов используя **styled-components**:

Добавим файл с глобальными переменными _/src/utils/vars.js_
```js
export const colors = {
  main: `#663399`,
  second: `#fbfafc`,
  main50: `rgba(102, 51, 153, 0.5)`,
  second50: `rgba(251, 250, 252, 0.5)`,
  textMain: `#000000`,
  textSecond: `#ffffff`,
  textBody: `#222222`,
}
```
<details>
  <summary>src/components/header.js</summary>
  ```js
  import React from "react"
  import { Link, StaticQuery, graphql } from "gatsby"
  import styled from "styled-components"

  import { colors } from "../utils/vars"

  const Header = styled.header`
    width: 100%;
    height: 3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.main};
    color: ${colors.textSecond};
    padding: 0.5em
  `

  const Logo = styled.img`
    border-radius: 50%;
    height: 100%;
  `
  const logoLink = `
    height: 100%;
  `

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
        <Header>
          That's header
          <Link to="/" css={logoLink} >
            <Logo src={publicURL} alt="logo" />
          </Link>
        </Header>
      )}
    />
  )
  ```
</details>

<details>
  <summary>src/components/sidebar.js</summary>
  ```js
  import React from "react"
  import { Link, StaticQuery, graphql } from "gatsby"
  import styled from "styled-components"

  import { colors } from "../utils/vars"

  const Sidebar = styled.section`
    position: fixed;
    left: 0;
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${colors.second};
    color: ${colors.textMain};
  `

  const navItem = `
    display: flex;
    align-items: center;
    margin: 0 1em 0 2em;
    padding: 0.5em 0;
    border-bottom: 0.05em solid ${colors.mainHalf};
    postion: relative;
    color: ${colors.textBody};
    text-decoration: none;

    &:before {
      content: '';
      transition: 0.5s;
      width: 0.5em;
      height: 0.5em;
      position: absolute;
      left: 0.8em;
      border-radius: 50%;
      display: block;
      background-color: ${colors.main};
      transform: scale(0);
    }

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      &:before {
        transform: scale(1);
      }
    }
  `

  export default () => (
    <StaticQuery
      query={graphql`
        {
          allSitePage {
            edges {
              node {
                id,
                path
              }
            }
          }
        }
      `}
      render={({
        allSitePage: {
          edges
        }
      }) => (
        <Sidebar>
          {
            edges.map(({
              node: {
                id,
                path
              }
            }) => (
              <Link to={path} key={id} css={navItem} >{id}</Link>
            ))
          }
        </Sidebar>
      )}
    />

  )
  ```
</details>

![styled](http://d.zaix.ru/aUSM.gif)

Уже существующие элементы стилизованы, и пришло время связать контент с [Contentful](https://www.contentful.com/), подключить маркдаун плагин и сгенерировать страницы используя **createPages API**.

> Детальнее о том как связать Gatsby и Contentful читайте в [предыдущей статье](https://habr.com/ru/post/439232/)

<details>
  <summary>Структура моих данных с Contentful</summary>
  ```js
  [
    {
      "id": "title",
      "type": "Symbol"
    },
    {
      "id": "content",
      "type": "Text",
    },
    {
      "id": "link",
      "type": "Symbol",
    },
    {
      "id": "orderNumber",
      "type": "Integer",
    }
  ]
  ```
</details>

Установка пакетов:
```bash
yarn add dotenv gatsby-source-contentful gatsby-transformer-remark
```
_gatsby-config.js_
```
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

module.exports = {
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
  ],
}
```

Удаляем папку _/src/pages_ со всеми файлами внутри и создаем новый файл, для управления узлами в Gatsby:

_gatsby-node.js_
```js
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
```

Создаем template-файл, который будет основой для каждой страницы:
_src/templates/index.js_
```js
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
```

> Почему здесь не используется `<StaticQuery />` компонент? Всё дело в том что он не поддерживает переменные для построения запроса, а нам нужно использовать переменную `$slug` из контекста страницы.

<details>
  <summary>Обновляем логику в навигационной панели</summary>
  ```js
  import React from "react"
  import { Link, StaticQuery, graphql } from "gatsby"
  import styled from "styled-components"

  import { colors } from "../utils/vars"

  const Sidebar = styled.section`
    position: fixed;
    left: 0;
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${colors.second};
    color: ${colors.textMain};
  `

  const navItem = `
    display: flex;
    align-items: center;
    margin: 0 1em 0 2em;
    padding: 0.5em 0;
    border-bottom: 0.05em solid ${colors.main50};
    postion: relative;
    color: ${colors.textBody};
    text-decoration: none;

    &:before {
      content: '';
      transition: 0.5s;
      width: 0.5em;
      height: 0.5em;
      position: absolute;
      left: 0.8em;
      border-radius: 50%;
      display: block;
      background-color: ${colors.main};
      transform: scale(0);
    }

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      &:before {
        transform: scale(1);
      }
    }
  `

  export default () => (
    <StaticQuery
      query={graphql`
        {
          allContentfulArticle(sort: {
            order: ASC,
            fields: orderNumber
          }) {
            edges {
              node {
                title,
                link,
                orderNumber
              }
            }
          }
        }
      `}
      render={({
        allContentfulArticle: {
          edges
        }
      }) => (
        <Sidebar>
          {
            edges.map(({
              node: {
                title,
                link,
                orderNumber
              }
            }) => (
              <Link to={link} key={link} css={navItem}>{orderNumber}. {title}</Link>
            ))
          }
        </Sidebar>
      )}
    />
  )
  ```
</details>

И вот что мы имеем теперь:

![data](http://d.zaix.ru/aUZw.gif)

## SEO-оптимизация

С технической стороны сайт можно считать готовым, поэтому давайте поработаем с его мета-данными. Для этого нам понадобятся следующие плагины:

```bash
yarn add gatsby-plugin-react-helmet react-helmet
``` 

> [react-helmet](https://github.com/nfl/react-helmet) генерирует `<head>...</head>` для HTML страниц и в связке с Gatsby рендерингом является мощным и удобным инструментом для работы с мета-информацией сайта.

_src/templates/index.js_
```js
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
```

![seo](http://d.zaix.ru/aVsG.png)

Теперь `title` сайта будет всегда соостветствовать названию статьи, что будет существенно влиять на выдачу сайта в результатах поиска конкретно по этому вопросу. Сюда же можно легко добавить `<meta name="description" content="Описание статьи">` с описанием каждой статьи отдельно, этим дав возможность пользователю ещё на странице поиска понять о чем идет речь в статье, вообщем все возможности SEO теперь доступны и управляемы в одном месте. 

## Настройка PWA

Gatsby разработан, чтобы обеспечить первоклассную производительность "из коробки". Он занимается разделением и минимизацией кода, а также оптимизацией: предварительная загрузка в фоновом режиме, обработка изображений, так что создаваемый вами сайт обладает высокой производительностью без какой-либо ручной настройки. Эти функции производительности являются важной частью поддержки прогрессивного подхода к веб-приложениям.

Затем существуют три базовых критерия для сайта, которые определяют его как PWA:

- https-протокол
- наличие [manifest.json](https://www.w3.org/TR/appmanifest/)
- оффлайн доступ к сайту за счет [service workers](https://developers.google.com/web/fundamentals/primers/service-workers/)

Первый пункт не может быть решен силами Gatsby, так как домен, хостинг и протокол это вопросы деплоймента, и никак не разработки, но могу порекоммендовать [Netlify](https://www.netlify.com/), который решает вопрос https по умолчанию.

Переходим ко остальным пунктам, для этого установим два плагина:
```bash
yarn add gatsby-plugin-manifest gatsby-plugin-offline
```
и настроим их _src/gatsby-config.js_
```js
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS translated tutorial`,
        short_name: `GatsbyJS tutorial`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `public/favicon.ico`,
        include_favicon: true,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
  ],
}
```

Вы можете настроить свой манифест используя [документацию](https://www.w3.org/TR/appmanifest/), а также кастомизировать стратегию service-workers, [перезаписав настройки плагина](https://www.npmjs.com/package/gatsby-plugin-offline#overriding-options).

Никаких изменений в режиме разработки вы не заметите, но сайт уже соответствует последним требованиям мира web, и когда он будет размещен на https:// домене ему не будет равных.

## Послесловие

Как вы могли заметить рассматриваемый в статье проект копирует основной сайт с документацией Gatsby.js, и это неспроста, потому что я замахнулся перевести хотя-бы вступительный туториал на русский и украинский языки, что бы популяризировать данный стек в наших странах. Посмотреть на текущую версию можно здесь:

[https://gatsbyjs-tutorial.alexandrtovmach.com](https://gatsbyjs-tutorial.alexandrtovmach.com)

[Репозиторий с проектом](https://github.com/alexandrtovmach/gatsby-tutorial)
