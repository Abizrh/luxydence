<script setup lang="ts">
import { onMounted, ref } from 'vue'

const models: any = ref({})
const columnsDefault: any = ref([
  { id: 'message_id', label: 'Message ID', field: 'message_id', name: 'message_id', sortable: false, align: 'center' },
  { id: 'customer_name', label: 'Customer Name', field: 'customer_name', name: 'customer_name', sortable: false, align: 'center' },
  { id: 'customer_phone', label: 'Customer Phone', field: 'customer_phone', name: 'customer_phone', sortable: false, align: 'center' },
  { id: 'message', label: 'Preview Message', field: 'message', name: 'message', sortable: false, align: 'center' },
  { id: 'category', label: 'Category', field: 'category', name: 'category', sortable: false, align: 'center' },
  { id: 'price', label: 'Price', field: 'price', name: 'price', sortable: false, align: 'center' },
])
const columnsFirst: any = ref([])
const columnsSecond: any = ref([])
const rowsFirst: any = ref([])
const rowsSecond: any = ref([])
const summariesLeft: any = ref([])
const summariesRight: any = ref([])

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
  columnsFirst.value = [].concat(columnsDefault.value).filter((item: any) => item.id !== 'category')
  columnsSecond.value = [].concat(columnsDefault.value)
  const messagesFirst = ['Permisi kak', 'Halo', 'Mau tanya', 'Kak', 'Pagi']
  const messagesSecond = ['Selamat Berlibur', 'Kepada', 'Salam Hangat', 'Minggu', 'Haloo']
  const dummies: any = [
    { message_id: '093029302', customer_name: 'Yoga', customer_phone: '08656323121', category: 'Marketing', message: '' },
    { message_id: '293029302', customer_name: 'Sari', customer_phone: '085732323213', category: 'Utility', message: '' },
    { message_id: '493029302', customer_name: 'Nando', customer_phone: '081232327346', category: 'Authentication', message: '' },
    { message_id: '593029302', customer_name: 'Albert', customer_phone: '081238989864', category: 'Utility', message: '' },
    { message_id: '593029302', customer_name: 'Albert', customer_phone: '082138783744', category: 'Authentication', message: '' },
  ]
  rowsFirst.value = dummies?.map((item: any, i: number) => {
    const newItem = Object.assign({}, item)
    newItem.message = messagesFirst[i]
    newItem.price = 'Rp. 750'
    return newItem
  })
  rowsSecond.value = dummies?.map((item: any, i: number) => {
    const newItem = Object.assign({}, item)
    newItem.message = messagesSecond[i]
    newItem.price = 'Rp. 750'
    return newItem
  })
  summariesLeft.value = [
    { id: 1, text: 'Total message', value: '120', color: 'tw-bg-primary-400' },
    { id: 2, text: 'Total Conversation', value: '12', color: 'tw-bg-[#FFF8E7]' },
    { id: 3, text: 'Total <br /> Resolve conversation', value: '114', color: 'tw-bg-[#DFFFF2]' },
    { id: 4, text: 'Total <br /> Unresolve conversation', value: '6', color: 'tw-bg-[#FFE8E8]' },
  ]
  summariesRight.value = [
    { id: 1, text: 'Total <br /> Business Initiate', value: '80', color: 'tw-bg-neutral-300' },
    { id: 2, text: 'Total <br /> Customer Initiate', value: '80', color: 'tw-bg-neutral-300' },
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
    <q-card class="tw-p-4">
      <q-card-section>
        <div class="tw-flex tw-gap-4">
          <div class="tw-grid tw-w-[60%] tw-grid-cols-2 tw-gap-3">
            <div
              v-for="(item, i) in summariesLeft"
              :key="i"
              class="tw-flex tw-h-[130px] tw-flex-col tw-items-start tw-justify-center tw-rounded-[12px] tw-p-6"
              :class="item.color"
            >
              <span v-html-safe="item.text" class="tw-text-[12px] tw-font-light tw-text-black"></span>
              <span class="tw-text-[40px] tw-font-semibold tw-text-[#414141]">{{ item.value }}</span>
            </div>
          </div>
          <div class="tw-flex tw-w-[1px] tw-flex-none tw-justify-center tw-border tw-border-black"></div>
          <div class="tw-grid tw-w-[39%] tw-grid-cols-2 tw-gap-3">
            <div
              v-for="(item, i) in summariesRight"
              :key="i"
              class="tw-flex tw-flex-col tw-items-start tw-justify-center tw-rounded-[12px] tw-p-6"
              :class="item.color"
            >
              <span v-html-safe="item.text" class="tw-text-[12px] tw-font-light tw-text-black"></span>
              <span class="tw-text-[40px] tw-font-semibold tw-text-[#414141]">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="tw-my-4">
      <div class="tw-flex tw-items-center tw-justify-between">
        <div class="tw-mb-8 tw-text-[14px] tw-font-semibold">Customer Initiate</div>
        <q-btn outline flat color="gray">
          <q-icon name="download" size="20px" class="tw-mr-2"></q-icon>
          <span class="tw-whitespace-nowrap tw-capitalize tw-text-black">Download Report</span>
        </q-btn>
      </div>
      <q-table
        :rows="rowsFirst"
        :columns="columnsFirst"
        :pagination="{ rowsPerPage: 10 }"
        row-key="id"
        no-data-label="I didn't find anything for you"
        no-results-label="The filter didn't uncover any results"
        class="tw-mt-4"
      >
        <template #header="props">
          <q-tr :props="props" class="tw-bg-[#F9FAFB]">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              <span class="tw-font-semibold">{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template>
        <template #body-cell="props">
          <q-td :props="props">
            <span class="tw-font-normal">{{ props.value }}</span>
          </q-td>
        </template>
        <template #no-data="{ message }">
          <div class="full-width row flex-center q-gutter-sm">
            <span class="tw-whitespace-nowrap tw-capitalize">{{ message }}</span>
          </div>
        </template>
      </q-table>
    </div>
    <div class="tw-my-4">
      <div class="tw-mb-8 tw-text-[14px] tw-font-semibold">Business Initiate</div>
      <q-table
        :rows="rowsSecond"
        :columns="columnsSecond"
        :pagination="{ rowsPerPage: 10 }"
        row-key="id"
        no-data-label="I didn't find anything for you"
        no-results-label="The filter didn't uncover any results"
        class="tw-mt-4"
      >
        <template #header="props">
          <q-tr :props="props" class="tw-bg-[#F9FAFB]">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              <span class="tw-font-semibold">{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template>
        <template #body-cell="props">
          <q-td :props="props">
            <span class="tw-font-normal">{{ props.value }}</span>
          </q-td>
        </template>
        <template #no-data="{ message }">
          <div class="full-width row flex-center q-gutter-sm">
            <span class="tw-whitespace-nowrap tw-capitalize">{{ message }}</span>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>
