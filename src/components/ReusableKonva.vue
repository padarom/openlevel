<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import type Konva from 'konva'
import { throttle } from 'lodash'

const width = ref(200)
const height = ref(200)
const scale = ref(1)
const configKonva = computed(() => ({
  width: width.value,
  height: height.value,
} satisfies Omit<Konva.StageConfig, 'container'>))

const stageRef = ref<Konva.Stage | null>(null)
const containerRef = ref<Element | null>(null)

const refreshKey = ref(0)
const gridLines = computed(() => {
  refreshKey.value + 5

  const stage = stageRef.value?.getStage()
  if (!stage) return { x: [], y: [], }

  const WIDTH_PER_DIVISION = 50

  const position = stage.position()

  const left = Math.floor(-position.x / stage.scaleX() / WIDTH_PER_DIVISION) * WIDTH_PER_DIVISION
  const right = Math.ceil((-position.x + width.value) / stage.scaleX() / WIDTH_PER_DIVISION) * WIDTH_PER_DIVISION
  const top = Math.floor(-position.y / stage.scaleX() / WIDTH_PER_DIVISION) * WIDTH_PER_DIVISION
  const bottom = Math.ceil((-position.x + width.value) / stage.scaleX() / WIDTH_PER_DIVISION) * WIDTH_PER_DIVISION
  
  const divisionsX = (right - left) / WIDTH_PER_DIVISION
  const divisionsY = (bottom - top) / WIDTH_PER_DIVISION

  return {
    x: new Array(divisionsX).fill(0).map((_, i) => left + i * WIDTH_PER_DIVISION),
    y: new Array(divisionsY).fill(0).map((_, i) => top + i * WIDTH_PER_DIVISION),
    top, left, bottom, right,
  }
})

const scaleBy = 1.02
const resetScale = throttle((e: Konva.KonvaPointerEvent) => {
  e.evt.preventDefault()

  const stage = stageRef.value!.getStage()

  const oldScale = stage.scaleX()
  const pointer = stage.getPointerPosition()
  if (!pointer) return

  const mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  }

  let direction = e.evt.deltaY > 0 ? -1 : 1
  if (e.evt.ctrlKey) {
    direction = -direction
  }

  scale.value = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy
  stage.scale({ x: scale.value, y: scale.value })
  stage.position({
    x: pointer.x - mousePointTo.x * scale.value,
    y: pointer.y - mousePointTo.y * scale.value,
  })

  refreshKey.value++
}, 30)

const setKonvaSize = () => {
  const style = getComputedStyle(containerRef.value!)

  width.value =
    containerRef.value!.clientWidth -
    parseFloat(style.paddingLeft) -
    parseFloat(style.paddingRight)

  height.value =
    containerRef.value!.clientHeight -
    parseFloat(style.paddingTop) -
    parseFloat(style.paddingBottom)
}

onMounted(setKonvaSize)
window.addEventListener('resize', setKonvaSize)

defineExpose({
  getStage: () => stageRef.value?.getStage(),
})
</script>

<template>
  <div ref="containerRef" class="w-full h-full bg-slate-200 rounded-xl">
    <v-stage :config="configKonva" @wheel="resetScale" ref="stageRef">
      <v-layer :config="{ opacity: 0.5, listening: false, }">
        <v-line
          v-for="x in gridLines.x"
          :config="{
            points: [x, gridLines.top, x, gridLines.bottom],
            strokeWidth: Math.min(1 / scale, 1),
            stroke: 'black',
          }"
        ></v-line>

        <v-line
          v-for="y in gridLines.y"
          :config="{
            points: [gridLines.left, y, gridLines.right, y],
            strokeWidth: Math.min(1 / scale, 1),
            stroke: 'black',
          }"
        ></v-line>
      </v-layer>

      <v-layer>
        <slot></slot>
      </v-layer>
    </v-stage>
  </div>
</template>
