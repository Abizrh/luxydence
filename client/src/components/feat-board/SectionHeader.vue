<script setup lang="ts">
import { ref } from 'vue'
import PartMenu from './PartMenu.vue'

const textGreet = 'Welcome back'
const textBalance = 'Current balance'
const userNameValue = 'Ajeng Sriwedari'
const balanceValue = '0'
const showMenu = ref(false)
</script>

<template>
  <div class="tw-flex tw-basis-1/3 tw-items-center tw-justify-start tw-gap-1">
    <span class="tw-text-[16px] tw-font-semibold tw-text-black">{{ textGreet }},</span>
    <span class="tw-text-[16px] tw-font-semibold tw-text-primary-500">{{ userNameValue }}</span>
  </div>
  <div class="tw-flex tw-basis-1/3 tw-items-center tw-justify-center tw-gap-2">
    <span class="tw-text-body-2 tw-font-light tw-text-black">{{ textBalance }}</span>
    <span class="tw-text-[16px] tw-font-semibold tw-text-black">Rp. {{ balanceValue }}</span>
  </div>
  <div class="tw-flex tw-basis-1/3 tw-items-center tw-justify-end tw-gap-5">
    <div class="tw-flex">
      <q-btn round outline>
        <q-icon name="notification" size="20px" />
        <q-badge floating rounded class="tw-bg-primary-500" />
      </q-btn>
    </div>
    <div class="tw-flex tw-items-center tw-gap-2">
      <q-btn round color="black">
        <q-icon name="user" size="25px" class="black-filter white-filter" />
      </q-btn>
      <span class="tw-text-body-2 tw-font-medium tw-text-[#939393]">{{ userNameValue }}</span>
      <q-btn outline @click="showMenu = !showMenu">
        <q-icon :name="!showMenu ? 'arrow_down' : 'arrow_up'" size="20px" class="black-filter primary-filter" />
        <part-menu />
      </q-btn>
    </div>
  </div>
</template>
