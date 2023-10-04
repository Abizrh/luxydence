<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { email, minLength, string, safeParse, toTrimmed } from 'valibot'
import { sleep } from '@/dependencies/helpers/util-of-timer'
import { getTranslate, createNotify } from '@/dependencies/methods/_method'
import { doLogin } from '@/dependencies/methods/auth-method'
import ComponentForm from '@/components/basics/ComponentForm.vue'

const $q = useQuasar()
const router = useRouter()
const title: any = ref(null)
const titleChild: any = ref(null)
const prefix = 'signin'
const models: any = ref({ email: '', password: '' })
const errors: any = ref({ email: null, password: null })
const loading = ref(false)
const schemaRules: any = ref({})

const initialized = async () => {
  await sleep(100)
  schemaRules.value = {
    email: string(getTranslate(`${prefix}.errors.email_empty`), [toTrimmed(), email(getTranslate(`${prefix}.errors.email_bad`))]),
    password: string(getTranslate(`${prefix}.errors.password_empty`), [toTrimmed(), minLength(1, getTranslate(`${prefix}.errors.password_min_1`))]),
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
    createNotify($q, getTranslate(`${prefix}.errors.notify`), 'error')
  } else {
    loading.value = true
    const { email: emailValue, password: passwordValue } = models.value
    const result = await doLogin({ email: emailValue, password: passwordValue })
    if (result?.isSuccess) {
      createNotify($q, getTranslate(`${prefix}.contents.success`), 'success')
      await sleep(100)
      router.push('/')
    } else {
      const errorMessage = getTranslate(`${prefix}.errors.notify`) || result?.response
      createNotify($q, errorMessage, 'error')
    }
    loading.value = false
  }
}

onMounted(async () => {
  await initialized()
})
</script>

<template>
  <div class="tw-mt-[70px] tw-flex tw-flex-col tw-gap-4">
    <span class="tw-text-[33px] tw-font-semibold">{{ title }}</span>
    <span class="tw-text-body-2 tw-font-normal">{{ titleChild }}</span>
    <component-form
      :bindings="{ title: getTranslate(`${prefix}.fields.email`) }"
      :error="errors.email || ''"
      type-input="text"
      @input="(value) => (models.email = value)"
    />
    <component-form
      :bindings="{ title: getTranslate(`${prefix}.fields.password`) }"
      :error="errors.password || ''"
      type-input="password"
      @input="(value) => (models.password = value)"
    />
    <div class="tw-flex tw-justify-end">
      <span class="tw-cursor-pointer tw-text-body-2 tw-font-light" @click="router.push('/forgot')">{{ getTranslate(`auth_globals.forgot`) }}</span>
    </div>
    <q-btn :loading="loading" :color="!loading ? 'primary' : 'grey-5'" class="tw-h-[44px] tw-w-full" @click="handleSubmit">
      <span class="tw-capitalize tw-text-white">{{ getTranslate(`${prefix}.contents.button_title`) }}</span>
    </q-btn>
    <div class="tw-flex tw-justify-center tw-gap-1">
      <span class="tw-text-body-2 tw-font-light">{{ getTranslate(`auth_globals.not_have_account`) }}</span>
      <span class="tw-cursor-pointer tw-text-body-2 tw-font-semibold tw-underline" @click="router.push('/register')">
        {{ getTranslate(`auth_globals.signup`) }}
      </span>
    </div>
  </div>
</template>
