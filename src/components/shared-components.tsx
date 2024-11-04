import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SingleCard({ title, content, buttonText = "View Details", color }: Readonly<{ title?: string; content?: string; buttonText?: string; color: string }>) {
    return (
        <Card className={`h-full flex flex-col ${color} shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm">{content}</p>
            </CardContent>
            <CardFooter>
                <Button variant="secondary" size="sm" className="w-full">{buttonText}</Button>
            </CardFooter>
        </Card>
    )
}

type Role = 'doctor' | 'nurse' | 'receptionist' | 'pharmacist';

export function TriageQueue({ role }: Readonly<{ role: Role }>) {
    const queueData: Record<Role, { priority: string; count: number; color: string }[]> = {
        doctor: [
            { priority: 'High', count: 3, color: 'bg-red-100' },
            { priority: 'Medium', count: 5, color: 'bg-yellow-100' },
            { priority: 'Low', count: 8, color: 'bg-green-100' },
        ],
        nurse: [
            { priority: 'High', count: 2, color: 'bg-red-100' },
            { priority: 'Medium', count: 4, color: 'bg-yellow-100' },
            { priority: 'Low', count: 6, color: 'bg-green-100' },
        ],
        receptionist: [
            { priority: 'New Patients', count: 5, color: 'bg-blue-100' },
            { priority: 'Appointments', count: 10, color: 'bg-green-100' },
            { priority: 'Walk-ins', count: 3, color: 'bg-yellow-100' },
        ],
        pharmacist: [
            { priority: 'Urgent', count: 2, color: 'bg-red-100' },
            { priority: 'Refills', count: 8, color: 'bg-green-100' },
            { priority: 'New Prescriptions', count: 5, color: 'bg-blue-100' },
        ],
    }

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Triage Queue</h3>
            <div className="grid grid-cols-3 gap-4">
                {queueData[role].map((item) => (
                    <Card key={`${role}-${item.priority}`} className={`${item.color}`}>
                        <CardHeader>
                            <CardTitle>{item.priority}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{item.count}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
