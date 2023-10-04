<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SectionChart from './SectionChart.vue'

const models: any = ref({})
const summaries: any = ref([])

const getByDateString = (value: any, divider: string = '/') => {
  return value?.day?.toString().padStart(2, '0') + divider + value?.month?.toString().padStart(2, '0') + divider + value?.year?.toString()
}

const getByDateStringSplit = (value: any, divider: string = '/') => {
  if (!value) return ''
  const splitters = value?.split(divider)
  if (splitters.length !== 3) return ''
  return splitters[2]?.toString().padStart(2, '0') + divider + splitters[1].toString().padStart(2, '0') + divider + splitters[0]?.toString()
}

const onCalendarSelection = (value: any) => {
  const calendarFrom: any = value?.from || null
  const calendarTo: any = value?.to || null
  if (calendarFrom && calendarTo) {
    models.value['calendar'] = `${getByDateString(calendarFrom)} - ${getByDateString(calendarTo)}`
  } else if (calendarFrom || calendarTo) {
    const calendarCurrent = calendarFrom || calendarTo
    models.value['calendar'] = `${getByDateString(calendarCurrent)}`
  }
}

const initialized = () => {
  const today = new Date()
  models.value['date'] = today
  models.value['calendar'] = getByDateStringSplit(today.toISOString()?.substring(0, 10), '-')
  models.value['category'] = 'Agent'
  summaries.value = [
    { id: 1, text: 'Monthly Active User', value: '120', color: 'tw-bg-primary-400' },
    { id: 2, text: 'New Customer', value: '14', color: 'tw-bg-success-300' },
    { id: 3, text: 'Existing Customer', value: '57', color: 'tw-bg-info-500' },
  ]
}

onMounted(() => {
  initialized()
})
</script>

<template>
  <div class="tw-mt-10 tw-flex tw-min-h-[calc(100vh-140px)] tw-w-full tw-flex-col tw-gap-2 tw-p-3">
    <div class="tw-flex tw-justify-start tw-gap-3">
      <q-input :model-value="models.calendar" outlined dense class="q-mb-sm tw-min-w-[250px] tw-bg-white">
        <template #append>
          <q-icon name="calendar" class="black-filter primary-filter tw-cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="models.date" range @range-end="onCalendarSelection">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="tw-flex tw-h-[39px] tw-w-[39px] tw-flex-none tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-[7px] tw-bg-white">
        <q-icon name="filter" size="20px" class="black-filter primary-filter"></q-icon>
      </div>
    </div>
    <div class="tw-grid tw-grid-cols-4 tw-gap-3">
      <div
        v-for="(item, i) in summaries"
        :key="i"
        class="tw-flex tw-h-[130px] tw-flex-col tw-items-start tw-justify-center tw-rounded-[12px] tw-p-4"
        :class="item.color"
      >
        <span class="tw-text-[12px] tw-font-light tw-text-black">{{ item.text }}</span>
        <span class="tw-text-[40px] tw-font-semibold tw-text-[#414141]">{{ item.value }}</span>
      </div>
    </div>
    <div class="tw-my-4">
      <div class="tw-mb-4 tw-text-[16px] tw-font-semibold">Monthly New & Existing Customer</div>
      <q-card class="tw-p-2">
        <q-card-section><section-chart /></q-card-section>
      </q-card>
    </div>
  </div>
</template>
