<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { minLength, regex, string, number, safeParse, toTrimmed } from 'valibot'
import { createNotify, createRequest } from '@/dependencies/methods/_method'
import { pick } from '@/dependencies/helpers/util-of-object'
import { sleep } from '@/dependencies/helpers/util-of-timer'
import BaseCheckbox from '@/components/basics/BaseCheckbox.vue'
import ComponentForm from '@/components/basics/ComponentForm.vue'

const $q = useQuasar()
const emits = defineEmits(['click', 'update:fetch'])
const props = defineProps({
  datas: { type: Object, default: () => {} },
  labels: { type: Array, default: () => [] },
  isOpen: { type: Boolean, default: false },
})
const isOpenSync: any = computed({
  get: () => props.isOpen,
  set: (value: any) => emits('click', value),
})
const titleName: any = computed(() => (modeEditor.value === 'new' ? 'New Due' : 'Edit Due'))
const optionsCategory = ['Whatsapp', 'Telegram', 'Facebook']
const models: any = ref({ type: '', total: 0, description: '' })
const errors: any = ref({ type: '', total: 0, description: '' })
const modeEditor: any = ref('new')
const schemaRules: any = ref({})

watch(
  () => props.datas,
  (value) => {
    if (!value || Object.keys(value).length === 0) {
      onInitNew()
    } else {
      onInitEdit()
    }
  },
)

const handleSubmit = async () => {
  Object.entries(models.value)?.forEach((item: any) => {
    const key = item[0] || null
    if (!key || !schemaRules.value[key]) return false
    const result: any = safeParse(schemaRules.value[key], models.value[key])
    errors.value[key] = result.error ? result.error?.message : null
  })
  const errorCount = Object.entries(errors.value)?.reduce((total: number, item: any) => {
    return total + (item.length > 1 && item[1] ? 1 : 0)
  }, 0)
  if (errorCount > 0) {
    createNotify($q, 'Error Validation', 'error')
  } else {
    const payloads: any = {}

    if (models.value?.type) payloads.type = models.value.type
    if (models.value?.total) payloads.total = models.value.total
    if (models.value?.description) payloads.description = models.value.description


    let resultContact = null
    if (modeEditor.value === 'new') {
      resultContact = await createRequest('dues', 'post', payloads)
      if (resultContact.statusCode.value === 201 && resultContact.data?.value) {
        createNotify($q, 'Successfull add due', 'success')
        emits('update:fetch')
      } else {
        createNotify($q, 'Error add due', 'error')
      }
    } else {
      resultContact = await createRequest('dues', 'put', payloads, { sub_path: models.value.id })
      if (resultContact.statusCode.value === 201 && resultContact.data?.value) {
        createNotify($q, 'Successfull update due', 'success')
        emits('update:fetch')
      } else {
        createNotify($q, 'Error update due', 'error')
      }
    }
    emits('click', false)
  }
}

const onInitNew = () => {
  models.value = {}
  models.value['check1'] = true
  modeEditor.value = 'new'
}

const onInitEdit = async () => {
  models.value = {}
  await sleep(100)
  modeEditor.value = 'update'
  const modelsOutsides = props.datas
  if (modelsOutsides.id) models.value.id = modelsOutsides.id
  if (modelsOutsides.type) models.value.type = modelsOutsides.type
  if (modelsOutsides.total) models.value.total = modelsOutsides.total
  if (modelsOutsides.description) models.value.description = modelsOutsides.description

}

onMounted(() => {
  models.value['check1'] = true
  schemaRules.value = {
    type: string('Please enter your name', [toTrimmed(), minLength(3, 'Name must have 3 characters or more')]),
    total: number('Please enter your total'),
    description: string('Please enter your city', [toTrimmed(), minLength(1, 'Please enter your city')]),
  }
  schemaRules.value = pick(schemaRules.value, ['type', 'description'])
})
</script>

<template>
  <q-dialog v-model="isOpenSync" position="right" full-height class="tw-relative">
    <q-card class="half-rounded tw-min-w-[450px] tw-p-4">
      <q-card-section>
        <div class="tw-flex tw-justify-between">
          <span class="tw-text-[16px] tw-font-semibold">{{ titleName }}</span>
          <q-icon name="close" size="20px" class="tw-cursor-pointer" @click="emits('click', false)"></q-icon>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-none tw-mt-4 tw-flex tw-h-[calc(100vh-130px)] tw-flex-col">
        <div class="tw-mt-4 tw-flex-auto tw-flex-col">
          <component-form
            :bindings="{ title: 'Nama', value: models.type }"
            :error="errors.type || ''"
            type-input="text"
            @input="(value) => (models.type = value)"
          />
          <component-form
            :bindings="{ title: 'Total', value: models.total }"
            :error="errors.total || ''"
            type-input="number"
            @input="(value) => (models.total = value)"
          />
          <div class="tw-my-2 tw-flex tw-flex-col">
            <span class="tw-mt-2 tw-text-body-2 tw-font-semibold">Deskripsi</span>
            <q-input v-model="models.description" outlined dense type="textarea" />
          </div>
        </div>
        <div class="tw-mt-4 tw-flex tw-flex-none tw-justify-between">
          <q-btn v-close-popup outline color="primary" class="tw-w-[120px]">
            <span class="tw-text-[14px] tw-font-normal tw-capitalize tw-text-primary-500">Reset</span>
          </q-btn>
          <q-btn color="primary" class="tw-w-[120px]" @click="handleSubmit">
            <span class="tw-text-[14px] tw-font-normal tw-capitalize tw-text-white">Save</span>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
