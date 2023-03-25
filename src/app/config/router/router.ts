import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";

import {
  accountRoutes,
  controls,
  homeRoutes,
  signInRoutes,
  productRoutes,
  shopRoutes,
  signUpRoutes, adminRoutes,
} from "@/shared/routing";

import { navigationRoutes } from "@/widgets/Layouts/main-layout/header";

const history = createBrowserHistory();
const routes = [
  {
    path: "/",
    route: [homeRoutes.route, navigationRoutes.goToHomeRoute],
  },
  {
    path: "/shop",
    route: [
      shopRoutes.route,
      navigationRoutes.goToShopRoute,
      homeRoutes.goToShopRoute,
    ],
  },
  { path: "/product/:id", route: [productRoutes.route, homeRoutes.goToProductRoute, shopRoutes.goToProductRoute] },
  {
    path: "/account",
    route: [accountRoutes.route, navigationRoutes.goToAccountRoute],
  },
  {
    path: "/signin",
    route: [signInRoutes.route],
  },
  {
    path: "/signup",
    route: [signUpRoutes.route],
  },
  {
    path: '/admin',
    route: adminRoutes.route
  }
];

export const router = createHistoryRouter({ routes, controls });

router.setHistory(history);
