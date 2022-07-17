import { createWebHistory, createRouter } from "vue-router"

import register from "../components/reg-page.vue"
import login from "../components/login-page.vue"
import ProposeService from "../components/propose-service.vue"
import AddAdmin from "../components/add-admin.vue"
import header from "../components/header-bar.vue"
import HomePage from "../components/categories-page.vue"
import Logout from "../components/log-out.vue"
import AddCategory from "../components/add-category.vue"
import ProposedServices from "../components/proposed-services.vue"
import history from "../components/history-page.vue"
import Upcoming from "../components/upcoming-reservations.vue"
import myservices from "../components/myservices-page.vue"
import ProviderReservation from "../components/provider-reservations.vue"
import ServiceCard from "../components/service-card.vue"
import Profile from "../components/profile-page.vue"
import customers from "../components/users-profiles.vue"
import service_providers from "../components/providers_profiles.vue"
import working_hours from "../components/working-hours.vue"
import reserve from "../components/reservation-page.vue"
import pay from "../components/pay-page.vue"
import myfavorites from "../components/favorites-page.vue"
import notify from "../components/notification-page.vue"
import rate from "../components/add-rating.vue"
import about from "../components/about-page.vue"


const routes = [
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/notify",
    name: "notify",
    component: notify
  },
  {
    path: "/register",
    name: "register",
    component: register
  },
  {
    path: "/header",
    name: "header",
    component: header
  },
  {
    path: "/propose_service",
    name: "ProposeService",
    component: ProposeService
  },
  {
    path: "/add_admin",
    name: "AddAdmin",
    component: AddAdmin
  },
  {
    path: "/",
    name: "HomePage",
    component: HomePage
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  },
  {
    path: '/add_category',
    component: AddCategory
  },
  {
    path: "/proposed_services",
    name: "ProposedServices",
    component: ProposedServices
  },
  {
    path: "/history",
    name: "history",
    component: history
  },
  {
    path: "/upcoming",
    name: "Upcoming",
    component: Upcoming
  },
  {
    path: "/my_services",
    name: "myservices",
    component: myservices
  },
  {
    path: "/ProviderReservation/?id=id",
    name: "ProviderReservation",
    component: ProviderReservation,
    props: true
  },
  {
    path: "/ServiceCard/?id=id",
    name: "ServiceCard",
    component: ServiceCard,
    props: true
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/customers",
    name: "customers",
    component: customers
  },
  {
    path: "/service_providers",
    name: "service_providers",
    component: service_providers
  },
  {
    path: "/working_hours/?id=id",
    name: "working_hours",
    component: working_hours,
    props: true
  },
  {
    path: "/reserve/?id=id",
    name: "reserve",
    component: reserve,
    props: true
  },
  {
    path: "/pay/?id=id",
    name: "pay",
    component: pay,
    props: true
  },
  {
    path: "/myfavorites",
    name: "myfavorites",
    component: myfavorites
  },
  {
    path: "/rate",
    name: "rate",
    component: rate
  },
  {
    path: "/about",
    name: "about",
    component: about
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router