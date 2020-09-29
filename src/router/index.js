import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import HelloWorld from '@/components/HelloWorld'
import github from '@/components/third_party/github'
import p_404 from '@/components/404'

const routes = [
    {path: '*', component: p_404},
    {path: '/', name: 'HelloWorld', component: HelloWorld},
    {path: '/github', component: github},
    {path: '/github/:id', component: github},
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
