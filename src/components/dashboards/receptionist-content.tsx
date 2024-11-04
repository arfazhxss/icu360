import { SingleCard } from '@/components/shared-components'
import { Home, Calendar, Users, PhoneCall, Clipboard } from "lucide-react"
import { useTriageContext } from '@/contexts/TriageContext'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from 'react'

export const receptionistNavItems = [
    { icon: Home, label: 'Dashboard', route: '/' },
    { icon: Calendar, label: 'Appointments', route: '/appointments' },
    { icon: Users, label: 'Patients', route: '/patients' },
    { icon: PhoneCall, label: 'Calls', route: '/calls' },
    { icon: Clipboard, label: 'Check-ins', route: '/check-ins' },
]

export function ReceptionistContent() {
    const { triageData, updateTriageData, refetchTriageData } = useTriageContext()
    const [selectedTriage, setSelectedTriage] = useState<string | null>(null)
    const [appointmentTime, setAppointmentTime] = useState('')

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetchTriageData();
        }, 30000); // Refetch every 30 seconds

        return () => clearInterval(intervalId);
    }, [refetchTriageData]);

    const pendingTriages = triageData.filter(triage => triage.triageStatus === 'Receptionist Review')

    const openAppointmentDialog = (id: string) => {
        setSelectedTriage(id)
        // Set default appointment time to 3 hours from now
        const defaultTime = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString().slice(0, 16)
        setAppointmentTime(defaultTime)
    }

    const setAppointment = async () => {
        if (selectedTriage && appointmentTime) {
            await updateTriageData(selectedTriage, {
                appointmentTime,
                triageStatus: 'Doctor Review'
            })
            await refetchTriageData()
            setSelectedTriage(null)
        }
    }

    return (
        <>
            <h2 className="text-2xl font-bold mt-5 text-green-700">Reception Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <SingleCard
                    title="Pending Triages"
                    content={`${pendingTriages.length} patients waiting`}
                    buttonText="View All"
                    color="border-green-300"
                />
                <SingleCard
                    title="Today's Appointments"
                    content="15 scheduled"
                    buttonText="View Schedule"
                    color="border-green-300"
                />
                <SingleCard
                    title="Recent Check-ins"
                    content="3 patients in the last hour"
                    buttonText="View Check-ins"
                    color="border-green-300"
                />
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Pending Triage Cases</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>Nurse Notes</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingTriages.map((triage) => (
                            <TableRow key={triage.id}>
                                <TableCell>{triage.patientName}</TableCell>
                                <TableCell>{triage.age}</TableCell>
                                <TableCell>{triage.severity}</TableCell>
                                <TableCell>{triage.nurseNotes}</TableCell>
                                <TableCell>
                                    <Button onClick={() => openAppointmentDialog(triage.id)}>Set Appointment</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={selectedTriage !== null} onOpenChange={() => setSelectedTriage(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Set Appointment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="appointmentTime">Appointment Time</Label>
                            <Input
                                id="appointmentTime"
                                type="datetime-local"
                                value={appointmentTime}
                                onChange={(e) => setAppointmentTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={setAppointment}>Set Appointment</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}