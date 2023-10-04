import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: null,
    }
  },
  getters: {
    getToken: (state): any => state.token || null,
  },
  actions: {
    setToken(token: any) {
      console.log('setTokenStore: >', token)
      this.token = token
    },
  },
  persist: { key: 'max.auth', paths: ['token'], storage: localStorage },
})
