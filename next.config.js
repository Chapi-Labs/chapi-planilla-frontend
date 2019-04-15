const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const dotEnvResult = require("dotenv").config();


if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

module.exports = withPlugins([withCSS, withSass], {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 10000000,
          name: "[name].[ext]"
        }
      }
    });

    return config;
  },
  env: {
    ...dotEnvResult
  }
});
