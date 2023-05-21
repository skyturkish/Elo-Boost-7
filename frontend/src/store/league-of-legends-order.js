// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'

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
        colors: {
            rank: 4,
            dominantColor: '#795700',
            shadowColor: '#FBFAF8',
            borderColor: '#EEAF0C',
            buttonColor: '#EEAF0C',
            name: 'gold'
        }
    }),
    actions: {
        // async createOrder({ customer, orderType, desiredRank }) {
        //     console.log('league of legends storun içindeyim')
        //     await axios.post('/order', {
        //         customer: customer,
        //         state: 'active',
        //         gameType: 'LeagueOfLegends',
        //         orderType: orderType,
        //         currentRank: this.currentRank,
        //         desiredRank: desiredRank,
        //         server: this.server,
        //         gainLP: this.gainLP,
        //         isSolo: this.isSolo,
        //         lanes: this.lanes,
        //         champions: this.champions,
        //         options: this.options
        //     })
        // }
    }
})
