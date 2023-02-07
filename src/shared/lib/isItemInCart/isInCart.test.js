const arr = [{id: 1},{id:2}, {id:3}, {id:4}]

function isItemInCart(arr, cartId) {
	return arr.find(({id}) => id == cartId)
}


test('to be in the cart', () => {
expect(isItemInCart(arr, 4)).toBeTruthy()
})