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
        createOrder({ boostType, options, desiredRank, customer }) {
            axios
                .post(
                    `http://localhost:3000/order/leagueOfLegends/${boostType}`,
                    {
                        customer: customer,
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
                    }
                )
                .then((e) => console.log(e))
        }
    }
})
