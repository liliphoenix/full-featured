<template>
  <div class="dialog" v-if="isShow">
    <div class="dialog-mark" @click.self="closeMyself"></div>
    <transition name="dialog">
      <div v-show="true" class="dialog-container">
        <div class="dialog-header">
          <span>{{ props.title }}</span>
        </div>
        <div class="dialog-content">
          <slot>123</slot>
        </div>
        <div class="dialog-confirm">
          <div class="confirm" @click="handleConfirm">confirm</div>
          <div class="cancel" @click="handelCancel">cancel</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: 'title'
  }
})
const emits = defineEmits(['confirm', 'cancel'])
const isShow = ref(true)
const bodyOverflow = ref()
onMounted(() => {
  forbidScroll()
})
const handleConfirm = (): void => {
  emits('confirm')
}
const handelCancel = (): void => {
  isShow.value = false
  solveBodyOverflow()
  emits('cancel')
}
//
const forbidScroll = (): void => {
  bodyOverflow.value = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}
const closeMyself = (): void => {
  isShow.value = false
  solveBodyOverflow()
}
const solveBodyOverflow = (): void => {
  document.body.style.overflow = bodyOverflow.value
}
</script>
<style lang="scss">
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.5s;
}

.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .dialog-mark {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .dialog-container {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    width: 68%;
    min-height: 180px;
    max-height: 35%;
    background-color: #fff;
    z-index: 1999;
    overflow: hidden;
    @include flex-col;
    padding: 20px;
    .dialog-header {
      text-align: center;
      font-size: 40px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .dialog-content {
      flex: 1;
    }
    .dialog-confirm {
      height: 100px;
      display: flex;
      justify-content: space-between;
      text-align: center;
      line-height: 100px;
      & .confirm {
        width: 50%;
        background-color: beige;
      }
      & .cancel {
        width: 50%;
        background-color: bisque;
      }
    }
  }
}
</style>
