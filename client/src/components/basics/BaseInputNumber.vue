<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const emits = defineEmits(['input'])
const props = defineProps({
  error: { type: String, default: null },
  outlined: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  dense: { type: Boolean, default: true },
  value: { type: [String, Number], default: null },
})

const model: any = ref(null)

watch(
  () => props.value,
  (value: any) => {
    model.value = value
  },
)

onMounted(() => {
  model.value = props.value || null
})
</script>

<template>
  <q-input
    v-model="model"
    :outlined="props.outlined"
    :dense="props.dense"
    :disable="props.disabled"
    :no-error-icon="true"
    :bottom-slots="true"
    :error="!!props.error"
    :bg-color="props.disabled ? 'grey-2' : 'white'"
    :borderless="props.disabled"
    class="tw-w-full"
    type="number"
    @update:model-value="emits('input', Number(model))"
  >
    <template #error>
      <div class="tw-flex tw-items-center tw-gap-1">
        <q-icon name="info_circle_bold" class="black-filter negative-filter" />
        <span class="tw-text-body-3 tw-text-[#FF0000]">{{ props.error }}</span>
      </div>
    </template>
  </q-input>
</template>
