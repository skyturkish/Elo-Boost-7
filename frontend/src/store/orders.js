// Utilities
import { defineStore } from 'pinia'

import axios from 'axios'
import io from 'socket.io-client'

const socket = io(process.env.baseURL || 'http://localhost:3000', {
    withCredentials: true
})

export const useOrders = defineStore('orders', {
    state: () => ({
        orders: []
    }),
    actions: {
        getAllOrders() {
            console.log('ama buraya giriyor')
            socket.on('orders updated', (arg) => {
                console.log('burası çalıştı')
                console.log(arg)
                this.orders = arg
            })
        }
    }
})
