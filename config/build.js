// 只有生产打包时需要的特殊配置

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const globAll = require('glob-all')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  // 打包时，可以得到高质量的代码
  devtool: 'source-map',
  plugins: [
    // 抽离js 中的css，并单独创建css 文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
    }),
    // 清理无用css
    new PurgeCSSPlugin({
      // 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
      // 只打包这些文件中用到的样式
      paths: globAll.sync([
        `${path.join(__dirname, '../src')}/**/*.tsx`,
        path.join(__dirname, '../public/index.html')
      ]),
    }),
    // 打包生成gzip 文件
    // new CompressionPlugin({
    //     test: /.(js|css)$/, // 只生成css，js压缩文件
    //     filename: '[path][base].gz', // 文件命名
    //     algorithm: 'gzip', // 压缩格式，默认是gzip
    //     threshold: 10240, // 只有大于该值的资源会被处理。默认值是 10k
    //     minRatio: 0.8 // 压缩率，默认值是 0.8
    // })
  ],
  module: {
    rules: [
      // 在webpack 工作中，遇到.scss 结尾的文件模块，使用sass-loader 进行加载，交给sass 编译器进行编译处理，编译完成后返回.css 文件，再使用css-loader 加载并返回css 代码，最后使用MiniCssExtractPlugin.loader 将js 中的css 代码抽离出来创建独立的css 文件，并使用link 的方式插入到index.html 文件中
      // 注意：当多个loader 同时工作时，一般都是有顺序的，先工作的loader 需要放在后
      {
        test: /\.(css|scss|sass)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            // css 兼容自动添加前缀
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          'sass-loader',
        ],
      },
    ]
  },
  optimization: {
    splitChunks: { // 分隔代码
      cacheGroups: {
        vendors: { // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors，js后缀和chunkhash 会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: { // 提取页面公共代码
          name: 'commons', // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        }
      }
    }
  }
}