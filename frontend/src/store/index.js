// Utilities
import { createPinia } from 'pinia'

import axios from 'axios'

axios.defaults.baseURL = process.env.baseURL || 'http://localhost:3000'

axios.defaults.withCredentials = true

export default createPinia()
