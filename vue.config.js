const { defineConfig } = require("@vue/cli-service");
module.exports = {
    devServer: {
      proxy: 'https://comptearebours.herokuapp.com/'
    }};