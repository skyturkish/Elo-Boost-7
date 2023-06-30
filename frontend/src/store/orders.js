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
        startListeningToOrders() {
            console.log('dinleyecek miyim acaba')
            if (this.listeningOrders) return
            console.log('dinlemeye başladım omruk')

            socket.emit('join-orders')

            axios.get('/order/init').then((res) => {
                this.availableOrders = res.data
            })

            socket.on('orders updated', (arg) => {
                console.log('orderslar tetiklendi')
                this.availableOrders = arg
            })

            this.listeningOrders = true
        },
        }
    }
})
