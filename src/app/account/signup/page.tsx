// src/app/account/signup/page.tsx

"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import TermsOfService from '@/components/terms-of-service'
import PrivacyPolicy from '@/components/privacy-policy'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, User, Mail } from 'lucide-react'
import Link from 'next/link'

export default function PatientSignup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
    const [showTermsOfService, setShowTermsOfService] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email }),
        })

        if (response.ok) {
            router.push('/account/login')
        } else {
            // Handle signup error
            console.error('Signup failed')
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
                        <CardTitle className="text-3xl font-bold text-center text-gray-800">Patient Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
                                <div className="relative">
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Choose a username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="pl-10"
                                    />
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                    />
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Choose a password"
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
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-md"
                            onClick={handleSubmit}
                            disabled={!username || !password || !email}
                        >
                            Sign Up
                        </Button>
                        <p className="text-xs text-center text-gray-500">
                            By signing up, you agree to our{" "}
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
                            <Link href="/account/login" className="text-blue-600 hover:underline">
                                Already have an account? Log in here
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}