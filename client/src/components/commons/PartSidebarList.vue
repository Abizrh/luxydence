<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sidebarMaps } from '@/dependencies/constants/component-maps'

const emits = defineEmits(['click'])
const props = defineProps({
  mini: { type: Boolean, default: false },
})

const route = useRoute()
const router = useRouter()
const currentName = computed(() => {
  return route.path === '/' ? 'dashboard' : route.path?.replace('/', '').trim()
})

const onClicked = (path: any, isLogout?: boolean) => {
  if (isLogout) {
    emits('click', 'logout')
    return
  }
  if (!path) return
  router.push(path)
}
</script>

<template>
<!-- tw-bg-[#414141] -->
  <q-scroll-area class="tw-bg-[#292929] tw-p-2" style="height: calc(100% - 60px); border-right: 1px solid #ddd">
    <q-list padding>
      <template v-for="item in sidebarMaps" :key="item.id">
        <q-separator v-if="item.type === 'divider'" class="tw-bg-[#565656]" />
        <q-item v-else v-ripple :active="currentName === item.id" clickable exact @click="onClicked(item.path || null, item.isLogout || false)">
          <q-item-section avatar class="relative">
            <q-badge v-if="item.badge && props.mini" color="red" rounded float class="tw-absolute tw-right-[1px] tw-top-[1px]">
              {{ item.badge }}
            </q-badge>
            <q-icon :name="item.icon" :size="!item.size ? '20px' : item.size" :class="!item.no_masking ? 'black-filter primary-filter' : ''" />
          </q-item-section>
          <q-item-section class="tw-text-[14px] tw-capitalize tw-text-white">
            <div class="tw-flex tw-justify-between tw-gap-2">
              {{ item.text }}
              <q-badge v-if="item.badge" color="red" rounded>{{ item.badge }}</q-badge>
            </div>
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-scroll-area>
</template>
