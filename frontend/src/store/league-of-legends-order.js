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
        milestone: 'I',
        currentLP: '0-20LP',
        server: 'Turkey',
        gainLP: '25-20LP',
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
        isSolo: true,
        gameOrNetWin: false,

        bonuwWin: true,
        premium: false,
        highMMR: false,
        untrackable: false,
        soloOnly: false,
        stream: false,
        stier: false,

        map: 'aram',

        queue: 'solo',

        coachingHours: '1 HOUR',

        amountPlacementsGame: '10 GAMES',
        amountNormalGame: '2 GAMES',
        amountCoachingGame: '2 GAMES',
        amountWinGame: '2 GAMES',

        languages: ['ENGLISH'],

        clashTier: 'TIER IV',
        clashAmountGame: '5 GAMES',
        clashAmountBooster: '5 BOOSTER',

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
        },
        async createDivisionOrder(desiredRank) {
            await axios.post('/order', {
                customer: customerId,
                booster: this.booster?._id,
                category: 'boosting',
                game: 'league-of-legends',
                orderType: 'division',
                currentRank: this.currentRank,
                desiredRank: desiredRank,
                server: this.server,
                queue: this.queue,
                gainLP: this.gainLP,
                isSolo: this.isSolo,
                lanes: this.lanes,
                booster: this.booster,
                heroes: this.heroes,
                ...this.getDynamicOptions,
                bonusWin: this.bonuwWin,
                premium: this.premium
            })
        },
        async createWinOrder() {
            await axios.post('/order', {
                customer: customerId,
                booster: this.booster?._id,
                category: 'boosting',
                game: 'league-of-legends',
                orderType: 'win',
                currentRank: this.currentRank,
                server: this.server,
                queue: this.queue,
                amountGame: this.amountWinGame,
                gainLP: this.gainLP,
                isSolo: this.isSolo,
                gameOrNetWin: this.gameOrNetWin,
                lanes: this.lanes,
                heroes: this.heroes,
                ...this.getDynamicOptions,
                premium: this.premium
            })
        },
        async createPlacementsOrder() {
            await axios.post('/order', {
                customer: customerId,
                booster: this.booster?._id,
                category: 'boosting',
                game: 'league-of-legends',
                orderType: 'placements',
                currentRank: this.currentRank,
                server: this.server,
                queue: this.queue,
                amountGame: this.amountPlacementsGame,
                isSolo: this.isSolo,
                lanes: this.lanes,
                heroes: this.heroes,
                ...this.getDynamicOptions,
                premium: this.premium,
                bonusWin: this.bonuwWin
            })
        },
        async createNormalGamesOrder() {
            await axios.post('/order', {
                customer: customerId,
                booster: this.booster?._id,
                category: 'boosting',
                game: 'league-of-legends',
                orderType: 'normal-game',
                map: this.map,
                server: this.server,
                queue: this.queue,
                amountGame: this.amountNormalGame,
                isSolo: this.isSolo,
                lanes: this.lanes,
                heroes: this.heroes,
                stier: this.stier,
                premium: this.premium,
                ...this.getDynamicOptions
            })
        },
        async createClashOrder() {
            await axios.post('/order', {
                customer: customerId,
                category: 'boosting',
                game: 'league-of-legends',
                orderType: 'clash',
                server: this.server,
                clashTier: this.clashTier,
                clashAmountBooster: this.clashAmountBooster,
                amountGame: this.clashAmountGame,
                isSolo: this.isSolo,
                lanes: this.lanes,
                booster: this.booster,
                heroes: this.heroes,
                options: this.options
            })
        },

        async createLessonOrder() {
            await axios.post('/order', {
                customer: customerId,
                booster: this.coach?._id,
                category: 'coaching',
                game: 'league-of-legends',
                orderType: 'lesson',
                currentRank: this.currentRank,
                hours: this.coachingHours,
                languages: this.languages,
                lanes: this.lanes,
                heroes: this.heroes,
                premium: this.premium
            })
        },
        async createGameReplayOrder() {
            console.log('game replay order oluşturuluyor')
            await axios.post('/order', {
                customer: customerId,
                booster: this.coach?._id,
                category: 'coaching',
                game: 'league-of-legends',
                orderType: 'game-replay',
                currentRank: this.currentRank,
                amountGame: this.amountCoachingGame,
                languages: this.languages,
                lanes: this.lanes,
                heroes: this.heroes,
                premium: this.premium
            })
        },
        async createLiveGameOrder() {
            await axios.post('/order', {
                customer: customerId,
                booster: this.coach?._id,
                category: 'coaching',
                game: 'league-of-legends',
                orderType: 'game-replay',
                currentRank: this.currentRank,
                amountGame: this.amountCoachingGame,
                languages: this.languages,
                lanes: this.lanes,
                heroes: this.heroes,
                premium: this.premium
            })
        },
        async createPlayTogetherOrder() {
            await axios.post('/order', {
                customer: customerId,
                booster: this.coach?._id,
                category: 'coaching',
                game: 'league-of-legends',
                orderType: 'game-replay',
                currentRank: this.currentRank,
                amountGame: this.amountCoachingGame,
                languages: this.languages,
                lanes: this.lanes,
                heroes: this.heroes,
                premium: this.premium
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
        },
        maps: (state) => mapColors,
        selectedMap: (state) => mapColors[state.map],
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
