// Composables
import { createRouter, createWebHistory } from 'vue-router'

import { useAccount } from '@/store/account'

import Main from '@/views/MainPage.vue'
import Boosting from '@/views/Boosting.vue'
import Orders from '@/views/Orders.vue'
import Customers from '@/views/Customers.vue'
import Customer from '@/views/Customer.vue'
import Boosters from '@/views/Boosters.vue'
import Booster from '@/views/Booster.vue'

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
        path: '/orders',
        name: 'Orders',
        component: Orders
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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Dashboard.vue'),
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
