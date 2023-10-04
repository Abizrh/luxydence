<script setup lang="ts">
import { ref } from 'vue'
import SectionContentOutstanding from './SectionContentReportOutstanding.vue'
import SectionContentPayment from './SectionContentReportPayment.vue'
import SectionPanel from './SectionPanelReport.vue'

const menuActive: any = ref('outstanding_report')

const onClickPanel = (item: any) => {
  if (!item) return null
  const { menu, value } = item
  if (menu === 'select-menu' && value && value.toString().trim().length !== 0) menuActive.value = value
}
</script>

<template>
  <div class="tw-flex tw-flex-row tw-gap-2">
    <section-panel @click="onClickPanel" />
    <section-content-outstanding v-if="menuActive === 'outstanding_report'" />
    <section-content-payment v-if="menuActive === 'payment_report'" />
  </div>
</template>
