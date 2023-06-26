// Utilities
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAccount } from '@/store/account'

const userId = useAccount().user?._id || 'test'
const role = useAccount().user?.role || 'test'

export const useOrders = defineStore('useOrders', {
    state: () => ({
        myOrders: [],
        availableOrders: []
    }),
    actions: {
        async fetchMyOrdersIfNotFetched() {
            console.log('selamlar')
            if (this.myOrders.length == 0) {
                const orders = await axios.get(
                    `/order/by-role/${role}/${userId}`
                )
                console.log(orders)
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
        }
    }
})
