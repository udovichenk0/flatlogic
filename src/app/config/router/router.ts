import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";

import {
  accountRoutes,
  controls,
  goToProductRoute,
  homeRoutes,
  productRoutes,
  shopRoutes,
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
  { path: "/product/:id", route: [productRoutes.route, goToProductRoute] },
  {
    path: "/account",
    route: [accountRoutes.route, navigationRoutes.goToAccountRoute],
  },
];

export const router = createHistoryRouter({ routes, controls });

router.setHistory(history);
