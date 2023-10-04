<template>
  <div class="tw-flex tw-h-screen tw-w-full tw-items-center tw-justify-center tw-bg-secondary-500">
    <q-card class="tw-relative tw-h-[576px] tw-w-[629px] tw-rounded-[20px]">
      <q-card-section class="tw-flex tw-h-[500px] tw-w-[600px] tw-flex-col">
        <div class="tw-relative tw-h-[40px] tw-flex-none">
          <q-img src="/cores/maxchat-logo.png" alt="maxchat-logo" fit="fill" class="tw-h-[28px] tw-w-[62px]" />
          <span class="tw-absolute tw-bottom-[-10px] tw-text-[30px] tw-font-semibold">maxchat</span>
        </div>
        <div class="tw-mb-8 tw-mt-4 tw-flex tw-flex-auto tw-flex-col tw-items-center tw-justify-center tw-gap-2">
          <q-img src="/cores/email-notif.png" alt="email" fit="cover" class="tw-h-[214px] tw-w-[216px]" />
          <span class="tw-mt-2 tw-text-[33px] tw-font-semibold tw-leading-[41px] tw-text-slate-500">Verify Your Email Address</span>
          <div class="tw-w-[477px] tw-text-center">
            <span class="tw-text-[14px] tw-font-light">
              We just need to verify your email address before you can access all the features. We’ve sent a verification link to the email address
              you provided us -
            </span>
            <span class="tw-text-[14px] tw-font-semibold tw-text-primary-500"> Your Email </span>
          </div>
        </div>
        <div class="tw-flex tw-justify-between tw-p-8">
          <span class="tw-w-[272px] tw-flex-none tw-whitespace-pre-wrap tw-text-[8px] tw-font-light">
            <b>Note:</b> If you haven’t received the email within a few minutes, please check your spam folder. If it’s still not there, please try to
            contact our support team for assistance.
          </span>
          <div class="tw-flex tw-flex-none tw-cursor-pointer tw-gap-1">
            <q-icon name="headphone" size="20px" class="black-filter primary-filter tw-mr-1"></q-icon>
            <span class="tw-text-[12px] tw-font-normal tw-underline">Contact Support</span>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
