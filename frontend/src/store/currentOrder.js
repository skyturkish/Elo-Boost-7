// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'

export const useCurrentOrder = defineStore('CurrentOrder', {
    state: () => ({
        division: 'Silver',
        mileStone: 'I',
        currentLP: '0-20 LP',
        gainLP: '21-15 LP or more',
        server: 'Turkey',
        queueType: 'Solo/Duo'
    }),
    actions: {
        changeDivision(Division) {
            this.division = Division
        },
        changeMileStone(mileStone) {
            this.mileStone = mileStone
        },
        changeCurrentLP(currentLP) {
            this.currentLP = currentLP
        },
        changeGainLP(gainLP) {
            this.gainLP = gainLP
        },
        changeServer(server) {
            this.server = server
        },
        changeQueueType(queueType) {
            this.queueType = queueType
        },
        createOrder({ boostType, options, desiredRank }) {
            axios
                .post(
                    `http://localhost:3000/order/leagueOfLegends/${boostType}`,
                    {
                        customer: '63dd6bb5b510d2493d806ce4',
                        server: this.server,
                        currentRank: {
                            division: this.division,
                            divisionMilestone: this.mileStone,
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
