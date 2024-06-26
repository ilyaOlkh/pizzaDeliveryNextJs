'use client'

export function getTotalPrice(cart, productsData) {
    let totalPrice = 0
    for (let item in cart) {
        if (productsData[cart[item].id]) {
            totalPrice += +productsData[cart[item].id].price * cart[item].quantity
        }
    }
    return totalPrice
}
