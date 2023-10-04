<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createRequest } from '@/dependencies/methods/_method'
import { sleep } from '@/dependencies/helpers/util-of-timer'
import SectionPanel from './SectionPanelOccupant.vue'
import SectionContent from './SectionContentOccupant.vue'

const labels = ref([])

onMounted(async () => {
  await sleep(100)
  const resultLabels = await createRequest('labels', 'get')
  if (resultLabels.statusCode.value === 200 && resultLabels.data?.value) {
    const docs = resultLabels.data.value?.docs || []
    labels.value = docs?.map((item: any) => ({ label: item.label, color: item.color, value: item._id }))
  }
})
</script>

<template>
  <div class="tw-flex tw-flex-row tw-gap-2">
    <section-panel />
    <section-content :labels="labels" />
  </div>
</template>
