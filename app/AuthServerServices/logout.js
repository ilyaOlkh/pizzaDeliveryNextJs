'use server'
import logoutService from '@/app/AuthServerServices/logout'
import { cookies } from 'next/headers'
import { removeToken } from '@/app/AuthServerServices/tokenServices'

export default async function logout() {
    const refreshtoken = cookies().get('refreshtoken')
    if (refreshtoken) {
        const res = await removeToken(refreshtoken.value)
        cookies().delete('refreshtoken')
        return res
    } else {
        throw 'вы не вошли!'
    }
}