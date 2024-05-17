<template>
  <div class="toast-container">123</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export const ToastTemplate = defineComponent({
  props: {
    content: {
      type: String,
      default: 'this is a Toast'
    },
    duration: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'warning'
    }
  }
})
</script>

<style></style>
