<template>
  <div class="toast-box">
    <p class="toast-value" :style="{ background: background, color: color }">
      {{ value }}
    </p>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Toast',
  props: {
    value: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 3000
    },
    background: {
      type: String,
      default: '#000'
    },
    color: {
      type: String,
      default: '#fff'
    }
  }
})
</script>

<style>
.toast-box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.toast-value {
  max-width: 100px;
  background: rgb(8, 8, 8);
  padding: 8px 10px;
  border-radius: 4px;
  text-align: center;
  display: inline-block;
  animation: anim 0.5s;
}
@keyframes anim {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.toast-value.remove {
  animation: remove 0.5s;
}
@keyframes remove {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
