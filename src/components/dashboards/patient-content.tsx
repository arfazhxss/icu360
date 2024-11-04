// src/components/dashboards/patient-content.tsx

'use client'

import { SingleCard } from '@/components/shared-components'
import { Home, Calendar, Clipboard, Stethoscope, Activity, AlertTriangle } from "lucide-react"
import { VirtualTriage } from '@/components/virtual-triage'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { useTriageContext } from '@/contexts/TriageContext'
import { TriageData } from '@/utils/types'

export const patientNavItems = [
    { icon: Home, label: 'My Health', route: '/' },
    { icon: Calendar, label: 'Appointments', route: '/appointments' },
    { icon: Clipboard, label: 'Medical History', route: '/history' },
    { icon: Stethoscope, label: 'Consultations', route: '/consultations' },
    { icon: Activity, label: 'Health Resources', route: '/resources' },
    { icon: AlertTriangle, label: 'Virtual Triage', route: '/triage' },
]

export function PatientContent() {
    const [showTriage, setShowTriage] = useState(false)
    const { triageData, addTriageData } = useTriageContext()

    // In a real application, you would use the actual patient's name or ID
    const patientTriages = triageData.filter(triage => triage.patientName === "Current Patient Name")

    const handleTriageSubmit = async (triageData: Omit<TriageData, 'id'>) => {
        await addTriageData(triageData)
        setShowTriage(false)
    }

    return (
        <>
            <h2 className="text-2xl font-bold mt-5 text-green-700">My Health Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <SingleCard
                    title="Upcoming Appointments"
                    content="Next: Dr. Smith on 15 Oct, 2:00 PM"
                    buttonText="View All"
                    color="border-green-300"
                />
                <SingleCard
                    title="Current Medications"
                    content="3 active prescriptions"
                    buttonText="Medication List"
                    color="border-green-300"
                />
                <SingleCard
                    title="Recent Lab Results"
                    content="Blood work results from 1 Oct"
                    buttonText="View Results"
                    color="border-green-300"
                />
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Your Triage Status</h3>
                {patientTriages.map((triage) => (
                    <div key={triage.id} className="mb-4 p-4 border rounded">
                        <p>Status: {triage.triageStatus}</p>
                        {triage.appointmentTime && <p>Appointment: {triage.appointmentTime}</p>}
                        {triage.prescription && <p>Prescription: {triage.prescription}</p>}
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Need Immediate Care?</h3>
                <Button onClick={() => setShowTriage(!showTriage)}>
                    {showTriage ? 'Hide Virtual Triage' : 'Start Virtual Triage'}
                </Button>
                {showTriage && (
                    <div className="mt-4">
                        <VirtualTriage onSubmit={handleTriageSubmit} />
                    </div>
                )}
            </div>
        </>
    )
}