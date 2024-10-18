// src/app/account/login/page.tsx

"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRole } from '@/contexts/RoleContext'

export default function HealthcareLogin() {
    const [userType, setUserType] = useState('')
    const router = useRouter()
    const { setRole } = useRole()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (userType) {
            setRole(userType as 'doctor' | 'patient' | 'nurse')
            router.push('/dashboard')
        }
    }

    const userTypes = ['Patient', 'Doctor', 'Nurse']

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="shadow-lg border-0">
                    <CardHeader className="space-y-1 pb-8">
                        <div className="flex justify-center mb-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            >
                                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-8 h-8 text-primary-foreground"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-center">HealthConnect Portal</CardTitle>
                        <CardDescription className="text-center text-sm">Select your role to access the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="user-type" className="text-sm font-medium">User Type</Label>
                                <Select onValueChange={setUserType} value={userType}>
                                    <SelectTrigger id="user-type" className="w-full bg-muted">
                                        <SelectValue placeholder="Choose your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {userTypes.map((type) => (
                                            <SelectItem key={type} value={type.toLowerCase()}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            onClick={handleSubmit}
                            disabled={!userType}
                        >
                            Continue
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                            By continuing, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}