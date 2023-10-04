<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { createRequest } from '@/dependencies/methods/_method'
import { sleep } from '@/dependencies/helpers/util-of-timer'
import BaseCheckbox from '@/components/basics/BaseCheckbox.vue'
import ModalRemove from '@/components/commons/ModalRemove.vue'
import ComponentForm from '@/components/basics/ComponentForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { createNotify } from '../../dependencies/methods/_method'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const columns: any = ref([
	{ id: 'check', label: '', field: 'check', name: 'check', sortable: false, align: 'center' },
	{ id: 'type', label: 'Nama', field: 'type', name: 'type', sortable: false, align: 'center' },
	{ id: 'total', label: 'Total', field: 'total', name: 'total', sortable: false, align: 'center' },
	{ id: 'description', label: 'Deskripsi', field: 'description', name: 'description', sortable: false, align: 'center' },
])
const router = useRouter()
const route = useRoute()
const rows: any = ref([])
const rowsAll: any = ref([])
const checkAll: any = ref(false)
const checks: any = ref({})
const paginationOptions: any = ref({ rowsPerPage: 10 })
const totalCount = ref(0)
const isOpen = ref(false)
const isOpenRemove = ref(false)
const isConfirmRemove = ref(false)
const payment: any = ref({})
const models: any = ref({ total_paid: 0, paid_at: '2023/01/01', status: 'new' })

watch(
	() => checkAll.value,
	(value) => {
		for (const key in checks.value) {
			checks.value[key] = value
		}
	},
)

watch(
	() => isConfirmRemove.value,
	async (value) => {
		if (!value) return
		await onRemoveByCheck()
	},
)

const handleSubmit = async () => {
	const payloads: any = {}
    const newTotal = payment.value.total - models.value?.total_paid;

	if (models.value?.total_paid) payloads.total_paid = models.value.total_paid
	if (models.value?.paid_at) payloads.paid_at = models.value.paid_at
	if (newTotal === 0) payloads.status = 'paid'
	else payloads.status = 'partial_paid'
	payloads.total = newTotal

	const resultContact = await createRequest('payments-process', 'put', payloads, { sub_path: route.params?.id })
	if (resultContact.statusCode.value === 201 && resultContact.data?.value) {
		createNotify($q, 'Successfull add house', 'success')
		router.back()
	} else {
		createNotify($q, 'Error add house', 'error')
	}
}

const setRowContent = async (value: any) => {
	rows.value = []
	rowsAll.value = []
	paginationOptions.value = { rowsPerPage: 10 }
	await sleep(100)
	const lists = value?.data || []
	const meta = value?.meta || {}
	rowsAll.value = lists
	for (const item of lists) {
		const { id, total, type, description } = item
		const objects = {
			id,
			total,
			description,
			type,
		}
		checks.value[item.id] = false
		rows.value.push(objects)
	}
	if (meta && meta.totalCount) {
		paginationOptions.value = { page: Number(meta?.page || 1), rowsPerPage: Number(meta?.perpage || 10), rowsNumber: Number(meta?.totalCount || 10) }
		totalCount.value = Number(meta?.totalCount || 10)
	}
}

const getRequest = async (parameters: any = null) => {
	const resultDues = await createRequest('dues', 'get', parameters)
	if (resultDues.statusCode.value === 200 && resultDues.data?.value) {
		const dataCurrent = resultDues.data.value || {}
		const results = {
			data: dataCurrent?.data,
			meta: { page: dataCurrent?.page, perpage: dataCurrent?.pageSize, totalCount: dataCurrent?.total, totalPage: dataCurrent?.totalPages },
		}
		setRowContent(results)
	}
}

const onGetDetailonGetDetail = async () => {
	const resp = await createRequest('payments', 'get', null, { sub_path: route.params?.id })
	if (resp.statusCode.value === 200 && resp.data?.value) {
		payment.value = resp.data.value || {}
	}
}

const onRequest = async (props: any = null) => {
	let options = {}
	if (props) {
		const { page, rowsPerPage } = props.pagination
		options = { page: page, perpage: rowsPerPage }
	}
	await getRequest(options)
}

const onClickModalRemove = (item: any) => {
	const { type, value } = item
	if (type === 'open') {
		isOpenRemove.value = value
	} else if (type === 'confirm') {
		isConfirmRemove.value = value
	}
}

const onRemoveByCheck = async () => {
	const filters = Object.entries(checks.value)
		?.filter(([key, value]: any) => key && value)
		?.map(([key]: any) => key)
	for (const item of filters) {
		await createRequest('payments', 'delete', null, { sub_path: item })
	}
	await sleep(100)
	await onRequest()
}

const onUpdateFetch = async () => {
	await onRequest()
}

onMounted(async () => {
	await onRequest()
	await onGetDetailonGetDetail()
})
</script>

<template>
	<div class="tw-flex tw-min-h-[calc(100vh-40px)] tw-w-full tw-flex-col tw-gap-2 tw-rounded-lg tw-bg-white tw-p-2">
		<q-banner inline-actions rounded class="bg-blue text-white">
			<span v-if="payment.occupant_id"> Anda mempunyai total tagihan sebesar <strong>Rp. {{ payment.total }}</strong> </span>
			<span v-else> Item ini tidak mempunyai Penghuni, silahkan <strong class="tw-cursor-pointer" @click="router.push('/house')">tambahkan</strong> penghuninya terlebih dahulu </span>
			<template v-slot:avatar>
				<q-icon name="info_circle" color="primary" />
			</template>
		</q-banner>
		<span class="tw-mt-2 tw-text-body-1 tw-font-semibold">List Iuran</span>
		<q-table
			v-model:pagination="paginationOptions"
			:rows="rows"
			:columns="columns"
			:rows-per-page-options="[10, 20, 50, 100]"
			row-key="id"
			no-data-label="I didn't find anything for you"
			no-results-label="The filter didn't uncover any results"
			class="tw-mt-4"
			@request="onRequest"
		>
			<template #header="props">
				<q-tr :props="props" class="tw-bg-[#F9FAFB]">
					<q-th v-for="col in props.cols" :key="col.name" :props="props">
						<span v-if="col.name !== 'check'" class="tw-font-semibold">{{ col.label }}</span>
						<base-checkbox v-else :check="checkAll" class="" @input="(value) => (checkAll = value)" />
					</q-th>
				</q-tr>
			</template>
			<template #body-cell="props">
				<q-td :props="props">
					<span v-if="!['check', 'action'].includes(props.col.id)" class="tw-font-light">{{ props.value || '-' }}</span>
					<div v-else-if="props.col.id === 'check'" class="tw-flex">
						<base-checkbox :check="checks[props.row['id']]" class="tw-flex tw-justify-center" @input="(value) => (checks[props.row['id']] = value)" />
					</div>
				</q-td>
			</template>
			<template #no-data="{ message }">
				<div class="full-width row flex-center q-gutter-sm">
					<span class="tw-whitespace-nowrap tw-capitalize">{{ message }}</span>
				</div>
			</template>
		</q-table>
		<component-form
			class="tw-mt-4"
			:bindings="{ title: 'Total Bayar', value: models.total_paid }"
			type-input="number"
			@input="(value) => (models.total_paid = value)"
		/>
		<span class="tw-text-body-2 tw-font-semibold">Tanggal</span>
		<q-input :model-value="models.paid_at" outlined dense class="q-mb-sm tw-min-w-[250px] tw-bg-white">
			<template #prepend>
				<q-icon name="calendar" class="black-filter primary-filter tw-cursor-pointer">
					<q-popup-proxy cover transition-show="scale" transition-hide="scale">
						<q-date v-model="models.paid_at">
							<div class="row items-center justify-end">
								<q-btn v-close-popup label="Close" color="primary" flat />
							</div>
						</q-date>
					</q-popup-proxy>
				</q-icon>
			</template>
		</q-input>
		<q-space></q-space>
		<div class="tw-mt-4 tw-flex tw-flex-none tw-justify-between">
			<q-btn v-close-popup outline color="primary" class="tw-w-[120px]" @click="router.back()">
				<span class="t tw-text-[14px] tw-font-normal tw-capitalize">Kembali</span>
			</q-btn>
			<q-btn color="primary" class="tw-w-[120px]" :disable="!payment.occupant_id" @click="handleSubmit">
				<span class="tw-text-[14px] tw-font-normal tw-capitalize tw-text-white">Proses</span>
			</q-btn>
		</div>
		<modal-remove :is-open="isOpenRemove" @click="onClickModalRemove"></modal-remove>
	</div>
</template>
