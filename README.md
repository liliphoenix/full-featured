# 💎 vite-full-featured 💎

#### Vue 3 + TypeScript + Vite脚手架

> vue3 个人功能丰富的工作流框架 基于vite-vue3脚手架
> 首次搭建自己的工作流，实现代码风格 提交规范的配置 🎉🎉🎉

| 导管                 | $1     |

## v1.0任务目标

### 项目重心

业务功能齐全的工作流，
需要具备的功能：1.通过命令行进行安装,实现某些插件的可插拔2.业务功能齐全化、代码检测提交规范化3.打包性能优化4.通用自动化部署配置

- [X]  代码规范和提交规范
- [X]  axios的二次封装

  - [X]  拦截器
  - [X]  get post请求
  - [X]  ali-oss文件分片上传 文件下载 文件列表显示
- [ ]  通用组件的封装（第一期基于antd进行封装，以后开发bobi-ui后再引入组件库）

  - [ ]  二次封装message
  - [ ]  popup弹窗
- [X]  pinia 状态管理器

  - [ ]  [可选] 获取设备的基本信息？
  - [ ]  获取用户语言设置多语言
- [ ]  打包优化（有待学习vite）vite插件集成

  - [X]  分包策略 vue全家桶放一块 ali-oss-sdk单分chunk因为体积太大 剩下的
  - [X]  treeShaking es6自带 去除掉没有用到的api
  - [X]  gzip
  - [ ]  cdn加速
  - [ ]  图片压缩
- [ ]  sh命令行操作
- [ ]  vue-router

  - [ ]  权限控制？
- [ ]  多环境变量
- [ ]  美化md文档
- [ ]  vitePress编写项目文档
- [X]  引入配置tailwindCss框架 引入配置postcss
- [ ]  常用utils方法的封装
- [ ]  封装成可插拔cli模版工具

#### 项目运行

#### 项目运行#### 项目运行#### 项目运行#### 项目运行#### 项目运行

`npm install`
`npm run dev`

#### 代码提交➕代码风格规范

### 老生常谈的解决 eslint和prettier的冲突问题 ✅

### cz+commitlint+git-emoji 代码提交 ✅

自动规范化和简洁化代码提交

`npm run commit`

### 提交前 husky 检查代码规范+format代码 ✅

### 支持scss代码 支持stylelint + prettier 修改scss ✅

### vite配置完善 alias proxy css... ✅

### prod dev test 环境变量配置支持 ✅

### axios二次封装 + mock ✏️✏️✏️

### common css封装 + 常用css方法封装 ✏️✏️✏️

### pinia 完善配置 ✏️✏️✏️

### vue-router 完善配置 ✏️✏️✏️

### utils 常见方法的封装 ✏️✏️✏️

### i18n 多语言配置 ✏️✏️✏️

#### 2.29计划

- [X]  文件下载功能
- [X]  pinia 封装
- [X]  tailwind css 封装 - 学习css原子化

#### 3.1计划

- [X]  tailwind css 封装 - 学习css原子化
- [X]  优化pinia

#### 3.4计划

- [ ]  打包优化 了解vite打包流程和原理
- [X]  ali-oss打包报错 原因:vite-require 决定迁移到后端 解决：踩坑 vite-plugin-require-transform包在vite4.0 报错 vite-plugin-require 解决问题
- [ ]  发布npm包 尝试实现热插拔

#### 3.5计划

- [ ]  完成昨日计划
- [ ]  深入了解vite打包优化
- [ ]  github actions

#### 3.6继续昨天计划

#### 踩坑

husky/\_/husky.sh: No such file or directory
解决：从新`npx husky install`

git reset --hard orign/main
版本回退

ali-oss的acesskey假如在代码中 需要进行手动授权

vitepress部署好以后别忘了在 配置文件配置base路径 要不然资源文件访问不到
/vite-full-featured/ 像这样

pnpm i --frozen-lockfile === npm CI

pmpm版本落后，要及时更新lockfileVersion，新版本的pnpm会拒绝落后版本的pnpm产生lockfile

mac 下 使用npm install -g {packagePath} 就可以在全局添加变量
