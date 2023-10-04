<script setup lang="ts">
import { useRouter } from 'vue-router'
import { userMenuMaps } from '../../dependencies/constants/component-maps'

const router = useRouter()

const onClicked = (path: any) => {
  if (!path) return
  router.push(path)
}
</script>

<template>
  <q-menu fit>
    <q-list padding style="min-width: 100px">
      <template v-for="item in userMenuMaps" :key="item.id">
        <q-separator v-if="item.type === 'divider'" />
        <q-item v-else v-ripple clickable class="tw-flex tw-items-center tw-gap-4" @click="onClicked(item.path || null)">
          <q-icon :name="item.icon" :size="!item.size ? '20px' : item.size" class="black-filter primary-filter" />
          <q-item-section class="tw-whitespace-nowrap tw-text-body-2 tw-capitalize tw-text-black">{{ item.text }}</q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-menu>
</template>
