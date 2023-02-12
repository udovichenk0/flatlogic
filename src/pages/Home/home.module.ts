import { goodModel } from "@/entities/Cards/Good";
import { createRoute, redirect } from "atomic-router";
import { createEvent, sample } from "effector";
import { lazy } from "react";
import { MainLayout } from "../../widgets/Layouts/main-layout";
const HomePageLazy = lazy(() => import("./ui"));

//rouring
const route = createRoute();
export const redirectToShop = createEvent();

export const $$goodsList = goodModel.createGoodsListModel({ limit: 5 });

//when page is opened fetch data
sample({
  clock: route.opened,
  source: $$goodsList.$goods,
  filter: (goods) => {
    return !goods.length;
  },
  target: $$goodsList.getGoodsFx,
});

// redirect({
//   clock: redirectToShop,
//   route: goToShopRoute,
// });

export const homeRoutes = { route };

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
