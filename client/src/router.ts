import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { routerMaps } from '@/dependencies/constants/router-maps'
import { getDecodeToken, getExpiredToken, doRefresh } from '@/dependencies/methods/auth-method'
// import { doGetUser, doGetUserSetting, doGetBalance, doGetBilling } from '@/dependencies/methods/user-method'

const baseUrl = '/'
const pages = import.meta.glob('./pages/*.vue')

const routes: RouteRecordRaw[] = Object.keys(pages).flatMap((path: string) => {
  const routeString = path.match(/\.\/pages(.*)\.vue$/) || ''
  const routePath = routeString[1].toLowerCase()
  const routeName = routePath.replace(/\//g, '').trim()
  const routerObjectCurrent = routerMaps[routeName] || null

  if (!routerObjectCurrent) return []

  return {
    name: routerObjectCurrent?.id,
    path: routerObjectCurrent?.path,
    component: pages[path],
    meta: {
      auth: routerObjectCurrent?.auth ?? true,
      layout: routerObjectCurrent?.layout || 'default',
      full: routerObjectCurrent?.full || false,
      allowAgent: routerObjectCurrent?.allowAgent ?? false,
    },
  }
})

routes.push({
  name: 'not-found',
  path: '/:pathMatch(.*)*',
  component: () => import('./components/commons/ViewPage404.vue'),
  meta: { auth: false, layout: 'default' },
})

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: routes,
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()
  const isAuthRequired = to.meta.auth || false
  let isLoggedIn = false
  let isRoleAuthorized = false
  // const isSkip = true

  const jwtToken: any = authStore.getToken || null
  const parsedToken: any = getDecodeToken(jwtToken)
  console.log('parsedToken: ', parsedToken)
  console.log('jwtToken: ', jwtToken)
  console.log('TOPATH: ', to.path)
  if ((isAuthRequired || to.path === '/login') && parsedToken) {
    const parsedTokenValid: any = getExpiredToken(parsedToken)
    isLoggedIn = !parsedTokenValid?.expired
    isRoleAuthorized = parsedTokenValid?.role !== 'agent' || to.meta?.allowAgent || false
    if (!isLoggedIn) {
      // await doGetUser(true)
      const result: any = await doRefresh()
      if (result?.isSuccess) return next('/')
    } 
  // else {
  //     await doGetUser()
  //     await doGetBalance()
  //     await doGetUserSetting()
  //     const isBillingFirst = await doGetBilling()
  //     if (!isSkip && !isBillingFirst && to.name !== 'user-plan') return next('/user-plan?step=1')
  //   }
  }

  if (isAuthRequired) {
    if (!isLoggedIn) return next('/login')
    if (!isRoleAuthorized) return next('/404')
  }
  if (to.path === '/login' && isLoggedIn) return next('/')
  next()
})

export default router
