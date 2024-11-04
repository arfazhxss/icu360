// src/components/dashboards/nurse-content.tsx

'use client'

import { SingleCard } from '@/components/shared-components'
import { Home, Users, Calendar, Clipboard, Activity } from "lucide-react"
import { useTriageContext } from '@/contexts/TriageContext'
import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const nurseNavItems = [
    { icon: Home, label: 'Dashboard', route: '/' },
    { icon: Users, label: 'Patients', route: '/patients' },
    { icon: Calendar, label: 'Schedules', route: '/schedules' },
    { icon: Clipboard, label: 'Patient Care', route: '/care' },
    { icon: Activity, label: 'Vitals Log', route: '/vitals' },
]

export function NurseContent() {
    const { triageData, updateTriageData, deleteTriageData, refetchTriageData } = useTriageContext()
    const [selectedTriage, setSelectedTriage] = useState<string | null>(null)
    const [nurseNotes, setNurseNotes] = useState('')

    useEffect(() => {
        refetchTriageData()
    }, [refetchTriageData])

    const nurseReviewTriages = triageData.filter(triage =>
        triage.triageStatus === 'Nurse Review' || triage.triageStatus === 'Pending'
    )

    const openNurseReview = (id: string) => {
        setSelectedTriage(id)
        setNurseNotes('')
    }

    const submitNurseReview = async () => {
        if (selectedTriage) {
            await updateTriageData(selectedTriage, {
                triageStatus: 'Receptionist Review',
                nurseNotes: nurseNotes
            })
            setSelectedTriage(null)
            await refetchTriageData()
        }
    }

    const handleDelete = async (id: string) => {
        await deleteTriageData(id)
        await refetchTriageData()
    }

    return (
        <>
            <h2 className="text-2xl font-bold mt-5 text-purple-700">Nurse Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <SingleCard
                    title="Patients for Review"
                    content={`${nurseReviewTriages.length} patients waiting`}
                    buttonText="View All"
                    color="border-purple-300"
                />
                <SingleCard
                    title="Upcoming Rounds"
                    content="Next round in 30 minutes"
                    buttonText="View Schedule"
                    color="border-purple-300"
                />
                <SingleCard
                    title="Recent Vitals Logged"
                    content="15 entries in the last hour"
                    buttonText="View Log"
                    color="border-purple-300"
                />
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Patients Needing Review</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Symptoms</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {nurseReviewTriages.map((triage) => (
                            <TableRow key={triage.id}>
                                <TableCell>{triage.patientName}</TableCell>
                                <TableCell>{triage.age}</TableCell>
                                <TableCell>{triage.symptoms.join(', ')}</TableCell>
                                <TableCell>{triage.severity}</TableCell>
                                <TableCell>{triage.triageStatus}</TableCell>
                                <TableCell>
                                    <Button onClick={() => openNurseReview(triage.id)}>Review</Button>
                                    <Button variant="destructive" onClick={() => handleDelete(triage.id)} className="ml-2">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={selectedTriage !== null} onOpenChange={() => setSelectedTriage(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nurse Review</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="nurseNotes">Notes for Doctor</Label>
                            <Textarea
                                id="nurseNotes"
                                value={nurseNotes}
                                onChange={(e) => setNurseNotes(e.target.value)}
                                placeholder="Enter your observations and recommendations for the doctor..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={submitNurseReview}>Submit Review</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}