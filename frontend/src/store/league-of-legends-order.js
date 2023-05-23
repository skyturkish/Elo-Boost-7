// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'
import { LeagueOfLegendsDivisions } from '@/constants/league-of-legends-constants'

export const useLeagueOfLegendsOrder = defineStore('LeagueOfLegendsOrder', {
    state: () => ({
        currentRank: {
            division: 'gold',
            milestone: 'I',
            currentLP: '0-20LP'
        },
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
            this.currentRank.milestone = milestone
        },
        isSelectedMilestone(milestone) {
            return this.currentRank.milestone === milestone
        }
    },
    getters: {
        colors: (state) => LeagueOfLegendsDivisions[state.selectedDivisionIndex]
    }
})
