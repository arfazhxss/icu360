"use client"
import { Metadata } from 'next'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { Menu, X } from "lucide-react"
// import { PatientRecord } from "@/utils/types"

export const metadata: Metadata = {
    title: 'My HealthApp | Overview',
    description: 'Overview of your health data',
}

// async function getData(): Promise<PatientRecord> {
//     const res = await fetch("")
//     if (!res.ok) { throw new Error('Failed to fetch data') }
//     return res.json()
// }

function SingleCard({ title, content, buttonText = "View Details", color }: Readonly<{ title?: string; content?: string; buttonText?: string; color: string }>) {
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

function MainContent({ role }: { role: 'doctor' | 'patient' | 'nurse' }) {
    const contentByRole = {
        doctor: (
            <>
                <h2 className="text-2xl font-bold mt-5 text-blue-700">Patient Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
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
                        title="Patient Messages"
                        content="5 new messages"
                        buttonText="Open Inbox"
                        color="border-blue-200"
                    />
                    <SingleCard
                        title="Critical Cases"
                        content="2 patients require immediate attention"
                        buttonText="View Cases"
                        color="border-blue-200"
                    />
                </div>

                <h2 className="text-2xl font-bold mt-8 text-blue-700">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                    <SingleCard
                        title="Prescribe Medication"
                        content="Write a new prescription"
                        buttonText="Start Prescription"
                        color="border-blue-200"
                    />
                    <SingleCard
                        title="Update Patient Records"
                        content="Add notes or update existing records"
                        buttonText="Open Records"
                        color="border-blue-200"
                    />
                    <SingleCard
                        title="Schedule Follow-up"
                        content="Book a follow-up appointment"
                        buttonText="Open Calendar"
                        color="border-blue-200"
                    />
                    <SingleCard
                        title="Refer to Specialist"
                        content="Create a specialist referral"
                        buttonText="Start Referral"
                        color="border-blue-200"
                    />
                </div>
            </>
        ),
        patient: (
            <>
                <h2 className="text-2xl font-bold mt-5 text-green-700">My Health Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
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
                    <SingleCard
                        title="Vitals"
                        content="Last recorded: 5 Oct"
                        buttonText="Track Vitals"
                        color="border-green-300"
                    />
                </div>

                <h2 className="text-2xl font-bold mt-8 text-green-700">Health Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                    <SingleCard
                        title="Message My Doctor"
                        content="Send a secure message to your healthcare team"
                        buttonText="Compose Message"
                        color="border-green-300"
                    />
                    <SingleCard
                        title="Refill Prescriptions"
                        content="Request medication refills"
                        buttonText="Start Request"
                        color="border-green-300"
                    />
                    <SingleCard
                        title="Health Goals"
                        content="Track your progress on health  objectives"
                        buttonText="View Goals"
                        color="border-green-300"
                    />
                    <SingleCard
                        title="Educational Resources"
                        content="Learn more about managing your health"
                        buttonText="Explore Resources"
                        color="border-green-300"
                    />
                </div>
            </>
        ),
        nurse: (
            <>
                <h2 className="text-2xl font-bold mt-5 text-purple-700">Patient Care Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
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
                        title="Medication Administration"
                        content="5 medications due in the next hour"
                        buttonText="Med Schedule"
                        color="border-purple-300"
                    />
                    <SingleCard
                        title="Recent Vitals"
                        content="2 patients with abnormal readings"
                        buttonText="Check Vitals"
                        color="border-purple-300"
                    />
                </div>

                <h2 className="text-2xl font-bold mt-8 text-purple-700">Tasks and Communication</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                    <SingleCard
                        title="Task List"
                        content="8 tasks remaining for your shift"
                        buttonText="View Tasks"
                        color="border-purple-300"
                    />
                    <SingleCard
                        title="Team Messages"
                        content="3 new messages from the care team"
                        buttonText="Open Messages"
                        color="border-purple-300"
                    />
                    <SingleCard
                        title="Incident Reports"
                        content="1 new incident requires documentation"
                        buttonText="File Report"
                        color="border-purple-300"
                    />
                    <SingleCard
                        title="Education and Training"
                        content="2 modules due this week"
                        buttonText="Start Training"
                        color="border-purple-300"
                    />
                </div>
            </>
        )
    }

    return contentByRole[role]
}

export default function Overview({ role = 'doctor' }: Readonly<{ role?: 'doctor' | 'patient' | 'nurse' }>) {
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleNavbar = () => setIsNavbarVisible(!isNavbarVisible);

    const roleInfo = {
        doctor: { name: "Dr. Jane Smith", online: "Showing Offline" },
        patient: { name: "John Doe", online: "Showing Online" },
        nurse: { name: "Emily Johnson", online: "Showing Offline" }
    }

    const bgColors = {
        doctor: 'bg-blue-36',
        patient: 'bg-red-36',
        nurse: 'bg-purple-36'
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {!isMobile && (
                <div className="w-64 flex-shrink-0">
                    <Navbar name={roleInfo[role].name} role={role} online={roleInfo[role].online} isMobile={false} />
                </div>
            )}
            <div className={`flex-1 overflow-auto relative ${isMobile ? 'pb-16' : ''} ${bgColors[role]}`}>
                {isMobile && (
                    <Button
                        variant="outline"
                        size="icon"
                        className={`fixed top-4 ${isNavbarVisible ? 'left-4' : 'right-4'} z-50 p-2 bg-slate-50 rounded-full shadow-sm transition-all duration-150 hover:bg-gray-100 focus:outline-none focus:ring-primary`}
                        onClick={toggleNavbar}
                        aria-label={isNavbarVisible ? "Close menu" : "Open menu"}
                    >
                        {
                            isNavbarVisible ? <X className="h-4 w-4" /> : <svg width="400" height="400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        }
                    </Button>
                )}
                {isMobile && isNavbarVisible && (
                    <button
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
                        onClick={toggleNavbar}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                toggleNavbar();
                            }
                        }}
                        aria-label="Close menu"
                    />
                )}
                {isMobile && (
                    <div
                        className={`fixed inset-y-0 right-0 w-64 bg-background transform ${isNavbarVisible ? 'translate-x-0' : 'translate-x-full'
                            } transition duration-200 ease-in-out z-40`}
                    >
                        <Navbar name={roleInfo[role].name} role={role} online={roleInfo[role].online} isMobile={false} />
                    </div>
                )}
                <main className="p-6">
                    <div className="flex items-center">
                        <h1 className="text-3xl font-bold">
                            My <span className="text-primary-background">Overview</span>
                        </h1>
                    </div>
                    <p className="text-lg mt-2">Welcome back, {roleInfo[role].name}. Here&apos;s your health dashboard.</p>
                    <hr className="my-6" />
                    <MainContent role={role} />
                </main>
            </div>
        </div>
    );
}   