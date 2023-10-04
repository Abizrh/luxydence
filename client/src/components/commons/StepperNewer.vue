<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  steppers: { type: Array as any, default: () => [] },
  stepCurrent: { type: [Number, String], default: 0 },
})

watch(
  () => props.stepCurrent,
  (value) => {
    step.value = value
  },
)

const step: any = ref(1)

onMounted(() => {
  step.value = props.stepCurrent
})
</script>

<template>
  <div class="tw-flex tw-min-h-[calc(100vh-120px)] tw-w-full tw-flex-col tw-p-[5px]">
    <div v-for="item in props.steppers" :key="item.id" class="tw-relative tw-z-[100] tw-flex tw-flex-col tw-items-center tw-gap-2">
      <div
        class="tw-flex tw-h-[28px] tw-w-[28px] tw-items-center tw-justify-center tw-rounded-full"
        :class="step >= item.number ? 'tw-bg-primary-500' : 'tw-bg-neutral-500'"
      >
        <q-icon
          v-if="step >= item.number"
          :name="step > item.number ? 'check' : 'edit_text'"
          size="16px"
          :class="step >= item.number ? 'black-filter white-filter' : ''"
        ></q-icon>
      </div>
      <span class="tw-text-[14px]" :class="step >= item.number ? 'tw-font-semibold tw-text-black' : 'tw-font-normal tw-text-neutral-500'">
        {{ item.text }}
      </span>
    </div>
    <q-separator class="tw-absolute tw-left-[92px] tw-top-[62.5px] tw-z-[10] tw-w-[90%] tw-bg-[#E0E0E0]" />
  </div>
</template>
