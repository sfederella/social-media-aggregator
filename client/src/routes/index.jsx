import Dashboard from "layouts/Dashboard/Dashboard";
import LandingPage from "views/LandingPage/LandingPage";

var indexRoutes = [
  {
    path: "/dashboard", 
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/",
    name: "Landing Page",
    component: LandingPage,
  }
];

export default indexRoutes;
