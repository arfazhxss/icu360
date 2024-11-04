// src/app/api/triage/route.ts

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { TriageData } from '@/utils/types'

// Define the data directory and file path
const DATA_DIR = path.join(process.cwd(), 'src', 'data')
const dataFilePath = path.join(DATA_DIR, 'triage-data.json')

// Helper function to ensure data directory exists
async function ensureDataDirectory(): Promise<void> {
    try {
        await fs.access(DATA_DIR)
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true })
    }
}

// Helper function to ensure JSON file exists with valid content
async function ensureJsonFile(): Promise<void> {
    try {
        await fs.access(dataFilePath)
    } catch {
        await fs.writeFile(dataFilePath, '[]', 'utf8')
    }
}

// Helper function to read triage data
async function readTriageData(): Promise<TriageData[]> {
    await ensureDataDirectory()
    await ensureJsonFile()
    const jsonData = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(jsonData) as TriageData[]
}

// Helper function to write triage data
async function writeTriageData(data: TriageData[]): Promise<void> {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8')
}

export async function GET(): Promise<NextResponse> {
    try {
        const data = await readTriageData()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error reading triage data:', error)
        return NextResponse.json([], { status: 200 }) // Return empty array instead of 500
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const newData = await request.json() as TriageData
        console.log('Received data:', newData)

        const existingData = await readTriageData()

        // Check if the item with the same ID already exists
        const existingIndex = existingData.findIndex((item: TriageData) => item.id === newData.id)

        if (existingIndex !== -1) {
            // If it exists, update the existing item
            existingData[existingIndex] = { ...existingData[existingIndex], ...newData }
        } else {
            // If it doesn't exist, add the new item
            existingData.push(newData)
        }

        await writeTriageData(existingData)

        return NextResponse.json({
            message: 'Triage data added/updated successfully',
            data: existingData
        })
    } catch (error) {
        console.error('Error adding/updating triage data:', error)
        return NextResponse.json({
            message: 'Error adding/updating triage data',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        })
    }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
    try {
        const { id, ...updateData } = await request.json() as TriageData
        console.log('Updating data for id:', id)

        const existingData = await readTriageData()
        const updatedData = existingData.map((item: TriageData) =>
            item.id === id ? { ...item, ...updateData } : item
        )

        await writeTriageData(updatedData)

        return NextResponse.json({
            message: 'Triage data updated successfully',
            data: updatedData
        })
    } catch (error) {
        console.error('Error updating triage data:', error)
        return NextResponse.json({
            message: 'Error updating triage data',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        })
    }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        const { id } = await request.json() as { id: string }
        console.log('Deleting data for id:', id)

        const existingData = await readTriageData()
        const updatedData = existingData.filter((item: TriageData) => item.id !== id)

        await writeTriageData(updatedData)

        return NextResponse.json({
            message: 'Triage data deleted successfully',
            data: updatedData
        })
    } catch (error) {
        console.error('Error deleting triage data:', error)
        return NextResponse.json({
            message: 'Error deleting triage data',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        })
    }
}