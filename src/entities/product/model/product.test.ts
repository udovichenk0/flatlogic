import {test, vi,expect} from 'vitest'
import {createGoodsListModel} from "@/entities/product";
import {allSettled, fork} from "effector";
const product = [
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


test('product test', async () => {
    const list = createGoodsListModel({limit: 10})
    const fn = vi.fn(() => ({goods: product}))
    const scope = fork({
        handlers: [
            [list.getGoodsFx, fn]
        ],
        values: [
            [list.$goods, []]
        ]
    })
    const resetScope = fork({
        values: [
            [list.$goods, product]
        ]
    })

    await allSettled(list.getGoods, {scope})
    await allSettled(list.reset, {scope: resetScope})
    expect(fn).toBeCalled()
    expect(fn).toHaveReturnedWith({goods: product})
    expect(scope.getState(list.$goods)).toEqual(product)
    expect(resetScope.getState(list.$goods)).toHaveLength(0)
})