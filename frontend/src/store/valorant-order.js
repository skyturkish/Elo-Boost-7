// Utilities
import { defineStore } from 'pinia'

import { valorantDivisions } from '@/constants/valorant-constants'
import { useAccount } from '@/store/account'
import axios from 'axios'

const userId = useAccount().user?._id || null
export const useValorantOrder = defineStore('ValorantOrder', {
    state: () => ({
        milestone: 'I',
        currentRR: '0-20 RR',
        currentGainRR: '25-20 RR',
        gainRR: '+25 GAIN',
        server: 'Turkey',
        booster: null,
        agents: [],

        isSolo: false,
        bonusWin: false,
        premium: true,
        highMMR: false,
        untrackable: false,
        soloOnly: false,
        stream: false,

        coach: null,
        languages: ['ENGLISH'],
        amountWinGame: '2 GAMES',
        amountPlacementsGame: '10 GAMES',
        amountUnratedMatchGame: '5 GAMES',
        amountLessonGame: '3 HOURS',
        amountCoachGame: '3 GAMES',
        selectedDivisionIndex: 3
    }),
    actions: {
        incrementDivision(limit) {
            this.selectedDivisionIndex++

            this.selectedDivisionIndex = this.selectedDivisionIndex % limit
        },
        decrementDivision(limit) {
            this.selectedDivisionIndex -= 1
            if (this.selectedDivisionIndex < 0) {
                this.selectedDivisionIndex = limit - 1
            }
        },
        changeCurrentDivision(division) {
            const index = valorantDivisions.indexOf(division)
            this.selectedDivisionIndex = index
        },
        isSelectedDivision(division) {
            return this.colors.name === division.name
        },
        changeCurrentMileStone(milestone) {
            this.milestone = milestone
        },
        isSelectedMilestone(milestone) {
            return this.milestone === milestone
        },

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
        }
    },
    getters: {
        colors: (state) => valorantDivisions[state.selectedDivisionIndex],
        currentRank: (state) => {
            return {
                division: state.colors.name,
                milestone: state.milestone,
                currentRR: state.currentRR
            }
        }
    }
})
