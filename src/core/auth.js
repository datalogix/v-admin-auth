import { reactive, toRefs, watch, inject } from 'vue'
import { mergeConfig } from '@/config'
import { routes } from '@/routes'

export class Auth {
  constructor (admin, options = {}) {
    this.admin = admin
    this.options = mergeConfig(options)
    this.$state = this.state()
    this.admin.addRoute(routes(this))
    this.admin.middleware((to, from, next) => next(this.middleware(to)))
  }

  state () {
    const $state = toRefs(reactive({
      user: this.admin.options.user
    }))

    Object.assign(this, $state)

    return $state
  }

  async init () {
    try {
      await this.fetchUserOnce()
    } finally {
      this.watchLoggedIn()
    }
  }

  watchLoggedIn () {
    if (!this.options.watchLoggedIn) return

    watch([this.$state.user], () => {
      const redirect = this.middleware(this.admin.$router.currentRoute.value)

      if (redirect) return this.admin.visit(redirect)
    })
  }

  middleware ({ name: routeName, meta }) {
    const { name, redirects, metaRequiresAuthKey } = this.options
    const requiresAuth = meta[metaRequiresAuthKey] === undefined ? true : meta[metaRequiresAuthKey]
    const user = this.$state.user.value

    if (requiresAuth && !user && redirects.login) {
      return redirects.login
    }

    if (routeName && routeName.includes(`${name}-`) && !requiresAuth && user && redirects.home) {
      return redirects.home
    }
  }

  setUser (user = null) {
    this.$state.user.value = user
    this.admin.setUser(user)
  }

  api (endpoint, data = {}) {
    return this.admin.api({ ...endpoint, ...{ data, withCredentials: false } })
  }

  login (data) {
    return this.api(this.options.endpoints.login, data)
      .then((result) => {
        this.setUser(result)
      })
  }

  logout () {
    return this.api(this.options.endpoints.logout)
      .finally(() => {
        this.setUser(null)
      })
  }

  forgotPassword (data) {
    return this.api(this.options.endpoints.forgotPassword, data)
  }

  resetPassword (data) {
    return this.api(this.options.endpoints.resetPassword, data)
      .then((result) => {
        this.setUser(result)
      })
  }

  fetchUser (...args) {
    return this.api(this.options.endpoints.user, ...args)
      .then((result) => {
        this.setUser(result)
      })
      .catch(() => {
        this.setUser(null)
      })
  }

  fetchUserOnce (...args) {
    return this.$state.user.value
      ? Promise.resolve()
      : this.fetchUser(...args)
  }
}

export const AUTH_KEY = Symbol('Auth')

export const useAuth = () => inject(AUTH_KEY)

export const createAuthModule = (options = {}) => (admin, app) => {
  const $auth = new Auth(admin, options)

  admin.inject('auth', $auth)
  app.provide(AUTH_KEY, $auth)

  return $auth
}
