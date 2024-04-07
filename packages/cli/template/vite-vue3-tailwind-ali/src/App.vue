<script setup lang="ts">
import i18n from 'i18n/index'
const t = i18n.global.t
</script>

<template>
  <div>
    <!-- TODO: 提高antd样式的优先级，兼容tailwindcss -->
    <a-style-provider hash-priority="high">
      <router-view> </router-view>
    </a-style-provider>
  </div>
</template>

<style scoped></style>
