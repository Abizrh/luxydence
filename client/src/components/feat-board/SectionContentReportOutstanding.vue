<script setup lang="ts">
import { onMounted, ref } from 'vue'

const models: any = ref({})
const columnsFirst: any = ref([
  { id: 'ticket_id', label: 'Pembayaran ID', field: 'ticket_id', name: 'ticket_id', sortable: false, align: 'center' },
  { id: 'agent_name', label: 'Nomor Rumah', field: 'agent_name', name: 'agent_name', sortable: false, align: 'center' },
  { id: 'customer_name', label: 'Pemilik Rumah', field: 'customer_name', name: 'customer_name', sortable: false, align: 'center' },
  { id: 'date', label: 'Tanggal', field: 'date', name: 'date', sortable: false, align: 'center' },
  {
    id: 'first_message_time',
    label: 'Total Tunggakan',
    field: 'first_message_time',
    name: 'first_message_time',
    sortable: false,
    align: 'center',
  },
])
const columnsSecond: any = ref([
  { id: 'agent_name', label: 'Agent Name', field: 'agent_name', name: 'agent_name', sortable: false, align: 'center' },
  {
    id: 'average_response_time',
    label: 'Average Response Time',
    field: 'average_response_time',
    name: 'average_response_time',
    sortable: false,
    align: 'center',
  },
])
const rowsFirst: any = ref([])
const rowsSecond: any = ref([])
const options: any = ref(['Agent'])

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
  const dummies: any = [
    { ticket_id: '093029302', agent_name: 'Agent 1', customer_name: 'Yoga', average_response_time: '1s' },
    { ticket_id: '293029302', agent_name: 'Agent 2', customer_name: 'Sari', average_response_time: '6s' },
    { ticket_id: '493029302', agent_name: 'Agent 3', customer_name: 'Nando', average_response_time: '13s' },
    { ticket_id: '593029302', agent_name: 'Agent 4', customer_name: 'Albert', average_response_time: '10s' },
  ]
  rowsFirst.value = dummies?.map((item: any) => {
    item.date = '22 Jun 2023'
    item.first_message_time = 'Rp. 10000'
    item.first_response_time = '16:30:40'
    return item
  })
  rowsSecond.value = dummies?.map((item: any) => {
    return item
  })
}

onMounted(() => {
  initialized()
})
</script>

<template>
  <div class="tw-mt-10 tw-flex tw-min-h-[calc(100vh-140px)] tw-w-full tw-flex-col tw-gap-2 tw-p-3">
    <div class="tw-flex tw-items-center tw-justify-start tw-gap-3">
      <q-select
        v-model="models.category"
        :options="options"
        outlined
        hide-dropdown-icon
        input-debounce="0"
        dense
        class="q-mb-sm tw-min-w-[250px] tw-bg-white"
      >
        <template #append>
          <q-icon name="arrow_down" size="20px" class="black-filter primary-filter"></q-icon>
        </template>
      </q-select>
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
    </div>
    <div class="tw-grid tw-grid-cols-2 tw-gap-3">
      <div
        v-for="i in 2"
        :key="i"
        class="tw-flex tw-h-[156px] tw-flex-col tw-items-center tw-justify-center tw-rounded-[12px] tw-bg-primary-400 tw-p-2"
      >
        <span class="tw-text-[20px] tw-font-bold primary-filter">2 Minute 30 second</span>
        <span class="tw-text-[14px] tw-font-normal">Average Response Time</span>
      </div>
    </div>
    <div class="tw-my-4">
      <div class="tw-mb-8 tw-text-[14px] tw-font-semibold">Tunggakan</div>
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
  </div>
</template>
