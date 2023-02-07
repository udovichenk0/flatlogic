import { GoodModel } from "@/entities/Cards/Good";
import { createRoute, redirect } from "atomic-router";
import { createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";
import { lazy } from "react";
import { MainLayout } from "../../widgets/Layouts/main-layout";
const HomePageLazy = lazy(() => import("./ui"));

//rouring
const route = createRoute();
const goToShopRoute = createRoute();

export const redirectToShop = createEvent();

export const $$goodsList = GoodModel.createGoodsList({ limit: 5 });

//when page is opened fetch data
sample({
  clock: route.opened,
  source: $$goodsList.$goods,
  filter: (goods) => !goods.length,
  target: $$goodsList.getGoodsFx,
});

redirect({
  clock: redirectToShop,
  route: goToShopRoute,
});

export const homeRoutes = { route, goToShopRoute };

export const HomePage = {
  route,
  view: HomePageLazy,
  layout: MainLayout,
};
/*
make saveFactory factory in feature like

const togleSaveGoods = ({type}:{type: 'CART' | 'WISHLIST'}) => {
  
}
*/
