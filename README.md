<div style="display:flex;justify-content: center;align-items: center;">
 <img style="width:200px;" src="https://github.com/liliphoenix/full-featured/blob/main/public/logo.png"></img>
</div>
<div style="display:flex;justify-content: center;align-items: center;">
<a href="https://www.npmjs.com/package/full-featured-cli">
<img style="margin-right:15px"  alt="Static Badge" src="https://img.shields.io/npm/v/npm.svg?logo=npm">
</a>
<a href="https://github.com/liliphoenix/full-featured/actions">
<img style="margin-right:15px" src="https://img.shields.io/github/actions/workflow/status/simple-icons/simple-icons/verify.yml?branch=develop&logo=github&label=tests" alt="Build status"/>
</a>
<a>
<img style="margin-right:15px"  alt="Static Badge" src="https://img.shields.io/github/license/vigonotion/hass-simpleicons">
</a>

</div>
<div style="display:flex;justify-content: center;align-items: center;margin-top:10px">
<img style="margin-right:15px"  alt="Static Badge" src="https://img.shields.io/static/v1?message=5.0.8&label=Vite&color=e0377c">
<img style="margin-right:10px"  alt="Static Badge" src="https://img.shields.io/badge/Vue-3.4.21-6bbc90">
<img style="margin-right:10px"  alt="Static Badge" src="https://img.shields.io/badge/React-blue">
<img style="margin-right:10px"  alt="Static Badge" src="https://img.shields.io/badge/tailwindCss-skyblue">
<img style="margin-right:10px"  alt="Static Badge" src="https://img.shields.io/badge/scss-pink">
<img style="margin-right:10px"  alt="Static Badge" src="https://img.shields.io/badge/less-317bf8">
<img style="margin-right:10px"  alt="Static Badge" src="https://img.shields.io/badge/aliOss-orange">
<img style="margin-right:10px"  alt="Static Badge" src="https://img.shields.io/badge/monorepo-purple">
<img style="margin-right:10px"  alt="Static Badge" src="https://img.shields.io/badge/pnpm-yellow">

</div>
<hr/>

</div>

## 介绍

文档地址：https://liliphoenix.github.io/full-featured/

npm：https://www.npmjs.com/package/full-featured-cli

Full-Featured-Tool目的是来为我们的业务开发节省时间，具体功能有

| 🔧 集成工具                | 说明                                             |     |
| :------------------------- | :----------------------------------------------- | :-- |
| full-featured-vite         | 一键生成开箱即用的前端框架                       | ✅  |
| full-featured-commit       | 给项目添加的一键提交代码和检查提交信息规范的功能 | ✅  |
| full-featured-node         | 一键生成开箱即用的node框架(用于开发npm工具等)    | ✅  |
| full-featured-dependencies | 解析目标项目依赖并生成各个依赖之间的关系图       | ✅  |

## 安装

全局安装full-featured-cli脚手架

```
npm install full-featured-cli -g
```

## full-featured-vite

🌈 一键生成模版

```
full-featured init
```

✅ 启动

```
npm run dev
```

📦 打包

```
npm run build
```

⬆️ 一键提交代码

```
npm run commit
```

项目demo：http://39.107.94.120:8001/#/home

自动化部署教程：https://juejin.cn/post/7352925909740322831

| 功能介绍           | 详细说明                                                                                |     |
| :----------------- | :-------------------------------------------------------------------------------------- | :-- |
| 打包优化           | 代码分割方案、gzip、polyfills等                                                         | ✅  |
| 性能优化           | host局域网热更新、postCss（autoprefix、preset）等                                       | ✅  |
| 开发便捷           | alias常用封装、scss入口封装、env多环境配置、跨域配置等                                  | ✅  |
| 代码风格检查       | eslint+prettier+stylelint                                                               | ✅  |
| 代码提交检查       | cz.js+commitlint+cz-git-emoji 一键式提交方案（即严谨又好看👍）                          | ✅  |
| 图片资源处理       | svg、icon封装雪碧图、ali-oss云存储空间方案                                              | ✅  |
| css                | 封装常用样式组合，封装常用动过渡动画、base文件配置全局使用                              | ✅  |
| axios              | axios接口二次封装、封装相应和请求拦截器、封装适配ali-oss的函数和server、(Restful❌)     | ✅  |
| utils              | 封装防抖节流、时间转换等等函数                                                          | ✅  |
| pinia              | 基础封装+ali-oss Api调用函数封装                                                        | ✅  |
| router             | 基础封装（404页面等等）                                                                 | ✅  |
| git自动化部署      | 封装workflow脚本文件，自动打包部署到（github、gitlab❌、gitee❌）                       | ✅  |
| 自动化部署（上线） | 提供 docker+jenkins+nginx 搭建自动化部署部署方案 （在掘金提供亲笔配套教程亲，包教包会） | ✅  |

### full-featured-commit

给项目添加一键代码提交信息检查和代码提交功能

```
 full-featured init --commit
```

给项目添加 full-featured-cz,commitlint,husky等包，并且给项目的package.json中添加相应的配置和脚本

⬆️ 提交代码

```
npm run commit
```

### full-featured-node

生成开箱即用的npm工具开发框架，封装有开箱即用的rollup配置文件进行打包，模版适配Typescript进行开发，打包分为生产模式和开发模式，封装有full-featured-commit代码提交工具

```
 full-featured init --node
```

📦 开发模式下打包(实施监控代码变化并进行打包)

```
 npm run dev
```

📦 生产模式下打包

```
 npm run build
```

### full-featured-dependencies

分析目标项目依赖，生成各个依赖的关系图并展示在页面里

```
 full-featured [root] <depth> analyze
```

♻️ 分析指定深度的依赖

```
 full-featured --depth=5 analyze
```

♻️ 分析指定目录下的依赖

```

 full-featured --root=dist analyze

```
