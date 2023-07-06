// Utilities
import { createPinia } from 'pinia'
import { useAccount } from './account'

import axios from 'axios'

axios.defaults.baseURL = process.env.baseURL || 'http://localhost:3000'

axios.defaults.withCredentials = true

const pinia = createPinia()

const userStore = useAccount(pinia)

userStore.fetchSession()

export default pinia
