<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingStore } from '@/stores/setting'
import { doLogout } from '@/dependencies/methods/auth-method'
import PartSidebar from '@/components/commons/PartSidebarList.vue'
import ModalLogout from '@/components/commons/ModalLogout.vue'
import SectionHeader from '@/components/feat-board/SectionHeader.vue'

const router = useRouter()
const settingStore = useSettingStore()
const miniState = ref(false)
const isOpen = ref(false)
const isConfirmLogout = ref(false)
const isMini = computed(() => settingStore.isMini)

watch(
	() => isConfirmLogout.value,
	async (value) => {
		if (!value) return
		doLogout()
		setTimeout(() => {
			router.push('/login')
		}, 500)
	},
)

const onClickMiniView = () => {
	miniState.value = !miniState.value
	settingStore.setMiniView(miniState.value)
}

const onClickModal = (item: any) => {
	const { type, value } = item
	if (type === 'open') {
		isOpen.value = value
	} else if (type === 'confirm') {
		isConfirmLogout.value = value
	}
}

const onClickSidebar = (type: string) => {
	if (type === 'logout') {
		isOpen.value = true
	}
}

onMounted(() => {
	miniState.value = settingStore.isMini
})
</script>

<template>
	<q-layout view="lHh Lpr lff" container class="rounded-borders tw-relative tw-h-screen tw-rounded-none tw-bg-neutral-300">
		<q-header v-if="false" class="tw-bg-neutral-300 tw-p-[10px]" style="z-index: 100">
			<q-toolbar class="tw-h-[60px] tw-rounded-[8px] tw-bg-black tw-p-10">
				<section-header />
			</q-toolbar>
		</q-header>
		<q-drawer :mini="isMini" show-if-above :width="278" :breakpoint="400">
			<div class="tw-flex tw-h-[60px] tw-w-full tw-bg-[#292929]" :class="isMini ? 'tw-p-2' : 'tw-p-4'">
				<div v-if="!isMini" class="tw-relative tw-h-[40px] tw-flex-none">
					<q-img src="/cores/luxydence.png" alt="luxydence-logo" fit="fill" class="tw-h-[28px] tw-w-[62px]" />
					<span class="tw-absolute tw-bottom-[-6px] tw-text-[30px] tw-font-semibold tw-text-white">luxydence</span>
				</div>
				<div v-else class="tw-relative tw-h-[40px] tw-flex-none" :class="isMini ? 'tw-mt-2' : ''">
					<q-img src="/cores/luxydence.png" alt="maxchat-logo" fit="fill" class="tw-h-[20px] tw-w-[38px]" />
				</div>
			</div>
			<part-sidebar :mini="isMini" @click="onClickSidebar" />
			<div class="tw-absolute tw-right-[-10px] tw-top-[55px]">
				<q-btn round size="10px" color="white" @click="onClickMiniView">
					<q-icon :name="isMini ? 'arrow_right' : 'arrow_left'" size="20px" />
				</q-btn>
			</div>
		</q-drawer>
		<q-page-container class="tw-mt-[5px] tw-p-[10px]" :class="$q.screen.lt.md ? '' : 'tw-ml-[10px]'">
			<div class="tw-min-h-[500px]">
				<slot />
			</div>
		</q-page-container>
		<modal-logout :is-open="isOpen" @click="onClickModal"></modal-logout>
	</q-layout>
</template>
