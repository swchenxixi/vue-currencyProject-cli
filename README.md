# task-scheduling

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

### 项目结构说明

|--dist 生成打包后的文件
|--doc 规范文档
|--node_modules 安装的依赖包
|--public 存放静态资源(永久不变),public 中的静态资源会被复制到输出目录(dist)中
|--src
|--api 与后端交互使用相关方法和配置
|--assets 存放一些静态资源，例如图片、图标、字体
|--axios 封装 axios、请求、响应、异常处理
|--components 存放一些公共组件
|--const 常量存放
|--filters 存放过滤方法
|--layouts 存放布局组件
|--mock 数据 mock
|--router 路由处理
|--store vuex 的相关配置
|--store 样式文件
|--tools 存放通用工具方法
|--utils 存放包文件/正则
|--views 页面组件
|--App.vue 根组件
|--main.js vue 入口文件
|--loading-anted.js 按需加载 UI 模块组件
|--.browserslistrc 参见(https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist)
|--.env 环境文件
|--.eslintrc.js 参见(https://cli.vuejs.org/zh/config/#eslint)
|--.gitignore 配置在此文件的目录或文件，则不放入 git 版本库
|--.prettier.js prettier 格式化插件配置
|--babel.config.js 参见(https://cli.vuejs.org/zh/config/#babel)
|--vue.config.js 参见(https://cli.vuejs.org/zh/config/#vue-config-js)See [Configuration Reference](https://cli.vuejs.org/config/).
|--index.js 暴露 api 接口

### git 提交规范

type(scope):subject

scope：【可选】用于说明 commit 的影响范围
subject：commit 的简要说明，尽量简短
type：用于说明 commit 的类别，规定为如下几种

feat：新增功能；
fix：修复 bug；
docs：修改文档；
refactor：代码重构，未新增任何功能和修复任何 bug；
build：改变构建流程，新增依赖库、工具等（例如 webpack 修改）；
style：仅仅修改了空格、缩进等，不改变代码逻辑；
perf：改善性能和体现的修改；
chore：非 src 和 test 的修改；
test：测试用例的修改；
ci：自动化流程配置修改；
revert：回滚到上一个版本；

### 版本迭代

#### 0.2.4

- Fix
