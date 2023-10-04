<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'

const emits = defineEmits(['input'])
const props = defineProps({
  label: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  rounded: { type: Boolean, default: false },
  check: { type: Boolean, default: false },
})

watch(
  () => props.check,
  (value: any) => {
    model.value = value
  },
)

const model = ref(false)
const classNameOfCheckbox = computed(() => {
  let classText = props.rounded ? 'checkbox-rounded' : 'checkbox-square'
  classText = classText + ' ' + (props.disabled ? 'tw-border-[#D0D5DD]' : 'primary-filter')
  if (props.rounded && props.check) {
    classText += ' ' + 'primary-filter'
  }
  return classText
})

const onClicked = () => {
  model.value = !model.value
  emits('input', model.value)
}

onMounted(() => {
  model.value = props.check || false
})
</script>

<template>
  <div class="tw-flex tw-cursor-pointer tw-items-center">
    <div :class="classNameOfCheckbox" @click="onClicked">
      <q-icon v-if="props.check" name="check" :class="props.rounded ? 'black-filter white-filter' : 'black-filter primary-filter'" />
    </div>
    <span v-if="props.label" class="tw-ml-2 tw-text-body-2  tw-text-[#868686]">{{ props.label }}</span>
    <slot />
  </div>
</template>
