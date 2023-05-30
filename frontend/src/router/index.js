// Composables
import { createRouter, createWebHistory } from 'vue-router'

import { useAccount } from '@/store/account'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/MainPage.vue')
    },
    {
        path: '/allOrders',
        name: 'AllOrders',
        component: () => import('@/views/AllOrders.vue')
    },
    {
        path: '/customers',
        name: 'Customers',
        component: () => import('@/views/Customers.vue')
    },
    {
        path: '/customers/:id',
        component: () => import('@/views/Customer.vue')
    },
    {
        path: '/boosters',
        name: 'Boosters',
        component: () => import('@/views/Boosters.vue')
    },
    {
        path: '/boosters/:id',
        component: () => import('@/views/Booster.vue')
    },
    {
        path: '/panel',
        name: 'Panel',
        component: () => import('@/views/Panel.vue'),
        children: [
            {
                path: 'dashboard',
                component: () => import('@/components/panel/Dashboard.vue')
            },
            {
                path: 'boosting-available-offers',
                component: () =>
                    import('@/components/panel/BoostingAvailableOffers.vue')
            },
            {
                path: 'boosting-current-orders',
                component: () =>
                    import('@/components/panel/BoostingCurrentOffers.vue')
            },
            {
                path: 'coaching-available-offers',
                component: () =>
                    import('@/components/panel/CoachingAvailableOffers.vue')
            },
            {
                path: 'coaching-current-orders',
                component: () =>
                    import('@/components/panel/CoachingCurrentOffers.vue')
            },
            {
                path: 'account-market',
                component: () => import('@/components/panel/AccountMarket.vue')
            },
            {
                path: 'hub',
                component: () => import('@/components/panel/Hub.vue')
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
        children: [
            {
                path: 'league-of-legends',
                name: 'LeagueOfLegendsCoaching',
                component: () => import('@/views/LeagueOfLegendsCoaching.vue'),
                children: [
                    {
                        path: 'lesson',
                        name: 'Lesson',
                        component: () =>
                            import(
                                '@/components/coaching/league-of-legends/Lesson.vue'
                            )
                    },
                    {
                        path: 'game-replay',
                        name: 'GameReplay',
                        component: () =>
                            import(
                                '@/components/coaching/league-of-legends/GameReplay.vue'
                            )
                    },
                    {
                        path: 'live-game',
                        name: 'LiveGame',
                        component: () =>
                            import(
                                '@/components/coaching/league-of-legends/LiveGame.vue'
                            )
                    },
                    {
                        path: 'play-together',
                        name: 'PlayTogether',
                        component: () =>
                            import(
                                '@/components/coaching/league-of-legends/PlayTogether.vue'
                            )
                    }
                ]
            },
            {
                path: 'valorant',
                name: 'ValorantCoaching',
                component: () => import('@/views/ValorantCoaching.vue'),
                children: [
                    {
                        path: 'lesson',
                        name: 'ValorantLesson',
                        component: () =>
                            import('@/components/coaching/valorant/Lesson.vue')
                    },
                    {
                        path: 'live-game',
                        name: 'ValorantLiveGame',
                        component: () =>
                            import(
                                '@/components/coaching/valorant/LiveGame.vue'
                            )
                    },
                    {
                        path: 'play-together',
                        name: 'ValorantPlayTogether',
                        component: () =>
                            import(
                                '@/components/coaching/valorant/PlayTogether.vue'
                            )
                    }
                ]
            }
        ]
    },
    {
        path: '/boosting',
        name: 'Boosting',
        children: [
            {
                path: 'league-of-legends',
                name: 'LeagueOfLegends',
                component: () => import('@/views/LeagueOfLegendsBoosting.vue'),
                children: [
                    {
                        path: 'division',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Division.vue'
                            )
                    },
                    {
                        path: 'clash',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Clash.vue'
                            )
                    },
                    {
                        path: 'mastery',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Mastery.vue'
                            )
                    },
                    {
                        path: 'normal-game',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/NormalGame.vue'
                            )
                    },
                    {
                        path: 'placement',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Placements.vue'
                            )
                    },
                    {
                        path: 'win',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Win.vue'
                            )
                    }
                ]
            },
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
