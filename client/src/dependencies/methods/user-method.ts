import { useProfileStore } from '@/stores/profile-user'
import { pick } from '../helpers/util-of-object'
import { differenceOfTwoDate, sleep } from '../helpers/util-of-timer'
import { createRequest } from './_method'

/**
 * Action Get Balance Function
 */
export const doGetBalance = async () => {
  await sleep(5)
  const profileStore = useProfileStore()
  const userSetting = profileStore.getSetting || {}
  const balance = userSetting?.balance || null
  if (balance) return false
  const { statusCode, data }: any = await createRequest('last-balance', 'get')
  if (statusCode.value === 200) {
    const dataDetail: any = data.value?.data || {}
    const userAdditionData = { balance: dataDetail?.saldo ?? 0, order_id: dataDetail?.orderId || '' }
    profileStore.setSetting({ ...userSetting, ...userAdditionData })
    return true
  }
  return false
}

/**
 * Action Check billing Function
 */
export const doGetBilling: any = async () => {
  const profileStore = useProfileStore()
  const billing = profileStore.getBilling || null
  if (!billing) {
    const { statusCode, data }: any = await createRequest('billing-first')
    if (statusCode.value === 200) {
      const dataDetail: any = data.value?.data || {}
      profileStore.setBilling({ ...dataDetail, access_at: new Date().getTime() })
      return dataDetail?.first || false
    }
  } else {
    const accessAt = billing?.access_at || new Date().getTime()
    const resultCurrent = differenceOfTwoDate(accessAt, new Date().getTime(), 'minute')
    if (resultCurrent > 30) {
      profileStore.setBilling(null)
      return await doGetBilling()
    }
    return billing?.first || false
  }
}

/**
 * Action Set User Profile
 */
export const doGetUser = async (isSkip: boolean = false) => {
  const profileStore = useProfileStore()
  const userCurrent = profileStore.getUser
  if (userCurrent && !isSkip) return false
  await sleep(100)
  const { statusCode: statusCodeMe, data: dataMe }: any = await createRequest('users-me')
  if (statusCodeMe.value === 200) {
    profileStore.setUser(pick(dataMe.value, ['name', 'company', 'email', 'role']))
    return true
  }
  return false
}

/**
 * Action Get Setting Function
 */
export const doGetUserSetting = async () => {
  const profileStore = useProfileStore()
  let userSetting = profileStore.getSetting || {}
  const billingPeriod = userSetting?.billing_period || null
  const billingDuedate = userSetting?.billing_due_date || null
  const minimumBalance = userSetting?.minimum_balance || null
  const ppn = userSetting?.ppn || null
  if (!billingPeriod) {
    const { statusCode: statusCodeOne, data: dataOne }: any = await createRequest('settings-bo-billing_period', 'get')
    if (statusCodeOne?.value === 200) {
      profileStore.setSetting({ ...userSetting, billing_period: Number(dataOne.value?.data?.value || 0) })
    }
    userSetting = profileStore.getSetting || {}
  }
  if (!billingDuedate) {
    const { statusCode: statusCodeTwo, data: dataTwo }: any = await createRequest('settings-bo-due_date', 'get')
    if (statusCodeTwo.value === 200) {
      profileStore.setSetting({ ...userSetting, billing_due_date: Number(dataTwo.value?.data?.value || 0) })
    }
    userSetting = profileStore.getSetting || {}
  }
  if (!minimumBalance) {
    const { statusCode: statusCodeThree, data: dataThree }: any = await createRequest('settings-bo-minimum-balance', 'get', { return404: true })
    if (statusCodeThree.value === 200) {
      profileStore.setSetting({ ...userSetting, minimum_balance: Number(dataThree.value?.data?.value || 0) })
    }
    userSetting = profileStore.getSetting || {}
  }
  if (!ppn) {
    const { statusCode: statusCodeFour, data: dataFour }: any = await createRequest('settings-bo-ppn', 'get')
    if (statusCodeFour.value === 200) {
      profileStore.setSetting({ ...userSetting, ppn: Number(dataFour.value?.data?.value || 0) })
    }
    userSetting = profileStore.getSetting || {}
  }
}
