import { NextRequest, NextResponse } from 'next/server'
import { getUsers, getPatients, setPatients } from '@/lib/redis'
import { Patient } from '@/types/data'

export async function POST(request: NextRequest, { params }: { params: { action: string } }) {
    const { action } = params
    const body = await request.json()

    if (action === 'login') {
        const { username, password } = body
        const users = await getUsers()
        const patients = await getPatients()

        const user = [...users, ...patients].find(u => u.username === username && u.password === password)

        if (user) {
            return NextResponse.json({ id: user.id, name: user.name, role: user.role })
        } else {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }
    } else if (action === 'signup') {
        const { username, password, email } = body
        const users = await getUsers()
        const patients = await getPatients()

        if ([...users, ...patients].some(u => u.username === username)) {
            return NextResponse.json({ error: 'Username already exists' }, { status: 400 })
        }

        const newPatient: Patient = {
            id: `patient${patients.length + 1}`,
            name: username,
            role: 'patient',
            username,
            password,
            email,
            triageData: []
        }

        await setPatients([...patients, newPatient])

        return NextResponse.json({ message: 'Patient registered successfully' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

