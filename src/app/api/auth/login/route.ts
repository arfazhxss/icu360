// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'
import { TriageData } from '@/utils/types'

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'triage-data.json')

interface User {
    id: string;
    name: string;
    role: string;
    username: string;
    password: string;
}

interface Patient extends User {
    email: string;
}

interface Data {
    users: User[];
    patients: Patient[];
    triageData: TriageData[];
}

async function readData(): Promise<Data> {
    const data = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(data)
}

export async function POST(request: NextRequest) {
    const { username, password } = await request.json()
    const data = await readData()

    const user = [...data.users, ...data.patients].find(u => u.username === username && u.password === password)

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