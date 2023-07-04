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
            return this.user.role === 'employee'
        }
    },
    getters: {
        userPermissions: (state) => state.user.permissions,
        userNotifications: (state) => state.user.notifications,
        userJobs() {
            let jobList = []

            for (let key in this.userPermissions) {
                jobList.push(key)
            }
            return jobList
        },
        userGames() {
            let gamesSet = new Set()

            for (let key in this.userPermissions) {
                for (let game in this.userPermissions[key].games) {
                    gamesSet.add(game) // Oyunları bir Set'e ekleyin
                }
            }
            return Array.from(gamesSet)
        },
        userGrades() {
            let gradeList = []

            for (let key in this.userPermissions) {
                gradeList.push(this.userPermissions[key].grade)
            }
            return gradeList
        },
        userTags() {
            return this.userGrades.concat(this.userGames)
        }
    }
})
