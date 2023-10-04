<script setup lang="ts">
import { onMounted, defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getTranslate } from '../../dependencies/methods/_method'

const router = useRouter()
const props = defineProps({
	type: {
		type: String,
		default: 'List'
	}
})
const prefix = 'occupants'
const groupCount = ref(5)
const isComingSoon = ref(true)
const mainTitle = ref('')

const initialized = () => {}

const onClicked = () => {
	if (!isComingSoon.value) {
		router.push({ name: 'contact-group' })
	}
}

mainTitle.value = getTranslate(`${prefix}.contents.main_title`)

onMounted(() => {
	initialized()
})
</script>

<template>
	<div class="tw-flex tw-min-h-[calc(100vh-40px)] tw-w-[275px] tw-flex-col tw-gap-2 tw-rounded-[10px] tw-bg-white tw-p-3">
		<div class="tw-mb-2">
			<div class="tw-mb-4 tw-flex tw-items-center tw-justify-start tw-gap-2">
				<q-icon name="users" size="30px" class="black-filter primary-filter"></q-icon>
				<span class="tw-text-[20px] tw-font-semibold">{{ props.type }} Pembayaran </span>
			</div>
			<span class="tw-text-[12px] tw-font-light">
				{{ mainTitle }}
			</span>
		</div>
		<!-- <q-btn color="primary" class="tw-my-4 tw-w-full" :class="isComingSoon ? 'tw-cursor-not-allowed' : ''" @click="onClicked">
			<span v-if="!isComingSoon" class="tw-capitalize tw-text-white">Contact group ({{ groupCount }})</span>
			<span v-else class="tw-capitalize tw-text-white">Contact group</span>
			<q-tooltip v-if="isComingSoon" :delay="100" :offset="[0, 10]">Comming Soon</q-tooltip>
		</q-btn> -->
	</div>
</template>
