import {test, expect, vitest, vi} from 'vitest'
import {allSettled, fork} from "effector";
import {$testStore, createCartModel, testEvent} from "@/features/cart/toggle-favorite/model";
import {Product} from "@/shared/api/Products";
import { cartModel } from '@/entities/cart';
import {CartItem} from "@/shared/api/User";
const cart = [
    {
        title: "Some flower",
        reviews: [
            {
                comment: "sdfsdfasdf",
                userId: "xVoU1CfS4uLTgPz3gkJK",
                rate: 3,
                avatar_url: "https://flatlogic-ecommerce.herokuapp.com/_next/static/images/avatar-0dc1644847fbbf98f329c7b6b8443391.svg",
                fullname: "Michael Daineka",
                date: {
                    seconds: 1676728016,
                    nanoseconds: 187000000
                }
            }
        ],
        price: 20,
        url: "https://firebasestorage.googleapis.com/v0/b/flatlogic-bb6a9.appspot.com/o/goods.png?alt=media&token=f03a7198-1a6f-4782-96e9-1dec8509dbd6",
        type: "Lighting",
        id: "M3b5tvJd4ujUfoy9ZjrU",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam."
    }
]

const product:Product = {
    title: "Cool Flower",
    price: 20,
    description: "dassdfasdfasdf",
    type: "Decoration",
    url: "https://firebasestorage.googleapis.com/v0/b/flatlogic-bb6a9.appspot.com/o/goods.png?alt=media&token=f03a7198-1a6f-4782-96e9-1dec8509dbd6",
    reviews: [],
    id: "3or2AjViewkErr9FMhoT"
}

const product2 = {
    title: "Some flower",
    reviews: [
        {
            comment: "sdfsdfasdf",
            userId: "xVoU1CfS4uLTgPz3gkJK",
            rate: 3,
            avatar_url: "https://flatlogic-ecommerce.herokuapp.com/_next/static/images/avatar-0dc1644847fbbf98f329c7b6b8443391.svg",
            fullname: "Michael Daineka",
            date: {
                seconds: 1676728016,
                nanoseconds: 187000000
            }
        }
    ],
    price: 20,
    url: "https://firebasestorage.googleapis.com/v0/b/flatlogic-bb6a9.appspot.com/o/goods.png?alt=media&token=f03a7198-1a6f-4782-96e9-1dec8509dbd6",
    type: "Lighting",
    id: "M3b5tvJd4ujUfoy9ZjrU",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ultricies aliquam."
}


test('should toggle favorite', async () => {
    const $$cartModel = createCartModel()
    const {favoriteToggled} = $$cartModel
    const fn = vi.fn((_,{product,cart}:{product:CartItem, cart:CartItem[]}) => {
        const isProductInCart = cart.find(({ id }) => id == product.id);

        if (isProductInCart) {
            return cart.filter(({ id }) => id != product.id);
        } else {
            return [...cart, product]
        }
    })
    const scope = fork({
        handlers: [
            [$$cartModel.toggleCartFromLSFx, fn],
        ],
        values: [
            [cartModel.$cart, cart]
        ]
    })
    await allSettled(favoriteToggled, {
        scope,
        params: product
    })

    expect(fn).toBeCalled()
    expect(fn).toHaveBeenCalledOnce()
    expect(scope.getState(cartModel.$cart)).toEqual([...cart,product])

    await allSettled(favoriteToggled, {
        scope,
        params: product2
    })

    expect(scope.getState(cartModel.$cart)).toEqual([product])
})
