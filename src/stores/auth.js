import { defineStore } from 'pinia'
import { obtainTokens } from '../api/auth.js'
import { getAccess, clearTokens } from '../api/tokens.js'
import { STORAGE_USERNAME_KEY } from '../constants/api.js'
import { STORE_AUTH } from '../constants/stores.js'
import { getUsername, setUsername, clearUsername } from '../utils/storage.js'

function initialAuthState() {
  return {
    username: getUsername(STORAGE_USERNAME_KEY),
    token: getAccess()
  }
}

export const useAuthStore = defineStore(STORE_AUTH, {
  state: () => initialAuthState(),
  getters: {
    isAuth: (state) => !!state.token
  },
  actions: {
    async login(username, password) {
      const data = await obtainTokens(username, password)
      this.username = username
      this.token = getAccess()
      setUsername(STORAGE_USERNAME_KEY, username)
      return data
    },
    logout() {
      clearTokens()
      this.username = ''
      this.token = ''
      clearUsername(STORAGE_USERNAME_KEY)
    },
    init() {
      Object.assign(this, initialAuthState())
    }
  }
})
