// Utilities
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAccount } from '@/store/account'
import io from 'socket.io-client'

const socket = io(process.env.baseURL || 'http://localhost:3000', {
    withCredentials: true
})

export const useOrders = defineStore('useOrders', {
    state: () => ({
        myOrders: [],
        availableOrders: [],
        listeningOrders: false,
        filteredGame: 'league-of-legends'
    }),
    actions: {
        async fetchMyOrdersIfNotFetched() {
            if (this.myOrders.length == 0) {
                const orders = await axios.get(
                    `/order/by-role/${useAccount().role}/${useAccount().userId}`
                )
                console.log('getirdik kendi orderlarımızı ')
                console.log(orders.data)
                this.myOrders = orders.data || null
            }
        },
        async updateMyOrders() {
            const orders = await axios.get(
                `/order/by-role/${useAccount().role}/${useAccount().userId}`
            )

            this.myOrders = orders.data || null
        },
        async takeOrder(orderId) {
            const order = await axios.patch('/order', {
                orderId,
                object: {
                    state: 'assigned',
                    booster: useAccount().userId
                }
            })
            await this.updateMyOrders()
            return order
        },
        startListeningOrders() {
            if (this.listeningOrders) return

            socket.emit('join-orders')

            axios.get('/order/init').then((res) => {
                this.availableOrders = res.data
            })

            socket.on('orders updated', (arg) => {
                console.log('orderlar güncellendi')
                const index = this.availableOrders.findIndex(
                    (item) => item._id == arg._id
                )

                if (index !== -1) {
                    this.availableOrders[index] = arg
                } else {
                    this.availableOrders.push(arg)
                }
                console.log(this.availableOrders)
            })

            this.listeningOrders = true
        },
        joinChat(orderId) {
            console.log('odaya katılındı ' + orderId)
            socket.emit('join-chat-room', orderId)
        },
        leaveChat(orderId) {
            console.log('odadan çıkıldı ' + orderId)
            socket.emit('leave-chat-room', orderId)
        },
        async createOrder(order) {
            await axios.post('/order', order)
            await this.updateMyOrders()
        }
    },
    getters: {
        availableFilteredGameOrders(state) {
            return state.availableOrders.filter(
                (order) =>
                    order.game == state.filteredGame && order.state == 'active'
            )
        },
        availableBoostingOrders() {
            return this.availableFilteredGameOrders.filter(
                (order) => order.category == 'boosting'
            )
        },
        availableCoachingOrders() {
            return this.availableFilteredGameOrders.filter(
                (order) => order.category == 'coaching'
            )
        },
        filteredGameMyOrders(state) {
            return state.myOrders.filter(
                (order) => order.game == state.filteredGame
            )
        },
        getSocket() {
            return socket
        }
    }
})
