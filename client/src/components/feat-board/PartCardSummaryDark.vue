<script setup lang="ts">
const props = defineProps({
  text: { type: String, default: null },
  value: { type: [String, Number], default: 0 },
  icon: { type: String, default: 'message' },
})

const textDetail = 'See detail'
</script>

<template>
  <div class="tw-flex tw-h-[114px] tw-w-full tw-flex-col tw-rounded-[12px] tw-bg-[#292929] tw-p-3 tw-shadow-sm">
    <div class="tw-flex tw-items-center tw-justify-between tw-gap-2">
      <span class="tw-text-body-1 tw-font-light tw-text-white">{{ props.text }}</span>
      <q-icon :name="props.icon" size="28px" class="black-filter primary-filter" />
    </div>
    <div class="tw-flex">
      <span class="tw-text-[36px] tw-font-semibold tw-text-white">{{ props.value }}</span>
    </div>
    <div class="tw-flex tw-items-center tw-justify-end">
      <span class="tw-cursor-pointer tw-text-body-2 tw-font-medium tw-text-white tw-underline">{{ textDetail }}</span>
    </div>
  </div>
</template>
