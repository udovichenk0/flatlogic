import { createRoute } from "atomic-router";
import { CardSvg, SearchSvg, UserSvg } from "./assets";

const goToHomeRoute = createRoute();
const goToPagesRoute = createRoute();
const goToShopRoute = createRoute();
const goToBlogRoute = createRoute();

const goToAboutPage = createRoute();
export const routes = [
  { path: goToHomeRoute, label: "Home" },
  {
    path: goToHomeRoute,
    label: "Pages",
    dropItems: [
      { path: goToHomeRoute, label: "About Us" },
      { path: goToHomeRoute, label: "About Team" },
      { path: goToHomeRoute, label: "Contact Us" },
      { path: goToHomeRoute, label: "FAQ" },
      { path: goToHomeRoute, label: "Wishlist" },
    ],
  },
  { path: goToShopRoute, label: "Shop" },
  { path: goToHomeRoute, label: "Blog" },
];

export const iconNavigations = [
  { Icon: SearchSvg, path: goToHomeRoute },
  { Icon: UserSvg, path: goToHomeRoute },
  { Icon: CardSvg, path: goToHomeRoute },
];

export const navigationRoutes = {
  goToHomeRoute,
  goToPagesRoute,
  goToShopRoute,
  goToBlogRoute,
};
