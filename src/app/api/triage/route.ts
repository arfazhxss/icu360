// src/app/api/triage/route.ts

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

interface Patient {
    id: string;
    name: string;
    role: string;
    username: string;
    password: string;
    email: string;
    triageData: TriageData[];
}

interface Data {
    users: User[];
    patients: Patient[];
}

async function readData(): Promise<Data> {
    const data = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(data)
}

async function writeData(data: Data): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
}

export async function GET(): Promise<NextResponse> {
    try {
        const data = await readData()
        const allTriageData = data.patients.flatMap(patient => patient.triageData)
        return NextResponse.json(allTriageData)
    } catch (error) {
        console.error('Error reading triage data:', error)
        return NextResponse.json([], { status: 200 })
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const newData = await request.json() as TriageData
        const data = await readData()

        const patientIndex = data.patients.findIndex(p => p.id === newData.patientId)
        if (patientIndex === -1) {
            return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
        }

        // Initialize triageData array if it doesn't exist
        if (!data.patients[patientIndex].triageData) {
            data.patients[patientIndex].triageData = []
        }

        data.patients[patientIndex].triageData.push(newData)
        await writeData(data)

        return NextResponse.json({
            message: 'Triage data added successfully',
            data: newData
        })
    } catch (error) {
        console.error('Error adding triage data:', error)
        return NextResponse.json({
            message: 'Error adding triage data',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
    try {
        const { id, patientId, ...updateData } = await request.json() as TriageData & { patientId: string }
        const data = await readData()

        const patientIndex = data.patients.findIndex(p => p.id === patientId)
        if (patientIndex === -1) {
            return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
        }

        const triageIndex = data.patients[patientIndex].triageData.findIndex(t => t.id === id)
        if (triageIndex === -1) {
            return NextResponse.json({ error: 'Triage data not found' }, { status: 404 })
        }

        data.patients[patientIndex].triageData[triageIndex] = {
            ...data.patients[patientIndex].triageData[triageIndex],
            ...updateData
        }

        await writeData(data)

        return NextResponse.json({
            message: 'Triage data updated successfully',
            data: data.patients[patientIndex].triageData[triageIndex]
        })
    } catch (error) {
        console.error('Error updating triage data:', error)
        return NextResponse.json({
            message: 'Error updating triage data',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        const { id, patientId } = await request.json() as { id: string, patientId: string }
        const data = await readData()

        const patientIndex = data.patients.findIndex(p => p.id === patientId)
        if (patientIndex === -1) {
            return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
        }

        data.patients[patientIndex].triageData = data.patients[patientIndex].triageData.filter(t => t.id !== id)
        await writeData(data)

        return NextResponse.json({
            message: 'Triage data deleted successfully',
            data: data.patients[patientIndex].triageData
        })
    } catch (error) {
        console.error('Error deleting triage data:', error)
        return NextResponse.json({
            message: 'Error deleting triage data',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}