import { createRouter, createWebHistory } from "vue-router";
import CurrentPage from "@/views/CurrentPage.vue";
import DailyPage from "@/views/DailyPage.vue";
import HourlyPage from "@/views/HourlyPage.vue";
import SettingsPage from "@/views/SettingsPage.vue";
import AboutPage from "@/views/AboutPage.vue";

const routes = [
  {
    path: "/",
    name: "current",
    component: CurrentPage,
  },
  {
    path: "/hourly",
    name: "hourly",
    component: HourlyPage,
  },
  {
    path: "/daily",
    name: "daily",
    component: DailyPage,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsPage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
