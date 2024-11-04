import { SingleCard, TriageQueue } from '@/components/shared-components'
import { Home, Calendar, Users, PhoneCall, Clipboard } from "lucide-react"

export const receptionistNavItems = [
    { icon: Home, label: 'Dashboard', route: '/' },
    { icon: Calendar, label: 'Appointments', route: '/appointments' },
    { icon: Users, label: 'Patients', route: '/patients' },
    { icon: PhoneCall, label: 'Calls', route: '/calls' },
    { icon: Clipboard, label: 'Check-ins', route: '/check-ins' },
]

export function ReceptionistContent() {
    return (
        <>
            <h2 className="text-2xl font-bold mt-5 text-green-700">Reception Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <SingleCard
                    title="Check-ins Today"
                    content="15 patients checked in"
                    buttonText="View Check-ins"
                    color="border-green-300"
                />
                <SingleCard
                    title="Upcoming Appointments"
                    content="8 appointments in the next hour"
                    buttonText="View Schedule"
                    color="border-green-300"
                />
                <SingleCard
                    title="Waiting Room Status"
                    content="12 patients currently waiting"
                    buttonText="Manage Waiting Room"
                    color="border-green-300"
                />
            </div>
            <TriageQueue role="receptionist" />
        </>
    )
}