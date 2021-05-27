import AuthLayout from '@/layouts/Auth'

export const DEFAULTS = {
  name: 'auth',

  layout: AuthLayout,

  watchLoggedIn: true,

  metaRequiresAuthKey: 'requiresAuth',

  endpoints: {
    user: {
      method: 'get',
      url: '/auth/user'
    },
    login: {
      method: 'post',
      url: '/auth/login'
    },
    logout: {
      method: 'post',
      url: '/auth/logout'
    },
    forgotPassword: {
      method: 'post',
      url: '/auth/forgot-password'
    },
    resetPassword: {
      method: 'post',
      url: '/auth/reset-password'
    }
  },

  redirects: {
    login: { name: 'auth-login' },
    logout: { name: 'home' },
    callback: { name: 'auth-login' },
    home: { name: 'home' }
  },

  routes: {
    enabled: true,

    prefix: '/auth',

    login: {
      enabled: true,
      path: 'login',
      name: 'auth-login'
    },

    logout: {
      enabled: true,
      path: 'logout',
      name: 'auth-logout'
    },

    forgotPassword: {
      enabled: true,
      path: 'forgot-password',
      name: 'auth-forgot-password'
    },

    resetPassword: {
      enabled: true,
      path: 'reset-password/:token',
      name: 'auth-reset-password'
    }
  }
}
