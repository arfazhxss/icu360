// src/app/api/auth/signout/route.ts

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
    const cookieStore = cookies()
    cookieStore.delete('session')

    return NextResponse.json({ message: 'Signed out successfully' })
}