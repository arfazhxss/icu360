import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, ChevronDown } from 'lucide-react'

interface TermsOfServiceProps {
    setShowTermsOfService: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TermsOfService({ setShowTermsOfService }: Readonly<TermsOfServiceProps>) {
    const [activeSection, setActiveSection] = useState<string | null>(null)

    const sections = [
        { id: 'acceptance', title: 'Acceptance of Terms' },
        { id: 'description', title: 'Description of Service' },
        { id: 'user-responsibilities', title: 'User Responsibilities' },
        { id: 'provider-responsibilities', title: 'Healthcare Provider Responsibilities' },
        { id: 'patient-rights', title: 'Patient Rights and Responsibilities' },
        { id: 'intellectual-property', title: 'Intellectual Property' },
        { id: 'liability', title: 'Limitation of Liability' },
        { id: 'termination', title: 'Termination' },
        { id: 'governing-law', title: 'Governing Law' },
        { id: 'changes', title: 'Changes to Terms' },
        { id: 'contact', title: 'Contact Us' },
    ]

    const toggleSection = (id: string) => {
        setActiveSection(activeSection === id ? null : id)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden"
            >
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 flex items-center">
                    <FileText className="w-10 h-10 text-white mr-4" />
                    <h2 className="text-3xl font-bold text-white">Terms of Service</h2>
                </div>
                <ScrollArea className="h-[60vh] p-6">
                    <div className="space-y-6">
                        {sections.map((section) => (
                            <div key={section.id} className="border-b border-gray-200 pb-4">
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className="flex justify-between items-center w-full text-left"
                                >
                                    <h3 className="text-xl font-semibold text-gray-800">{section.title}</h3>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-500 transition-transform ${activeSection === section.id ? 'transform rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                {activeSection === section.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-2 text-gray-600"
                                    >
                                        <p className="mb-2">
                                            {section.id === 'acceptance' &&
                                                "By accessing or using ICU 360, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service."}
                                            {section.id === 'description' &&
                                                "ICU 360 is a medical application designed for use by healthcare providers, patients, nurses, and receptionists to facilitate patient care, appointment scheduling, and medical record management."}
                                            {section.id === 'user-responsibilities' &&
                                                "Users agree to provide accurate information, maintain account confidentiality, restrict access to their account, and use the app in compliance with all applicable laws and regulations."}
                                            {section.id === 'provider-responsibilities' &&
                                                "Healthcare providers agree to maintain required licenses, use the app in accordance with professional standards, obtain informed consent, and comply with HIPAA regulations."}
                                            {section.id === 'patient-rights' &&
                                                "Patients have the right to access and review their medical information, request corrections, receive explanations of treatment options, and refuse or request alternative treatments."}
                                            {section.id === 'intellectual-property' &&
                                                "The app and its content are owned by ICU 360 Inc. and protected by international copyright, trademark, patent, trade secret, and other intellectual property laws."}
                                            {section.id === 'liability' &&
                                                "ICU 360 Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the app."}
                                            {section.id === 'termination' &&
                                                "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including a breach of the Terms."}
                                            {section.id === 'governing-law' &&
                                                "These Terms shall be governed and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions."}
                                            {section.id === 'changes' &&
                                                "We reserve the right to modify these Terms at any time. For material revisions, we will provide at least 30 days' notice prior to new terms taking effect."}
                                            {section.id === 'contact' &&
                                                "If you have any questions about these Terms, please contact us at support@icu360.com."}
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                    <p className="text-sm text-gray-500">Last updated: August 17, 2024</p>
                    <Button
                        onClick={() => setShowTermsOfService(false)}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
                    >
                        Accept
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}