import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, ChevronDown } from 'lucide-react'

interface PrivacyPolicyProps {
    setShowPrivacyPolicy: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PrivacyPolicy({ setShowPrivacyPolicy }: Readonly<PrivacyPolicyProps>) {
    const [activeSection, setActiveSection] = useState<string | null>(null)

    const sections = [
        { id: 'introduction', title: 'Introduction' },
        { id: 'information-collection', title: 'Information We Collect' },
        { id: 'information-usage', title: 'How We Use Your Information' },
        { id: 'data-security', title: 'Data Security' },
        { id: 'information-sharing', title: 'Sharing of Information' },
        { id: 'your-rights', title: 'Your Rights' },
        { id: 'policy-changes', title: 'Changes to This Policy' },
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
                    <Shield className="w-10 h-10 text-white mr-4" />
                    <h2 className="text-3xl font-bold text-white">Privacy Policy</h2>
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
                                            {section.id === 'introduction' &&
                                                "Welcome to ICU 360. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our medical application."}
                                            {section.id === 'information-collection' &&
                                                "We collect personal information that you provide to us, including but not limited to: name, contact information, professional credentials, medical history, current medications, and treatment plans."}
                                            {section.id === 'information-usage' &&
                                                "We use the collected information for providing and maintaining our services, improving patient care, communicating with you about appointments and treatments, and complying with legal requirements."}
                                            {section.id === 'data-security' &&
                                                "We implement strict security measures to protect your personal and medical information. This includes encryption, access controls, and regular security audits."}
                                            {section.id === 'information-sharing' &&
                                                "We may share your information with healthcare providers involved in your care, third-party service providers, and legal authorities when required by law."}
                                            {section.id === 'your-rights' &&
                                                "You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your data."}
                                            {section.id === 'policy-changes' &&
                                                "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page."}
                                            {section.id === 'contact' &&
                                                "If you have any questions about this Privacy Policy, please contact us at support@icu360.com."}
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
                        onClick={() => setShowPrivacyPolicy(false)}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
                    >
                        Accept
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}