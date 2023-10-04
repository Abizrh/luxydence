<script setup lang="ts">
import { ref } from 'vue'

const textPrimary = ref('Luxydence')
const textSecondary = ref('memudahkan Anda untuk mengelola residen / lingkungan di sekitar anda')
const textLogo = 'luxydence'
</script>

<template>
  <div class="tw-flex tw-flex-row tw-justify-center ">
    <!-- <div class="tw-flex tw-h-screen tw-w-[50%] tw-justify-start tw-bg-primary-300">
      <div class="tw-mx-[25px] tw-mt-[35px] tw-p-4">
        <span class="tw-mr-2 tw-text-[33px] tw-font-semibold primary-filter">{{ textPrimary }}</span>
        <span class="tw-text-[33px] tw-font-semibold">{{ textSecondary }}</span>
        <div class="tw-mt-2 tw-flex tw-justify-center">
          <q-img src="/cores/luxydence.png" alt="maxchat-network" fit="cover" class="tw-w-full" />
        </div>
      </div>
    </div> -->
    <div class="tw-flex tw-h-screen tw-w-[50%] tw-flex-col tw-bg-white tw-p-5  ">
      <div class="tw-flex tw-w-full tw-justify-center tw-items-center">
        <div class="tw-h-[40px] tw-mt-5 tw-flex tw-justify-center tw-text-center tw-items-center ">
          <q-img src="/cores/luxydence.png" alt="maxchat-logo" fit="fill" class="tw-h-[28px] tw-w-[62px]" />
          <span class="tw-bottom-[5px] tw-text-[30px] tw-font-semibold">{{ textLogo }}</span>
        </div>
      </div>
      <div class="tw-flew tw-mx-auto tw-w-full tw-max-w-[400px]">
        <slot />
      </div>
    </div>
  </div>
</template>
