# Gatsby.js в деталях

Як відомо на одних бойлерплейтах далеко не заїдеш, тому доводиться лізти вглиб будь-якої технології, щоб навчитися писати щось вартісне. У цій статті розглянуті деталі **Gatsby.js**, знання яких дозволить вам створювати і підтримувати складні вебсайти і блоги.

> [Попередня стаття](https://dou.ua/lenta/articles/creating-blog-with-jamstack/) про те як створити і опублікувати особистий блог використовуючи JAM-stack

Теми, що розглянуті нижче:

- [Структура сторінок і роутинг](#структура-сторінок-i-роутинг)
- [Компоненти, шаблони та їх взаємодія](#компоненти-шаблони-та-їх-взаємодія)
- [Робота з даними](#робота-з-даними)
- [Плагіни](#плагіни)
- [Стилізація сайту](#стилізація-сайту)
- [SEO-оптимізація з використанням react-helmet](#seo-оптимізація)
- [Налаштування PWA](#налаштування-pwa)

## Підготовка

<details>
  <summary>Встановлення Gatsby на ПК</summary>

  ```bash
  yarn global add gatsby-cli
  ```

</details>

<details>
  <summary>Клонування мінімального проекту</summary>

  ```bash
  npx gatsby new gatsby-tutorial https://github.com/gatsbyjs/gatsby-starter-hello-world
  cd gatsby-tutorial
  ```

</details>

<details>
  <summary>Ініціалізація репозиторію</summary>

  ```bash
  git init
  git add .
  git commit -m "init commit"
  ```

</details>

<details>
  <summary>Перевірка справності</summary>

  ```
  yarn start
  ```
  Якщо в консолі немає помилок, а в браузері на [http://localhost:8000](http://localhost:8000) видніється "Hello world!" ― значить все працює справно. Можна спробувати змінити вміст файлу _/src/pages/index.js_, щоб перевірити hot-reload. 

</details>

## Структура сторінок і роутинг

Щоб створити сторінку в Gatsby, досить просто помістити новий файл в папку _/src/pages_, та його буде скомпільовано в окрему HTML-сторінку. **Важливо зауважити, що URL до цієї сторінки буде відповідати фактичному шляху з назвою**. Наприклад, додамо ще кілька сторінок:

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

Контент поки не важливий, тому можна використовувати будь-який текст задля того, щоб розрізняти сторінки

```js
import React from "react";

export default () => <div>Welcome to tutorial/part-one</div>;
```

Перевіряємо в браузері:
- [http://localhost:8000/tutorial/part-one](http://localhost:8000/tutorial/part-one)
- [http://localhost:8000/about](http://localhost:8000/about)

Ось таким чином можна, структуруючи файли, водночас вирішувати питання роутінгу.

> Також існує спеціальний **createPage API**, за допомогою якого можна більш гнучко керувати шляхами і назвами сторінок, але для роботи з ним нам знадобиться розуміння роботи даних в Gatsby, тому розглянемо його трохи далі в статті.

Зв'яжемо створені сторінки за допомогою посилань ― для цього скористаємося компонентом `<Link />` з пакета Gatsby, який створений спеціально для внутрішньої навігації. Для всіх зовнішніх посилань слід використовувати звичайний `<a>` тег.

_/src/pages/index.js_

```js
import React from "react";
import { Link } from "gatsby";

export default () => (
  <div>
    <ul>
      <li>
        <Link to="/about">about</Link>
      </li>
      <li>
        <Link to="/tutorial/part-zero">Part #0</Link>
      </li>
      <li>
        <Link to="/tutorial/part-one">Part #1</Link>
      </li>
      <li>
        <Link to="/tutorial/part-two">Part #2</Link>
      </li>
      <li>
        <Link to="/tutorial/part-three">Part #3</Link>
      </li>
      <li>
        <Link to="/tutorial/part-four">Part #4</Link>
      </li>
    </ul>
  </div>
);
```

> `<Link>` під капотом має дуже хитрий механізм щодо оптимізації завантаження сторінок і тому використовується замість `<a>` для навігації по сайту. Детальніше можна почитати [тут](https://www.gatsbyjs.org/docs/gatsby-link/).

![navigation](http://d.zaix.ru/aSG5.gif)

Сторінки створені, посилання додані, схоже що з навігацією закінчили.

## Компоненти, шаблони та їх взаємодія

Як відомо, в будь-якому проекті завжди є елементи, що повторюються. Для вебсайтів це хедер, футер, навігаційна панель. Також сторінки, незалежно від контенту, будуються за заданою структурою і, так як **Gatsby** це компілятор для **React**, тут використовується той самий компонентний підхід для вирішення цих проблем.

Створимо компоненти для хедера та навігаційної панелі:

_/src/components/header.js_

```js
import React from "react";
import { Link } from "gatsby";

/**
 * Зверніть увагу на те, що зображення для логотипу
 * імпортується так само, як і в звичайному React-проекті.
 * Це тимчасове і не оптимальне рішення, тому що картинка
 * поставляється "як є". Трохи далі ми розглянемо
 * як це робити "правильно" використовуючи GraphQL і gatsby-плагіни
 */
import logoSrc from "../images/logo.png";

export default () => (
  <header>
    <Link to="/">
      <img src={logoSrc} alt="logo" width="60px" height="60px" />
    </Link>
    That is header
  </header>
);
```

_/src/components/sidebar.js_

```js
import React from "react";
import { Link } from "gatsby";

export default () => (
  <div>
    <ul>
      <li>
        <Link to="/about">about</Link>
      </li>
      <li>
        <Link to="/tutorial/part-zero">Part #0</Link>
      </li>
      <li>
        <Link to="/tutorial/part-one">Part #1</Link>
      </li>
      <li>
        <Link to="/tutorial/part-two">Part #2</Link>
      </li>
      <li>
        <Link to="/tutorial/part-three">Part #3</Link>
      </li>
      <li>
        <Link to="/tutorial/part-four">Part #4</Link>
      </li>
    </ul>
  </div>
);
```

і додамо їх в _/src/pages/index.js_

```js
import React from "react";

import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default () => (
  <div>
    <Header />
    <Sidebar />
    <h1>Index page</h1>
  </div>
);
```

Перевіряємо:
![index page](http://d.zaix.ru/aSJS.jpg)

Все працює, але нам потрібно імпортувати Header і Sidebar на кожну сторінку окремо, що не дуже то й зручно, і щоб вирішити це питання досить створити layout-компонент та огорнути ним кожну сторінку.

> Gatsby layout == React container  
> так-так, саме неточна рівність, тому що це "майже" одне і те саме_

_/src/components/layout.js_

```js
import React from "react";

import Header from "./header";
import Sidebar from "./sidebar";

export default ({ children }) => (
  <>
    <Header />
    <div
      style={{ margin: `0 auto`, maxWidth: 650, backgroundColor: `#eeeeee` }}
    >
      <Sidebar />
      {children}
    </div>
  </>
);
```

_/src/pages/index.js_ (і всі інші сторінки)

```js
import React from "react";

import Layout from "../components/layout";

export default () => (
  <Layout>
    <h1>Index page</h1>
  </Layout>
);
```

Готово, дивимося в браузер:
![layout](http://d.zaix.ru/aSLX.gif)

> Чому в проекті все назви файлів з маленької літери? Для початку визначимося, що naming convention для **React** виходить з того, що "кожен файл це клас, а клас завжди називається з великої літери". В **Gatsby** файли як і раніше містять класи, але є одне "але" ― "кожен файл є потенційною сторінкою, а його назва ― URL до цієї сторінки". Ком'юніті прийшло до висновку про те, що посилання виду `http://domain.com/User/Settings` ― це не _comme-il-faut_ і затвердили kebab-case для назв файлів.

<details>
  <summary>Структура файлів</summary>

  ```
  src
  ├── components
  │   ├── header.js
  │   ├── layout.js
  │   └── sidebar.js
  ├── images
  │   └── logo.png
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

## Робота з даними

Тепер, коли структура сайту готова, можна переходити до наповнення контентом. Класичний "хардкод" підхід не влаштовував творців JAM-стеку, так само як і "рендерити контент з AJAX-запитів" і тому вони запропонували заповнювати сайти контентом під час компіляції. У випадку з **Gatsby** за це відповідає **GraphQL**, який дозволяє зручно працювати з потоками даних з будь-яких джерел.

> Розповісти про GraphQL в двох словах неможливо, тому бажано вивчити його самостійно або почекати моєї наступної статті. Детальніше про роботу з GraphQL можна почитати [тут](https://www.howtographql.com).

Для роботи з **GraphQL**, з другої версії, в пакеті `gatsby` є компонент [StaticQuery](https://www.gatsbyjs.org/docs/static-query/), який може використовуватися як на сторінках, так і в простих компонентах, і в цьому його головна відмінність від його попередника ― [page query](https://www.gatsbyjs.org/docs/page-query/). Поки що наш сайт не з'єднаний з якимись джерелами даних, тому спробуємо вивести метадані сторінок, для прикладу, а потім перейдемо до більш складних речей.

Щоб побудувати `query` потрібно відкрити [http://localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql), і користуючись бічною панеллю з документацією знайти доступні дані про сайт, і не забудьте про автодоповнення.

![graphql](http://d.zaix.ru/aTz2.gif)

_/src/components/sidebar.js_

```js
import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

export default () => (
  <StaticQuery
    query={graphql`
      {
        allSitePage {
          edges {
            node {
              id
              path
            }
          }
        }
      }
    `}
    render={({ allSitePage: { edges } }) => (
      <ul>
        {edges.map(({ node: { id, path } }) => (
          <li key={id}>
            <Link to={path}>{id}</Link>
          </li>
        ))}
      </ul>
    )}
  />
);
```

Тепер ми, використовуючи `query`, отримуємо дані про сторінки, які рендеримо в панелі навігації, і більше не потрібно переживати з приводу того, що посилання не буде відповідати назві, тому що всі дані збираються автоматично.

![queried_navigation_panel](http://d.zaix.ru/aTEj.jpg)

По факту це всі дані, які можуть бути на нашому сайті без використання сторонніх плагінів і без старого доброго "хардкоду", тому ми плавно переходимо в наступну тему нашої статті ― плагіни.

## Плагіни

За своєю суттю Gatsby це компілятор з купою фішок, якими якраз і є плагіни. За допомогою них можна налаштовувати обробку тих чи інших файлів, типів даних і різних форматів.

Створимо на кореневому рівні додатку файл _/gatsby-config.js_, який відповідає за конфігурацію компілятора в цілому, і спробуємо налаштувати перший плагін для роботи з файлами:

Встановлення плагіну:

```bash
yarn add gatsby-source-filesystem
```

Конфігурація у файлі _/gatsby-config.js:_

```js
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
  <summary>Детальніше про файл вище</summary>

  ```js
  /**
   * gatsby-config.js це файл, який повинен
   * за замовчуванням експортувати об'єкт JS
   * з конфігурацією для компілятора
   */
  module.exports = {
    /**
     * поле 'plugins' описує pipeline процесу компіляції
     * та складається з набору плагінів
     */
    plugins: [
      /**
       * кожен плагін може бути вказаний у вигляді рядка
       * або у вигляді об'єкта для налаштування його опцій
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

Пам'ятайте ми говорили про "правильний" імпорт картинок в **Gatsby**?

_/src/components/header.js_

```js
import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";

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
        edges: [
          {
            node: { publicURL }
          }
        ]
      }
    }) => (
      <header>
        <Link to="/">
          <img src={publicURL} alt="logo" width="60px" height="60px" />
        </Link>
        That is header
      </header>
    )}
  />
);
```

На сайті нічого не змінилося, але тепер картинка підставляється за допомогою GraphQL, замість простого webpack-імпорту. З першого погляду може здатися, що конструкції занадто складні і це лише додає проблем, але давайте не поспішати з висновками, бо справа все в тих же самих плагінах. Наприклад, якби ми вирішили розміщувати на сайті тисячі фотографій, то нам в будь-якому випадку довелося б думати про оптимізацію завантаження всього контенту, і щоб не будувати свій [lazy-load процесс](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/) з нуля, ми б просто додали [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/) плагін, який би оптимізував завантаження всіх картинок, що імпортуються за допомогою `query`.

Встановлення плагінів для стилізації:
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
        path: `${__dirname}/src/images/`
      }
    },
    // add style plugins below
    `gatsby-plugin-typography`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`
  ]
};
```

> На [офіційному сайті](https://www.gatsbyjs.org/plugins/) можна знайти плагін на будь-який смак.

## Стилізація сайту

Приступимо до стилізації додатку, використовуючи різні підходи. У попередньому кроці ми вже встановили плагіни для роботи з [SASS](https://sass-lang.com/), [styled-components](https://www.styled-components.com/) та бібліотекою [typography.js](https://kyleamathews.github.io/typography.js/). При цьому важливо відзначити, що css.modules підтримуються "з коробки".

Почнемо роботу з глобальних стилів, які, як і інші речі, що відносяться до всього сайту, повинні бути налаштовані в файлі _/gatsby-browser.js_:

```js
import "./src/styles/global.scss";
```

> Детальніше про [gatsby-browser.js](https://www.gatsbyjs.org/docs/browser-apis/)

_/src/styles/global.scss_

```scss
body {
  background-color: lavenderblush;
}
```

В силу різних причин, тенденції останніх років схиляються в бік "CSS in JS" підходу, тому не варто зловживати глобальними стилями і краще обмежиться зазначенням шрифту і глобальних класів. У цьому конкретному проекті планується використання **Typography.js** для цих цілей, тому глобальні стилі залишаться порожніми.

Ви вже могли помітити зміни зовнішнього вигляду сайту після додавання `gatsby-plugin-typography` в конфігурацію ― це тому, що був застосований його пресет за замовчуванням, а зараз ми сконфігуріруємо його під себе.

_/src/utils/typography.js_

```js
import Typography from "typography";
import theme from "typography-theme-noriega";

const typography = new Typography(theme);

export default typography;
```

> Можна вибрати будь-який інший пресет зі [списку](https://github.com/KyleAMathews/typography.js#published-typographyjs-themes) або створити свій власний використовуючи API пакету ([приклад](https://github.com/gatsbyjs/gatsby/blob/master/www/src/utils/typography.js) конфігурації офіційного сайту Gatsby)

_/gatsby-config.js_

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`
  ]
};
```

І в залежності від обраного пресету глобальний стиль сайту буде змінений. Яким підходом налаштовувати глобальні стилі вирішуйте самі, бо відмінностей з технічної точки зору немає, і тому це питання смаку, а ми переходимо до стилізації компонентів використовуючи **styled-components**:

Додамо файл з глобальними змінними _/src/utils/vars.js_

```js
export const colors = {
  main: `#663399`,
  second: `#fbfafc`,
  main50: `rgba(102, 51, 153, 0.5)`,
  second50: `rgba(251, 250, 252, 0.5)`,
  textMain: `#000000`,
  textSecond: `#ffffff`,
  textBody: `#222222`
};
```

<details>
  <summary>/src/components/header.js</summary>

  ```js
  import React from "react";
  import { Link, StaticQuery, graphql } from "gatsby";
  import styled from "styled-components";

  import { colors } from "../utils/vars";

  const Header = styled.header`
    width: 100%;
    height: 3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${colors.main};
    color: ${colors.textSecond};
    padding: 0.5em;
  `;

  const Logo = styled.img`
    border-radius: 50%;
    height: 100%;
  `;
  const logoLink = `height: 100%;`;

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
          edges: [
            {
              node: { publicURL }
            }
          ]
        }
      }) => (
        <Header>
          That is header
          <Link to="/" css={logoLink}>
            <Logo src={publicURL} alt="logo" />
          </Link>
        </Header>
      )}
    />
  );
  ```

</details>

<details>
  <summary>/src/components/sidebar.js</summary>

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

Вже існуючі елементи стилізовані, і прийшов час зв'язати контент з [Contentful](https://www.contentful.com/), підключити Markdown-плагін і згенерувати сторінки використовуючи **createPages API**.

> Детальніше про те як зв'язати Gatsby і Contentful читайте в [попередній статті](https://dou.ua/lenta/articles/creating-blog-with-jamstack/)

<details>
  <summary>Структура моїх даних з Contentful</summary>

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

Встановлення пакетів:

```bash
yarn add dotenv gatsby-source-contentful gatsby-transformer-remark
```

_/gatsby-config.js_

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

Видаляємо папку _/src/pages_ з усіма файлами всередині і створюємо новий файл, для керування вузлами в Gatsby:

_/gatsby-node.js_

```js
const path = require(`path`);

/**
 * Експортована функція, яка перезапише існуючу за замовчуванням,
 * та буде викликана для генерації сторінок
 */
exports.createPages = ({ graphql, actions }) => {
  /**
   * Отримуємо метод для створення сторінки з екшенів,
   * щоб уникнути зайвих імпортів і зберігати контекст
   * сторінки і функції
   */
  const { createPage } = actions;
  return graphql(`
    {
      allContentfulArticle {
        edges {
          node {
            title
            link
            content {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  `).then(({ data: { allContentfulArticle: { edges } } }) => {
    /**
     * Для кожного елемента з відповіді
     * викликаємо createPage () функцію і передаємо
     * всередину дані за допомогою контексту
     */
    edges.forEach(({ node }) => {
      createPage({
        path: node.link,
        component: path.resolve(`./src/templates/index.js`),
        context: {
          slug: node.link
        }
      });
    });
  });
};
```

> Детальніше про [gatsby-node.js](https://www.gatsbyjs.org/docs/node-apis/)

Створюємо template-файл, який буде основою для сторінок, які генеруються
_/src/templates/index.js_

```js
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default ({
  data: {
    allContentfulArticle: {
      edges: [
        {
          node: {
            content: {
              childMarkdownRemark: { html }
            }
          }
        }
      ]
    }
  }
}) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    allContentfulArticle(filter: { link: { eq: $slug } }) {
      edges {
        node {
          title
          link
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
```

> Чому тут не використовується `<StaticQuery />` компонент? Вся справа в тому що він не підтримує змінні для побудови запиту, а нам потрібно використовувати змінну `$slug` з контексту сторінки.

<details>
  <summary>Оновлюємо логіку в навігаційній панелі</summary>

  ```js
  import React from "react";
  import { Link, StaticQuery, graphql } from "gatsby";
  import styled from "styled-components";

  import { colors } from "../utils/vars";

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
  `;

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
  `;

  export default () => (
    <StaticQuery
      query={graphql`
        {
          allContentfulArticle(sort: { order: ASC, fields: orderNumber }) {
            edges {
              node {
                title
                link
                orderNumber
              }
            }
          }
        }
      `}
      render={({ allContentfulArticle: { edges } }) => (
        <Sidebar>
          {edges.map(({ node: { title, link, orderNumber } }) => (
            <Link to={link} key={link} css={navItem}>
              {orderNumber}. {title}
            </Link>
          ))}
        </Sidebar>
      )}
    />
  );
  ```

</details>

![data](http://d.zaix.ru/aUZw.gif)

## SEO-оптимізація

З технічної точки зору сайт можна вважати готовим, тому давайте попрацюємо з його мета-даними. Для цього нам знадобляться наступні плагіни:

```bash
yarn add gatsby-plugin-react-helmet react-helmet
````

> [react-helmet](https://github.com/nfl/react-helmet) генерує `<head> ... </ head>` для HTML сторінок і в зв'язці з Gatsby рендерингом є потужним і зручним інструментом для роботи з SEO.

_/src/templates/index.js_

```js
import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import Layout from "../components/layout";

export default ({
  data: {
    allContentfulArticle: {
      edges: [
        {
          node: {
            title,
            content: {
              childMarkdownRemark: { html }
            }
          }
        }
      ]
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
  );
};

export const query = graphql`
  query($slug: String!) {
    allContentfulArticle(filter: { link: { eq: $slug } }) {
      edges {
        node {
          title
          link
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`;
```

Тепер `title` сайту буде завжди збігатися з назвою статті, що буде істотно впливати на видачу сайту в результатах пошуку, конкретно з цього питання. Сюди ж можна легко додати `<meta name="description" content="Опис статті">` з описом кожної статті окремо, надаючи цим можливість користувачеві, ще на сторінці пошуку, зрозуміти про що йде мова в статті. І взагалі, всі можливості SEO тепер доступні і керуються з одного місця.

![seo](http://d.zaix.ru/aVsG.png)

## Налаштування PWA

**Gatsby** розроблений, щоб забезпечити першокласну продуктивність "з коробки". Він бере на себе питання по розділенню і мінімізації коду, а також оптимізації у вигляді попереднього завантаження у фоновому режимі, обробки зображень і ін., так що створюваний вами сайт має високу продуктивність без будь-яких додаткових налаштуваннь. Ці функції продуктивності є важливою частиною підтримки прогресивного підходу до веб-додатків.

Але крім усього перерахованого вище існують три базових критерії для сайту, які визначають його як [PWA](https://developers.google.com/web/progressive-web-apps/):

- https-протокол
- наявність [manifest.json](https://www.w3.org/TR/appmanifest/)
- офлайн доступ до сайту за рахунок [service workers](https://developers.google.com/web/fundamentals/primers/service-workers/)

Перший пункт не може бути вирішений силами Gatsby, так як _домен_, _хостинг_ і _протокол_ це питання деплойменту, і ніяк не розробки, але можу порадити [Netlify](https://www.netlify.com/), який легко вирішує проблему з https.

Переходимо до інших пунктів, для цього встановимо два плагіни:

```bash
yarn add gatsby-plugin-manifest gatsby-plugin-offline
```

і налаштуємо їх _/src/gatsby-config.js_

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
        include_favicon: true
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`
  ]
};
```

Ви можете налаштувати свій маніфест використовуючи [документацію](https://www.w3.org/TR/appmanifest/), а також кастомізувати стратегію service-workers, [перезаписавши налаштування плагіну](https://www.npmjs.com/package/gatsby-plugin-offline#overriding-options).

Ніяких змін в режимі розробки ви не помітите, але сайт вже відповідає останнім вимогам світу web, і коли він буде розміщений на https:// домені йому не буде рівних.

## Висновок

Кілька років тому, коли я вперше зіткнувся з проблемами виведення в інтернет React-додатку, його підтримки і оновлення контенту, я і не міг уявити, що на ринку вже існував JAM-stack підхід, який спрощує всі ці процеси, і зараз я не перестаю дивуватися його простоті. Gatsby вирішує більшість питань, які впливають на продуктивність сайту просто "з коробки", а якщо ще трохи розібравшись в тонкощах налаштувати його під свої потреби, то можна отримати 100% показники за всіма пунктами в [Lighthouse](https://developers.google.com/web/tools/lighthouse/), чим суттєво вплинути на видачу сайту в пошукових системах (принаймні в Google).

[Репозиторій з проектом](https://github.com/alexandrtovmach/gatsby-tutorial)

## Наостанок

Як ви могли помітити, розглянутий в статті проект копіює основний сайт з документацією Gatsby.js, і це незпроста, тому що я замахнувся перевести хоча би вступний туторіал на російську та українську мови, щоб популяризувати даний стек в Україні та СНД. Подивитися на поточну версію можна тут:

[https://gatsbyjs-tutorial.alexandrtovmach.com](https://gatsbyjs-tutorial.alexandrtovmach.com)
