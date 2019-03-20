import Posts from "views/Posts/Posts";
import Edit from "views/Edit/Edit";

const dashboardRoutes = [
  {
    path: "/dashboard/boards",
    name: "Boards",
    icon: "pe-7s-news-paper",
    component: Posts,
  },
  {
    path: "/dashboard/edit",
    icon: "pe-7s-edit",
    name: "Edit",
    component: Edit,
  },
  { redirect: true, path: "/", to: "/dashboard/boards", name: "Redirect" }
];

export default dashboardRoutes;
