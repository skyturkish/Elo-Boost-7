// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'

export const useBoosters = defineStore('useBoosters', {
    state: () => ({
        boosters: null
    }),
    actions: {
        async fetchBoostersIfNotFetched() {
            if (!this.boosters) {
                const allBooster = await axios.get('/user/role/employee')
                this.boosters = allBooster.data || null
            }
        }
    }
})
