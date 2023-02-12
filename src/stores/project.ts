import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { nanoid } from 'nanoid'

type Corner = {
  id: string
  x: number
  y: number
}

type Line = {
  from: string
  to: string
  id: string
  coordinates: [number, number, number, number]
  length?: number
}

export const useProjectStore = defineStore('project', () => {
  const corners = useStorage<Corner[]>('corners', [{ id: 'first', x: 0, y: 0 }])

  const constraints = useStorage<[number, [number, number]][]>('constraints',
    []
  )

  const lines = computed(() =>
    corners.value.slice(1).reduce((list, cur, i) => {
      const prev = corners.value[i]
      list.push({
        from: prev.id,
        to: cur.id,
        id: `${prev.id}-${cur.id}`,
        coordinates: [prev.x, prev.y, cur.x, cur.y],
        length: Math.sqrt(Math.pow(cur.x - prev.x, 2) + Math.pow(cur.y - prev.y, 2)),
      })

      return list
    }, [] as Line[])
  )

  function addCorner(x: number, y: number) {
    corners.value.push({ id: nanoid(), x, y })
  }

  return { corners, lines, addCorner }
})
