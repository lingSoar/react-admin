// webpack 官方推荐的配置文件，使用的是CommonJS 语法

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const { resolve } = require('./utils')
const build = require('./build')
const serve = require('./serve')

// 说明：当拆分了生产环境和开发环境后，这里是两个环境都需要的公共配置
const config = {
  // 入口（两个环境都需要）
  // entry: '../src/main.js',
  // entry: path.resolve(__dirname, '../src/main.js'),
  entry: {
    // 抽离venders，把react 全家桶的第三方包单独抽离出来（便于以后部署优化，cdn 加速）
    venders: ['react', 'react-dom'],
    // 把业务代码和第三方包的代码，分离开来
    app: {
      import: resolve('src/main'),
      dependOn: 'venders',
    }
  },
  // 出口（两个环境都需要）
  output: {
    // 指定打包的结果放在哪个目录中（这个路径必须是绝对路径）
    path: resolve('dist'),
    // 打包后的文件名
    // [name] 该格式化字符串，是entry 中入口文件的名字
    // [chunkhash] 该格式化字符串，可以根据文件依赖来动态生成hash 值，当文件模块依赖中的代码发生改变时，打包后hash 会发生改变；否则不会变化
    /**
     * 第一次部署的时候，dist 目录放到云服务中，浏览器会缓存这些静态资源，当加需求，改需求的时候（本质上就是在改代码），
     *   再次打包的时候，webpack 检测到代码有所改变，那么hash 值就会发生变化，打包后的dist 文件名就会发生改变；
     * 所以第二次部署的时候，用户再次访问网站，文件名发生改变了，浏览器就会重新请求资源来替换本地缓存的资源，
     *   以保证用户每次访问看到的都是最新的需求代码
     */
    filename: 'js/[name].[chunkhash].js',
    clean: true, // 每次打包的时候自动清除上次的dist 目录，在v4 中使用clean-webpack-plugin 来解决
  },

  /**
   * 插件，一般是工具包，处理一些特殊需求的
   * 所有的webpack 插件，都是class 类
   */
  plugins: [
    // 把入口文件和public/index.html 关联起来
    new HtmlWebpackPlugin({
      template: resolve('public/index.html'),
      filename: 'index.html',
      inject: 'body',
      title: 'demo',
      // 给打包的结果添加favicon 图标
      favicon: resolve('public/favicon.ico')
    }),
    // 给编译添加进度条提示
    new webpack.ProgressPlugin({
      handler(percentage, message) {
        console.info(`${Math.floor(percentage * 100)}% : ${message}`);
      }
    })
  ],
  /**
   * 理解：在webpack 中，一切皆模块，loader 用于加载（处理）各种各样的文件模块
   */
  module: {
    // loader 规则，在这里进行配置
    rules: [
      // [v4]中， 当webpack 工作时，遇到.png/.jpg/.gif 结尾的文件模块时，就使用file-loader 进行加载和处理
      // {
      //     test: /\.(png|jpg|gif)$/,
      //     use: [
      //         {
      //             loader: 'file-loader',
      //             options: {
      //                 name: 'img/[name].[hash].[ext]'
      //             }
      //         }
      //     ]
      // },
      // [v5]中，处理图片模块的写法
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash].[ext]',
        },
      },
      // 配置编译js 代码的loader 规则：当webpack 工作时，遇到下面这四种后缀的js 文件，使用babel-loader 进行加载，交给 @babel/* 系列的编译器进行编译，得到能够普遍兼容主流浏览器的es5 代码
      // 注意：当 @babel/* 工作时，会根据项目根目录中的 babel.config.js 的配置进行工作
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/, // 对第三方包不编译（性能提升）
        use: ['thread-loader', 'babel-loader']
      },
      // 匹配字体图标文件
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/fonts/[name][ext]', // 文件输出目录和命名
        },
      },
      // 匹配媒体文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/media/[name][ext]', // 文件输出目录和命名
        },
      },
    ]
  },
  // 模块解析（一般与模块路径有关）
  resolve: {
    // 路径别名
    alias: {
      '@': resolve('src')
    },
    // 忽略后缀
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    // 指定加载第三方包的位置
    modules: ['node_modules']
  }
}

// webpack 配置
module.exports = (env) => {
  // 根据--env 判断是什么环境，返回不同的webpack 配置
  const { development } = env // 环境变量
  // 注意：公共配置需要放在前面，以config 公共配置为基准进行合并
  return merge(config, development ? serve : build)
}

