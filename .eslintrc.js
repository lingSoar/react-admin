// 这是ESlint 的配置文件（.eslintrc.js 的优先级最高），除了这种配置方法，还有其他四种配置方式
/**
 * 意识：要有能力识别环境报错、配置文件报错、语法报错、ESlint 报错、TS报错、编译器提示报错
 *   解决ESlint 报错的解决方案：
 *     1、根据ESlint 报错信息，找到代码修改成符合规则的代码
 *     2、如果ESlint 报错比较过分，可以修改ESlint 的rules 配置，关闭或者是降低报错级别（在不影响他人代码的情况下）
 *     3、灵活使用ESlint 注释，忽略一些特殊的ESlint 报错
 *     4、在项目根目录中添加一个 .eslintignore 文件，在其中指定要忽略检测的文件
 */
module.exports = {
    // 一个对Babel解析器的包装，使其能够与 ESLint 兼容
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: [
        'react',
        'react-hooks',
        'jsx-a11y',
        'import',
        '@typescript-eslint'
    ],
    // 配置ESlint 的解析选项
    parserOptions: {
        ecmaVersion: 6, // 支持es6 语法
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // 开启对jsx 语法的兼容
        }
    },
    env: {
        es6: true, // 开启对es6 的检测支持
        browser: true, // 开启对BOM、DOM 的检测支持
        node: true // 开启对node 的检测支持
    },
    /**
     * 定制检测规则，ESlint 检测的三种级别：
     *  0-'off'：关闭当前这条规则，也就是说这条规则没用了
     *  1-'warn'：如果代码违法当前规则，只给一个Warning 警告
     *  2-'error'：如果代码违法当前规则，直接给Error 错误
     */
    rules: {
        'semi': 'off', /* 要求或禁止使用分号代替 ASI */
        'react/display-name': 0, /* 定义调试时的组件name */
        'import/no-unresolved': 0, /* 禁止通过导入加载指定的模块 */
        'jsx-a11y/click-events-have-key-events': 0, /* 强制一个可点击的非交互元素至少有一个键盘事件监听器 */
        'jsx-a11y/no-noninteractive-element-interactions': 0, /* 不应该为非交互元素分配鼠标或键盘事件监听器 */
        'jsx-a11y/no-static-element-interactions': 0, /* 强制具有单击处理程序的非交互式、可见元素(如<div>)使用role属性 */
        '@typescript-eslint/no-explicit-any': 0, /* 允许使用any */
        "@typescript-eslint/no-non-null-assertion": 0 /* 不允许使用非空断言!后缀运算符 */
    }
}