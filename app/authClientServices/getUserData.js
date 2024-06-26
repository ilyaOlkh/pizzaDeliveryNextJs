'use client'
import { GetUserInfo } from "@/app/AuthControllers/GetDataController";
import refreshStart from "../authClientServices/refresh";
import redirectUrl from "../service/redirect";

export default async function getUserData() {
    let accessToken = localStorage.getItem('accessToken')
    let response = await GetUserInfo(accessToken)
    if (!response[0]) {
        if (response[1] == 'NeedRefresh') {
            console.log('refreshInit')
            await refreshStart()
            accessToken = localStorage.getItem('accessToken')
            response = await GetUserInfo(accessToken)
            return response
        } else if (response[1] == 'NeedAuth') {
            alert('потрібна авторизация')
            console.log('перекидаю на головну сторінку')
            let url = process.env.NEXT_PUBLIC_GLOBAL_URL
            redirectUrl(url)
            return
        } else if (response[1] == 'IDs are not equal') {
            alert('невідповідність айді')
            console.log('перекидаю на головну сторінку')
            let url = process.env.NEXT_PUBLIC_GLOBAL_URL
            redirectUrl(url)
            return
        }
    } else {
        return (response)
    }
}