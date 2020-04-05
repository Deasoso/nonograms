import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ChooseLanguage from './views/ChooseLanguage';
import PageNotFound from './views/NotFound';
import Story from './views/Story';
import Title from './views/Title';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'story',
      component: Story
    },
    {
      path: '/language',
      name: 'choose_language',
      component: ChooseLanguage
    },
    {
      path: '/title',
      name: 'title',
      component: Title
    },
    {
      path: '/:lang/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/:lang/game/:id',
      name: 'game',
      component: () => import('./views/Game.vue')
    },
    {
      path: '/:lang/home',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      name: 'not_found',
      component: PageNotFound
    }
  ]
})
