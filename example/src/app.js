/**
 * Created by n0m4dz on 2/6/17.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './routes'
import "./sass/app.scss"

Vue.use(VueRouter)

const app = new Vue({
    el: '#app',
    router
})
