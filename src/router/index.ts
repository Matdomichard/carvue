import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/HomePage.vue") },
    { path: "/register", component: () => import("../views/RegisterPage.vue") },
    { path: "/sign-in", component: () => import("../views/SignIn.vue") },
  ],
});

export default router;
