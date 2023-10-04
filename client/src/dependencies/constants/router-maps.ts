type RouterMap = {
  [key: string]: {
    id: string
    layout: string
    auth?: boolean
    full?: boolean
    path: string
    allowAgent?: boolean
  }
}

export const routerMaps: RouterMap = {
  'page-auth-login': { id: 'auth-login', layout: 'auth', auth: false, path: '/login' },
  'page-auth-forgot': { id: 'auth-forgot', layout: 'auth', auth: false, path: '/forgot' },
  'page-auth-change': { id: 'auth-change', layout: 'auth', auth: false, path: '/change' },
  'page-auth-register': { id: 'auth-register', layout: 'auth', auth: false, path: '/register' },
  'page-home': { id: 'home', layout: 'admin', path: '/', allowAgent: true },
  'page-due': { id: 'due', layout: 'admin', full: true, path: '/due', allowAgent: true },
  'page-occupant': { id: 'occupant', layout: 'admin', full: true, path: '/occupant', allowAgent: true },
  'page-house': { id: 'house', layout: 'admin', full: true, path: '/house', allowAgent: true },
  'page-payment': { id: 'payment', layout: 'admin', full: true, path: '/payment', allowAgent: true },
  'page-payment-edit': { id: 'payment-edit', layout: 'admin', full: true, path: '/payment-edit/:id', allowAgent: true },
  'page-report': { id: 'report', layout: 'admin', full: true, path: '/report' },
  'page-email-verify': { id: 'email-verify', layout: 'default', auth: false, path: '/email-verify/:id' },
}

