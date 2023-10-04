<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { minLength, regex, string, number, safeParse, toTrimmed } from 'valibot'
import { createNotify, createRequest } from '@/dependencies/methods/_method'
import { pick } from '@/dependencies/helpers/util-of-object'
import { sleep } from '@/dependencies/helpers/util-of-timer'
import BaseCheckbox from '@/components/basics/BaseCheckbox.vue'
import ComponentForm from '@/components/basics/ComponentForm.vue'

interface OccupantListChild {
	nik: string
	name: string
}

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
const titleName: any = computed(() => (modeEditor.value === 'new' ? 'Tambah Rumah' : 'Update Rumah'))
const optionsStatus = [
	{ label: 'Kosong', value: 'kosong' },
	{ label: 'Tetap', value: 'tetap' },
	{ label: 'Kontrak', value: 'contract' },
]
const models: any = ref({ house_number: 0, status: '', occupant_id: null, owner: '' })
const families = ref<OccupantListChild[]>()
const errors: any = ref({ house_number: 0, status: '', occupant_id: null, owner: '' })
const modeEditor: any = ref('new')
const schemaRules: any = ref({})
const optionsOccupant: any = ref([])

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

		if (models.value?.status) payloads.status = models.value.status.value
		if (models.value?.house_number) payloads.house_number = models.value.house_number
		if (models.value?.owner) payloads.owner = models.value.owner
		if (models.value?.occupant_id) payloads.occupant_id = models.value.occupant_id.value

		let resultContact = null
		if (modeEditor.value === 'new') {
			resultContact = await createRequest('houses', 'post', payloads)
			if (resultContact.statusCode.value === 201 && resultContact.data?.value) {
				createNotify($q, 'Successfull add house', 'success')
				emits('update:fetch')
			} else {
				createNotify($q, 'Error add house', 'error')
			}
		} else {
			resultContact = await createRequest('houses', 'put', payloads, { sub_path: models.value.id })
			if (resultContact.statusCode.value === 201 && resultContact.data?.value) {
				createNotify($q, 'Successfull update house', 'success')
				emits('update:fetch')
			} else {
				createNotify($q, 'Error update house', 'error')
			}
		}
		emits('click', false)
	}
}

const getOccupantOpt = async () => {
	const resultContactList = await createRequest('occupants', 'get')
	const { data } = resultContactList.data.value || {}
	optionsOccupant.value = data.map((oc: any) => ({
		label: oc.responsible,
		value: Number(oc.id),
	}))
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
	if (modelsOutsides.house_number) models.value.house_number = modelsOutsides.house_number
	if (modelsOutsides.status) models.value.status = modelsOutsides.status
	if (modelsOutsides.owner) models.value.owner = modelsOutsides.owner
	if (modelsOutsides.occupant_id) models.value.occupant_id = modelsOutsides?.Occupant?.responsible
}

onMounted(async () => {
	await getOccupantOpt()
	models.value['check1'] = true
	schemaRules.value = {
		status: string('Please enter your responsible name', [toTrimmed(), minLength(3, 'Owner name must have 3 characters or more')]),
		// total: number('Please enter your total'),
		// description: string('Please enter your city', [toTrimmed(), minLength(1, 'Please enter your city')]),
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
						:bindings="{ title: 'Pemilik Rumah', value: models.owner }"
						:error="errors.owner || ''"
						type-input="text"
						@input="(value) => (models.owner = value)"
					/>
					<component-form
						:bindings="{ title: 'Nomor Rumah', value: models.house_number }"
						:error="errors.house_number || ''"
						type-input="text"
						@input="(value) => (models.house_number = value)"
					/>
					<span class="tw-text-body-2 tw-font-semibold">Status Rumah</span>
					<q-select v-model="models.status" :options="optionsStatus" outlined hide-dropdown-icon input-debounce="0" dense class="tw-mb-5">
						<template #append>
							<q-icon name="arrow_down" size="20px" class="black-filter primary-filter"></q-icon>
						</template>
					</q-select>
					<div v-if="models?.status?.value !== 'kosong'">
						<span class="tw-text-body-2 tw-font-semibold">Penghuni</span>
						<q-select v-model="models.occupant_id" :options="optionsOccupant" outlined hide-dropdown-icon input-debounce="0" dense class="tw-mb-5">
							<template #append>
								<q-icon name="arrow_down" size="20px" class="black-filter primary-filter"></q-icon>
							</template>
						</q-select>
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
