import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue'
import ArticlePage from '@/views/ArticlePage.vue'
import ShowCase from '@/views/ShowCase.vue'
import ResourcesPage from '@/views/ResourcesPage.vue'
import ArticleReadPage from '@/views/ArticleReadPage.vue'
import EditorPage from '@/views/EditorPage.vue'
import ArticleListView from '@/views/ArticleListView.vue';

const routes = [
  {
    path: '/',
    redirect: '/article/list'
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      title:"111"
    },
    children: [
      {
        path: '/article',
        name: 'article',
        component: ArticlePage,
        children: [
          {
            path: '/article/list',
            name: 'articleList',
            component: ArticleListView
          },
          {
            path: '/article/:id',
            name: 'articleId',
            component: ArticleReadPage
          }
        ]
      },
      {
        path: '/show',
        name: 'show',
        component: ShowCase
      },
      {
        path: '/resources',
        name: 'resources',
        component: ResourcesPage
      }
     
    ]
  },

];
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;