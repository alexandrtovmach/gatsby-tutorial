# Gatsby.js в деле
На одних бойлерплейтах далеко не уедешь, поэтому приходится лезть вглубь технологии, чтобы научится писать что то стоящее. В этой статье рассмотрены детали  Gatsby.js, знание которых позволит создавать и поддерживать сложные вебсайты и блоги.


> [Предыдущая статья о том как создать и опубликовать личный блог используя JAM-stack](https://habr.com/ru/post/439232/)

Темы рассмотренные далее:
- Структура страниц и роутинг
- Компоненты, шаблоны и их взаимодействие
- Работа с данными
- Плагины
- Стилизация приложения с помощью:
  - Typography.js
  - SASS
  - CSS modules
  - Styled components
- SEO-оптимизация с использованием react-helmet
- Настройка PWA

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
  ...и если в консоли нет ошибок, а в браузере по пути [http://localhost:8000](http://localhost:8000) виднеется "Hello world!" можно переходить далее.
</details>

Gatsby предлагает два подхода для создания страниц в вашем проекте:
размещение файлов страниц в папке /src/pages
использование createPage API

## Плагины
По своей сути Gatsby это компилятор с кучей плюшек, этими плюшками как раз и являются плагины. С помощью них можно настраивать обработку тех или иных файлов, типов данных и различных форматов.

Для управления плагинами создадим на корневом уровне приложения файл _/gatsby-config.js_ и попробуем настроить первый плагин, для работы с файлами:

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


Например lazy-load images или  service-workers, которые у всех на слуху, можно подключить используя плагины:


gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp

gatsby-config.js
…

src/index.js
…

> На [официальном сайте](https://www.gatsbyjs.org/plugins/) можно найти плагин на любой вкус.