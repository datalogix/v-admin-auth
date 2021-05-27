import defu from 'defu'

// View
import Index from '@/views/Index'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import ForgotPassword from '@/views/ForgotPassword'
import ResetPassword from '@/views/ResetPassword'

// Routes
export const routes = ({ options }) => {
  const { name, layout, metaRequiresAuthKey, redirect, routes } = options

  if (!routes || !routes.enabled) return {}

  return {
    path: routes.prefix,

    name,

    component: Index,

    meta: {
      layout,
      [metaRequiresAuthKey]: false
    },

    children: [

      // Login
      mergeRouteEnabled(routes.login, {
        component: Login
      }),

      // Logout
      mergeRouteEnabled(routes.logout, {
        component: Logout,
        meta: {
          layout: null,
          [metaRequiresAuthKey]: true
        }
      }),

      // Forgot Password
      mergeRouteEnabled(routes.forgotPassword, {
        component: ForgotPassword
      }),

      // Reset Password
      mergeRouteEnabled(routes.resetPassword, {
        component: ResetPassword,
        props: true
      }),

      // *
      routeForCallback(redirect, routes)
    ]
  }
}

const mergeRouteEnabled = (source = {}, defaults = {}) => {
  return source && source.enabled ? defu(source, defaults) : {}
}

const routeForCallback = (redirects, routes) => {
  if (redirects && redirects.callback) {
    return {
      path: '',
      redirect: redirects.callback
    }
  }

  if (routes.login && routes.login.enabled) {
    return {
      path: '',
      redirect: routes.login.name ? { name: routes.login.name } : routes.login.path
    }
  }
}
