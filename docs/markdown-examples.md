# 介绍

**Full-Featured是一款包含多种功能的命令行工具**，之所以为什么叫Full-Featured，顾名思义，那就是功能齐全，full-featured下包含各种各样的工具，争取做到各种工具齐全（full-featured)，同时full-featured下的每一个工具我也争取做到业务和场景功能齐全（full-featured），来迎合不同的开发环境，迎合不同的开发者不同的开发需求，所以整个full-featured的产品也是贯彻着功能齐全的理念来为开发者提供便捷和节省开发时间（早完工早下班！！！）

## 项目灵感

在上一段实习中学习到了公司中封装的前端脚手架模版，然后又想起我在自己开发的时候每次新建完项目后，要封装axios、router、store以及项目优化等等等各种繁琐的事项，而且我的记性很差，即使封装了很多遍也不能完全在短时间内快速无误的封装好，所以我就在想开发一个自己的模版，来节省封装的时间来进行核功能的开发，再加之对命令行工具和node.js有些了解，于是想到了封装一个cli工具。

## 迎合的需求

这里列出各个工具可能会迎合到的需求，所以大家按需拿去即可

| 具体工具 🔧                | 迎合场景 🖼️                                                                                                                                                                 | 主要涉及技术栈 🚉                         |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| full-featured-vite         | vue3+TS(scss or less or tailwind)、React+Ts+tailwind pc端页面开发、使用ali-oss云存储器、国际化pc端页面、后台管理系统、打包产物适配大多数浏览器运行、gitAction部署测试需求、 | Vue3、React、TS、pinia、vue-router、axios |
| full-featured-dependencies | 学习项目的架构和源码，了解项目依赖的组成和关系                                                                                                                              | 有手就行👋                                |
| full-featured-node         | 开发cli命令行工具、开发npm工具包、宿主环境为node的项目                                                                                                                      | node.js、rollup.js、Typescript            |
| full-featured-commit       | 项目需要标准化的代码提交功能，提交规范为:emoji+feat:+content形式的提交内容                                                                                                  | 有手就行👋                                |

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
