import Vue from "vue";
import Router from "vue-router";
// import Home from "../views/home.vue";

const routes = [
  {
    path: "/",
    redirect: "/home"
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const requireRouter = require.context("@/views/", false, /[A-Za-z]\w+.vue$/);

requireRouter.keys().forEach(fileName => {
  const name = fileName.replace(/^\.\/(.*)\.\w+$/, "$1");
  const component = resolve => require([`@/views/${name}`], resolve);
  let list = [
    {
      path: `/${name}`,
      name: `${name}`,
      component
    }
  ];
  router.addRoutes(list);
});

Vue.use(Router);

router.beforeEach((to, from, next) => {
  to.meta.title && (document.title = to.meta.title);
  next();
});

export default router;
