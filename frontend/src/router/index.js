// Composables
import { createRouter, createWebHistory } from 'vue-router'
// repeat code, fix this ??
const routes = [
    {
        path: '',
        name: 'Mainn',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/MainPage.vue')
    },
    {
        path: '/boosting',
        name: 'Boosting',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Boosting.vue')
    },
    {
        path: '/orders',
        name: 'Orders',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Orders.vue')
    },
    {
        path: '/customers',
        name: 'Customers',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Customers.vue')
    },
    {
        path: '/boosters',
        name: 'Boosters',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Boosters.vue')
    },
    {
        path: '/boosters/:id',
        component: () => import('@/views/Booster.vue')
    },
    {
        path: '/customers/:id',
        component: () => import('@/views/Customer.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
