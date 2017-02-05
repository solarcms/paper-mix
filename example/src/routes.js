/**
 * Created by n0m4dz on 2/6/17.
 */
import VueRouter from 'vue-router'

let routes = [
    {
        path: '/',
        component: require('./components/home.vue')
    },

    {
        path: '/about',
        component: require('./components/about.vue')
    }
]

export default new VueRouter({
    routes
})