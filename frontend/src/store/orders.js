// Utilities
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAccount } from '@/store/account'
import io from 'socket.io-client'

const socket = io(process.env.baseURL || 'http://localhost:3000', {
    withCredentials: true
})

const userId = useAccount().user?._id || 'test'
const role = useAccount().user?.role || 'test'

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
                    `/order/by-role/${role}/${userId}`
                )
                this.myOrders = orders.data || null
            }
        },
        updateMyOrders() {
            axios.get(`/order/by-role/${role}/${userId}`).then((res) => {
                this.myOrders = res.data || null
            })
        },
        async takeOrder(orderId) {
            const order = await axios.patch('/order', {
                orderId,
                object: {
                    state: 'assigned',
                    booster: userId
                }
            })
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
        }
    },
    getters: {
        availableFilteredGameOrders(state) {
            return state.availableOrders.filter(
                (order) =>
                    order.state == 'active' && order.game == state.filteredGame
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
        }
    }
})
