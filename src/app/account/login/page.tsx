// src/app/account/login/page.tsx

"use client"

import { useState, useEffect } from 'react'
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
import Link from 'next/link'

export default function HealthcareLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
    const [showTermsOfService, setShowTermsOfService] = useState(false)
    const { setRole, setUser, user } = useRole()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.push('/dashboard')
        }
    }, [user, router])

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        if (response.ok) {
            const userData = await response.json()
            setRole(userData.role)
            setUser(userData)
            router.push('/dashboard')
        } else {
            // Handle login error
            console.error('Login failed')
        }
    }

    if (user) {
        return null // or a loading spinner
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
                                <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
                                <div className="relative">
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="pl-10"
                                    />
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white  hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md"
                            onClick={handleSubmit}
                            disabled={!username || !password}
                        >
                            Log In
                        </Button>
                        <div className="flex items-center justify-center space-x-1 text-sm text-gray-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>Forgot your password? Contact IT  Support</span>
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
                        <div className="text-center">
                            <Link href="/account/signup" className="text-blue-600 hover:underline">
                                New patient? Sign up here
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}