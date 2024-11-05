// src/app/api/auth/session/route.ts

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('session')

    if (sessionCookie) {
        return NextResponse.json(JSON.parse(sessionCookie.value))
    } else {
        return NextResponse.json(null)
    }
}