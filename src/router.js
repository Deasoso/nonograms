import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ChooseLanguage from './views/ChooseLanguage';
import PageNotFound from './views/NotFound';
import Story from './views/Story';
import Title from './views/Title';
import Stages from './views/Stages';
import Finish from './views/Finish';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
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
      path: '/stages',
      name: 'stages',
      component: Stages
    },
    {
      path: '/finish/:id',
      name: 'finish',
      component: Finish
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/game/:id',
      name: 'game',
      component: () => import('./views/Game.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    // {
    //   path: '*',
    //   name: 'not_found',
    //   component: PageNotFound
    // }
  ]
})
