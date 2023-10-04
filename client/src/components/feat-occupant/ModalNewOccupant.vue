<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { minLength, regex, string, number, safeParse, toTrimmed } from 'valibot'
import { createNotify, createRequest } from '@/dependencies/methods/_method'
import { pick } from '@/dependencies/helpers/util-of-object'
import { sleep } from '@/dependencies/helpers/util-of-timer'
import BaseCheckbox from '@/components/basics/BaseCheckbox.vue'
import ComponentForm from '@/components/basics/ComponentForm.vue'

interface OccupantList {
	nik: string
	name: string
}

const columns = [
	{ name: 'nik', align: 'center', label: 'NIK', field: 'nik' },
	{ name: 'name', label: 'Nama', field: 'name', align: 'center' },
]

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
const titleName: any = computed(() => (modeEditor.value === 'new' ? 'Penghuni Baru' : 'Penghuni Baru'))
const optionsCategory = ['Whatsapp', 'Telegram', 'Facebook']
const models: any = ref({ responsible: '', families: [] })
const occupantModels: any = ref({ nik: '', name: '' })
const families = ref<OccupantList[]>([])
const errors: any = ref({ responsible: '' })
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

		if (models.value?.responsible) payloads.responsible = models.value.responsible
		if (models.value?.families) payloads.families = models.value.families
		// if (models.value?.description) payloads.description = models.value.description

		let resultContact = null
		if (modeEditor.value === 'new') {
			resultContact = await createRequest('occupants', 'post', payloads)
			if (resultContact.statusCode.value === 201 && resultContact.data?.value) {
				createNotify($q, 'Successfull add due', 'success')
				emits('update:fetch')
        families.value = []
			} else {
				createNotify($q, 'Error add due', 'error')
			}
		} else {
			resultContact = await createRequest('occupants', 'put', payloads, { sub_path: models.value.id })
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

const handleOccupantList = () => {
  families.value.push(occupantModels.value)
  models.value.families = families.value
  occupantModels.value = {}
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
  console.log('modelsOutsides', modelsOutsides)
	if (modelsOutsides.id) models.value.id = modelsOutsides.id
	if (modelsOutsides.responsible) models.value.responsible = modelsOutsides.responsible
	if (modelsOutsides.families) families.value = JSON.parse(modelsOutsides.families)
}

const onClosed = () => {
  families.value = []
  emits('click', false)
}

onMounted(() => {
	models.value['check1'] = true
	schemaRules.value = {
		responsible: string('Please enter your responsible name', [toTrimmed(), minLength(3, 'Owner name must have 3 characters or more')]),
		// total: number('Please enter your total'),
		// description: string('Please enter your city', [toTrimmed(), minLength(1, 'Please enter your city')]),
	}
	schemaRules.value = pick(schemaRules.value, ['type', 'description'])
})
</script>

<template>
	<q-dialog v-model="isOpenSync" persistent position="right" full-height class="tw-relative">
		<q-card class="half-rounded tw-min-w-[600px] tw-p-4">
			<q-card-section>
				<div class="tw-flex tw-justify-between">
					<span class="tw-text-[16px] tw-font-semibold">{{ titleName }}</span>
					<q-icon name="close" size="20px" class="tw-cursor-pointer" @click="onClosed"></q-icon>
				</div>
			</q-card-section>
			<q-separator />
			<q-card-section class="q-pt-none tw-mt-4 tw-flex tw-h-[calc(100vh-130px)] tw-flex-col">
				<div class="tw-mt-4 tw-flex-auto tw-flex-col">
					<span class="tw-text-[16px] tw-font-light">
						Pemilik
						<q-separator />
					</span>
					<component-form
						class="tw-mt-5"
						:bindings="{ title: 'Nama', value: models.responsible }"
						:error="errors.responsible || ''"
						type-input="text"
						@input="(value) => (models.responsible = value)"
					/>
					<span class="tw-text-[16px] tw-font-light">
						Penghuni
						<q-separator />
					</span>
					<component-form
						class="tw-mt-5"
						:bindings="{ title: 'NIK', value: occupantModels.nik }"
						:error="errors.total || ''"
						type-input="text"
						@input="(value) => (occupantModels.nik = value)"
					/>
					<component-form
						:bindings="{ title: 'Nama', value: occupantModels.name }"
						:error="errors.total || ''"
						type-input="text"
						@input="(value) => (occupantModels.name = value)"
					/>
					<div class="tw-my-2 tw-flex tw-justify-center tw-text-center">
						<q-btn color="primary" class="tw-w-[300px]" @click="handleOccupantList">
							<span class="tw-text-[14px] tw-font-normal tw-capitalize tw-text-white">Tambahkan ke List Penghuni</span>
						</q-btn>
					</div>
				</div>
				<div class="tw-my-2">
					<q-table title="List Penghuni" hide-bottom :rows="families" :columns="columns" row-key="name"> </q-table>
				</div>
				<div class="tw-my-7 tw-pb-10 tw-flex tw-flex-none tw-justify-between">
					<q-btn v-close-popup outline color="primary" class="tw-w-[120px]" @click="onClosed">
						<span class="tw-text-[14px] tw-font-normal tw-capitalize tw-text-primary-500">Reset</span>
					</q-btn>
					<q-btn color="primary" class="tw-w-[120px]" :disable="families.length <= 0"  @click="handleSubmit">
						<span class="tw-text-[14px] tw-font-normal tw-capitalize tw-text-white">Save</span>
					</q-btn>
				</div>
			</q-card-section>
		</q-card>
	</q-dialog>
</template>
