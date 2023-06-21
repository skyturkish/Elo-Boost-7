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
                const adana = await axios.get('/user/role/booster')
                this.boosters = adana.data || null
            }
        }
    }
})
