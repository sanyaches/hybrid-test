import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyContacts from "../views/MyContacts";
import Post from "../components/Post";
import Posts from "../components/Posts";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home,
    redirect: '/posts/1'
  },
  {
    path: '/posts/:id',
    name: 'posts',
    component: Posts
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: MyContacts,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
