// Composables
import { createRouter, createWebHistory } from 'vue-router'

import { useAccount } from '@/store/account'

import Main from '@/views/MainPage.vue'
import AllOrders from '@/views/AllOrders.vue'
import Customers from '@/views/Customers.vue'
import Customer from '@/views/Customer.vue'
import Boosters from '@/views/Boosters.vue'
import Booster from '@/views/Booster.vue'
import Dashboard from '@/layouts/Dashboard.vue'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
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
        children: [
            {
                path: 'my-orders-customer',
                name: 'MyOrdersCustomer',
                component: () =>
                    import('@/components/order/MyOrdersCustomer.vue')
            },
            {
                path: 'my-orders-booster',
                name: 'MyOrdersBooster',
                component: () =>
                    import('@/components/order/MyOrdersBooster.vue')
            },
            {
                path: 'all-orders',
                name: 'AllOrders',
                component: () => import('@/views/AllOrders.vue')
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/views/Profile.vue')
            }
        ],
        async beforeEnter(to, from, next) {
            await useAccount().fetchSession()
            if (!useAccount().user) return next('/')
            return next()
        }
    },
    {
        path: '/marketplace',
        name: 'Marketplace',
        component: () => import('@/views/Marketplace.vue')
    },
    {
        path: '/coaching',
        name: 'Coaching',
        component: () => import('@/views/Coaching.vue')
    },
    {
        path: '/boosting',
        name: 'Boosting',
        children: [
            {
                path: 'valorant',
                name: 'Valorant',
                component: () => import('@/views/ValorantBoosting.vue'),
                children: [
                    {
                        path: 'division',
                        name: 'Division',
                        component: () =>
                            import(
                                '@/components/boosting/valorant/Division.vue'
                            )
                    },
                    {
                        path: 'win',
                        name: 'Win',
                        component: () =>
                            import('@/components/boosting/valorant/Win.vue')
                    },
                    {
                        path: 'placements',
                        name: 'Placements',
                        component: () =>
                            import(
                                '@/components/boosting/valorant/Placement.vue'
                            )
                    },
                    {
                        path: 'unrated-match',
                        name: 'Unrated',
                        component: () =>
                            import('@/components/boosting/valorant/Unrated.vue')
                    },
                    {
                        path: 'premier',
                        name: 'Premier',
                        component: () =>
                            import('@/components/boosting/valorant/Premier.vue')
                    },
                    {
                        path: 'contracts',
                        name: 'Contracts',
                        component: () =>
                            import(
                                '@/components/boosting/valorant/Contract.vue'
                            )
                    }
                ]
            },
            {
                path: 'league-of-legends',
                name: 'LeagueOfLegends',
                component: () => import('@/views/LeagueOfLegendsBoosting.vue'),
                children: [
                    {
                        path: 'divisions',
                        name: 'Divisions',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Division.vue'
                            )
                    },
                    {
                        path: 'clash',
                        name: 'Clash',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Clash.vue'
                            )
                    },
                    {
                        path: 'mastery',
                        name: 'Mastery',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Mastery.vue'
                            )
                    },
                    {
                        path: 'normal-game',
                        name: 'NormalGame',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Normalgame.vue'
                            )
                    },
                    {
                        path: 'placement',
                        name: 'Placement',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Placements.vue'
                            )
                    },
                    {
                        path: 'winn',
                        name: 'Winn',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Win.vue'
                            )
                    }
                ]
            }
        ]
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
