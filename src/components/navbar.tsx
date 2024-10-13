'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Home, Users, Globe } from "lucide-react"

interface NavbarProps {
    name: string
    tab: string
}

export function Navbar({ name, tab }: Readonly<NavbarProps>) {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState(tab)

    const handleTabChange = (newTab: string, route: string) => {
        setActiveTab(newTab)
        router.push(route)
    }

    return (
        <div className="w-64 h-full bg-blue-50 p-4 flex flex-col">
            <div className="flex items-center mb-8">
                <Avatar className="w-10">
                    <AvatarImage src="" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="ml-3 font-semibold">Hi, {name}</span>
            </div>

            <nav className="space-y-2">
                <Button
                    variant={activeTab === "Tab 1" ? "default" : "outline"}
                    className={`w-full justify-start ${activeTab === "Tab 1" ? 'text-white' : 'text-black hover:text-white'}`}
                    onClick={() => handleTabChange("Tab 1", "/")}
                >
                    <Home className="mr-2 h-4 w-4" />
                    Overview
                </Button>

                <Button
                    variant={activeTab === "Tab 2" ? "default" : "outline"}
                    className={`w-full justify-start ${activeTab === "Tab 2" ? 'text-white' : 'text-black hover:text-white'}`}
                    onClick={() => handleTabChange("Tab 2", "/professional")}
                >
                    <Users className="mr-2 h-4 w-4" />
                    Professional View
                </Button>

                <Button
                    variant={activeTab === "Tab 3" ? "default" : "outline"}
                    className={`w-full justify-start ${activeTab === "Tab 3" ? 'text-white' : 'text-black hover:text-white'}`}
                    onClick={() => handleTabChange("Tab 3", "/public")}
                >
                    <Globe className="mr-2 h-4 w-4" />
                    Public View
                </Button>
            </nav>
        </div>
    )
}