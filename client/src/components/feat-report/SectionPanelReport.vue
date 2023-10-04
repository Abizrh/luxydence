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
    { id: 'agent_report', icon: 'headphone_primary', text: 'Agent Report', type: 'single' },
    { id: 'customer_report', icon: 'people_primary', text: 'Customer Report', type: 'single' },
    { id: 'usage_report', icon: 'keyboard_primary', text: 'Usage Report', type: 'single' },
  ]
}

onMounted(() => {
  initialized()
})
</script>

<template>
  <div class="tw-flex tw-min-h-[calc(100vh-40px)] tw-min-w-[300px] tw-flex-col tw-gap-2 tw-rounded-[10px] tw-bg-white tw-p-3">
    <div class="tw-mb-2">
      <div class="tw-mb-4 tw-flex tw-items-center tw-justify-start tw-gap-2">
        <q-icon name="chart_bar" size="30px" class="black-filter primary-filter"></q-icon>
        <span class="tw-text-[20px] tw-font-semibold">Report</span>
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
        :header-class="menuActive === item.id && !item.childs ? 'tw-bg-primary-300' : ''"
        @click="onClickedMenu(item)"
      >
        <div v-if="item.childs && item.childs.length > 0">
          <q-expansion-item
            v-for="subitem in item.childs"
            :key="subitem.id"
            :label="subitem.text"
            hide-expand-icon
            :header-inset-level="1"
            :header-class="menuChildActive === subitem.id ? 'tw-bg-primary-300' : ''"
            @click="onClickedMenuChild(subitem)"
          ></q-expansion-item>
        </div>
      </q-expansion-item>
    </q-list>
  </div>
</template>
