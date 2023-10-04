<script setup lang="ts">
import InputText from './BaseInputText.vue'
import InputNumber from './BaseInputNumber.vue'
import InputPassword from './BaseInputPassword.vue'

const emits = defineEmits(['input'])
const props = defineProps({
  bindings: { type: Object, default: null },
  error: { type: String, default: null },
  typeInput: { type: String, default: 'text' },
})
</script>

<template>
  <div class="tw-flex tw-flex-col">
    <span v-if="props.bindings?.title" class="tw-text-body-2 tw-font-semibold">{{ props.bindings.title }}</span>
    <input-text v-if="['text'].includes(props.typeInput)" v-bind="props.bindings" :error="error" @input="emits('input', $event)" />
    <input-number v-if="['number'].includes(props.typeInput)" v-bind="props.bindings" :error="error" @input="emits('input', $event)" />
    <input-password v-else-if="['password'].includes(props.typeInput)" v-bind="props.bindings" :error="error" @input="emits('input', $event)" />
    <div v-else>
      <slot />
    </div>
  </div>
</template>
