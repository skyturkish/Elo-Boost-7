// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'

export const useAccount = defineStore('useAccount', {
    state: () => ({
        user: null
    }),
    actions: {
        async changeUserOnlineState(state) {
            if (this.user) {
                await axios.patch(`/user/${this.user._id}`, {
                    onlineState: state
                })
            }
        },
        async fetchSession() {
            const user = await axios.get('/account/session')
            this.user = user.data || null
            await this.changeUserOnlineState('online')
        },
        async register({ user }) {
            return await axios.post('/account/register', { user })
        },
        async login({ user }) {
            return await axios.post('/account/session', user)
        },
        async logout() {
            await this.changeUserOnlineState('offline')
            await axios.delete('/account/session')
            await this.fetchSession()
        },
        async updatePhoto(photoUrl) {
            await axios.patch(`/user/${this.user._id}`, {
                photo: photoUrl
            })
        },
        async updateThemePreference(preferences) {
            await axios.patch(`/user/${this.user._id}`, {
                themePreference: preferences
            })
            await this.fetchSession()
        },
        isBooster() {
            return this.user.role === 'booster'
        }
    }
})
