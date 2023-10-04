<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { iconMaps } from './dependencies/constants/component-maps'
import { sleep } from './dependencies/helpers/util-of-timer'
import { initTranslate } from './dependencies/methods/_method'
import LayoutBlank from './components/templates/LayoutBlank.vue'
import LayoutAuth from './components/templates/LayoutAuth.vue'
import LayoutAdmin from './components/templates/LayoutAdmin.vue'

const route = useRoute()
const $q = useQuasar()
const loading = ref(true)
const LayoutView = shallowRef(LayoutBlank)

watch(
  () => route?.meta,
  async (value) => {
    if (!value?.layout) return
    await setLayout()
  },
)

const setLayout = async () => {
  loading.value = true
  await sleep(route?.name === 'home' ? 150 : 15)
  const metaLayout: any = route?.meta?.layout
  if (metaLayout === 'auth') LayoutView.value = LayoutAuth
  if (metaLayout === 'admin') LayoutView.value = LayoutAdmin
  loading.value = false
}

const initialized = async () => {
  await initTranslate('en')
  $q.iconMapFn = (iconName) => {
    const icon = iconMaps[iconName]
    if (icon !== void 0) {
      return { icon: icon }
    }
  }
  await setLayout()
}

onMounted(async () => {
  await initialized()
})
</script>

<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <layout-view v-if="!loading">
      <router-view />
    </layout-view>
  </transition>
  <q-inner-loading :showing="loading" color="orange" label="Please wait..." label-class="tw-text-body-2 tw-text-primary-500" />
</template>
