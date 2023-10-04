<script setup lang="ts">
import { onMounted } from 'vue'
import { sleep } from '@/dependencies/helpers/util-of-timer'

const textChart = 'Total new occupant & existing occupant this month'

onMounted(async () => {
  await sleep(100)
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const ctx: any = (document as any)?.getElementById('view-chart') || null
    const chartjs: any = (window as any)?.Chart || null
    if (!ctx) return
    const chartData = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      datasets: [
        {
          label: 'New Customer',
          backgroundColor: 'blue',
          data: [1.2, 0.9, 0.8, 0.9, 0.4],
        },
        {
          label: 'Existing Customer',
          backgroundColor: 'blue',
          data: [1.6, 1.9, 0.7, 1.3, 1],
        },
      ],
    }
    const chartOptions = {
      barValueSpacing: 20,
      plugins: {
        legend: {
          display: false,
          labels: { pointStyle: 'circle', pointStyleWidth: 18, usePointStyle: true, boxWidth: 6 },
        },
      },
      scales: {},
    }
    new chartjs(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    })
  }
})
</script>

<template>
  <div class="tw-flex tw-flex-col tw-p-[10px]">
    <div class="tw-mb-6 tw-mt-0 tw-flex tw-justify-between">
      <span class="tw-text-[16px] tw-font-light tw-text-black">{{ textChart }}</span>
      <div class="tw-flex tw-gap-3">
        <div class="tw-flex tw-items-center tw-gap-1">
          <div class="tw-h-[12px] tw-w-[12px] tw-rounded-full tw-bg-[#FF4E00]"></div>
          <span class="tw-text-[12px] tw-font-normal">New Occupant</span>
        </div>
        <div class="tw-flex tw-items-center tw-gap-1">
          <div class="tw-h-[12px] tw-w-[12px] tw-rounded-full tw-bg-[#FFE8DE]"></div>
          <span class="tw-text-[12px] tw-font-normal">Existing Occupant</span>
        </div>
      </div>
    </div>
    <canvas id="view-chart" height="400"></canvas>
  </div>
</template>
