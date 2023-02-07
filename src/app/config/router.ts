import { navigationRoutes } from "@/widgets/Layouts/main-layout/header";
import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import { homeRoutes } from "@/pages/Home";
import { shopRoutes } from "@/pages/Shop";

const history = createBrowserHistory();

const routes = [
  { path: "/", route: [homeRoutes.route, navigationRoutes.goToHomeRoute] },
  { path: "/shop", route: [shopRoutes.route, homeRoutes.goToShopRoute] },
];

export const router = createHistoryRouter({ routes });

router.setHistory(history);
