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
        server: 'Europe',
        booster: null,
        heroes: [],

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
        amountCoachingGame: '3 GAMES',
        coachingHours: '2 HOURS',
        amountUnratedMatchGame: '5 GAMES',
        selectedDivisionIndex: 3,
        selectedGameType: 'unrated',
        selectedDesiredDivisionIndex: 4,
        desiredMilestone: 3
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
        addHero(hero) {
            if (this.heroes.includes(hero)) {
                const index = this.heroes.findIndex((item) => item === hero)

                if (index !== -1) {
                    this.heroes.splice(index, 1)
                }
            } else {
                this.heroes.push(hero)
            }
        },
        isAnyHeroSelected() {
            return this.heroes.length > 0
        },
        async createDivisionOrder() {
            await axios.post('/order', this.divisionOrder)
        },
        async createWinOrder() {
            await axios.post('/order', this.winOrder)
        },
        async createPlacementsOrder() {
            await axios.post('/order', this.placementsOrder)
        },
        async createUnratedMatch() {
            await axios.post('/order', this.unratedOrder)
        },
        async createLessonOrder() {
            await axios.post('/order', this.lessonOrder)
        },
        async createLiveGameOrder() {
            await axios.post('/order', this.liveGameOrder)
        },
        async createPlayTogetherOrder() {
            await axios.post('/order', this.playTogetherOrder)
        }
    },
    getters: {
        boostingBaseOrder() {
            return {
                customer: customerId,
                booster: this.booster?._id,
                category: 'boosting',
                game: 'valorant',
                ...this.getDynamicOptions,
                server: this.server,
                heroes: this.heroes,
                queue: this.queue,
                premium: this.premium
            }
        },
        coachingBaseOrder() {
            return {
                customer: customerId,
                booster: this.coach?._id,
                category: 'coaching',
                game: 'valorant',
                heroes: this.heroes,
                languages: this.languages,
                currentRank: this.currentRank,
                premium: this.premium
            }
        },
        divisionOrder() {
            return {
                ...this.boostingBaseOrder,
                orderType: 'division',
                currentRank: this.currentRank,
                desiredRank: {
                    division: this.desiredColors.name,
                    milestone: ['I', 'II', 'III'][this.desiredMilestone]
                },
                isSolo: this.isSolo,
                gainRR: this.gainRR,
                bonusWin: this.bonuwWin
            }
        },
        winOrder() {
            return {
                ...this.boostingBaseOrder,
                orderType: 'win',
                currentRank: this.currentRank,
                isSolo: this.isSolo,
                amountGame: this.amountWinGame,
                gainRR: this.gainRR,
                gameOrNetWin: this.gameOrNetWin
            }
        },
        placementsOrder() {
            return {
                ...this.boostingBaseOrder,
                orderType: 'placements',
                currentRank: this.currentRank,
                isSolo: this.isSolo,
                amountGame: this.amountPlacementsGame,
                bonusWin: this.bonuwWin
            }
        },
        unratedOrder() {
            return {
                ...this.boostingBaseOrder,
                orderType: 'unrated',
                selectedGameType: this.selectedGameType,
                server: this.server,
                isSolo: this.isSolo,
                heroes: this.heroes,
                ...this.getDynamicOptions,
                amountGame: this.amountUnratedMatchGame
            }
        },
        lessonOrder() {
            return {
                ...this.coachingBaseOrder,
                orderType: 'lesson',
                hours: this.coachingHours
            }
        },
        liveGameOrder() {
            return {
                ...this.coachingBaseOrder,
                orderType: 'live-game',
                amountGame: this.amountCoachingGame
            }
        },
        playTogetherOrder() {
            return {
                ...this.coachingBaseOrder,
                orderType: 'play-together',
                amountGame: this.amountCoachingGame
            }
        },
        desiredColors: (state) =>
            valorantDivisions[state.selectedDesiredDivisionIndex],
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
