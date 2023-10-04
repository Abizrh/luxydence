<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createRequest } from '@/dependencies/methods/_method'
import { sleep } from '@/dependencies/helpers/util-of-timer'
import PartCardSummary from './PartCardSummary.vue'
import PartCardSummaryDark from './PartCardSummaryDark.vue'
import SectionReportWeekly from './SectionReportWeekly.vue'

const textTitle = 'Today’s summary'
const textTitleTwo = 'Other status'
const dateDisplay: any = ref(null)
const summaryCounters: any = ref({})
const dataInbounds: any = ref([])
const dataOutbounds: any = ref([])

// onMounted(async () => {
//   await sleep(100)
//   let rangeDate = null
//   if (typeof window !== 'undefined') {
//     const dayjs: any = (window as any)?.dayjs || null
//     dateDisplay.value = dayjs().format('DD MMMM YYYY')
//     const typeRange: string = 'weekly'
//     const dateCurrent = new Date()
//     let rangeDateObject = null
//     if (typeRange === 'monthly') {
//       const firstDay = new Date(dateCurrent.getFullYear(), dateCurrent.getMonth(), 1)
//       const lastDay = new Date(dateCurrent.getFullYear(), dateCurrent.getMonth() + 1, 0)
//       rangeDateObject = {
//         startDate: dayjs(firstDay).format('YYYY-MM-DD') + '+00:00',
//         endDate: encodeURI(dayjs(lastDay).format('YYYY-MM-DD') + '+23:59'),
//       }
//     } else {
//       const firstDay = new Date(dateCurrent.getTime() - 7 * 24 * 60 * 60 * 1000)
//       rangeDateObject = {
//         startDate: dayjs(firstDay).format('YYYY-MM-DD') + '+00:00',
//         endDate: encodeURI(dayjs(dateCurrent).format('YYYY-MM-DD') + '+23:59'),
//       }
//     }
//     rangeDate = Object.entries(rangeDateObject)
//       .map(([key, value]: any) => `${key}=${value}`)
//       .join('&')
//   }
//   const resultChatActive = await createRequest('chats-active', 'get')
//   const resultChatUnread = await createRequest('chats-unread', 'get')
//   const requestTicket = await createRequest('ticket', 'get', rangeDate)
//   const requestBroadcast = await createRequest('broadcasts', 'get', rangeDate)
//   const resultReports = await createRequest('reports', 'get')
//   const resultReportDaily = await createRequest('reports-daily-usage', 'get')
//   const requestReportWeekly = await createRequest('reports-weekly-usage', 'get', { month: new Date().getMonth() + 1, year: new Date().getFullYear() })
//   if (resultChatActive.statusCode.value === 200 && resultChatActive.data?.value) {
//     summaryCounters.value['chat_active'] = resultChatActive.data.value?.content || 0
//   }
//   if (resultChatUnread.statusCode.value === 200 && resultChatUnread.data?.value) {
//     summaryCounters.value['chat_unread'] = resultChatUnread.data.value?.content || 0
//   }
//   if (resultReportDaily.statusCode.value === 200 && resultReportDaily.data?.value) {
//     const reportData = resultReportDaily.data.value?.data || []
//     const inboundCount = reportData?.reduce((total: number, item: any) => {
//       return total + (item.userInit ?? 0)
//     }, 0)
//     const outboundCount = reportData?.reduce((total: number, item: any) => {
//       return total + (item.businessInit ?? 0)
//     }, 0)
//     summaryCounters.value['inbound'] = inboundCount || 0
//     summaryCounters.value['outbound'] = outboundCount || 0
//   }
//   if (resultReports.statusCode.value === 200 && resultReports.data?.value) {
//     const reportData = resultReports.data.value?.data
//     summaryCounters.value['active_user'] = reportData?.monthlyActiveUser || 0
//     summaryCounters.value['template'] = reportData?.template || 0
//     summaryCounters.value['contact'] = reportData?.contact || 0
//   }
//   if (requestReportWeekly.statusCode.value === 200 && requestReportWeekly.data?.value) {
//     const reportData = requestReportWeekly.data.value?.data || []
//     dataInbounds.value = reportData?.map((item: any) => item.userInit ?? 0)
//     dataOutbounds.value = reportData?.map((item: any) => item.businessInit ?? 0)
//   }
//   if (requestTicket.statusCode.value === 200 && requestTicket.data?.value) {
//     const reportData = requestTicket.data.value?.data || []
//     const ticketCount = reportData?.reduce((total: number, item: any) => {
//       return total + (item.openAt && !item.closeAt ? 1 : 0)
//     }, 0)
//     summaryCounters.value['ticket'] = ticketCount
//   }
//   if (requestBroadcast.statusCode.value === 200 && requestBroadcast.data?.value) {
//     const reportData = requestBroadcast.data.value?.data || []
//     const broadcastCount = reportData?.reduce((total: number, item: any) => {
//       return total + (item.deliveredCount ?? 0)
//     }, 0)
//     summaryCounters.value['broadcast'] = broadcastCount
//   }
// })

</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-1 tw-rounded-[8px] tw-bg-white tw-p-4">
    <div class="tw-flex tw-flex-col tw-p-4">
      <span class="tw-text-[20px] tw-font-normal">{{ textTitle }}</span>
      <span class="tw-mb-4 tw-text-body-2 tw-font-light">{{ dateDisplay }}</span>
    </div>
    <div class="tw-flex tw-flex-wrap tw-justify-center tw-gap-2">
      <div class="tw-w-[240px] tw-flex-none">
        <part-card-summary text="Active Chat" :value="summaryCounters.chat_active ?? '...'" icon="message" color="tw-bg-[#EFFCEF]" />
      </div>
      <div class="tw-w-[240px] tw-flex-none">
        <part-card-summary text="Unread" :value="summaryCounters.chat_unread ?? '...'" icon="message_notif" color="tw-bg-[#FFEFE2]" />
      </div>
      <div class="tw-w-[240px] tw-flex-none">
        <part-card-summary text="Inbound" :value="summaryCounters.inbound ?? '...'" icon="message_inbox" color="tw-bg-[#E6F5F9]" />
      </div>
      <div class="tw-w-[240px] tw-flex-none">
        <part-card-summary text="Outbound" :value="summaryCounters.outbound ?? '...'" icon="message_outbox" color="tw-bg-[#F4F6FA]" />
      </div>
    </div>
    <q-separator class="tw-my-[50px] tw-bg-[#E0E0E0]" />
    <!-- // TODO: Show's table here -->
    <span class="tw-text-[20px] tw-font-normal">Table</span>
    <section-report-weekly :inbound-raws="dataInbounds" :outbound-raws="dataOutbounds" />
    <q-separator class="tw-my-[50px] tw-bg-[#E0E0E0]" />
    <div class="tw-flex tw-flex-col tw-p-4">
      <span class="tw-text-[20px] tw-font-normal">{{ textTitleTwo }}</span>
      <span class="tw-mb-4 tw-text-body-2 tw-font-light">{{ dateDisplay }}</span>
    </div>
    <div class="tw-flex tw-flex-wrap tw-justify-center tw-gap-2">
      <div class="tw-w-[240px] tw-flex-none">
        <part-card-summary
          text="Monthly Active Users"
          :value="summaryCounters.active_user || '...'"
          icon="message"
          type="long"
          color="tw-bg-[#F1F1F1]"
        />
      </div>
      <div class="tw-w-[240px] tw-flex-none">
        <part-card-summary text="Unresolved Ticket" :value="summaryCounters.ticket ?? '...'" icon="ticket" type="long" color="tw-bg-[#E6F5F9]" />
      </div>
      <div class="tw-w-[240px] tw-flex-none">
        <part-card-summary
          text="Scheduled Broadcast"
          :value="summaryCounters.broadcast ?? '...'"
          icon="send_up"
          type="long"
          color="tw-bg-[#FFEFE2]"
        />
      </div>
      <div class="tw-flex tw-w-[240px] tw-flex-none tw-flex-col tw-gap-3">
        <part-card-summary-dark text="Template" :value="summaryCounters.template ?? '...'" icon="message_text" />
        <part-card-summary-dark text="Contacts" :value="summaryCounters.contact ?? '...'" icon="people" />
      </div>
    </div>
  </div>
</template>
