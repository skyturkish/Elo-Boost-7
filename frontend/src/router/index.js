// Composables
import { createRouter, createWebHistory } from 'vue-router'

import { useAccount } from '@/store/account'

import Main from '@/views/MainPage.vue'
import Boosting from '@/views/Boosting.vue'
import AllOrders from '@/views/AllOrders.vue'
import Customers from '@/views/Customers.vue'
import Customer from '@/views/Customer.vue'
import Boosters from '@/views/Boosters.vue'
import Booster from '@/views/Booster.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/boosting',
        name: 'Boosting',
        component: Boosting
    },
    {
        path: '/allOrders',
        name: 'AllOrders',
        component: AllOrders
    },
    {
        path: '/customers',
        name: 'Customers',
        component: Customers
    },
    {
        path: '/customers/:id',
        component: Customer
    },
    {
        path: '/boosters',
        name: 'Boosters',
        component: Boosters
    },
    {
        path: '/boosters/:id',
        component: Booster
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        async beforeEnter(to, from, next) {
            await useAccount().fetchSession()
            if (!useAccount().user) return next('/')
            return next()
        }
    },
    {
        path: '/chat/:orderId',
        name: 'Chat',
        component: () => import('@/views/Chat.vue'),
        async beforeEnter(to, from, next) {
            await useAccount().fetchSession()
            if (!useAccount().user) return next('/')
            return next()
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
