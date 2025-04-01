import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import RecommendationView from "../views/RecommendationView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { 
    path: "/dashboard", 
    name: "Dashboard", 
    component: DashboardView,
    meta: { requiresAuth: true } 
  },
  {
    path: "/recommendations",
    name: "Recommendations",
    component: RecommendationView,
  },
  { path: "/about", name: "About", component: AboutView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// Page transition animation
router.beforeEach((to, from, next) => {
  document.querySelector('body').classList.add('page-transition');
  setTimeout(() => {
    document.querySelector('body').classList.remove('page-transition');
    next();
  }, 300);
});

// Authentication guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Gunakan toast global dari instance Vue
    if (window.$toast) {
      window.$toast.warning('Silakan login terlebih dahulu', {
        position: 'top-right',
        timeout: 3000,
      });
    }
    
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;