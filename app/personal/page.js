import redirectUrl from "../service/redirect"
import { getOrders } from "../service/getOrders"
import getOrdersProductsByIDs from "../service/getOrdersProductsByIDs"
import ClientPersonalPage from "./clientPage"

import { getNumOfPages } from "../service/getNumOfPages"
import { getUserCookies } from "../AuthControllers/GetDataController"

import { UserProviders } from "../context/contextProvider"

export default async function personalPage(params) {
    const userData = await getUserCookies()
    let NumOfPages = Math.ceil((userData[0] ? (await getNumOfPages(userData[1].customer_id)).count : 1) / process.env.NEXT_PUBLIC_NUM_IN_PAGE)
    NumOfPages = NumOfPages === 0 ? 1 : NumOfPages

    if (!params.searchParams[process.env.NEXT_PUBLIC_ID_FOR_PAGE] ||
        params.searchParams[process.env.NEXT_PUBLIC_ID_FOR_PAGE] < 1 ||
        params.searchParams[process.env.NEXT_PUBLIC_ID_FOR_PAGE] > NumOfPages ||
        !+params.searchParams[process.env.NEXT_PUBLIC_ID_FOR_PAGE]) {
        params.searchParams[process.env.NEXT_PUBLIC_ID_FOR_PAGE] = '1'
        await redirectUrl(`?${new URLSearchParams(params.searchParams)}`)
    }
    let orders = await getOrders(params.searchParams[process.env.NEXT_PUBLIC_ID_FOR_PAGE], process.env.NEXT_PUBLIC_NUM_IN_PAGE) || []
    let OrdersProducts = [];
    if (Object.keys(orders).length > 0) {
        OrdersProducts = await getOrdersProductsByIDs(orders.map(value => value.order_id), params.searchParams[process.env.NEXT_PUBLIC_ID_FOR_PAGE], process.env.NEXT_PUBLIC_NUM_IN_PAGE)
    }
    return (
        <UserProviders orders={orders} ordersDetails={OrdersProducts}>
            <ClientPersonalPage searchParams={params.searchParams} numOfPages={NumOfPages} />
        </UserProviders>
    )
}