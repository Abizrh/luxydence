<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Switch } from '@headlessui/vue'

const emits = defineEmits(['input'])
const props = defineProps({
  on: { type: Boolean, default: false },
})
const model: any = ref(false)

watch(
  () => props.on,
  (value) => (model.value = value),
)

onMounted(() => {
  model.value = props.on
})
</script>

<template>
  <Switch
    v-model="model"
    class="switch-body"
    :class="model ? 'switch-body-active' : 'switch-body-normal'"
    @update:model-value="emits('input', model)"
  >
    <span class="switch-child" :class="model ? 'switch-child-active' : 'switch-child-normal'" />
  </Switch>
</template>
