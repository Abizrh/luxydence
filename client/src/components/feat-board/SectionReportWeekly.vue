<script setup lang="ts">
import SectionChart from './SectionChart.vue'

const props = defineProps({
  inboundRaws: { type: Array, default: () => [] },
  outboundRaws: { type: Array, default: () => [] },
})

const textTitle = 'Weekly Inbound & Outbound'
const textSubtitle = 'Track your weekly Inbound & Outbound usage at a glance'
const textImport = 'Download Report'
</script>

<template>
  <div class="tw-flex tw-flex-row tw-items-center tw-justify-between">
    <div class="tw-flex tw-flex-col tw-gap-1 tw-p-4">
      <span class="tw-text-[20px] tw-font-normal">{{ textTitle }}</span>
      <span class="tw-mb-4 tw-text-body-2 tw-font-light">{{ textSubtitle }}</span>
    </div>
    <div class="tw-flex tw-items-center tw-gap-2">
      <q-icon name="import" size="24px" />
      <span class="tw-text-body-2 tw-font-normal">{{ textImport }}</span>
    </div>
  </div>
  <section-chart v-bind="props" />
</template>
