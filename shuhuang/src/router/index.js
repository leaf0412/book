import Vue from "vue";
import Router from "vue-router";
// import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/home"
    // name: "home",
    // component: Home
  }
  // {
  //   path: "/category",
  //   name: "category",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "category" */ "../views/Category.vue")
  // }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const requireRouter = require.context("../views/", false, /[A-Za-z]\w+.vue$/);

requireRouter.keys().forEach(fileName => {
  const file = requireRouter(fileName);
  const name = fileName.replace(/^\.\/(.*)\.\w+$/, "$1");
  const path = file.default.__file.replace("src/", "../");
  window.console.log(file);
  window.console.log(file.default.__file);
  window.console.log(name);
  window.console.log(path);
  let list = {
    path: `/${name}`,
    name: `${name}`,
    component: () => import(path)
  };
  routes.push(list);
});

window.console.log(routes);

Vue.use(Router);

router.beforeEach((to, from, next) => {
  to.meta.title && (document.title = to.meta.title);
  next();
});

export default router;
