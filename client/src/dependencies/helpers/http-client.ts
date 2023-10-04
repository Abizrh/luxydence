import { createFetch, useFetch } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'
import { useSettingStore } from '@/stores/setting'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost'
const apiTimeout = import.meta.env.VITE_API_TIMEOUT || 10

/**
 * Creates a fetch client with the specified configurations.
 *
 * @param {object} [configs={}] - Configuration options for the fetch client.
 * @param {object} [configs.headers={}] - Custom headers to be included in the HTTP requests.
 * @param {object} [configs.settings={}] - Additional settings for the fetch client.
 * @returns {object} - A fetch client instance.
 */
const useFetchClient = (configs: any = {}) => {
  const authStore = useAuthStore()
  const settingStore = useSettingStore()
  const headers = configs?.headers || {}
  const settings = configs?.settings || {}
  return createFetch({
    baseUrl: apiUrl,
    options: {
      beforeFetch: (value: any) => {
        const jwtToken = authStore.getToken || null
        const options = value?.options || {}
        options.timeout = (apiTimeout || 1) * 1000
        options.immediate = false
        if (jwtToken) {
          options.headers.Authorization = `Bearer ${jwtToken}`
        }
        options.headers = { ...options.headers, ...headers }
        return { options }
      },
      afterFetch: (ctx: any) => {
        return ctx
      },
      onFetchError(ctx) {
        const data: any = ctx?.data || {}
        const response: any = ctx?.response || {}
        if ((data.statusCode === 401 || response.status === 401) && /jwt expired/i.test(data.message || '')) {
          settingStore.setForbidden(true)
        }
        return ctx
      },
    },
    fetchOptions: { mode: 'cors', ...settings },
  })
}

export { useFetch, useFetchClient }
