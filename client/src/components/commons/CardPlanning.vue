<script setup lang="ts">
const props = defineProps({
  items: { type: Array as any, default: () => [] as any },
})
</script>

<template>
  <q-card class="tw-rounded-[15px] tw-border tw-p-4 tw-shadow-lg">
    <q-card-section>
      <div class="tw-mb-4">
        <slot name="header" />
      </div>
      <span class="tw-text-[12px] tw-font-normal tw-text-[#A9A9AA]">What You’ll Get</span>
      <div class="tw-mb-4 tw-mt-2 tw-flex tw-flex-col tw-gap-1">
        <div v-for="(item, i) in props.items" :key="i" class="tw-flex tw-items-center tw-gap-2">
          <div class="checkbox-rounded-medium tw-bg-black">
            <q-icon name="check" size="18px" class="black-filter white-filter" />
          </div>
          <span class="tw-text-body-3 tw-font-normal tw-text-[#35353F]">{{ item.text }}</span>
        </div>
      </div>
      <hr class="tw-mb-4 tw-border tw-border-dashed tw-border-[#A9A9AA]" />
      <div class="tw-mb-4">
        <slot name="footer" />
      </div>
      <q-btn color="primary" class="tw-h-[44px] tw-w-full">
        <span class="tw-capitalize tw-text-white">Choose</span>
      </q-btn>
    </q-card-section>
  </q-card>
</template>
