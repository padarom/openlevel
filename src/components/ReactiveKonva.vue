<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

const container = ref<Element | null>(null)
const configKonva = reactive({
  width: 200,
  height: 200,
})

const setKonvaSize = () => {
  const style = getComputedStyle(container.value!)

  configKonva.width =
    container.value!.clientWidth -
    parseFloat(style.paddingLeft) -
    parseFloat(style.paddingRight)

  configKonva.height =
    container.value!.clientHeight -
    parseFloat(style.paddingTop) -
    parseFloat(style.paddingBottom)
}

onMounted(setKonvaSize)
window.addEventListener('resize', setKonvaSize)
</script>

<template>
  <div class="w-full h-full" ref="container">
    <v-stage :config="configKonva">
      <slot></slot>
    </v-stage>
  </div>
</template>
