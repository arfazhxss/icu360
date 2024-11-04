import { SingleCard, TriageQueue } from '@/components/shared-components'
import { Home, Users, Calendar, Clipboard, Activity, AlertTriangle } from "lucide-react"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const nurseNavItems = [
    { icon: Home, label: 'Dashboard', route: '/' },
    { icon: Users, label: 'Patients', route: '/patients' },
    { icon: Calendar, label: 'Schedules', route: '/schedules' },
    { icon: Clipboard, label: 'Patient Care', route: '/care' },
    { icon: Activity, label: 'Vitals Log', route: '/vitals' },
    { icon: AlertTriangle, label: 'Triage Management', route: '/triage-management' },
]

export function NurseContent() {
    const [showTriageManagement, setShowTriageManagement] = useState(false)

    const triageData = [
        { id: 1, patient: "John Doe", symptoms: "Chest pain", triageLevel: "High", action: "Immediate attention" },
        { id: 2, patient: "Jane Smith", symptoms: "Sprained ankle", triageLevel: "Medium", action: "X-ray required" },
        { id: 3, patient: "Bob Johnson", symptoms: "Headache", triageLevel: "Low", action: "Waiting room" },
    ]

    return (
        <>
            <h2 className="text-2xl font-bold mt-5 text-purple-700">Patient Care Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <SingleCard
                    title="Assigned Patients"
                    content="12 patients under your care"
                    buttonText="View Patient List"
                    color="border-purple-300"
                />
                <SingleCard
                    title="Upcoming Rounds"
                    content="Next round in 30 minutes"
                    buttonText="Round Schedule"
                    color="border-purple-300"
                />
                <SingleCard
                    title="Team Messages"
                    content="3 new messages from the care team"
                    buttonText="Open Messages"
                    color="border-purple-300"
                />
            </div>
            <TriageQueue role="nurse" />
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Triage Management</h3>
                <Button onClick={() => setShowTriageManagement(!showTriageManagement)}>
                    {showTriageManagement ? 'Hide Triage Management' : 'Show Triage Management'}
                </Button>
                {showTriageManagement && (
                    <div className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Symptoms</TableHead>
                                    <TableHead>Triage Level</TableHead>
                                    <TableHead>Recommended Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {triageData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.patient}</TableCell>
                                        <TableCell>{row.symptoms}</TableCell>
                                        <TableCell>{row.triageLevel}</TableCell>
                                        <TableCell>{row.action}</TableCell>
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