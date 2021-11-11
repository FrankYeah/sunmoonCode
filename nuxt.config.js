const Sass = require('sass')
const Fiber = require('fibers')
const { resolve } = require('path')

export default {
  mode: 'universal',
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    base: '/sunmoon/'
  },
  head: {
    titleTemplate: '',
    title: 'sunmoon',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:image' , property: 'og:image' , content: 'icon-single-logo.png'},
      { hid: 'og:type' , property: 'og:type' , content: 'website'},
      { hid: 'description', name: 'description', content: 'Credit risks prediction Made simple. Explore the brand new way to easily find the right company with us!' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
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
    extend(config,context){
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [resolve(__dirname, 'assets/icons/svg')]

      //添加loader规则
      config.module.rules.push({
        test: /\.svg$/, //匹配.svg
        include: [resolve(__dirname, 'assets/icons/svg')], //将存放svg的目录加入到loader处理目录
        use: [{ loader: 'svg-sprite-loader',options: {symbolId: 'icon-[name]'}}]
      })
    },
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
    transpile: ['vue-echarts', 'resize-detector'],

  },
  css: [
    '~assets/styles/global.css',
    '~assets/styles/global.scss',
    'swiper/swiper-bundle.css',
    '~assets/fonts/sfpro/sfpro.css'
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
    '~/plugins/echarts',
    '~/plugins/svg-icon'
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ]
}
