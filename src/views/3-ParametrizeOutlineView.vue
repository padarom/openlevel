<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type Konva from 'konva'
import ReusableKonva from '@/components/ReusableKonva.vue'
import { useProjectStore } from '@/stores/project'

const stageRef = ref<any>(null)
const router = useRouter()

const store = useProjectStore()

const lineToEdit = ref<string | null>(null)
const editLineLength = (e: Konva.KonvaPointerEvent) => {
  lineToEdit.value = e.target.id()
  e.target.setAttr('stroke', 'blue')
}

const startHoverLine = (e: Konva.KonvaPointerEvent) => {
  // e.target.setAttr('stroke', 'green')
}

const endHoverLine = (e: Konva.KonvaPointerEvent) => {
  // e.target.setAttr('stroke', 'black')
}
</script>

<template>
  <div>
    <ReusableKonva ref="stageRef">
      <v-group v-for="line in store.lines" :key="line.id">
        <v-line
          :config="{
            id: line.id,
            points: line.coordinates,
            stroke: lineToEdit == line.id ? 'blue' : 'black',
            strokeWidth: 5,
          }"
          @click="editLineLength"
          @mouseenter="startHoverLine"
          @mouseleave="endHoverLine"
        ></v-line>

        <v-circle
          :config="{
            x: line.coordinates[0],
            y: line.coordinates[1],
            radius: 6,
            fill: 'blue',
            id: `${line.from}`,
            listening: false,
          }"
        ></v-circle>

        <v-circle
          :config="{
            x: line.coordinates[2],
            y: line.coordinates[3],
            radius: 6,
            fill: 'blue',
            id: `${line.to}`,
            listening: false,
          }"
        ></v-circle>

        <v-label
          :config="{
            x:
              line.coordinates[0] +
              (line.coordinates[2] - line.coordinates[0]) / 2,
            y:
              line.coordinates[1] +
              (line.coordinates[3] - line.coordinates[1]) / 2,
            offsetY: -14,
            opacity: 0.8,
            listening: false,
          }"
        >
          <v-tag
            :config="{
              fill: 'black',
              pointerDirection: 'down',
              cornerRadius: 2,
              listening: false,
            }"
          ></v-tag>
          <v-text
            :config="{
              text: `${line.length?.toFixed(2)}`,
              padding: 8,
              fill: 'white',
              listening: false,
            }"
          ></v-text>
        </v-label>
      </v-group>
    </ReusableKonva>
  </div>
</template>
