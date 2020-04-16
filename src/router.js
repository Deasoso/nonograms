import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ChooseLanguage from './views/ChooseLanguage';
import PageNotFound from './views/NotFound';
import Story from './views/Story';
import Title from './views/Title';
import Stages from './views/Stages';
import Finish from './views/Finish';
import TeachGame1 from './views/TeachGame1';
import TeachFinish1 from './views/TeachFinish1';
import TeachGame2 from './views/TeachGame2';
import TeachFinish2 from './views/TeachFinish2';

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
      path: '/teachgame1',
      name: 'teachgame1',
      component: TeachGame1
    },
    {
      path: '/teachfinish1',
      name: 'teachfinish1',
      component: TeachFinish1
    },
    {
      path: '/teachgame2',
      name: 'teachgame2',
      component: TeachGame2
    },
    {
      path: '/teachfinish2',
      name: 'teachfinish2',
      component: TeachFinish2
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
