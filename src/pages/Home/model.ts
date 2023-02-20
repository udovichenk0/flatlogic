import { createEvent, sample } from "effector";

import { homeRoutes } from "@/shared/routing";

import { createGoodsListModel } from "@/entities/product";

export const redirectToShop = createEvent();
export const $$goodsList = createGoodsListModel({ limit: 5 });

const pageOpened = createEvent();

//when page is opened fetch data
sample({
  clock: [homeRoutes.route.opened, pageOpened],
  source: $$goodsList.$goods,
  filter: (goods) => {
    return !goods.length;
  },
  target: $$goodsList.getGoodsFx,
});

// redirect({
//   clock: redirectToShop,
//   route: homeRoutes.goToShopRoute,
// });
/*
make saveFactory factory in feature like

const togleSaveGoods = ({type}:{type: 'CART' | 'WISHLIST'}) => {
  
}
*/
pageOpened();
