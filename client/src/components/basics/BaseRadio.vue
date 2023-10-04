<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['input'])
const props = defineProps({
  label: { type: String, default: null },
  content: { type: [Number, String], default: null },
  disabled: { type: Boolean, default: false },
  check: { type: Boolean, default: false },
})

const model = ref(false)

const onClicked = () => {
  model.value = !model.value
  emits('input', props.content)
}
</script>

<template>
  <div class="tw-flex tw-cursor-pointer tw-items-center" @click="onClicked">
    <div
      class="tw-flex tw-h-[20px] tw-w-[20px] tw-items-center tw-justify-center tw-rounded-[10px] tw-border"
      :class="props.disabled ? 'tw-border-[#D0D5DD]' : 'tw-border-primary-500'"
    >
      <div v-if="props.check" class="tw-h-[10px] tw-w-[10px] tw-rounded-full" :class="props.disabled ? 'tw-bg-[#D0D5DD]' : 'tw-bg-primary-500'"></div>
    </div>
    <span v-if="props.label" class="tw-ml-2 tw-text-body-2 tw-text-[#868686]">{{ props.label }}</span>
  </div>
</template>
