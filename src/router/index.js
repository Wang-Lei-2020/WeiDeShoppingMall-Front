import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import Login from "@/components/Login";
import Register from "@/components/Register";
import Content from "@/components/Content";
import Seller from "@/components/Seller";
//import SellerIndex from "@/components/SellerIndex";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/content',
        name: 'Content',
        component: Content,
        meta:{requireAuth:true}
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/seller',
        name: 'Seller',
        component: Seller
    }
];

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: routes,
    mode: 'history'
})



export default router
