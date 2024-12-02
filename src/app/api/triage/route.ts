// src/app/api/triage/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPatients, setPatients, getAllTriageData } from '@/lib/redis'
import { TriageData } from '@/types/data'

export async function GET(): Promise<NextResponse> {
    try {
        const allTriageData = await getAllTriageData()
        return NextResponse.json(allTriageData)
    } catch (error) {
        console.error('Error reading triage data:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const newData = await request.json() as TriageData
        const patients = await getPatients()

        const patientIndex = patients.findIndex(p => p.id === newData.patientId)
        if (patientIndex === -1) {
            return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
        }

        if (!patients[patientIndex].triageData) {
            patients[patientIndex].triageData = []
        }

        patients[patientIndex].triageData!.push(newData)
        await setPatients(patients)

        return NextResponse.json({
            message: 'Triage data added successfully',
            data: newData
        }, { status: 201 })
    } catch (error) {
        console.error('Error adding triage data:', error)
        return NextResponse.json({
            error: 'Internal Server Error'
        }, { status: 500 })
    }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
    try {
        const { id, patientId, ...updateData } = await request.json() as TriageData & { patientId: string }
        const patients = await getPatients()

        const patientIndex = patients.findIndex(p => p.id === patientId)
        if (patientIndex === -1) {
            return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
        }

        const triageIndex = patients[patientIndex].triageData?.findIndex(t => t.id === id)
        if (triageIndex === undefined || triageIndex === -1) {
            return NextResponse.json({ error: 'Triage data not found' }, { status: 404 })
        }

        patients[patientIndex].triageData![triageIndex] = {
            ...patients[patientIndex].triageData![triageIndex],
            ...updateData
        }

        await setPatients(patients)

        return NextResponse.json({
            message: 'Triage data updated successfully',
            data: patients[patientIndex].triageData![triageIndex]
        })
    } catch (error) {
        console.error('Error updating triage data:', error)
        return NextResponse.json({
            error: 'Internal Server Error'
        }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        const { id, patientId } = await request.json() as { id: string, patientId: string }
        const patients = await getPatients()

        const patientIndex = patients.findIndex(p => p.id === patientId)
        if (patientIndex === -1) {
            return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
        }

        const initialLength = patients[patientIndex].triageData?.length || 0
        patients[patientIndex].triageData = patients[patientIndex].triageData?.filter(t => t.id !== id) || []

        if (patients[patientIndex].triageData.length === initialLength) {
            return NextResponse.json({ error: 'Triage data not found' }, { status: 404 })
        }

        await setPatients(patients)

        return NextResponse.json({
            message: 'Triage data deleted successfully'
        }, { status: 200 })
    } catch (error) {
        console.error('Error deleting triage data:', error)
        return NextResponse.json({
            error: 'Internal Server Error'
        }, { status: 500 })
    }
}