// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'

export const useValorantOrder = defineStore('ValorantOrder', {
    state: () => ({
        currentRank: {
            division: 'silver',
            milestone: 'I',
            currentRR: '20-0 RR'
        },
        server: 'Turkey',
        agents: [],
        isSolo: false,
        bonusWin: {
            price: 0,
            isActive: false
        },
        premium: {
            price: 0,
            isActive: false
        }
    }),
    actions: {
        async createOrder({ customer, orderType, desiredRank }) {
            console.log('storeun içindeyim')
            await axios.post('/order', {
                customer: customer,
                state: 'active',
                gameType: 'valorant',
                server: this.server,
                orderType: orderType,
                currentRank: this.currentRank,
                desiredRank: desiredRank,
                isSolo: this.isSolo,
                options: {
                    bonusWin: this.bonusWin,
                    premium: this.premium
                }
            })
        }
    }
})
