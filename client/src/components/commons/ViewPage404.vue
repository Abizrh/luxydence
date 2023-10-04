<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="tw-flex tw-h-screen tw-w-full tw-items-center tw-justify-center tw-bg-secondary-400">
    <q-card class="tw-relative tw-h-[576px] tw-w-[629px] tw-rounded-[20px]">
      <q-card-section class="tw-mx-[20px] tw-flex tw-w-[300px] tw-flex-col tw-p-2">
        <span class="tw-text-[150px] tw-font-semibold tw-leading-[189px] tw-text-slate-500">404</span>
        <span class="tw-mb-4 tw-text-[24px] tw-font-semibold tw-leading-[30px] tw-text-slate-500">Oops, Something’s Not Right.</span>
        <span class="tw-text-[12px] tw-font-light tw-leading-[20px] tw-text-slate-500">
          We suggest you go to dashboard while we fixing the problem :)
        </span>
        <div class="tw-mt-4">
          <q-btn color="primary" class="tw-h-[44px] tw-w-[185px]" @click="router.push({ path: '/' })">
            <span class="tw-capitalize tw-text-white">Goto Dashboard</span>
          </q-btn>
        </div>
      </q-card-section>
      <q-img src="/cores/404.png" alt="404" fit="cover" class="tw-absolute tw-bottom-0 tw-right-0 tw-h-[380px] tw-w-[425px]" />
    </q-card>
  </div>
</template>
