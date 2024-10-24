import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TermsOfServiceProps {
    setShowTermsOfService: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TermsOfService({ setShowTermsOfService }: Readonly<TermsOfServiceProps>) {
    return (
        <div className="container mx-auto">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Terms of Service</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[60vh]">
                        <div className="space-y-4 p-4">
                            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using ICU 360, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                            </p>

                            <h2 className="text-xl font-semibold">2. Description of Service</h2>
                            <p>
                                ICU 360 is a medical application designed for use by healthcare providers, patients, nurses, and receptionists to facilitate patient care, appointment scheduling, and medical record management.
                            </p>

                            <h2 className="text-xl font-semibold">3. User Responsibilities</h2>
                            <p>
                                Users of the app agree to:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Provide accurate and complete information</li>
                                <li>Maintain the confidentiality of their account and password</li>
                                <li>Restrict access to their account and notify us of any unauthorized use</li>
                                <li>Use the app in compliance with all applicable laws and regulations</li>
                            </ul>

                            <h2 className="text-xl font-semibold">4. Healthcare Provider Responsibilities</h2>
                            <p>
                                Healthcare providers using the app agree to:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Maintain all required licenses and certifications</li>
                                <li>Use the app in accordance with professional standards of care</li>
                                <li>Obtain informed consent from patients when necessary</li>
                                <li>Maintain patient confidentiality and comply with HIPAA regulations</li>
                            </ul>

                            <h2 className="text-xl font-semibold">5. Patient Rights and Responsibilities</h2>
                            <p>
                                Patients using the app have the right to:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Access and review their medical information</li>
                                <li>Request corrections to their medical records</li>
                                <li>Receive explanations of their treatment options</li>
                                <li>Refuse treatment or request alternative treatments</li>
                            </ul>

                            <h2 className="text-xl font-semibold">6. Intellectual Property</h2>
                            <p>
                                The app and its original content, features, and functionality are owned by ICU 360 Inc. and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                            </p>

                            <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
                            <p>
                                ICU 360 Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the app or any content provided through the app.
                            </p>

                            <h2 className="text-xl font-semibold">8. Termination</h2>
                            <p>
                                We may terminate or suspend your account and bar access to the app immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                            </p>

                            <h2 className="text-xl font-semibold">9. Governing Law</h2>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
                            </p>

                            <h2 className="text-xl font-semibold">10. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect.
                            </p>

                            <h2 className="text-xl font-semibold">11. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at support@icu360.com.
                            </p>
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-4">
                    <p className="text-sm text-center text-muted-foreground">
                        Last updated: August 17, 2024
                    </p>
                    <Button
                        onClick={() => setShowTermsOfService(false)}
                        className="w-40"
                    >
                        Accept
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}