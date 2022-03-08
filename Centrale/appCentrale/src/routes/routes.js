import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import DashboardSonde from "@/pages/DashboardSonde.vue";
import TableList from "@/pages/TableList.vue";
import Maps from "@/pages/Maps.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "dashboardSonde",
        name: "Sonde",
        component: DashboardSonde,
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true,
        },
        component: Maps,
      },
    ],
  },
];

export default routes;
