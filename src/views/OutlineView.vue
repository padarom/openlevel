<script setup lang="ts">
import { computed, reactive } from 'vue'
import ReactiveKonva from '@/components/ReactiveKonva.vue'

const points = reactive<[number, number][]>([
  [10, 100],
  [500, 200],
])
const pointCoordinates = computed(() => points.flat())

const dragCircle = (event: any) => {
  const index = event.target.attrs.id
  points[index][0] = event.target.attrs.x
  points[index][1] = event.target.attrs.y
}
</script>

<template>
  <ReactiveKonva>
    <v-layer>
      <v-line :config="{ points: pointCoordinates, tension: 0, stroke: 'black', strokeWidth: 10 }"></v-line>

      <v-circle
        v-for="(point, index) in points"
        :key="`${index}`"
        :config="{ x: point[0], y: point[1], radius: 10, fill: 'red', draggable: true, id: index }"
        @dragmove="dragCircle"
      >
      </v-circle>
    </v-layer>
  </ReactiveKonva>
</template>
