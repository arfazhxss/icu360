// src/components/dashboards/doctor-content.tsx

import { SingleCard } from '@/components/shared-components'
import { Home, Users, Stethoscope, Clipboard, Calendar, PieChart } from "lucide-react"
import { useTriageContext } from '@/contexts/TriageContext'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const doctorNavItems = [
    { icon: Home, label: 'Dashboard', route: '/' },
    { icon: Users, label: 'Patients', route: '/patients' },
    { icon: Stethoscope, label: 'Consultations', route: '/consultations' },
    { icon: Clipboard, label: 'Medical Records', route: '/records' },
    { icon: Calendar, label: 'Appointments', route: '/appointments' },
    { icon: PieChart, label: 'Analytics', route: '/analytics' },
]

export function DoctorContent() {
    const { triageData, updateTriageData } = useTriageContext()
    const [selectedTriage, setSelectedTriage] = useState<string | null>(null)
    const [doctorNotes, setDoctorNotes] = useState('')
    const [prescription, setPrescription] = useState('')

    const doctorReviewTriages = triageData.filter(triage => triage.triageStatus === 'Doctor Review')

    const openDoctorReview = (id: string) => {
        setSelectedTriage(id)
        setDoctorNotes('')
        setPrescription('')
    }

    const submitDoctorReview = () => {
        if (selectedTriage) {
            updateTriageData(selectedTriage, {
                triageStatus: 'Pharmacist Review',
                doctorNotes: doctorNotes,
                prescription: prescription
            })
            setSelectedTriage(null)
        }
    }

    return (
        <>
            <h2 className="text-2xl font-bold mt-5 text-blue-700">Doctor Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <SingleCard
                    title="Patients to Review"
                    content={`${doctorReviewTriages.length} patients waiting`}
                    buttonText="View All"
                    color="border-blue-300"
                />
                <SingleCard
                    title="Today's Appointments"
                    content="8 scheduled"
                    buttonText="View Schedule"
                    color="border-blue-300"
                />
                <SingleCard
                    title="Recent Lab Results"
                    content="3 new results"
                    buttonText="View Results"
                    color="border-blue-300"
                />
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Patients Needing Consultation</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Symptoms</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>Nurse Notes</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {doctorReviewTriages.map((triage) => (
                            <TableRow key={triage.id}>
                                <TableCell>{triage.patientName}</TableCell>
                                <TableCell>{triage.age}</TableCell>
                                <TableCell>{triage.symptoms.join(', ')}</TableCell>
                                <TableCell>{triage.severity}</TableCell>
                                <TableCell>{triage.nurseNotes}</TableCell>
                                <TableCell>
                                    <Button onClick={() => openDoctorReview(triage.id)}>Review</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={selectedTriage !== null} onOpenChange={() => setSelectedTriage(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Doctor Review</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="doctorNotes">Doctor&apos;s Notes</Label>
                            <Textarea
                                id="doctorNotes"
                                value={doctorNotes}
                                onChange={(e) =>
                                    setDoctorNotes(e.target.value)}
                                placeholder="Enter your diagnosis and treatment plan..."
                            />
                        </div>
                        <div>
                            <Label htmlFor="prescription">Prescription</Label>
                            <Textarea
                                id="prescription"
                                value={prescription}
                                onChange={(e) => setPrescription(e.target.value)}
                                placeholder="Enter prescription details..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={submitDoctorReview}>Complete Consultation</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}