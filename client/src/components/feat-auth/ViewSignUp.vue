<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { email, minLength, regex, string, safeParse, toTrimmed } from 'valibot'
import { sleep } from '@/dependencies/helpers/util-of-timer'
import { getTranslate, createNotify } from '@/dependencies/methods/_method'
import ComponentForm from '@/components/basics/ComponentForm.vue'

const $q = useQuasar()
const router = useRouter()
const title: any = ref(null)
const titleChild: any = ref(null)
const prefix = 'signup'
const models: any = ref({ company: null, email: null, phone_number: null, password: null, confirm_password: null })
const errors: any = ref({ company: null, email: null, phone_number: null, password: null, confirm_password: null })
const schemaRules: any = ref({})

const initialized = async () => {
  await sleep(100)
  schemaRules.value = {
    company: string(getTranslate(`${prefix}.errors.company_empty`), [toTrimmed(), minLength(3, getTranslate(`${prefix}.errors.company_min_3`))]),
    email: string(getTranslate(`${prefix}.errors.email_empty`), [toTrimmed(), email(getTranslate(`${prefix}.errors.email_bad`))]),
    phone_number: string(getTranslate(`${prefix}.errors.phone_empty`), [
      toTrimmed(),
      regex(/[0-9]{4,}/i, getTranslate(`${prefix}.errors.phone_is_number`)),
    ]),
    password: string(getTranslate(`${prefix}.errors.password_empty`), [
      toTrimmed(),
      minLength(1, getTranslate(`${prefix}.errors.password_min_1`)),
      minLength(8, getTranslate(`${prefix}.errors.password_min_8`)),
    ]),
    confirm_password: string(getTranslate(`${prefix}.errors.confirm_password_empty`), [toTrimmed()]),
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
  if (!errors.value['password'] && models.value['password'] !== models.value['confirm_password']) {
    errors.value['password'] = getTranslate(`${prefix}.errors.password_notsame_confirm`)
  }
  const errorCount = Object.entries(errors.value)?.reduce((total: number, item: any) => {
    return total + (item.length > 1 && item[1] ? 1 : 0)
  }, 0)
  if (errorCount > 0) {
    createNotify($q, getTranslate(`${prefix}.errors.notify`), 'error')
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
      :bindings="{ title: getTranslate(`${prefix}.fields.company`) }"
      :error="errors.company || ''"
      type-input="text"
      @input="(value) => (models.company = value)"
    />
    <component-form
      :bindings="{ title: getTranslate(`${prefix}.fields.email`) }"
      :error="errors.email || ''"
      type-input="text"
      @input="(value) => (models.email = value)"
    />
    <component-form
      :bindings="{ title: getTranslate(`${prefix}.fields.phone_number`) }"
      :error="errors.phone_number || ''"
      type-input="text"
      @input="(value) => (models.phone_number = value)"
    />
    <component-form
      :bindings="{ title: getTranslate(`${prefix}.fields.password`) }"
      :error="errors.password || ''"
      type-input="password"
      @input="(value) => (models.password = value)"
    />
    <component-form
      :bindings="{ title: getTranslate(`${prefix}.fields.confirm_password`) }"
      :error="errors.confirm_password || ''"
      type-input="password"
      @input="(value) => (models.confirm_password = value)"
    />
    <q-btn color="primary" class="tw-h-[44px] tw-w-full" @click="handleSubmit">
      <span class="tw-capitalize tw-text-white">{{ getTranslate(`${prefix}.contents.button_title`) }}</span>
    </q-btn>
    <div class="tw-flex tw-justify-center tw-gap-1">
      <span class="tw-text-body-2 tw-font-light">{{ getTranslate(`auth_globals.have_account`) }}</span>
      <span class="tw-cursor-pointer tw-text-body-2 tw-font-semibold tw-underline" @click="router.push('/login')">
        {{ getTranslate(`auth_globals.signin`) }}
      </span>
    </div>
  </div>
</template>
