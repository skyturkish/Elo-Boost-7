// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'
import {
    LeagueOfLegendsDivisions,
    mapColors
} from '@/constants/league-of-legends-constants'
import { useAccount } from '@/store/account'

export const useLeagueOfLegendsOrder = defineStore('LeagueOfLegendsOrder', {
    state: () => ({
        milestone: 'I',
        currentLP: '0-20LP',
        server: 'Turkey',
        gainLP: '25-20LP',
        isSolo: true,
        lanes: [],
        booster: null,
        champions: {
            top: [],
            jungle: [],
            mid: [],
            adc: [],
            support: []
        },
        queue: 'solo',
        bonuwWin: true,
        premium: false,
        highMMR: false,
        untrackable: false,
        soloOnly: false,
        stream: false,
        selectedDivisionIndex: 3,
        map: 'aram',
        normalGameAmount: '2 GAMES',
        clashTier: 'TIER IV',
        clashAmountGame: '5 GAMES',
        clashAmountBooster: '5 BOOSTER',
        coachingHours: '1 HOUR',
        languages: ['ENGLISH'],
        coachingGamesAmount: '2 GAMES',
        amountWinGame: '2 GAMES',
        gameOrNetWin: false
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
        addChampion(lane, champion) {
            const champions = this.champions[lane]

            if (champions.includes(champion)) {
                const index = champions.findIndex((item) => item === champion)

                if (index !== -1) {
                    champions.splice(index, 1)
                }
            } else {
                console.log('burada mu ???')
                champions.push(champion)
            }
        },
        isLaneSelected(lane) {
            return this.lanes.includes(lane)
        },
        isAnyChampionSelected() {
            return Object.values(this.champions).some((list) => list.length > 0)
        },
        async createDivisionOrder(desiredRank) {
            await axios.post('/order', {
                customer: useAccount().user?._id || 'test',
                booster: this.booster?._id,
                gameType: 'league-of-legends',
                orderType: 'division',
                currentRank: this.currentRank,
                desiredRank: desiredRank,
                server: this.server,
                queue: this.queue,
                gainLP: this.gainLP,
                isSolo: this.isSolo,
                lanes: this.lanes,
                booster: this.booster,
                champions: this.champions,
                ...this.getDynamicOptions,
                bonusWin: this.bonuwWin,
                premium: this.premium
            })
        },
        async createWinOrder(amountGame) {
            await axios.post('/order', {
                customer: useAccount().user?._id || 'test',
                booster: this.booster?._id,
                gameType: 'league-of-legends',
                orderType: 'win',
                currentRank: this.currentRank,
                server: this.server,
                queue: this.queue,
                amountGame: this.amountWinGame,
                gainLP: this.gainLP,
                isSolo: this.isSolo,
                gameOrNetWin: this.gameOrNetWin,
                lanes: this.lanes,
                champions: this.champions,
                ...this.getDynamicOptions,
                premium: this.premium
            })
        },
        async createPlacementsOrder(amountGame) {
            await axios.post('/order', {
                customer: useAccount().user._id || 'test',
                gameType: 'league-of-legends',
                orderType: 'placements',
                currentRank: this.currentRank,
                server: this.server,
                isSolo: this.isSolo,
                lanes: this.lanes,
                booster: this.booster,
                champions: this.champions,
                queue: this.queue,
                options: this.options,
                amountGame: amountGame
            })
        },
        async createNormalGamesOrder() {
            await axios.post('/order', {
                customer: useAccount().user._id || 'test',
                gameType: 'league-of-legends',
                orderType: 'normal-game',
                map: this.map,
                amountGame: this.normalGameAmount,
                server: this.server,
                isSolo: this.isSolo,
                lanes: this.lanes,
                booster: this.booster,
                champions: this.champions,
                queue: this.queue,
                options: this.options
            })
        },
        async createClashOrder() {
            await axios.post('/order', {
                customer: useAccount().user._id || 'test',
                gameType: 'league-of-legends',
                orderType: 'clash',
                server: this.server,
                clashTier: this.clashTier,
                clashAmountBooster: this.clashAmountBooster,
                amountGame: this.clashAmountGame,
                isSolo: this.isSolo,
                lanes: this.lanes,
                booster: this.booster,
                champions: this.champions,
                options: this.options
            })
        },
        async createLessonOrder(coach) {
            await axios.post('/coaching', {
                customer: useAccount().user._id || 'test',
                gameType: 'league-of-legends',
                coachingType: 'lesson',
                coach: coach,
                champions: this.champions,
                server: this.server,
                currentRank: this.currentRank,
                coachingHours: this.coachingHours,
                languages: this.languages,
                options: this.options
            })
        },
        async createGameReplayOrder(coach) {
            await axios.post('/coaching', {
                customer: useAccount().user._id || 'test',
                gameType: 'league-of-legends',
                coachingType: 'game-replay',
                coach: coach,
                champions: this.champions,
                server: this.server,
                currentRank: this.currentRank,
                coachingGamesAmount: this.coachingGamesAmount,
                languages: this.languages,
                options: this.options
            })
        },
        async createLiveGameOrder(coach) {
            await axios.post('/coaching', {
                customer: useAccount().user._id || 'test',
                gameType: 'league-of-legends',
                coachingType: 'game-replay',
                coach: coach,
                champions: this.champions,
                server: this.server,
                currentRank: this.currentRank,
                coachingGamesAmount: this.coachingGamesAmount,
                languages: this.languages,
                options: this.options
            })
        },
        async createPlayTogetherOrder(coach) {
            await axios.post('/coaching', {
                customer: useAccount().user._id || 'test',
                gameType: 'league-of-legends',
                coachingType: 'game-replay',
                coach: coach,
                champions: this.champions,
                server: this.server,
                currentRank: this.currentRank,
                coachingGamesAmount: this.coachingGamesAmount,
                languages: this.languages,
                options: this.options
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
