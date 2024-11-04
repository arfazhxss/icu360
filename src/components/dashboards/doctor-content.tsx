import { SingleCard, TriageQueue } from '@/components/shared-components'
import { Home, Users, Stethoscope, Clipboard, Calendar, PieChart, AlertTriangle } from "lucide-react"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const doctorNavItems = [
    { icon: Home, label: 'Dashboard', route: '/' },
    { icon: Users, label: 'Patients', route: '/patients' },
    { icon: Stethoscope, label: 'Consultations', route: '/consultations' },
    { icon: Clipboard, label: 'Medical Records', route: '/records' },
    { icon: Calendar, label: 'Appointments', route: '/appointments' },
    { icon: PieChart, label: 'Analytics', route: '/analytics' },
    { icon: AlertTriangle, label: 'Triage Overview', route: '/triage-overview' },
]

export function DoctorContent() {
    const [showTriageOverview, setShowTriageOverview] = useState(false)

    const triageData = [
        { id: 1, patient: "John Doe", symptoms: "Chest pain", triageLevel: "High", waitTime: "Immediate" },
        { id: 2, patient: "Jane Smith", symptoms: "Sprained ankle", triageLevel: "Medium", waitTime: "1 hour" },
        { id: 3, patient: "Bob Johnson", symptoms: "Headache", triageLevel: "Low", waitTime: "3 hours" },
    ]

    return (
        <>
            <h2 className="text-2xl font-bold mt-5 text-blue-700">Patient Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <SingleCard
                    title="Appointments Today"
                    content="8 scheduled"
                    buttonText="View Schedule"
                    color="border-blue-200"
                />
                <SingleCard
                    title="Pending Lab Results"
                    content="3 results awaiting review"
                    buttonText="Review Results"
                    color="border-blue-200"
                />
                <SingleCard
                    title="Prescribe Medications"
                    content="2 new prescriptions"
                    buttonText="Open Inbox"
                    color="border-blue-200"
                />
            </div>
            <TriageQueue role="doctor" />
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Triage Overview</h3>
                <Button onClick={() => setShowTriageOverview(!showTriageOverview)}>
                    {showTriageOverview ? 'Hide Triage Overview' : 'Show Triage Overview'}
                </Button>
                {showTriageOverview && (
                    <div className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Symptoms</TableHead>
                                    <TableHead>Triage Level</TableHead>
                                    <TableHead>Estimated Wait Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {triageData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.patient}</TableCell>
                                        <TableCell>{row.symptoms}</TableCell>
                                        <TableCell>{row.triageLevel}</TableCell>
                                        <TableCell>{row.waitTime}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </>
    )
}