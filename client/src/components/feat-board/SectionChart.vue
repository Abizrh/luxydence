<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { sleep } from '@/dependencies/helpers/util-of-timer'

const props = defineProps({
  inboundRaws: { type: Array, default: () => [] },
  outboundRaws: { type: Array, default: () => [] },
})

const textChart = 'Total Inbound/Outbound weekly'
const isDummy = false
const inboundLists: any = ref([])
const outboundLists: any = ref([])
const myChart: any = ref(null)

watch(props, async (value) => {
  if (!value) return
  await sleep(100)
  onInitChart()
})

const onInitChart = () => {
  if (isDummy) {
    inboundLists.value = [1.2, 0.9, 0.8, 0.9, 0.4]
    outboundLists.value = [1.6, 1.9, 0.7, 1.3, 1]
  } else {
    inboundLists.value = props.inboundRaws
    outboundLists.value = props.inboundRaws
  }
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const ctx: any = (document as any)?.getElementById('view-chart') || null
    const chartjs: any = (window as any)?.Chart || null
    if (myChart.value) {
      myChart.value?.destroy()
    }
    if (!ctx) return
    const chartData = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      datasets: [
        {
          label: 'Inbound',
          backgroundColor: '#FF4E00',
          data: inboundLists.value,
        },
        {
          label: 'Outbound',
          backgroundColor: '#FFB800',
          data: outboundLists.value,
        },
      ],
    }
    const chartOptions = {
      barValueSpacing: 20,
      plugins: {
        legend: {
          display: true,
          position: 'right',
          align: 'middle',
          labels: { pointStyle: 'circle', pointStyleWidth: 18, usePointStyle: true, boxWidth: 6 },
        },
      },
      scales: {},
    }
    myChart.value = new chartjs(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    })
  }
}

onMounted(async () => {
  await sleep(100)
})
</script>

<template>
  <div class="tw-flex tw-flex-col tw-p-[20px]">
    <span class="tw-text-[16px] tw-font-light tw-text-black">{{ textChart }}</span>
    <canvas id="view-chart" height="450"></canvas>
  </div>
</template>
