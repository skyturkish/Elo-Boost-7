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
        incrementDivision() {
            this.selectedDivisionIndex++

            this.selectedDivisionIndex =
                this.selectedDivisionIndex % LeagueOfLegendsDivisions.length
        },
        decrementDivision() {
            this.selectedDivisionIndex =
                (this.selectedDivisionIndex -
                    1 +
                    LeagueOfLegendsDivisions.length) %
                LeagueOfLegendsDivisions.length
        },
        changeCurrentDivision(division) {
            console.log(division)
            this.selectedDivisionIndex = division.rank - 1
        },
        changeCurrentMileStone(milestone) {
            this.currentRank.milestone = milestone
        }
    },
    getters: {
        colors: (state) => LeagueOfLegendsDivisions[state.selectedDivisionIndex]
    }
})
