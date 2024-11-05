// src/app/api/auth/[action]/route.ts

import { NextRequest, NextResponse } from 'next/server'
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

async function writeData(data: Data): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
}

export async function POST(request: NextRequest, { params }: { params: { action: string } }) {
    const { action } = params
    const body = await request.json()

    if (action === 'login') {
        const { username, password } = body
        const data = await readData()

        // Check both users and patients arrays
        const user = [...data.users, ...data.patients].find(u => u.username === username && u.password === password)

        if (user) {
            return NextResponse.json({ id: user.id, name: user.name, role: user.role })
        } else {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }
    } else if (action === 'signup') {
        const { username, password, email } = body
        const data = await readData()

        // Check if username already exists in both users and patients
        if ([...data.users, ...data.patients].some(u => u.username === username)) {
            return NextResponse.json({ error: 'Username already exists' }, { status: 400 })
        }

        const newPatient: Patient = {
            id: `patient${data.patients.length + 1}`,
            name: username,
            role: 'patient',
            username,
            password,
            email
        }

        data.patients.push(newPatient)
        await writeData(data)

        return NextResponse.json({ message: 'Patient registered successfully' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}