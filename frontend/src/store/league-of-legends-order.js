// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'
import { LeagueOfLegendsDivisions } from '@/constants/league-of-legends-constants'
import { useAccount } from '@/store/account'

export const useLeagueOfLegendsOrder = defineStore('LeagueOfLegendsOrder', {
    state: () => ({
        milestone: 'I',
        currentLP: '0-20LP',
        server: 'Turkey',
        gainLP: '25-20LP',
        isSolo: false,
        lanes: [],
        booster: null,
        champions: [],
        queue: 'solo',
        options: {
            bonusWin: {
                price: 0,
                isActive: false
            },
            premium: {
                price: 0,
                isActive: false
            },
            highMMR: {
                price: 0,
                isActive: false
            },
            untrackable: {
                price: 0,
                isActive: false
            },
            soloOnly: {
                price: 0,
                isActive: false
            },
            stream: {
                price: 0,
                isActive: false
            }
        },
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
            this.selectedDivisionIndex = division.rank - 1
        },
        changeCurrentMileStone(milestone) {
            this.milestone = milestone
        },
        isSelectedMilestone(milestone) {
            return this.milestone === milestone
        },
        async createDivisionOrder(desiredRank) {
            await axios.post('/order', {
                customer: useAccount().user._id || 'test',
                gameType: 'league-of-legends',
                orderType: 'division',
                currentRank: this.currentRank,
                server: this.server,
                gainLP: this.gainLP,
                isSolo: this.isSolo,
                lanes: this.lanes,
                booster: this.booster,
                champions: this.champions,
                queue: this.queue,
                options: this.options,
                desiredRank: desiredRank
            })
        },
        async createWinOrder(AmountGame) {
            await axios.post('/order', {
                customer: useAccount().user._id || 'test',
                gameType: 'league-of-legends',
                orderType: 'win',
                currentRank: this.currentRank,
                server: this.server,
                gainLP: this.gainLP,
                isSolo: this.isSolo,
                lanes: this.lanes,
                booster: this.booster,
                champions: this.champions,
                queue: this.queue,
                options: this.options,
                amountGame: AmountGame
            })
        }
    },
    getters: {
        colors: (state) =>
            LeagueOfLegendsDivisions[state.selectedDivisionIndex],
        currentRank: (state) => {
            return {
                division: state.colors.name,
                milestone: state.milestone,
                currentLP: state.currentLP
            }
        }
    }
})
