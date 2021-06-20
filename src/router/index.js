// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import Home from '@/components/Home';
// import Login from "@/components/Login";
// import Register from "@/components/Register";
// import Content from "@/components/Content";
// import Seller from "@/components/Seller";
// import Comment from "@/components/Comment";
// import UserCommodity from "@/components/UserCommodity";
// import UserComment from "@/components/UserComment";
// import member_index from "../components/member_index";
// import member_dizhi from "../components/member_dizhi";
// import member_addAddress from "@/components/member_addAddress";
// import membert_order from "../components/membert_order";
// import member_shoucang from "../components/member_shoucang";
// import member_safeCenter from "../components/member_safeCenter";
// import member_updateAddress from "../components/member_updateAddress";
// import Seller_ShopOrder from "../components/Seller_ShopOrder";
// import Upload from "@/components/Upload";
// import member_shoppingCar from "@/components/member_shoppingCar";
// import Forum from "@/view/Forum"
// import Hot from "@/view/Hot"
// import Plate from "@/view/Plate"
// import Article from "@/view/Article"
// import Newpost from "@/view/Newpost"
//
// Vue.use(VueRouter)
//
// const routes = [
//     {
//         path: '/',
//         name: 'Index',
//         component: Home
//     },
//     {
//         path: '/login',
//         name: 'Login',
//         component: Login
//     },
//     {
//         path: '/index',
//         name: 'index',
//         component: member_index,
//         meta:{requireAuth:true}
//     },
//     {
//         path: '/ShopOrder',
//         name: '/ShopOrder',
//         component: Seller_ShopOrder,
//         meta:{requireAuth:true}
//
//     },
//     {
//         path: '/register',
//         name: 'Register',
//         component: Register
//     },
//     {
//         path: '/updateAddress',
//         name: 'updateAddress',
//         component: member_updateAddress,
//         meta:{requireAuth:true}
//     },
//     {
//         path: '/address',
//         name: 'address',
//         component: member_dizhi,
//         meta:{requireAuth:true}
//     },
//     {
//         path: '/order',
//         name: 'order',
//         component: membert_order,
//         meta:{requireAuth:true}
//     },
//     {
//         path: '/shoucang',
//         name: 'shoucang',
//         component: member_shoucang,
//         meta:{requireAuth:true}
//     },
//     {
//         path: '/safe',
//         name: 'safe',
//         component: member_safeCenter,
//         meta:{requireAuth:true}
//     },
//     {
//         path: '/addAddress',
//         name: 'addAddress',
//         component: member_addAddress,
//         meta:{requireAuth:true}
//     },
//     {
//         path: '/shoppingCart',
//         name: 'member_shoppingCar',
//         component: member_shoppingCar,
//         meta:{requireAuth:true}
//     },
//     {
//         path: '/content',
//         name: 'Content',
//         component: Content,
//         meta:{requireAuth:true}
//     },
//     {
//         path: '/home',
//         name: 'Home',
//         component: Home
//     },
//     {
//         path: '/seller',
//         name: 'Seller',
//         component: Seller,
//         meta : {requireAuth:true}
//     },
//     {
//         path: '/comment',
//         name: 'Comment',
//         component: Comment,
//         meta : {requireAuth:true}
//     },
//     {
//         path: '/userCommodity',
//         name: 'UserCommodity',
//         component: UserCommodity,
//         meta : {requireAuth:true}
//     },
//     {
//         path: '/userComment',
//         name: 'UserComment',
//         component: UserComment,
//         meta : {requireAuth:true}
//     },
//     {
//         path: '/upload',
//         name: 'Upload',
//         component: Upload,
//         meta : {requireAuth:true}
//     }
// ];
//
// const router = new VueRouter({
//     // mode: 'history',
//     // base: process.env.BASE_URL,
//     routes: routes,
//     mode: 'history'
// })
//
// export default router


import Vue from 'vue'
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import Login from "@/components/Login";
import Register from "@/components/Register";
import Content from "@/components/Content";
import Seller from "@/components/Seller";
import Comment from "@/components/Comment";
import UserCommodity from "@/components/UserCommodity";
import UserComment from "@/components/UserComment";
import member_index from "../components/member_index";
import member_dizhi from "../components/member_dizhi";
import member_addAddress from "@/components/member_addAddress";
import membert_order from "../components/membert_order";
import member_shoucang from "../components/member_shoucang";
import member_safeCenter from "../components/member_safeCenter";
import member_updateAddress from "../components/member_updateAddress";
import Seller_ShopOrder from "../components/Seller_ShopOrder";
import Upload from "@/components/Upload";
import Forum from "@/view/Forum"
import Hot from "@/view/Hot"
import Plate from "@/view/Plate"
import Article from "@/view/Article"
import Newpost from "@/view/Newpost"
import member_shoppingCar from "@/components/member_shoppingCar";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Home,
        meta: {tabType: true}
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {tabType: true}
    },
    {
        path: '/index',
        name: 'index',
        component: member_index,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/ShopOrder',
        name: '/ShopOrder',
        component: Seller_ShopOrder,
        meta:{requireAuth:true,
            tabType: true}

    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {tabType: true}
    },
    {
        path: '/updateAddress',
        name: 'updateAddress',
        component: member_updateAddress,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/address',
        name: 'address',
        component: member_dizhi,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/order',
        name: 'order',
        component: membert_order,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/shoucang',
        name: 'shoucang',
        component: member_shoucang,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/safe',
        name: 'safe',
        component: member_safeCenter,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/addAddress',
        name: 'addAddress',
        component: member_addAddress,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/content',
        name: 'Content',
        component: Content,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {tabType: true}
    },
    {
        path: '/seller',
        name: 'Seller',
        component: Seller,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/comment',
        name: 'Comment',
        component: Comment,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/userCommodity',
        name: 'UserCommodity',
        component: UserCommodity,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/userComment',
        name: 'UserComment',
        component: UserComment,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/upload',
        name: 'Upload',
        component: Upload,
        meta:{requireAuth:true,
            tabType: true}
    },
    {
        path: '/forum',
        name: 'Forum',
        component: Forum,
        meta: {tabType: false}
    },
    {
        path: '/forum/hot',
        name: 'Hot',
        component: Hot,
        meta: {tabType: false}
    },
    {
        path: '/plate',
        name: 'Plate',
        component: Plate,
        meta: {tabType: false}
    },
    {
        path: '/forum/plate',
        name: 'Plate',
        component: Plate,
        meta: {tabType: false}
    },
    {
        path: '/forum/article',
        name: 'Article',
        component: Article,
        meta: {tabType: false}
    },
    {
        path: '/newpost',
        name: 'Newpost',
        component: Newpost,
        meta: {tabType: false}
    },
    {
        path: '/shoppingCart',
        name: 'member_shoppingCar',
        component: member_shoppingCar,
        meta:{requireAuth:true}
    },
];

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: routes,
    mode: 'history'
})

export default router
