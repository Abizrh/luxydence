<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseSwitch from '@/components/basics/BaseSwitch.vue'

const emits = defineEmits(['update:channel'])
const props = defineProps({
  labels: { type: Array, default: () => [] },
})
const models: any = ref({})

watch(models.value, (value) => {
  if (!value) return
  emits('update:channel', value)
})

const onReset = () => {
  for (const key in models.value) {
    models.value[key] = typeof models.value[key] === 'boolean' ? false : null
  }
  emits('update:channel', null)
}
</script>

<template>
  <q-menu fit touch-position>
    <q-list padding class="tw-bg-white" style="min-width: 250px">
      <q-item class="tw-mb-2 tw-flex tw-items-center tw-justify-start tw-gap-2">
        <q-icon name="filter" size="24px" class="black-filter primary-filter"></q-icon>
        <span class="tw-text-[16px] tw-font-semibold">Filter</span>
      </q-item>
      <q-item class="tw-flex tw-flex-col tw-justify-start tw-gap-3">
        <span class="tw-text-[14px] tw-font-semibold">Label</span>
        <q-select
          v-model="models.label"
          :options="props.labels"
          multiple
          use-chips
          outlined
          hide-dropdown-icon
          input-debounce="0"
          dense
          class="q-mb-sm"
        >
          <template #append>
            <q-icon name="arrow_down" size="20px" class="black-filter primary-filter"></q-icon>
          </template>
        </q-select>
      </q-item>
      <q-item class="tw-flex tw-flex-col tw-justify-start tw-gap-3">
        <span class="tw-text-[14px] tw-font-semibold">Channel</span>
        <div class="tw-flex tw-justify-between tw-p-2">
          <div class="tw-flex tw-gap-1">
            <q-icon name="brand_whatsapp" size="15px"></q-icon>
            <span class="tw-text-[12px] tw-font-normal tw-text-[#808080]">Whatsapp</span>
          </div>
          <base-switch :on="models['whatsapp']" @input="(value) => (models['whatsapp'] = value)" />
        </div>
        <div class="tw-flex tw-justify-between tw-p-2">
          <div class="tw-flex tw-gap-1">
            <q-icon name="brand_facebook" size="15px"></q-icon>
            <span class="tw-text-[12px] tw-font-normal tw-text-[#808080]">Facebook Messenger</span>
          </div>
          <base-switch :on="models['facebook']" @input="(value) => (models['facebook'] = value)" />
        </div>
        <div class="tw-flex tw-justify-between tw-p-2">
          <div class="tw-flex tw-gap-1">
            <q-icon name="brand_telegram" size="15px"></q-icon>
            <span class="tw-text-[12px] tw-font-normal tw-text-[#808080]">Telegram</span>
          </div>
          <base-switch :on="models['telegram']" @input="(value) => (models['telegram'] = value)" />
        </div>
      </q-item>
      <q-item class="tw-flex tw-cursor-pointer tw-flex-col tw-justify-start tw-gap-3">
        <span class="tw-text-[12px] tw-font-medium tw-text-primary-500 tw-underline" @click="onReset">Reset</span>
      </q-item>
    </q-list>
  </q-menu>
</template>
