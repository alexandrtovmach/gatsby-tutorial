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