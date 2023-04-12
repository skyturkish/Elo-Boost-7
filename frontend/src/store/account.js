// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'

export const useAccount = defineStore('useAccount', {
    state: () => ({
        user: null
    }),
    actions: {
        async fetchSession() {
            const user = await axios.get('/account/session')
            this.user = user.data
        },
        async register({ user }) {
            return await axios.post('/account/register', { user })
        },
        async login({ user }) {
            return await axios.post('/account/session', user)
        },
        async logout() {
            await axios.delete('/account/session')
            this.user = null
        }
    }
})
