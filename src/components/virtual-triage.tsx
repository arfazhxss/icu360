'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function VirtualTriage() {
  const [step, setStep] = useState(1)
  const [triageResult, setTriageResult] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would involve more complex logic and potentially API calls
    const randomResult = Math.random()
    if (randomResult < 0.3) {
      setTriageResult("Please visit the Emergency Department immediately.")
    } else if (randomResult < 0.6) {
      setTriageResult("We recommend you visit your GP or a walk-in clinic.")
    } else {
      setTriageResult("Based on your symptoms, you can safely manage your condition at home. If symptoms worsen, please reassess.")
    }
    setStep(3)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Virtual Triage</CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <p>Welcome to the virtual triage system. This will help determine the best course of action for your current health concerns.</p>
            <Button onClick={() => setStep(2)}>Start Triage</Button>
          </div>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="symptoms">Describe your symptoms</Label>
              <Textarea id="symptoms" placeholder="Enter your symptoms here" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pain-level">Pain Level (1-10)</Label>
              <Input type="number" id="pain-level" min="1" max="10" required />
            </div>
            <div className="space-y-2">
              <Label>How long have you been experiencing these symptoms?</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-24h">Less than 24 hours</SelectItem>
                  <SelectItem value="1-3-days">1-3 days</SelectItem>
                  <SelectItem value="3-7-days">3-7 days</SelectItem>
                  <SelectItem value="more-than-week">More than a week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Are you experiencing any of the following?</Label>
              <RadioGroup defaultValue="none">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="chest-pain" id="chest-pain" />
                  <Label htmlFor="chest-pain">Chest Pain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="difficulty-breathing" id="difficulty-breathing" />
                  <Label htmlFor="difficulty-breathing">Difficulty Breathing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="severe-bleeding" id="severe-bleeding" />
                  <Label htmlFor="severe-bleeding">Severe Bleeding</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">None of the above</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        )}
        {step === 3 && triageResult && (
          <div className="space-y-4">
            <p className="font-bold">Triage Result:</p>
            <p>{triageResult}</p>
            <Button onClick={() => setStep(1)}>Start New Triage</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}