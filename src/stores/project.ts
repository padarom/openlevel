import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useProjectStore = defineStore('project', () => {
  const project = useStorage('project', {})

  return { project }
})
