import { SingleCard, TriageQueue } from '@/components/shared-components'
import { Home, Pill, Clipboard, Users, Calendar } from "lucide-react"

export const pharmacistNavItems = [
    { icon: Home, label: 'Dashboard', route: '/' },
    { icon: Pill, label: 'Prescriptions', route: '/prescriptions' },
    { icon: Clipboard, label: 'Inventory', route: '/inventory' },
    { icon: Users, label: 'Patients', route: '/patients' },
    { icon: Calendar, label: 'Consultations', route: '/consultations' },
]

export function PharmacistContent() {
    return (
        <>
            <h2 className="text-2xl font-bold mt-5 text-orange-700">Pharmacy Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <SingleCard
                    title="Prescriptions to Fill"
                    content="7 new prescriptions"
                    buttonText="View Prescriptions"
                    color="border-orange-300"
                />
                <SingleCard
                    title="Medication Inventory"
                    content="3 medications low in stock"
                    buttonText="Check Inventory"
                    color="border-orange-300"
                />
                <SingleCard
                    title="Patient Consultations"
                    content="2 patients waiting for consultation"
                    buttonText="Start Consultation"
                    color="border-orange-300"
                />
            </div>
            <TriageQueue role="pharmacist" />
        </>
    )
}