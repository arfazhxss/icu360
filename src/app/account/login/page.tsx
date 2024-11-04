"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRole } from '@/contexts/RoleContext'
import TermsOfService from '@/components/terms-of-service'
import PrivacyPolicy from '@/components/privacy-policy'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Lock, User } from 'lucide-react'

export default function HealthcareLogin() {
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState('')
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
    const [showTermsOfService, setShowTermsOfService] = useState(false)
    const { setRole: setGlobalRole } = useRole()
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (role && userId) {
            setGlobalRole(role.toLowerCase())
            router.push('/dashboard')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md px-4"
            >
                <Card className="shadow-xl border-0">
                    <CardHeader className="space-y-1 pb-8">
                        <div className="flex justify-center mb-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-12 h-12 text-white"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>
                        <CardTitle className="text-3xl font-bold text-center text-gray-800">ICU360 HealthConnect</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="role" className="text-sm font-medium text-gray-700">Role</Label>
                                <div className="relative">
                                    <Input
                                        id="role"
                                        type="text"
                                        placeholder="Enter your role (e.g., Doctor, Nurse)"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="pl-10"
                                    />
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="user-id" className="text-sm font-medium text-gray-700">User ID</Label>
                                <div className="relative">
                                    <Input
                                        id="user-id"
                                        type="text"
                                        placeholder="Enter your user ID"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        className="pl-10 pr-16"
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                                        @icu360.ca
                                    </span>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md"
                            onClick={handleSubmit}
                            disabled={!role || !userId}
                        >
                            Log In
                        </Button>
                        <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>Forgot your User ID? Contact IT Support</span>
                        </div>
                        <p className="text-xs text-center text-gray-500">
                            By logging in, you agree to our{" "}
                            <Dialog open={showTermsOfService} onOpenChange={setShowTermsOfService}>
                                <DialogTrigger asChild>
                                    <button className="underline hover:text-blue-600">Terms of Service</button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[525px]">
                                    <TermsOfService setShowTermsOfService={setShowTermsOfService} />
                                </DialogContent>
                            </Dialog>{" "}
                            and{" "}
                            <Dialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy}>
                                <DialogTrigger asChild>
                                    <button className="underline hover:text-blue-600">Privacy Policy</button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[525px]">
                                    <PrivacyPolicy setShowPrivacyPolicy={setShowPrivacyPolicy} />
                                </DialogContent>
                            </Dialog>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}