<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { email, string, safeParse, toTrimmed } from 'valibot'
import { sleep } from '@/dependencies/helpers/util-of-timer'
import { getTranslate, createNotify } from '@/dependencies/methods/_method'
import ComponentForm from '../basics/ComponentForm.vue'

const $q = useQuasar()
const router = useRouter()
const title: any = ref(null)
const titleChild: any = ref(null)
const prefix = 'forgot_password'
const models: any = ref({ email: null })
const errors: any = ref({ email: null })
const schemaRules: any = ref({})

const initialized = async () => {
  await sleep(100)
  schemaRules.value = {
    email: string(getTranslate(`${prefix}.errors.email_empty`), [toTrimmed(), email(getTranslate(`${prefix}.errors.email_bad`))]),
  }
  title.value = getTranslate(`${prefix}.contents.title`)
  titleChild.value = getTranslate(`${prefix}.contents.title_description`)
}

const handleSubmit = async () => {
  Object.entries(models.value)?.forEach((item: any) => {
    const key = item[0] || null
    if (!key) return false
    const result: any = safeParse(schemaRules.value[key], models.value[key])
    errors.value[key] = result.error ? result.error?.message : null
  })
  const errorCount = Object.entries(errors.value)?.reduce((total: number, item: any) => {
    return total + (item.length > 1 && item[1] ? 1 : 0)
  }, 0)
  if (errorCount > 0) {
    createNotify($q, getTranslate(`${prefix}.errors.email_bad`), 'error')
  }
}

onMounted(async () => {
  await initialized()
})
</script>

<template>
  <div class="tw-mt-[100px] tw-flex tw-flex-col tw-gap-4">
    <span class="tw-text-[33px] tw-font-semibold">{{ title }}</span>
    <span class="tw-text-body-2 tw-font-normal">{{ titleChild }}</span>
    <component-form
      :bindings="{ title: getTranslate(`${prefix}.fields.email`) }"
      :error="errors.email || ''"
      type-input="text"
      @input="(value) => (models.email = value)"
    />
    <q-btn color="primary" class="tw-h-[44px] tw-w-full" @click="handleSubmit">
      <span class="tw-capitalize tw-text-white">{{ getTranslate(`${prefix}.contents.button_title`) }}</span>
    </q-btn>
    <div class="tw-flex tw-justify-center tw-gap-1">
      <span class="tw-text-body-2 tw-font-light">{{ getTranslate(`auth_globals.back_to`) }}</span>
      <span class="tw-cursor-pointer tw-text-body-2 tw-font-semibold" @click="router.push('/login')">
        {{ getTranslate(`auth_globals.signin`) }}
      </span>
    </div>
  </div>
</template>
