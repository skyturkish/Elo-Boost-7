// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAccount } from '@/store/account'

const routes = [
    {
        path: '/',
        component: () => import('@/views/Main.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/NotFound.vue')
    },
    {
        path: '/panel',
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
                path: 'boosting-current-offers',
                component: () =>
                    import('@/components/panel/BoostingCurrentOffers.vue')
            },
            {
                path: 'your-eloboost-orders',
                component: () =>
                    import('@/components/panel/YourEloboostOrders.vue')
            },
            {
                path: 'coaching-available-offers',
                component: () =>
                    import('@/components/panel/CoachingAvailableOffers.vue')
            },
            {
                path: 'coaching-current-offers',
                component: () =>
                    import('@/components/panel/CoachingCurrentOffers.vue')
            },
            {
                path: 'your-coaching-orders',
                component: () =>
                    import('@/components/panel/YourCoachingOrders.vue')
            },
            {
                path: 'account-market',
                component: () => import('@/components/panel/AccountMarket.vue')
            },
            {
                path: 'hub',
                component: () => import('@/components/panel/Hub.vue')
            },
            {
                path: 'own-order-detail/:orderId',
                component: () => import('@/components/panel/OwnOrderDetail.vue')
            },
            {
                path: 'order-detail/:orderId',
                component: () => import('@/components/panel/OrderDetail.vue')
            }
        ]
    },
    {
        path: '/marketplace',
        children: [
            {
                path: 'account-shop',
                component: () => import('@/views/UnderConstruct.vue')
            },
            {
                path: 'fresh-accounts',
                component: () => import('@/views/UnderConstruct.vue')
            }
        ]
    },
    {
        path: '/hub',
        children: [
            {
                path: 'league-of-legends',
                component: () => import('@/views/UnderConstruct.vue'),
                children: [
                    {
                        path: 'hub',
                        component: () => import('@/views/UnderConstruct.vue')
                    }
                ]
            },
            {
                path: 'valorant',
                component: () => import('@/views/UnderConstruct.vue'),
                children: [
                    {
                        path: 'hub',
                        component: () => import('@/views/UnderConstruct.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/coaching',
        children: [
            {
                path: 'league-of-legends',
                component: () => import('@/views/LeagueOfLegendsCoaching.vue'),
                children: [
                    {
                        path: 'lesson',
                        component: () =>
                            import(
                                '@/components/coaching/league-of-legends/Lesson.vue'
                            )
                    },
                    {
                        path: 'game-replay',
                        component: () =>
                            import(
                                '@/components/coaching/league-of-legends/GameReplay.vue'
                            )
                    },
                    {
                        path: 'live-game',
                        component: () =>
                            import(
                                '@/components/coaching/league-of-legends/LiveGame.vue'
                            )
                    },
                    {
                        path: 'play-together',
                        component: () =>
                            import(
                                '@/components/coaching/league-of-legends/PlayTogether.vue'
                            )
                    }
                ]
            },
            {
                path: 'valorant',
                component: () => import('@/views/ValorantCoaching.vue'),
                children: [
                    {
                        path: 'lesson',
                        component: () =>
                            import('@/components/coaching/valorant/Lesson.vue')
                    },
                    {
                        path: 'live-game',
                        component: () =>
                            import(
                                '@/components/coaching/valorant/LiveGame.vue'
                            )
                    },
                    {
                        path: 'play-together',
                        component: () =>
                            import(
                                '@/components/coaching/valorant/PlayTogether.vue'
                            )
                    }
                ]
            },
            {
                path: 'team-fight-tactics',
                component: () => import('@/views/UnderConstruct.vue'),
                children: [
                    {
                        path: 'lesson',
                        component: () => import('@/views/UnderConstruct.vue')
                    }
                ]
            },
            {
                path: 'overwatch',
                component: () => import('@/views/UnderConstruct.vue'),
                children: [
                    {
                        path: 'lesson',
                        component: () => import('@/views/UnderConstruct.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/boosting',
        children: [
            {
                path: 'league-of-legends',
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
                        path: 'arena',
                        component: () =>
                            import(
                                '@/components/boosting/league-of-legends/Arena.vue'
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
                component: () => import('@/views/ValorantBoosting.vue'),
                children: [
                    {
                        path: 'division',
                        component: () =>
                            import(
                                '@/components/boosting/valorant/Division.vue'
                            )
                    },
                    {
                        path: 'win',
                        component: () =>
                            import('@/components/boosting/valorant/Win.vue')
                    },
                    {
                        path: 'placements',
                        component: () =>
                            import(
                                '@/components/boosting/valorant/Placement.vue'
                            )
                    },
                    {
                        path: 'unrated-match',
                        component: () =>
                            import('@/components/boosting/valorant/Unrated.vue')
                    },
                    {
                        path: 'premier',
                        component: () =>
                            import('@/components/boosting/valorant/Premier.vue')
                    },
                    {
                        path: 'contracts',
                        component: () =>
                            import(
                                '@/components/boosting/valorant/Contract.vue'
                            )
                    }
                ]
            },
            {
                path: 'team-fight-tactics',
                component: () => import('@/views/UnderConstruct.vue'),
                children: [
                    {
                        path: 'win',
                        component: () => import('@/views/UnderConstruct.vue')
                    }
                ]
            },
            {
                path: 'overwatch',
                component: () => import('@/views/UnderConstruct.vue'),
                children: [
                    {
                        path: 'division',
                        component: () => import('@/views/UnderConstruct.vue')
                    }
                ]
            }
        ]
    },
    {
        path: '/admin',
        component: () => import('@/views/Admin.vue'),
        children: [
            {
                path: 'users',
                component: () => import('@/components/admin/Users.vue')
            },
            {
                path: 'user/:userId',
                component: () => import('@/components/admin/User.vue')
            },
            {
                path: 'reports',
                component: () => import('@/components/admin/Reports.vue')
            }
        ]
    },
    {
        path: '/content',
        component: () => import('@/views/UnderConstruct.vue'),
        children: [
            {
                path: 'coaching-videos',
                component: () => import('@/views/UnderConstruct.vue')
            },
            {
                path: 'otp-guides',
                component: () => import('@/views/UnderConstruct.vue')
            },
            {
                path: 'blog',
                component: () => import('@/views/UnderConstruct.vue')
            }
        ]
    },
    {
        path: '/extra',
        component: () => import('@/views/UnderConstruct.vue'),
        children: [
            {
                path: 'leaderboard',
                component: () => import('@/views/UnderConstruct.vue')
            },
            {
                path: 'legal',
                component: () => import('@/views/UnderConstruct.vue')
            },
            {
                path: 'contact',
                component: () => import('@/views/UnderConstruct.vue')
            },
            {
                path: 'faq',
                component: () => import('@/views/UnderConstruct.vue')
            }
        ]
    },
    {
        path: '/edit-profile',
        component: () => import('@/views/EditProfile.vue')
    },
    {
        path: '/complete-payment/:game/:type',
        component: () => import('@/views/CompletePayment.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
    console.log('beforeEach triggered')
    const rootPathName = to.fullPath.split('/')[1]
    const useAccountStore = useAccount()
    if (useAccountStore.fetchSessionLoading == false) {
        await useAccountStore.fetchSession()
    }

    if (rootPathName == 'panel' || rootPathName == 'edit-profile') {
        if (!useAccountStore.user) return next('/')
        return next()
    } else if (rootPathName == 'admin') {
        if (!(useAccountStore.user?.role == 'admin')) return next('/')
        return next()
    }

    return next()
})

export default router
