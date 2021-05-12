const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const nextTranslate = require('next-translate');
const path = require('path');

// const { locales, defaultLocale } = require('./i18n.json');

module.exports = withCSS(
  withSass(
    nextTranslate({
      // include: path.resolve(__dirname, '/'),

      cssModules: true,
      cssLoaderOptions: {
        url: false,
        localIdentName: '[name]-[local]',
      },
      // i18n: {
      //   locales,
      //   defaultLocale,
      // },
      webpack(config) {
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        });

        return config;
      },
    }),
  ),
);
