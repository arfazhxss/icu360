import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getUsers, getPatients } from '@/lib/redis'
import { User, Patient } from '@/types/data'

export async function POST(request: NextRequest) {
    const { username, password } = await request.json()

    const users = await getUsers()
    const patients = await getPatients()
    const allUsers: (User | Patient)[] = [...users, ...patients]

    const user = allUsers.find(u => u.username === username && u.password === password)

    if (user) {
        const session = {
            id: user.id,
            name: user.name,
            role: user.role,
            username: user.username
        }

        const cookieStore = cookies()
        cookieStore.set('session', JSON.stringify(session), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        })

        return NextResponse.json(session)
    } else {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
}