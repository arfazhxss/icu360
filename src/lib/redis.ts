// src/lib/redis.ts
import { Redis } from '@upstash/redis'
import { User, Patient, TriageData } from '@/types/data'

const redis = new Redis({
    url: process.env.TRIAGE_KV_REST_API_URL!,
    token: process.env.TRIAGE_KV_REST_API_TOKEN!,
})

export async function getUsers(): Promise<User[]> {
    const users = await redis.get<User[]>('users')
    return users || []
}

export async function getPatients(): Promise<Patient[]> {
    const patients = await redis.get<Patient[]>('patients')
    return patients || []
}

export async function setUsers(users: User[]): Promise<void> {
    await redis.set('users', users)
}

export async function setPatients(patients: Patient[]): Promise<void> {
    await redis.set('patients', patients)
}

export async function getAllTriageData(): Promise<TriageData[]> {
    const patients = await getPatients()
    return patients.flatMap(patient => patient.triageData || [])
}

export default redis