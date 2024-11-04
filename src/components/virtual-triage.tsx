// src/components/virtual-triage.tsx

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { TriageData } from '@/utils/types'

interface VirtualTriageProps {
  onSubmit: (triageData: Omit<TriageData, 'id'>) => Promise<void>;
}

export function VirtualTriage({ onSubmit }: VirtualTriageProps) {
  const [formData, setFormData] = useState<Omit<TriageData, 'id'>>({
    patientName: '',
    age: '',
    gender: '',
    symptoms: [],
    painLevel: '',
    duration: '',
    medicalHistory: [],
    additionalNotes: '',
    severity: 'Low',
    triageStatus: 'Pending'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  const handleMedicalHistoryChange = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory.includes(condition)
        ? prev.medicalHistory.filter(c => c !== condition)
        : [...prev.medicalHistory, condition]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    // Reset form or show confirmation message
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="patientName">Full Name</Label>
        <Input
          id="patientName"
          name="patientName"
          value={formData.patientName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label>Gender</Label>
          <RadioGroup
            name="gender"
            value={formData.gender}
            onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div>
        <Label>Symptoms (Check all that apply)</Label>
        <div className="grid grid-cols-2 gap-2">
          {['Fever', 'Cough', 'Shortness of breath', 'Fatigue', 'Body aches', 'Headache', 'Loss of taste/smell', 'Sore throat'].map((symptom) => (
            <div key={symptom} className="flex items-center space-x-2">
              <Checkbox
                id={symptom}
                checked={formData.symptoms.includes(symptom)}
                onCheckedChange={() => handleCheckboxChange(symptom)}
              />
              <Label htmlFor={symptom}>{symptom}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="painLevel">Pain Level (1-10)</Label>
        <Input
          id="painLevel"
          name="painLevel"
          type="number"
          min="1"
          max="10"
          value={formData.painLevel}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="duration">Duration of Symptoms</Label>
        <Input
          id="duration"
          name="duration"
          placeholder="e.g., 2 days, 1 week"
          value={formData.duration}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label>Medical History</Label>
        <div className="grid grid-cols-2 gap-2">
          {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Cancer', 'Immunocompromised'].map((condition) => (
            <div key={condition} className="flex items-center space-x-2">
              <Checkbox
                id={condition}
                checked={formData.medicalHistory.includes(condition)}
                onCheckedChange={() => handleMedicalHistoryChange(condition)}
              />
              <Label htmlFor={condition}>{condition}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="additionalNotes">Additional Notes</Label>
        <Textarea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleInputChange}
          placeholder="Any other information you'd like to provide..."
        />
      </div>
      <Button type="submit">Submit Triage</Button>
    </form>
  )
}