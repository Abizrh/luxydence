import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      miniState: false,
      forbidden: false,
    }
  },
  getters: {
    isMini: (state): boolean => state.miniState || false,
    isForbidden: (state): boolean => state.forbidden || false,
  },
  actions: {
    setMiniView(bool: boolean) {
      this.miniState = bool
    },
    setForbidden(bool: boolean) {
      this.forbidden = bool
    },
  },
  persist: { key: 'max.setting', paths: ['miniState', 'forbidden'], storage: localStorage },
})
