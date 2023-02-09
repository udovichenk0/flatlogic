import { allSettled, createEffect, createEvent, fork, sample } from "effector";
import { createCartModel } from "./model";
const model = createCartModel();

const fakeItem = {
  description: "a;osdifjasdf",
  id: "asdiafsodfi",
  price: 20,
  title: "asdfasdf",
  type: "asdfasdf",
  url: "adfjasdifjio",
};
test("tesing", async () => {
  const mock = jest.fn();
  const scope = fork({
    handlers: [[model.addToCartFx, mock]],
  });
  await allSettled(model.startAddingToCart, { scope, params: fakeItem });

  expect(mock).toBeCalledWith({ data: fakeItem, id: "xVoU1CfS4uLTgPz3gkJK" });
});
