<script setup lang="ts">
import { RouterLink, useLink, type RouterLinkProps } from 'vue-router'

interface BreadcrumbProps extends RouterLinkProps {
  firstEntry?: boolean
}

const props = defineProps<BreadcrumbProps>()
const { isActive } = useLink(props)
</script>

<template>
  <div class="flex">
    <div class="flex items-center">
      <svg
        v-if="!props.firstEntry"
        class="h-full w-6 flex-shrink-0 text-gray-200"
        viewBox="0 0 24 44"
        preserveAspectRatio="none"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
      </svg>

      <RouterLink
        v-bind="props"
        class="ml-4 text-sm font-medium"
        :class="{
          'text-gray-500 hover:text-gray-700': !isActive,
          'text-black': isActive,
        }"
        ><slot></slot
      ></RouterLink>
    </div>
  </div>
</template>
