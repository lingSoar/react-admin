// 当 @babel/* 工作时，babel 会根据下面的配置进行工作

module.exports = {
    // 预设（专门用于编译各种js 版本的babel 包）
    // 常见的预设有：ES6、JSX、TS、Flow、CoffeeScript
    presets: [
        ['@babel/preset-env', { targets: 'defaults' }],
        ['@babel/preset-react'],
        ['@babel/preset-typescript']
    ],
    // 插件（用于弥补预设无法编译的零零碎碎的小语法）
    // 以后在代码中使用了若干新语法，如果预设报错，我们可以使用相关的plugin 来弥补编译
    plugins: [
        // 这两个插件，用来支持装饰器语法的编译
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties'],
    ]
}