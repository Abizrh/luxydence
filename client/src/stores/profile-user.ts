import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      user: null,
      billing: null,
      setting: null,
    }
  },
  getters: {
    getUser: (state): any => state.user || null,
    getBilling: (state): any => state.billing || null,
    getSetting: (state): any => state.setting || null,
  },
  actions: {
    setUser(data: any) {
      this.user = data
    },
    setBilling(data: any) {
      this.billing = data
    },
    setSetting(data: any) {
      this.setting = data
    },
    clearAll() {
      this.user = null
      this.billing = null
      this.setting = null
    },
  },
  persist: { key: 'max.user', paths: ['user', 'billing', 'setting'], storage: sessionStorage },
})
