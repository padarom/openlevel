<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { throttle } from 'lodash'
import type Konva from 'konva'
import ReusableKonva from '@/components/ReusableKonva.vue'
import { useProjectStore } from '@/stores/project'

const stageRef = ref<any>(null)
const router = useRouter()

let mousePosition = reactive<{ x: number, y: number }>({ x: 0, y: 0 })
const store = useProjectStore()
const points = computed(() =>
  store.corners.map((corner) => [corner.x, corner.y]).flat()
)
const newEdge = computed(() => {
  const lastCorner = store.corners[store.corners.length - 1]
  return [lastCorner.x, lastCorner.y, mousePosition.x, mousePosition.y]
})

const mouseMove = throttle(() => {
  const stage: Konva.Stage = stageRef.value!.getStage()
  if (!stage.pointerPos) return

  mousePosition.x =
    (stage.pointerPos.x - stage.getPosition().x) / stage.scaleX()
  mousePosition.y =
    (stage.pointerPos.y - stage.getPosition().y) / stage.scaleY()
}, 20)

const addCorner = () => {
  store.addCorner(newEdge.value[2], newEdge.value[3])
}

const finalizeShape = (e: Konva.KonvaPointerEvent) => {
  if (e.target.id() != '0') return

  router.push({ name: 'parametrize-outline' })
}
</script>

<template>
  <div>
    <ReusableKonva ref="stageRef" @mousemove="mouseMove" @click="addCorner">
      <v-line
        :config="{
          points,
          stroke: 'gray',
          strokeWidth: 7,
          listening: false,
        }"
      ></v-line>

      <v-line
        :config="{
          points: newEdge,
          stroke: 'lightgray',
          strokeWidth: 7,
          listening: false,
        }"
      ></v-line>

      <v-circle
        v-for="(point, index) in store.corners"
        :key="`${index}`"
        :config="{
          x: point.x,
          y: point.y,
          radius: 8,
          fill: 'blue',
          id: `${index}`,
        }"
        @click="finalizeShape"
      >
      </v-circle>
    </ReusableKonva>
  </div>
</template>
