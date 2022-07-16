// 只有开发环境才需要的特殊配置

const ESLintPlugin = require('eslint-webpack-plugin');
const { resolve } = require('./utils')

module.exports = {
    mode: 'development',
    // 当代码报错时，显示源码的行数，而不是编译后的
    devtool: 'inline-source-map',
    /**
     * 本地服务，背后要使用webpack-dev-server
     * 本地服务一定要有端口号
     * 本地服务要有静态资源目录，默认就是public
     */
    devServer: {
        port: 8099,
        hot: true, // 支持本地服务下的代码热更新
        compress: false, // gzip压缩，开发环境不开启，提升热更新速度
        open: true, // 在开发环境中，执行后自动打开默认浏览器
        historyApiFallback: true, // 解决history路由404问题
        client: {
            // 错误信息的遮罩层提示
            overlay: {
                errors: true, // 当出现Error 时，弹出覆盖层
                warnings: false, // 当出现Warning 时，不弹覆盖层
            },
        },
        static: {
            directory: resolve('public'), // 托管静态资源public 文件夹
        }
    },
    plugins: [
        new ESLintPlugin({
            eslintPath: 'eslint', // 指定检测工具
            extensions: ['js', 'jsx', 'ts', 'tsx'], // 指定检测哪些类型文件
            exclude: 'node_modules', // 不检测第三方包
        })
    ],
    module: {
        rules: [
            // 在webpack 工作中，遇到.scss 结尾的文件模块，使用sass-loader 进行加载，交给sass 编译器进行编译处理，编译完成后返回.css 文件，再使用css-loader 加载并返回css 代码，最后使用style-loader 把css 代码注入到Dom 中
            // 注意：当多个loader 同时工作时，一般都是有顺序的，先工作的loader 需要放在后面
            {
                test: /\.(css|scss|sass)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}