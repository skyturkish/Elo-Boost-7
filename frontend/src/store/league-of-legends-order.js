// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'
import {
    LeagueOfLegendsDivisions,
    mapColors
} from '@/constants/league-of-legends-constants'
import { useAccount } from '@/store/account'

const customerId = useAccount().user?._id || 'test'

export const useLeagueOfLegendsOrder = defineStore('LeagueOfLegendsOrder', {
    state: () => ({
        milestone: 'II',
        currentLP: '0-20LP',
        server: 'EUW',
        gainLP: '25-21LP',
        booster: null,
        coach: null,
        lanes: [],
        heroes: {
            top: [],
            jungle: [],
            mid: [],
            adc: [],
            support: []
        },
        isDuo: false,

        isNotGame: true,

        bonusWin: true,
        premium: false,
        highMMR: false,
        untrackable: false,
        soloOnly: false,
        stream: false,
        stier: false,

        map: 'aram',

        queue: 'solo',

        coachingHours: '1 HOUR',

        amountPlacementsGame: '5 GAMES',
        amountNormalGame: '2 GAMES',
        amountCoachingGame: '2 GAMES',
        amountWinGame: '2 GAMES',

        languages: ['ENGLISH'],

        clashTier: 'TIER IV',
        clashAmountGame: '5 GAMES',
        clashAmountBooster: '5 BOOSTER',

        selectedDivisionIndex: 3,

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
            const index = LeagueOfLegendsDivisions.indexOf(division)
            this.selectedDivisionIndex = index
        },
        changeCurrentMileStone(milestone) {
            this.milestone = milestone
        },
        isSelectedMilestone(milestone) {
            return this.milestone === milestone
        },
        changeMap(map) {
            this.map = map.name
        },
        changeMapWithIcon() {
            if (this.map == 'aram') {
                this.map = 'rift'
            } else {
                this.map = 'aram'
            }
        },
        addOrRemoveLane(lane) {
            if (this.lanes.includes(lane)) {
                this.lanes = this.lanes.filter((l) => l !== lane)
            } else {
                this.lanes.push(lane)
            }
        },
        addHero(lane, hero) {
            const heroes = this.heroes[lane]

            if (heroes.includes(hero)) {
                const index = heroes.findIndex((item) => item === hero)

                if (index !== -1) {
                    heroes.splice(index, 1)
                }
            } else {
                console.log('burada mu ???')
                heroes.push(hero)
            }
        },
        isLaneSelected(lane) {
            return this.lanes.includes(lane)
        },
        isAnyHeroSelected() {
            return Object.values(this.heroes).some((list) => list.length > 0)
        }
    },
    getters: {
        boostingBaseOrder() {
            return {
                customer: customerId,
                booster: this.booster?._id,
                category: 'boosting',
                game: 'league-of-legends',
                server: this.server,
                lanes: this.lanes,
                heroes: this.heroes,
                queue: this.queue
            }
        },
        coachingBaseOrder() {
            return {
                customer: customerId,
                booster: this.coach?._id,
                category: 'coaching',
                game: 'league-of-legends',
                lanes: this.lanes,
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
                    milestone: ['IV', 'III', 'II', 'I'][this.desiredMilestone]
                },
                options: {
                    ...this.getDynamicOptions,
                    isDuo: this.isDuo,
                    premium: this.premium,
                    bonusWin: this.bonusWin
                },
                gainLP: this.gainLP
            }
        },
        winOrder() {
            return {
                ...this.boostingBaseOrder,
                orderType: 'win',
                currentRank: this.currentRank,
                amountGame: this.amountWinGame,
                gainLP: this.gainLP,
                options: {
                    ...this.getDynamicOptions,
                    isDuo: this.isDuo,
                    premium: this.premium,
                    isNotNetWin: this.isNotNetWin
                }
            }
        },
        placementsOrder() {
            return {
                ...this.boostingBaseOrder,
                orderType: 'placements',
                currentRank: this.currentRank,
                amountGame: this.amountPlacementsGame,
                options: {
                    ...this.getDynamicOptions,
                    isDuo: this.isDuo,
                    premium: this.premium,
                    bonusWin: this.bonusWin
                }
            }
        },
        normalGameOrder() {
            return {
                ...this.boostingBaseOrder,
                orderType: 'normal-game',
                map: this.map,
                amountGame: this.amountNormalGame,
                options: {
                    ...this.getDynamicOptions,
                    isDuo: this.isDuo,
                    premium: this.premium,
                    stier: this.stier
                }
            }
        },
        lessonOrder() {
            return {
                ...this.coachingBaseOrder,
                orderType: 'lesson',
                hours: this.coachingHours,
                options: {
                    premium: this.premium
                }
            }
        },
        gameReplayOrder() {
            return {
                ...this.coachingBaseOrder,
                orderType: 'game-replay',
                amountGame: this.amountCoachingGame,
                options: {
                    premium: this.premium
                }
            }
        },
        liveGameOrder() {
            return {
                ...this.coachingBaseOrder,
                orderType: 'live-game',
                amountGame: this.amountCoachingGame,
                options: {
                    premium: this.premium
                }
            }
        },
        playTogetherOrder() {
            return {
                ...this.coachingBaseOrder,
                orderType: 'play-together',
                amountGame: this.amountCoachingGame,
                options: {
                    premium: this.premium
                }
            }
        },

        colors: (state) =>
            LeagueOfLegendsDivisions[state.selectedDivisionIndex],
        currentRank: (state) => {
            return {
                division: state.colors.name,
                milestone: state.milestone,
                currentLP: state.currentLP
            }
        },
        desiredColors: (state) =>
            LeagueOfLegendsDivisions[state.selectedDesiredDivisionIndex],
        maps: (state) => mapColors,
        selectedMap: (state) => mapColors[state.map],
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
        },
        isNotNetWin: (state) => !state.isNotGame
    }
})
