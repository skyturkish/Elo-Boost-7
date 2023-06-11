// Utilities
import { defineStore } from 'pinia'

import { valorantDivisions } from '@/constants/valorant-constants'
import { useAccount } from '@/store/account'
import axios from 'axios'

const customerId = useAccount().user?._id || 'test'

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
        amountUnratedMatchGame: '5 GAMES',
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
        addAgent(agent) {
            if (this.agents.includes(agent)) {
                const index = this.agents.findIndex((item) => item === agent)

                if (index !== -1) {
                    this.agents.splice(index, 1)
                }
            } else {
                this.agents.push(agent)
            }
        },
        isAnyAgentSelected() {
            return this.agents.length > 0
        },
        async createDivisionOrder(desiredRank) {
            await axios.post('/order', {
                customer: customerId,
                booster: this.booster?._id,
                gameType: 'valorant',
                orderType: 'division',
                currentRank: this.currentRank,
                desiredRank: desiredRank,
                gainRR: this.gainRR,
                server: this.server,
                isSolo: this.isSolo,
                agents: this.agents,
                ...this.getDynamicOptions,
                bonusWin: this.bonuwWin,
                premium: this.premium
            })
        },
        async createWinOrder() {
            await axios.post('/order', {
                customer: customerId,
                booster: this.booster?._id,
                gameType: 'valorant',
                orderType: 'win',
                currentRank: this.currentRank,
                server: this.server,
                isSolo: this.isSolo,
                agents: this.agents,
                ...this.getDynamicOptions,
                premium: this.premium,
                amountGame: this.amountWinGame
            })
        },
        async createPlacementsOrder() {
            await axios.post('/order', {
                customer: customerId,
                booster: this.booster?._id,
                gameType: 'valorant',
                orderType: 'win',
                currentRank: this.currentRank,
                server: this.server,
                isSolo: this.isSolo,
                agents: this.agents,
                ...this.getDynamicOptions,
                premium: this.premium,
                amountGame: this.amountPlacementsGame
            })
        },
        async createUnratedMatch(selectedGameType) {
            await axios.post('/order', {
                customer: customerId,
                booster: this.booster?._id,
                gameType: 'valorant',
                orderType: 'unrated',
                server: this.server,
                isSolo: this.isSolo,
                agents: this.agents,
                ...this.getDynamicOptions,
                premium: this.premium,
                amountGame: this.amountUnratedMatchGame
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
        },
        getDynamicOptions: (state) => {
            if (state.isSolo) {
                return {
                    highMMR: state.highMMR,
                    untrackable: state.untrackable
                }
            } else {
                return {
                    soloOnly: state.soloOnly,
                    stream: state.stream
                }
            }
        }
    }
})
