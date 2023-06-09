// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'

export const useBoosters = defineStore('useBoosters', {
    state: () => ({
        boosters: null
    }),
    actions: {
        async fetchBoostersIfNotFetched() {
            console.log('burası çalıştı ama')
            if (!this.boosters) {
                console.log('servise istek atıldı')
                const adana = await axios.get('/user/role/booster')
                console.log(adana.data)
                this.boosters = adana.data || null
            }
        }
    }
})
