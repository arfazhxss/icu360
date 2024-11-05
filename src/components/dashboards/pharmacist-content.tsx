import { SingleCard } from '@/components/shared-components'
import { Home, Pill, Clipboard, Users, Calendar } from "lucide-react"
import { useTriageContext } from '@/contexts/TriageContext'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export const pharmacistNavItems = [
    { icon: Home, label: 'Dashboard', route: '/dashboard' },
    { icon: Pill, label: 'Prescriptions', route: '/dashboard/prescriptions' },
    { icon: Clipboard, label: 'Inventory', route: '/dashboard/inventory' },
    { icon: Users, label: 'Patients', route: '/dashboard/patients' },
    { icon: Calendar, label: 'Consultations', route: '/dashboard/consultations' },
]

export function PharmacistContent() {
    const { triageData, updateTriageData } = useTriageContext()
    const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null)
    const [pharmacistNotes, setPharmacistNotes] = useState('')

    const pharmacistReviewTriages = triageData.filter(triage => triage.triageStatus === 'Pharmacist Review')

    const openPrescriptionReview = (id: string) => {
        setSelectedPrescription(id)
        setPharmacistNotes('')
    }

    const submitPrescriptionReview = () => {
        if (selectedPrescription) {
            const triageToUpdate = pharmacistReviewTriages.find(triage => triage.id === selectedPrescription);
            if (triageToUpdate) {
                updateTriageData(selectedPrescription, triageToUpdate.patientId, {
                    triageStatus: 'Completed',
                    pharmacistNotes: pharmacistNotes
                })
                    .then(() => {
                        setSelectedPrescription(null);
                    })
                    .catch(error => {
                        console.error('Error updating triage data:', error);
                        // Handle the error (e.g., show an error message to the user)
                    });
            }
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold mt-5 text-orange-700">Pharmacy Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <SingleCard
                    title="Prescriptions to Fill"
                    content={`${pharmacistReviewTriages.length} new prescriptions`}
                    buttonText="View All"
                    color="border-orange-300"
                />
                <SingleCard
                    title="Inventory Status"
                    content="3 medications low in stock"
                    buttonText="Check Inventory"
                    color="border-orange-300"
                />
                <SingleCard
                    title="Patient Consultations"
                    content="2 patients waiting"
                    buttonText="View Queue"
                    color="border-orange-300"
                />
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Prescriptions to Fill</h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Prescription</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pharmacistReviewTriages.map((triage) => (
                            <TableRow key={triage.id}>
                                <TableCell>{triage.patientName}</TableCell>
                                <TableCell>{triage.age}</TableCell>
                                <TableCell>{triage.prescription}</TableCell>
                                <TableCell>
                                    <Button onClick={() => openPrescriptionReview(triage.id)}>Review & Fill</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={selectedPrescription !== null} onOpenChange={() => setSelectedPrescription(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Prescription Review</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="pharmacistNotes">Pharmacist Notes</Label>
                            <Textarea
                                id="pharmacistNotes"
                                value={pharmacistNotes}
                                onChange={(e) => setPharmacistNotes(e.target.value)}
                                placeholder="Enter any notes or instructions for the patient..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={submitPrescriptionReview}>Fill Prescription</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}