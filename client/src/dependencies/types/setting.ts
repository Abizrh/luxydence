export interface Setting {
  domain?: string;
  role?: string;
  key: string;
  value: string;
  created_at?: Date;
  updated_at?: Date;
}

export enum SettingKey {
  enable_rest_api = 'enable_rest_api',
  enable_webhook = 'enable_webhook',
  webhook = 'webhook',
  token = 'token',
  rentalCost = 'rental_cost',
  balance = 'saldo',
  billingPeriod = 'bo.billing_period',
  dueDate = 'bo.due_date',
  paymentToleranceInDay = 'payment_tolerant_in_day',
  welcomeMessage = 'welcomeMessage',
  currentAutoAssign = 'currentAutoAssign',
  userInitiatePrice = 'bo.userInitiatePrice',
  businessInitiatePrice = 'bo.businessInitiatePrice',
  mauPrice = 'mauPrice',
  ppn = 'bo.ppn',
  onboardingDate = 'bo.onboardingDate',
  noOnlineAgentResMsg = 'noOnlineAgentResMsg',
  agentWorkingHourStart = 'agentWorkingHourStart',
  agentWorkingHourEnd = 'agentWorkingHourEnd',
  statusAutoResponder = 'statusAutoResponder',
  topupPrices = 'topupPrices',
  billPrices = 'billPrices',
  minimumBalance = 'bo.minimumBalance',
}
