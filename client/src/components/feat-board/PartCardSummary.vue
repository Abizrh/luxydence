<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, default: null },
  value: { type: [String, Number], default: 0 },
  icon: { type: String, default: 'message' },
  color: { type: String, default: 'tw-bg-slate-300' },
  type: { type: String, default: 'small' },
})

const textDetail = 'See detail'
const className = computed(() => {
  const classLocals: any = []
  if (props.type === 'small') classLocals.push('tw-h-[120px]')
  if (props.type === 'long') {
    classLocals.push('tw-mx-auto')
    classLocals.push('tw-h-[242px]')
  }
  if (props.color) classLocals.push(props.color)
  return classLocals.join(' ')
})
</script>

<template>
  <div class="tw-flex tw-w-full tw-flex-col tw-rounded-[12px] tw-p-4 tw-shadow-sm" :class="className">
    <div class="tw-flex tw-flex-wrap tw-gap-2" :class="props.type === 'long' ? 'tw-mx-[40px] tw-mt-[60px] tw-flex-col' : 'tw-items-center'">
      <q-icon :name="props.icon" :size="props.type === 'small' ? '28px' : '35px'" class="black-filter primary-filter" />
      <span class="tw-text-[20px] tw-font-light tw-leading-[20px]">{{ props.text }}</span>
    </div>
    <div class="tw-flex" :class="props.type === 'small' ? 'tw-items-center tw-justify-center' : 'tw-mx-[40px]'">
      <span class="tw-text-[32px] tw-font-semibold tw-text-[#414141]">{{ props.value }}</span>
    </div>
    <div class="tw-flex tw-grow tw-items-center tw-justify-end">
      <span class="tw-cursor-pointer tw-text-body-2 tw-font-medium tw-underline">{{ textDetail }}</span>
    </div>
  </div>
</template>
