---
outline: deep
---

### 介绍

full-featured-template就是在vite官方生成的模版的基础上进行的二次封装，封装了开发用到的大部分必须的插件和能力，以此来节省出二次封装所带来的时间，从而把更多的时间投入到核心功能的开发

### 技术栈选型

Vue3采用compositionApi的方式，

- Vue3+Ts+tailwind 这个是最推荐的组合，tailwind可以极大的节省我们切图的时间。
- Vue3+Ts+less 使用less预处理器，在`./assets/less`文件夹中封装用开发常用到的样式、动画和入口文件
- Vue3+Ts+scss 使用less预处理器，在`./assets/scss`文件夹中封装用开发常用到的样式、动画和入口文件
- Vue3+Ts+(tailwind+less+scss)+ali 封装有适配ali-oss对象存储器的一些方法
- React+Tsx+tailwind 使用tailwind应该是React的最优解

### ui库

这里目前采用`Ant-Design-Vue`做为ui库，目前`full-featured-ui`已经在开发中，后续会融入进full-featured的大家庭中

### 打包工具

采用vite中的封装的打包器，也就是rollup进行打包

### Typescript

使用TS进行脚本的编写，项目封装有各个模块如axios、router、store所用到的基础类型，无需二次封装。
