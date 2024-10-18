import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PrivacyPolicyProps {
    setShowPrivacyPolicy: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PrivacyPolicy({ setShowPrivacyPolicy }: Readonly<PrivacyPolicyProps>) {
    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[60vh]">
                        <div className="space-y-4 p-4">
                            <h2 className="text-xl font-semibold">1. Introduction</h2>
                            <p>
                                Welcome to ICU 360. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our medical application.
                            </p>

                            <h2 className="text-xl font-semibold">2. Information We Collect</h2>
                            <p>
                                We collect personal information that you provide to us, including but not limited to:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Name, contact information, and professional credentials (for healthcare providers)</li>
                                <li>Medical history, current medications, and treatment plans (for patients)</li>
                                <li>Usage data and app interactions</li>
                            </ul>

                            <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
                            <p>
                                We use the collected information for various purposes, including:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Providing and maintaining our services</li>
                                <li>Improving patient care and treatment outcomes</li>
                                <li>Communicating with you about appointments, treatments, and app updates</li>
                                <li>Complying with legal and regulatory requirements</li>
                            </ul>

                            <h2 className="text-xl font-semibold">4. Data Security</h2>
                            <p>
                                We implement strict security measures to protect your personal and medical information. This includes encryption, access controls, and regular security audits.
                            </p>

                            <h2 className="text-xl font-semibold">5. Sharing of Information</h2>
                            <p>
                                We may share your information with:
                            </p>
                            <ul className="list-disc pl-5">
                                <li>Healthcare providers involved in your care</li>
                                <li>Third-party service providers who assist in operating our app</li>
                                <li>Legal authorities when required by law</li>
                            </ul>

                            <h2 className="text-xl font-semibold">6. Your Rights</h2>
                            <p>
                                You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your data.
                            </p>

                            <h2 className="text-xl font-semibold">7. Changes to This Policy</h2>
                            <p>
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                            </p>

                            <h2 className="text-xl font-semibold">8. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at support@icu360.com.
                            </p>
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-4">
                    <p className="text-sm text-center text-muted-foreground">
                        Last updated: August 17, 2024
                    </p>
                    <Button
                        onClick={() => setShowPrivacyPolicy(false)}
                        className="w-40"
                    >
                        Accept
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}