// Utilities
import { createPinia } from 'pinia'
import axios from 'axios'

// axios.defaults.baseURL =
//     'https://game-elo-boost-backend-luvjvoipkq-uc.a.run.app'
axios.defaults.baseURL = process.env.baseURL || 'http://localhost:3000'

axios.defaults.withCredentials = true

export default createPinia()
