<template>
  <div>
    <Button type="primary" @click="testFun">TestEmit</Button>
    <div>{{ msg1 }}</div>
    <div>{{ msg2 }}</div>
  </div>
</template>
<script lang="ts" setup>
import { Button } from 'ant-design-vue'
import { ref, reactive, defineEmits } from 'vue'
const msg1 = ref('ni hao')
const msg2 = reactive({
  content: 'bu hao'
})
const emits = defineEmits(['testEmit'])
const testFun = (): void => {
  emits('testEmit')
}
</script>
<style lang=""></style>
