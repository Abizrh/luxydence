<script setup lang="ts">
import { computed } from 'vue'

const emits = defineEmits(['click'])
const props = defineProps({
  isOpen: { type: Boolean, default: false },
})
const align = 'right'

const isOpenSync: any = computed({
  get: () => props.isOpen,
  set: (value: any) => emits('click', { type: 'open', value }),
})
</script>

<template>
  <q-dialog v-model="isOpenSync">
    <q-card class="tw-min-w-[450px] tw-p-4">
      <q-card-section>
        <div class="text-h6 tw-font-semibold">Remove</div>
      </q-card-section>
      <q-card-section class="q-pt-none">Do you want to remove this?</q-card-section>
      <q-card-actions :align="align" class="tw-grid tw-grid-cols-2">
        <q-btn v-close-popup label="Cancel" outline color="primary" @click="emits('click', { type: 'confirm', value: false })" />
        <q-btn v-close-popup label="Yes" color="primary" @click="emits('click', { type: 'confirm', value: true })" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
