// Utilities
import { defineStore } from 'pinia'

import { valorantDivisions } from '@/constants/valorant-constants'
import { useAccount } from '@/store/account'
import axios from 'axios'

const customerId = useAccount().user?._id || 'test'

export const useValorantOrder = defineStore('ValorantOrder', {
    state: () => ({
        milestone: 'I',
        currentRR: '0-20RR',
        gainRR: '30-26RR',
        server: 'Europe',
        booster: null,
        heroes: [],

        isDuo: false,
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
        }
    },
    getters: {
        boostingBaseOrder() {
            return {
                customer: customerId,
                booster: this.booster?._id,
                category: 'boosting',
                game: 'valorant',
                server: this.server,
                heroes: this.heroes,
                queue: this.queue
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
                currentRank: this.currentRank
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
                options: {
                    ...this.getDynamicOptions,
                    premium: this.premium,
                    isDuo: this.isDuo,
                    bonusWin: this.bonuwWin
                },
                gainRR: this.gainRR
            }
        },
        winOrder() {
            return {
                ...this.boostingBaseOrder,
                orderType: 'win',
                currentRank: this.currentRank,
                options: {
                    ...this.getDynamicOptions,
                    premium: this.premium,
                    isDuo: this.isDuo,
                    isNotGame: this.isNotGame
                },
                amountGame: this.amountWinGame,
                gainRR: this.gainRR
            }
        },
        placementsOrder() {
            return {
                ...this.boostingBaseOrder,
                orderType: 'placements',
                currentRank: this.currentRank,
                options: {
                    ...this.getDynamicOptions,
                    premium: this.premium,
                    isDuo: this.isDuo,
                    bonusWin: this.bonuwWin
                },
                amountGame: this.amountPlacementsGame
            }
        },
        unratedOrder() {
            return {
                ...this.boostingBaseOrder,
                orderType: 'unrated',
                selectedGameType: this.selectedGameType,
                server: this.server,
                options: {
                    ...this.getDynamicOptions,
                    premium: this.premium,
                    isDuo: this.isDuo
                },
                heroes: this.heroes,
                amountGame: this.amountUnratedMatchGame
            }
        },
        lessonOrder() {
            return {
                ...this.coachingBaseOrder,
                orderType: 'lesson',
                options: {
                    premium: this.premium
                },
                hours: this.coachingHours
            }
        },
        liveGameOrder() {
            return {
                ...this.coachingBaseOrder,
                orderType: 'live-game',
                options: {
                    premium: this.premium
                },
                amountGame: this.amountCoachingGame
            }
        },
        playTogetherOrder() {
            return {
                ...this.coachingBaseOrder,
                orderType: 'play-together',
                options: {
                    premium: this.premium
                },
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
            if (state.isDuo) {
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
