const Sass = require('sass')
const Fiber = require('fibers')

export default {
  mode: 'universal',
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    base: '/sunmoon/'
  },
  head: {
    titleTemplate: '%s - sunmoon',
    title: 'sunmoon',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // SCSS 配置
  browserslist: "cover 99.5%",
  build: {
    loaders: {
      scss: {
        implementation: Sass,
        sassOptions: {
          fiber: Fiber
        }
      }
    },
    babel: {
      presets({isServer}) {
        const targets = isServer ? { node: 'current' } : { ie: 11 }
        return [
          [ require.resolve("@babel/preset-env"), { targets }  ]
        ]
      },
      plugins: [
        "@babel/syntax-dynamic-import",
        "@babel/transform-runtime",
        "@babel/transform-async-to-generator"
      ]
    },
    /*
    ** You can extend webpack config here
    */
   // 在 console 可以看見 css 位置
    cssSourceMap: true,
    parallel: true,
    // cache 設定成 false 後就可以 generate
    cache: false,
    extractCSS: process.env.NODE_ENV === 'production',
    optimizeCSS: process.env.NODE_ENV === 'production',
    transpile: ['vue-intersect'],
    // postcss: {
    //   'autoprefixer': {
    //     overrideBrowserslist: ['> 5%']
    //   }
    // },
    // postcss: {
    //   plugins: {

    //   },
    //   preset: {
    //     autoprefixer: {
    //       grid: true
    //     }
    //   },
    // },
    postcss: {
      'postcss-px2rem-exclude': {
          emUnit: 75,
          exclude: '/node_modules|vant/'
      },
      'autoprefixer': {
        flexbox: true,
        grid: true,
        overrideBrowserslist: ['last 3 versions', '> 1%', 'ie 8', 'ie 7'],
      }
    },
    // postcss: [
    //   require('autoprefixer')({
    //     browsers: ['> 5%']
    //   })
    // ],
    transpile: ['vue-echarts', 'resize-detector']
  },
  css: [
    '~assets/styles/global.css',
    '~assets/styles/global.scss',
    '~assets/fonts/goudy/goudy.css',
    'swiper/swiper-bundle.css',
  ],
  /*@nuxtjs/style-resources*/
  styleResources: {
    //array of strings that are paths to the file:
    // scss: ['~assets/styles/globalvariables.scss']
  },
  loader: 'sass-loader',
    options: {
        sassOptions: {
            indentedSyntax: true
        }
    },
  //
  plugins: [
    '~/plugins/vue-multiselect.js',
    '~/plugins/component.js',
    '~/plugins/vue-awesome-swiper',
    '~/plugins/echarts'
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ]
}
