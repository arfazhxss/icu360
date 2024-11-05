'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { TriageData } from '@/utils/types'
import { useRole } from '@/contexts/RoleContext'

class ReceiptItem {
    constructor(public description: string, public cost: number) { }
}

class Receipt {
    private items: ReceiptItem[] = [];
    private total: number = 0;

    addItem(item: ReceiptItem) {
        this.items.push(item);
        this.total += item.cost;
    }

    getItems(): ReceiptItem[] {
        return this.items;
    }

    getTotal(): number {
        return this.total;
    }
}

class ReceiptManager {
    private static instance: ReceiptManager;
    private receipts: { [key: string]: Receipt } = {};
    private patientConsultations: { [key: string]: number } = {};

    private constructor() { }

    static getInstance(): ReceiptManager {
        if (!ReceiptManager.instance) {
            ReceiptManager.instance = new ReceiptManager();
        }
        return ReceiptManager.instance;
    }

    generateReceipt(triage: TriageData): Receipt {
        const receipt = new Receipt();

        // Base consultation fee (only once per patient)
        if (!this.patientConsultations[triage.patientId]) {
            receipt.addItem(new ReceiptItem("Base Consultation Fee", 50));
            this.patientConsultations[triage.patientId] = 1;
        } else {
            this.patientConsultations[triage.patientId]++;
        }

        // Symptom assessment (incrementally increasing cost)
        const consultationCount = this.patientConsultations[triage.patientId];
        triage.symptoms.forEach((symptom, index) => {
            const cost = 10 + (index * 5 * consultationCount);
            receipt.addItem(new ReceiptItem(`${symptom} Assessment`, cost));
        });

        // Pain level assessment
        const painCost = parseInt(triage.painLevel) * 5;
        receipt.addItem(new ReceiptItem(`Pain Assessment (Level ${triage.painLevel})`, painCost));

        // Medical history review
        triage.medicalHistory.forEach(condition => {
            receipt.addItem(new ReceiptItem(`${condition} History Review`, 15));
        });

        // Severity assessment
        const severityCost = triage.severity === 'High' ? 100 : triage.severity === 'Medium' ? 50 : 25;
        receipt.addItem(new ReceiptItem(`Severity Assessment (${triage.severity})`, severityCost));

        // Prescription (if available)
        if (triage.prescription) {
            receipt.addItem(new ReceiptItem("Prescription", 30));
        }

        // Doctor's notes (if available)
        if (triage.doctorNotes) {
            receipt.addItem(new ReceiptItem("Doctor's Consultation", 75));
        }

        this.receipts[triage.id] = receipt;
        return receipt;
    }

    getReceipt(id: string): Receipt | undefined {
        return this.receipts[id];
    }

    clearReceipts(): void {
        this.receipts = {};
        this.patientConsultations = {};
    }
}

export default function TriageReceipt() {
    const [triageData, setTriageData] = useState<TriageData[]>([]);
    const { user } = useRole();
    const receiptManager = useMemo(() => ReceiptManager.getInstance(), []);

    useEffect(() => {
        const fetchTriageData = async () => {
            try {
                const response = await fetch('/api/triage');
                if (!response.ok) {
                    throw new Error('Failed to fetch triage data');
                }
                const data = await response.json();
                const filteredData = data.filter((triage: TriageData) => triage.patientId === user?.id);
                setTriageData(filteredData);
            } catch (error) {
                console.error('Error fetching triage data:', error);
            }
        };

        if (user?.id) {
            fetchTriageData();
        }

        return () => {
            receiptManager.clearReceipts();
        };
    }, [user?.id, receiptManager]);

    useEffect(() => {
        triageData.forEach(triage => {
            receiptManager.generateReceipt(triage);
        });
    }, [triageData, receiptManager]);

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Triage Receipts</CardTitle>
            </CardHeader>
            <CardContent>
                {triageData.map((triage) => {
                    const receipt = receiptManager.getReceipt(triage.id);
                    return (
                        <Dialog key={triage.id}>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full mb-2">
                                    View Receipt for Triage ID: {triage.id}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Triage Cost Breakdown</DialogTitle>
                                    <DialogDescription>
                                        Detailed cost breakdown for your triage session.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="mt-4">
                                    {receipt?.getItems().map((item, index) => (
                                        <div key={index} className="flex justify-between py-2">
                                            <span>{item.description}</span>
                                            <span>${item.cost.toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between py-2 font-bold border-t mt-2">
                                        <span>Total</span>
                                        <span>${receipt?.getTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                                {triage.prescription && (
                                    <div className="mt-4 p-2 bg-blue-100 rounded">
                                        <h4 className="font-bold">Prescription:</h4>
                                        <p>{triage.prescription}</p>
                                    </div>
                                )}
                                {triage.doctorNotes && (
                                    <div className="mt-4 p-2 bg-green-100 rounded">
                                        <h4 className="font-bold">Doctor&apos;s Notes:</h4>
                                        <p>{triage.doctorNotes}</p>
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                    );
                })}
            </CardContent>
        </Card>
    );
}