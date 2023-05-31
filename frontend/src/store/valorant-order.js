// Utilities
import { defineStore } from 'pinia'

import { valorantDivisions } from '@/constants/valorant-constants'

import axios from 'axios'

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
        }
    }),
    actions: {
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
