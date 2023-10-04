<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import BaseRadio from './BaseRadio.vue'

const emits = defineEmits(['input'])
const props = defineProps({
  lists: { type: Array as any, default: (): any => [] },
  modelValue: { type: [String, Number], default: null },
})

const model: any = ref(null)

watch(
  () => model.value,
  (value) => {
    emits('input', value)
  },
)

onMounted(() => {
  if (props.modelValue) model.value = props.modelValue
})
</script>

<template>
  <base-radio
    v-for="item in props.lists"
    :key="item.id"
    :label="item.label"
    :content="item.value"
    :check="model === item.value"
    @input="(value) => (model = value)"
  >
  </base-radio>
</template>
