// src/lib/kv.ts
import { kv } from '@vercel/kv'
import { TriageData } from '@/utils/types'

interface User {
    id: string
    name: string
    role: string
    username: string
    password: string
}

interface Patient extends User {
    email: string
    triageData: TriageData[]
}

export async function getUsers(): Promise<User[]> {
    return await kv.get('users') || []
}

export async function getPatients(): Promise<Patient[]> {
    return await kv.get('patients') || []
}

export async function setUsers(users: User[]): Promise<void> {
    await kv.set('users', users)
}

export async function setPatients(patients: Patient[]): Promise<void> {
    await kv.set('patients', patients)
}

export async function getTriageData(): Promise<TriageData[]> {
    const patients = await getPatients()
    return patients.flatMap(patient => patient.triageData)
}

export async function addTriageData(patientId: string, newData: TriageData): Promise<void> {
    const patients = await getPatients()
    const patientIndex = patients.findIndex(p => p.id === patientId)
    if (patientIndex === -1) {
        throw new Error('Patient not found')
    }
    patients[patientIndex].triageData.push(newData)
    await setPatients(patients)
}

export async function updateTriageData(patientId: string, id: string, updateData: Partial<TriageData>): Promise<void> {
    const patients = await getPatients()
    const patientIndex = patients.findIndex(p => p.id === patientId)
    if (patientIndex === -1) {
        throw new Error('Patient not found')
    }
    const triageIndex = patients[patientIndex].triageData.findIndex(t => t.id === id)
    if (triageIndex === -1) {
        throw new Error('Triage data not found')
    }
    patients[patientIndex].triageData[triageIndex] = {
        ...patients[patientIndex].triageData[triageIndex],
        ...updateData
    }
    await setPatients(patients)
}

export async function deleteTriageData(patientId: string, id: string): Promise<void> {
    const patients = await getPatients()
    const patientIndex = patients.findIndex(p => p.id === patientId)
    if (patientIndex === -1) {
        throw new Error('Patient not found')
    }
    patients[patientIndex].triageData = patients[patientIndex].triageData.filter(t => t.id !== id)
    await setPatients(patients)
}