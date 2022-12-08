import JwtService from "@/core/services/JwtService";
import { useUserStore } from "@/stores/user.store";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/scheduler",
      component: () => import("@/layouts/main-layout/MainLayout.vue"),
      meta: {
        middleware: "auth",
      },
      children: [
        {
          path: "/scheduler",
          name: "scheduler",
          component: () => import("@/views/Scheduler.vue"),
          meta: {
            pageTitle: "Scheduler",
            breadcrumbs: ["Scheduler"],
          },
        },
      ],
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("@/layouts/authentication/SignIn.vue"),
      meta: {
        pageTitle: "Sign In",
      },
    },
    {
      path: "/",
      component: () => import("@/layouts/SystemLayout.vue"),
      children: [
        {
          // the 404 route, when none of the above matches
          path: "/404",
          name: "404",
          component: () => import("@/layouts/Error404.vue"),
          meta: {
            pageTitle: "Error 404",
          },
        },
        {
          path: "/500",
          name: "500",
          component: () => import("@/layouts/Error500.vue"),
          meta: {
            pageTitle: "Error 500",
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
});

router.beforeEach((to, from, next) => {
  // current page view title
  document.title = `${to.meta.pageTitle} - ${import.meta.env.VITE_VUE_APP_NAME}`;

  const store = useUserStore();

  // verify auth token before each page change
  store.verifyAuth({ api_token: JwtService.getToken() });

  // before page access check if page requires authentication
  if (to.meta.middleware == "auth") {
    if (store.isUserAuthenticated) {
      next();
    } else {
      next({ name: "sign-in" });
    }
  } else {
    next();
  }

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;
