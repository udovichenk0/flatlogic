import { navigationRoutes } from "@/widgets/Layouts/main-layout/header";
import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import { homeRoutes } from "@/pages/Home";
import { shopRoutes } from "@/pages/Shop/model";
import { productRoute } from "@/pages/Product";
import { controls, goToProductRoute } from "@/shared/routing";

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
  { path: "/product/:id", route: [productRoute.route, goToProductRoute] },
];

export const router = createHistoryRouter({ routes, controls });

router.setHistory(history);
