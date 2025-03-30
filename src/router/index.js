import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import RecommendationView from "../views/RecommendationView.vue";
import AboutView from "../views/AboutView.vue";

const routes = [
  { path: "/", 
    name: "Home", 
    component: HomeView 
  },
  { path: "/dashboard", 
    name: "Dashboard", 
    component: DashboardView 
  },
  {
    path: "/recommendations",
    name: "Recommendations",
    component: RecommendationView,
  },
  { path: "/about", 
    name: "About", 
    component: AboutView 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
