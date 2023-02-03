import { navigationRoutes } from "@/widgets/Layouts/main-layout/header";
import { createHistoryRouter } from "atomic-router";
import { createBrowserHistory } from "history";
import { homeRoutes } from "@/pages/Home";

const history = createBrowserHistory();

const routes = [
  { path: "/", route: [homeRoutes.route, navigationRoutes.goToHomeRoute] },
];

export const router = createHistoryRouter({ routes });

router.setHistory(history);
