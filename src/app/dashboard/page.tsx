// src/app/dashboard/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { X } from "lucide-react"
import { useRole } from '@/contexts/RoleContext'
import { DoctorContent } from '@/components/dashboards/doctor-content'
import { PatientContent } from '@/components/dashboards/patient-content'
import { NurseContent } from '@/components/dashboards/nurse-content'
import { ReceptionistContent } from '@/components/dashboards/receptionist-content'
import { PharmacistContent } from '@/components/dashboards/pharmacist-content'

function MainContent({ role }: { role: 'doctor' | 'patient' | 'nurse' | 'receptionist' | 'pharmacist' }) {
    const contentByRole = {
        doctor: <DoctorContent />,
        patient: <PatientContent />,
        nurse: <NurseContent />,
        receptionist: <ReceptionistContent />,
        pharmacist: <PharmacistContent />
    }

    return contentByRole[role]
}

export default function Overview() {
    const { role } = useRole();
    // const { triageData } = useTriageContext(); // Add this line
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
        nurse: { name: "Emily Johnson", online: "Showing Offline" },
        receptionist: { name: "Alex Brown", online: "Showing Online" },
        pharmacist: { name: "Michael Lee", online: "Showing Online" }
    }

    const bgColors = {
        doctor: 'bg-blue-36',
        patient: 'bg-red-36',
        nurse: 'bg-purple-36',
        receptionist: 'bg-green-36',
        pharmacist: 'bg-orange-36'
    }

    if (!role) {
        return <div>Please log in to view this page</div>
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
                    <p className="text-lg mt-2">Welcome back, {roleInfo[role].name}. Here&apos;s your dashboard.</p>
                    <hr className="my-6" />
                    <MainContent role={role} />
                </main>
            </div>
        </div>
    );
}