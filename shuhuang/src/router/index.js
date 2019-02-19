import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  }
];

const router = new VueRouter({
  mode: "hash",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

const requireRouter = require.context("@/views/", true, /[A-Za-z]\w+.vue$/);

requireRouter.keys().forEach(fileName => {
  const name = fileName.replace(/^\.\/(.*)\.\w+$/, "$1");
  const component = resolve => require([`@/views/${name}`], resolve);
  const componentConfig = requireRouter(fileName);
  let path = componentConfig.default.name;
  const reg = RegExp(/id/);
  if (reg.test(path)) {
    path = path.replace("-", "/:");
  }
  const list = [
    {
      path: `/${path}`,
      name: `${name}`,
      component
    }
  ];
  router.addRoutes(list);
});

router.beforeEach((to, from, next) => {
  to.meta.title && (document.title = to.meta.title);
  next();
});

export default router;
