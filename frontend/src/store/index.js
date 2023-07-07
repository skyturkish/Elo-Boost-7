// Utilities
import { createPinia } from 'pinia'
import { useAccount } from './account'

import axios from 'axios'

axios.defaults.baseURL = process.env.baseURL || 'http://localhost:3000'

axios.defaults.withCredentials = true

const pinia = createPinia()

const useStore = useAccount(pinia)

useStore.fetchSession()

export default pinia
