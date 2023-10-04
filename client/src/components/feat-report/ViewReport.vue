<script setup lang="ts">
import { ref } from 'vue'
import SectionContentAgent from './SectionContentReportAgent.vue'
import SectionContentCustomer from './SectionContentReportCustomer.vue'
import SectionContentUsage from './SectionContentReportUsage.vue'
import SectionPanel from './SectionPanelReport.vue'

const menuActive: any = ref('agent_report')

const onClickPanel = (item: any) => {
  if (!item) return null
  const { menu, value } = item
  if (menu === 'select-menu' && value && value.toString().trim().length !== 0) menuActive.value = value
}
</script>

<template>
  <div class="tw-flex tw-flex-row tw-gap-2">
    <section-panel @click="onClickPanel" />
    <section-content-agent v-if="menuActive === 'agent_report'" />
    <section-content-customer v-if="menuActive === 'customer_report'" />
    <section-content-usage v-if="menuActive === 'usage_report'" />
  </div>
</template>
