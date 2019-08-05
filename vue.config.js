module.exports = {
  configureWebpack: {
    plugins: [],
    resolve: {
      alias: {
        '@assets': `${__dirname}/src/assets`,
        '@components': `${__dirname}/src/components`,
        '@pages': `${__dirname}/src/pages`,
      }
    },
  },
  css: {
    loaderOptions: {
      sass: {
        // data: `@import "../public/assets/sass/variables.scss";`
        data: `@import "@/assets/sass/variables.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.45.47.161:8089/',  // 接口域名
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        pathRewrite: {}
      },
      '/control': {
        target: 'http://127.0.0.1:3000/',  // 接口域名
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        pathRewrite: {}
      },
    }
  }
}