import { createRouter, createWebHistory } from 'vue-router';
const About = { template: '<div>About</div>' }
const Home = {template: '<tempalte>Home</tempalte>'}
const routes = [
    { path: '/', component: () => import('./components/Home.vue') },
    // { path: '/hello', component: () => import('./components/HelloWorld.vue') },
    { path: '/about', component:  import('./components/About.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./components/NotFound.vue') },
    { path: '/home', component: import('./components/Home.vue') },
    { path: '/trending', component: import('./components/Trending.vue') },
  ]
  
  // 3. Create the router instance and pass the `routes` option
  // You can pass in additional options here, but let's
  // keep it simple for now.
  const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })
  
export default router;