'use client'

import React, { forwardRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, HelpCircle, ChevronRight, LogOut } from "lucide-react"
import { doctorNavItems } from '@/components/dashboards/doctor-content'
import { patientNavItems } from '@/components/dashboards/patient-content'
import { nurseNavItems } from '@/components/dashboards/nurse-content'
import { pharmacistNavItems } from '@/components/dashboards/pharmacist-content'
import { receptionistNavItems } from '@/components/dashboards/receptionist-content'
import { useRole } from '@/contexts/RoleContext'

interface NavbarProps {
    isMobile: boolean;
    name: string;
    role: 'doctor' | 'patient' | 'nurse' | 'receptionist' | 'pharmacist';
    online: string;
}

const roleIcons = {
    doctor: doctorNavItems[2].icon,
    patient: patientNavItems[0].icon,
    nurse: nurseNavItems[3].icon,
    pharmacist: pharmacistNavItems[1].icon,
    receptionist: receptionistNavItems[3].icon
}

const navItems = {
    doctor: doctorNavItems,
    patient: patientNavItems,
    nurse: nurseNavItems,
    pharmacist: pharmacistNavItems,
    receptionist: receptionistNavItems
}

const roleColors = {
    doctor: 'border-black-500 text-blue-950',
    patient: 'border-black-500 text-green-950',
    nurse: 'border-black-500 text-purple-950',
    pharmacist: 'border-black-500 text-orange-950',
    receptionist: 'border-black-500 text-teal-950'
}

const NavbarButton = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>((props, ref) => (
    <Button ref={ref} {...props} />
))
NavbarButton.displayName = 'NavbarButton'

const TooltipButton = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button> & { tooltip: string }>(
    ({ tooltip, ...props }, ref) => (
        <Tooltip>
            <TooltipTrigger asChild>
                <NavbarButton ref={ref} {...props} />
            </TooltipTrigger>
            <TooltipContent side="right">
                {tooltip}
            </TooltipContent>
        </Tooltip>
    )
)
TooltipButton.displayName = 'TooltipButton'

export default function Navbar({ isMobile, name, role, online }: NavbarProps) {
    const router = useRouter()
    const { signOut } = useRole()
    const [activeTab, setActiveTab] = useState('')
    const [darkMode, setDarkMode] = useState(false)
    const [notifications, setNotifications] = useState(true)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    useEffect(() => {
        if (role) {
            setActiveTab(role === 'patient' ? 'My Health' : 'Dashboard')
        }
    }, [role])

    const handleTabChange = (newTab: string, route: string) => {
        setActiveTab(newTab)
        router.push(route)
    }

    const RoleIcon = roleIcons[role]

    return (
        <TooltipProvider>
            <div className={`${isMobile ? 'w-16' : 'w-64'} h-full bg-gradient-to-b ${roleColors[role]} border-r p-4 flex flex-col`}>
                <Card className="mb-4 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4 flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                            <AvatarFallback>
                                <RoleIcon className="h-6 w-6" />
                            </AvatarFallback>
                        </Avatar>
                        {!isMobile && (
                            <div>
                                <h3 className="font-semibold text-md">{name}</h3>
                                <p className="text-xs text-muted-foreground capitalize">{role}</p>
                                <div className="flex items-center mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full mr-1.5 bg-green-500" />
                                    <p className="text-[10px] text-muted-foreground">{online}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <ScrollArea className="flex-grow">
                    <nav className="space-y-1">
                        {navItems[role].map((item) => (
                            <TooltipButton
                                key={item.label}
                                variant={activeTab === item.label ? "secondary" : "ghost"}
                                className={`w-full justify-start ${activeTab === item.label
                                    ? 'hover:bg-zinc-200 hover:text-secondary-foreground'
                                    : 'hover:bg-black/5 hover:text-secondary-foreground'
                                    } transition-all duration-200`}
                                onClick={() => handleTabChange(item.label, item.route)}
                                tooltip={item.label}
                            >
                                <item.icon className={`${isMobile ? 'mr-0' : 'mr-2'} h-4 w-4`} />
                                {!isMobile && <span>{item.label}</span>}
                            </TooltipButton>
                        ))}
                    </nav>
                </ScrollArea>

                <div className="mt-auto space-y-1">
                    <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                        <SheetTrigger asChild>
                            <TooltipButton
                                variant="ghost"
                                className="w-full justify-start hover:bg-black/5 hover:text-secondary-foreground"
                                tooltip="Settings"
                            >
                                <Settings className={`${isMobile ? 'mr-0' : 'mr-2'} h-4 w-4`} />
                                {!isMobile && <span>Settings</span>}
                                {!isMobile && <ChevronRight className="ml-auto h-4 w-4" />}
                            </TooltipButton>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Settings</SheetTitle>
                                <SheetDescription>
                                    Adjust your application preferences here.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="py-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="dark-mode">Dark Mode</Label>
                                    <Switch
                                        id="dark-mode"
                                        checked={darkMode}
                                        onCheckedChange={setDarkMode}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="notifications">Notifications</Label>
                                    <Switch
                                        id="notifications"
                                        checked={notifications}
                                        onCheckedChange={setNotifications}
                                    />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <TooltipButton
                        variant="ghost"
                        className="w-full justify-start hover:bg-black/5 hover:text-secondary-foreground"
                        tooltip="Help"
                    >
                        <HelpCircle className={`${isMobile ? 'mr-0' : 'mr-2'} h-4 w-4`} />
                        {!isMobile && <span>Help</span>}
                    </TooltipButton>
                    <TooltipButton
                        variant="ghost"
                        className="w-full justify-start hover:bg-black/5 hover:text-secondary-foreground"
                        tooltip="Sign Out"
                        onClick={signOut}
                    >
                        <LogOut className={`${isMobile ? 'mr-0' : 'mr-2'} h-4 w-4`} />
                        {!isMobile && <span>Sign Out</span>}
                    </TooltipButton>
                </div>
            </div>
        </TooltipProvider>
    )
}