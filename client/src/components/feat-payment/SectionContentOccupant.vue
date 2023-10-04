<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { createRequest } from '@/dependencies/methods/_method'
import dueRepo from '@/dependencies/repository/due-repo'
import { sleep } from '@/dependencies/helpers/util-of-timer'
import BaseCheckbox from '@/components/basics/BaseCheckbox.vue'
import PartFilter from './PartFilterOccupant.vue'
import ModalRemove from '@/components/commons/ModalRemove.vue'
import ModalAction from './ModalNewOccupant.vue'
import { useRouter } from 'vue-router'

const propsExtended = defineProps({
	labels: { type: Array, default: () => [] },
})
const columns: any = ref([
	{ id: 'check', label: '', field: 'check', name: 'check', sortable: false, align: 'left' },
	{ id: 'house_number', label: 'No Rumah', field: 'house_number', name: 'house_number', sortable: false, align: 'left' },
	{ id: 'house_status', label: 'Status Rumah', field: 'house_status', name: 'house_status', sortable: false, align: 'left' },
	{ id: 'responsible', label: 'Kepala Penghuni', field: 'responsible', name: 'responsible', sortable: false, align: 'left' },
	{ id: 'payment_status', label: 'Status Pembayaran', field: 'payment_status', name: 'payment_status', sortable: false, align: 'left' },
	{ id: 'total', label: 'Total Tagihan', field: 'total', name: 'total', sortable: false, align: 'center' },
	{ id: 'total_paid', label: 'Total Dibayar', field: 'total_paid', name: 'total_paid', sortable: false, align: 'center' },
	{ id: 'action', label: 'Aksi', field: 'action', name: 'action', sortable: false, align: 'center' },
])
const router = useRouter()
const rows: any = ref([])
const rowsAll: any = ref([])
const rowCurrent: any = ref({})
const checkAll: any = ref(false)
const checks: any = ref({})
const channelSelected: any = ref([])
const paginationOptions: any = ref({ rowsPerPage: 10 })
const totalCount = ref(0)
const isOpen = ref(false)
const isOpenRemove = ref(false)
const isConfirmRemove = ref(false)
const isDummy = false
const waitTime = 500
let timeWaiting: any = null
let lock: boolean = false

const isCheckActive = computed(() => {
	return Object.values(checks.value)?.filter((item: any) => item).length > 0
})

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

const setRowContent = async (value: any) => {
	rows.value = []
	rowsAll.value = []
	paginationOptions.value = { rowsPerPage: 10 }
	await sleep(100)
	const lists = value?.data || []
	const meta = value?.meta || {}
	rowsAll.value = lists
	for (const item of lists) {
		/**
		 * {
            "id": 1,
            "total": 0,
            "status": "new",
            "total_paid": 0,
            "paid_at": "2023-10-03T06:54:02.000Z",
            "occupant_id": 1,
            "house_id": 8,
            "createdAt": "2023-10-03T06:54:02.000Z",
            "updatedAt": "2023-10-03T06:54:02.000Z",
            "Occupant": {
                "id": 1,
                "responsible": "Tn Budi",
                "families": "[{\"nik\":\"4732847324\",\"name\":\"Ibu Budi\"},{\"nik\":\"23453543\",\"name\":\"Anak Budi\"}]",
                "createdAt": "2023-10-02T17:35:24.000Z",
                "updatedAt": "2023-10-02T17:35:24.000Z"
            },
            "House": {
                "id": 8,
                "house_number": "23423",
                "status": "tetap",
                "owner": "AB",
                "occupant_id": 1,
                "createdAt": "2023-10-03T06:54:02.000Z",
                "updatedAt": "2023-10-03T06:54:02.000Z"
            }
        }
		 */
		const { id, total, status, total_paid, Occupant, House } = item
		const objects = {
			id,
			total,
			total_paid,
			payment_status: status,
			responsible: Occupant?.responsible,
			house_number: House.house_number,
			house_status: House.status,
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
	const resultContactList = await createRequest('payments', 'get', parameters)
	if (resultContactList.statusCode.value === 200 && resultContactList.data?.value) {
		const dataCurrent = resultContactList.data.value || {}
		const results = {
			data: dataCurrent?.data,
			meta: { page: dataCurrent?.page, perpage: dataCurrent?.pageSize, totalCount: dataCurrent?.total, totalPage: dataCurrent?.totalPages },
		}
		setRowContent(results)
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

const onSearch = async (options: any = null) => {
	if (lock) return false
	if (!lock) {
		lock = true
		await getRequest(options)
		lock = false
	}
}

const onUpdateSearch = (value: any) => {
	clearTimeout(timeWaiting)
	timeWaiting = setTimeout(async () => {
		const target = value ? value?.target : null
		let options: any = null
		if (target && target?.value.trim() !== '') {
			options = { keyword: target.value }
		}
		await onSearch(options)
	}, waitTime)
}

const onUpdateStatus = async (value: any) => {
	channelSelected.value = []
	for (const key in value) {
		const element = value[key]
		if (!element || key === 'label') continue
		channelSelected.value.push(key)
	}
	const labels = value?.label?.map((item: any) => item.label).join(',')
	const channels = channelSelected.value?.join(',')
	const { page, rowsPerPage } = paginationOptions.value
	const options: any = { page: page, perpage: rowsPerPage }
	if (labels) options.label = labels
	if (channels) options.channel = channels
	await onSearch(options)
}

const onClickNew = (id:string) => {
	router.push(`/payment-edit/${id}`)

}

const onClickDetail = async (column: string, id: string) => {
	if (column === 'check') return false
	rowCurrent.value = {}
	if (!id) return false
	await sleep(15)
	const rowSelected = rowsAll.value?.find((item: any) => item.id === id)
	if (!rowSelected) return false
	rowCurrent.value = rowSelected
	isOpen.value = true
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
})
</script>

<template>
	<div class="tw-flex tw-min-h-[calc(100vh-40px)] tw-w-full tw-flex-col tw-gap-2 tw-p-2">
		<div class="tw-flex tw-items-center tw-justify-between">
			<div class="tw-flex tw-items-center tw-gap-8">
				<div class="tw-h-[36px] tw-w-[250px] tw-gap-4 tw-rounded-[7px] tw-bg-white tw-p-2">
					<div>
						<q-icon name="search" size="20px" class="black-filter primary-filter tw-mr-2"></q-icon>
						<input placeholder="Search" type="text" class="tw-bg-transparent tw-outline-none" @keyup="(value) => onUpdateSearch(value)" />
					</div>
				</div>
				<div class="tw-flex tw-h-[36px] tw-w-[39px] tw-flex-none tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-[7px] tw-bg-white">
					<q-icon name="filter" size="20px" class="black-filter primary-filter"></q-icon>
					<part-filter :labels="propsExtended.labels" @update:channel="onUpdateStatus" />
				</div>
				<span class="tw-text-[12px] tw-font-light">({{ totalCount }} payments)</span>
			</div>
			<div class="tw-flex tw-gap-2">
				<q-btn v-if="isCheckActive" outline color="negative" class="tw-w-[40px]" @click="isOpenRemove = true">
					<q-icon name="trash" size="20px" class="black-filter primary-filter"></q-icon>
				</q-btn>
			</div>
		</div>
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
				<q-td :props="props" >
					<span v-if="!['check', 'action'].includes(props.col.id)" class="tw-font-light">{{ props.value || '-' }}</span>
					<div v-else-if="props.col.id === 'check'" class="tw-flex">
						<base-checkbox :check="checks[props.row['id']]" class="tw-flex tw-justify-center" @input="(value) => (checks[props.row['id']] = value)" />
					</div>
					<q-btn v-else-if="props.col.id === 'action'" flat color="primary" @click="onClickNew(props?.row?.id)">
						<span class="tw-whitespace-nowrap tw-capitalize tw-text-green">{{ props?.row?.payment_status === 'new' ? 'Proses' : 'Lihat' }}</span>
					</q-btn>
				</q-td>
			</template>
			<template #no-data="{ message }">
				<div class="full-width row flex-center q-gutter-sm">
					<span class="tw-whitespace-nowrap tw-capitalize">{{ message }}</span>
				</div>
			</template>
		</q-table>
		<modal-remove :is-open="isOpenRemove" @click="onClickModalRemove"></modal-remove>
		<modal-action
			:datas="rowCurrent"
			:labels="propsExtended.labels"
			:is-open="isOpen"
			@update:fetch="onUpdateFetch"
			@click="(value) => (isOpen = value)"
		></modal-action>
	</div>
</template>
