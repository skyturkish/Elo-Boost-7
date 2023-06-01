// Utilities
import { defineStore } from 'pinia'

import { valorantDivisions } from '@/constants/valorant-constants'
import { useAccount } from '@/store/account'
import axios from 'axios'

const userId = useAccount().user._id
export const useValorantOrder = defineStore('ValorantOrder', {
    state: () => ({
        milestone: 'I',
        currentRR: '0-20 RR',
        division: 'silver',
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
        },
        agents: []
    }),
    actions: {
        async createDivisionOrder(desiredRank) {
            await axios.post('/order', {
                customer: userId || 'test',
                gameType: 'valorant',
                orderType: 'division',
                currentRank: this.currentRank,
                server: this.server,
                agents: this.agents,
                desiredRank: desiredRank
            })
        },
        changeCurrentDivision(division) {
            this.division = division.name
        },
        isSelectedDivision(division) {
            return this.division === division.name
        },
        changeCurrentMileStone(milestone) {
            this.milestone = milestone
        },
        isSelectedMilestone(milestone) {
            return this.milestone === milestone
        }
    },
    getters: {
        currentRank: (state) => {
            return {
                division: state.division,
                milestone: state.milestone,
                currentRR: state.currentRR
            }
        }
    }
})
