'use client'

import { useState, useEffect } from 'react'

export default function ConnectionStatus() {
    const [isOnline, setIsOnline] = useState(true)
    const [lastPing, setLastPing] = useState<number | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const start = Date.now()
                const response = await fetch('/api/ping', { method: 'GET' })
                const end = Date.now()

                if (response.ok) {
                    setIsOnline(true)
                    setLastPing(end - start)
                    setErrorMessage(null)
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
            } catch (error) {
                setIsOnline(false)
                setLastPing(null)
                if (error instanceof Error) {
                    console.error('Connection check failed:', error.message)
                    setErrorMessage(error.message)
                } else {
                    console.error('An unexpected error occurred:', error)
                    setErrorMessage('An unexpected error occurred')
                }
            }
        }

        // Initial check
        checkConnection()

        // Set up interval for periodic checks every 10 seconds
        const intervalId = setInterval(checkConnection, 10000)

        // Clean up interval on component unmount
        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className="relative">
            <div className="h-1 w-full">
                <div className={`h-full w-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} transition-colors duration-300`} />
            </div>
            <div className="absolute top-2 right-2 text-xs text-gray-600">
                {lastPing !== null && (
                    <span>
                        Ping: {lastPing}ms | Speed: {isOnline ? (lastPing < 100 ? 'Fast' : lastPing < 300 ? 'Medium' : 'Slow') : 'N/A'}
                    </span>
                )}
                {errorMessage && (
                    <span className="ml-2 text-red-500">Error: {errorMessage}</span>
                )}
            </div>
        </div>
    )
}