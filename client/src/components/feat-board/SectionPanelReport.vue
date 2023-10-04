<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emits = defineEmits(['click'])
const menuActive = ref('agent_report')
const menuChildActive = ref(null)
const menuExpanded: any = ref({})
const menus: any = ref([])

const onClickedMenu = (item: any) => {
  menuActive.value = item.id
  for (const key in menuExpanded.value) {
    if (key !== item.id) menuExpanded.value[key] = false
  }
  emits('click', { menu: 'select-menu', value: item.childs ? '' : item.id })
}

const onClickedMenuChild = (item: any) => {
  menuChildActive.value = item.id
  emits('click', { menu: 'select-menu', value: item.id })
}

const initialized = () => {
  menus.value = [
    { id: 'outstanding_report', icon: 'headphone', text: 'Laporan Tunggakan', type: 'single' },
    { id: 'payment_report', icon: 'people', text: 'Laporan Pembayaran', type: 'single' },
  ]
}

onMounted(() => {
  initialized()
})
</script>

<template>
  <div class="tw-flex tw-min-h-[calc(100vh-40px)] tw-min-w-[300px] tw-flex-col tw-gap-2 tw-rounded-[10px] tw-bg-white tw-p-3">
    <q-banner inline-actions rounded class="bg-blue text-white">
      <span> Not implemented yet</span>
      <template v-slot:avatar>
        <q-icon name="info_circle" color="primary" />
      </template>
    </q-banner>
    <div class="tw-mb-2">
      <div class="tw-mb-4 tw-flex tw-items-center tw-justify-start tw-gap-2">
        <q-icon name="chart_bar" size="30px" class="black-filter primary-filter"></q-icon>
        <span class="tw-text-[20px] tw-font-normal">Today's Summary</span>
        <div class="tw-flex tw-flex-col tw-p-4"></div>
      </div>
    </div>
    <q-list class="rounded-borders">
      <q-expansion-item
        v-for="item in menus"
        :key="item.id"
        v-model="menuExpanded[item.id]"
        :icon="item.icon"
        expand-icon="arrow_down_primary"
        :label="item.text"
        :hide-expand-icon="item.type === 'single'"
        :header-class="menuActive === item.id && !item.childs ? 'primary-filter' : ''"
        @click="onClickedMenu(item)"
      >
        <div v-if="item.childs && item.childs.length > 0">
          <q-expansion-item
            v-for="subitem in item.childs"
            :key="subitem.id"
            :label="subitem.text"
            hide-expand-icon
            :header-inset-level="1"
            :header-class="menuChildActive === subitem.id ? 'primary-filter' : ''"
            @click="onClickedMenuChild(subitem)"
          ></q-expansion-item>
        </div>
      </q-expansion-item>
    </q-list>
  </div>
</template>
