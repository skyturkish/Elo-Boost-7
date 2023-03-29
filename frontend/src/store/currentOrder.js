// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'

export const useCurrentOrder = defineStore('CurrentOrder', {
    state: () => ({
        division: 'silver',
        mileStone: 'I',
        currentLP: '20-0 LP',
        gainLP: '20-15',
        server: 'Turkey',
        queueType: 'Solo/Duo'
    }),
    actions: {
        async createOrder({
            customer,
            gameType,
            orderType,
            desiredRank,
            options,
            state = 'active'
        }) {
            console.log('burası çalışıyor demi ?')
            await axios
                .post(`/order`, {
                    customer: customer,
                    state: state,
                    gameType: gameType,
                    orderType: orderType,
                    server: this.server,
                    currentRank: {
                        division: this.division,
                        mileStone: this.mileStone,
                        currentLP: this.currentLP
                    },
                    desiredRank: desiredRank,
                    gainingLP: this.gainLP,
                    options: {
                        ...options
                    }
                })
                .then((e) => console.log(e))
        }
    }
})
