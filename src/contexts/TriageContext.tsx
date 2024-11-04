// src/contexts/TriageContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TriageData } from '@/utils/types';

interface TriageContextType {
    triageData: TriageData[];
    addTriageData: (data: Omit<TriageData, 'id'>) => Promise<void>;
    updateTriageData: (id: string, data: Partial<TriageData>) => Promise<void>;
    deleteTriageData: (id: string) => Promise<void>; // Add this line
    getTriageData: (id: string) => TriageData | undefined;
    refetchTriageData: () => Promise<void>;
}

const TriageContext = createContext<TriageContextType | undefined>(undefined);

export const TriageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [triageData, setTriageData] = useState<TriageData[]>([]);

    const fetchTriageData = async () => {
        try {
            const response = await fetch('/api/triage');
            if (!response.ok) {
                throw new Error('Failed to fetch triage data');
            }
            const data = await response.json();
            setTriageData(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error loading triage data:', error);
            setTriageData([]);
        }
    };

    useEffect(() => {
        fetchTriageData();
    }, []);

    const addTriageData = React.useCallback(async (data: Omit<TriageData, 'id'>) => {
        const newData = { ...data, id: Date.now().toString() };
        try {
            const response = await fetch('/api/triage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            if (!response.ok) {
                throw new Error('Failed to add triage data');
            }
            console.log('Triage data added successfully');
            await fetchTriageData();
        } catch (error) {
            console.error('Error adding triage data:', error);
        }
    }, []);

    const updateTriageData = React.useCallback(async (id: string, data: Partial<TriageData>) => {
        try {
            const response = await fetch('/api/triage', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, ...data }),
            });
            if (!response.ok) {
                throw new Error('Failed to update triage data');
            }
            console.log('Triage data updated successfully');
            await fetchTriageData();
        } catch (error) {
            console.error('Error updating triage data:', error);
        }
    }, []);

    const deleteTriageData = React.useCallback(async (id: string) => {
        try {
            const response = await fetch('/api/triage', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error('Failed to delete triage data');
            }
            console.log('Triage data deleted successfully');
            await fetchTriageData();
        } catch (error) {
            console.error('Error deleting triage data:', error);
        }
    }, []);

    const getTriageData = React.useCallback((id: string) => triageData.find(item => item.id === id), [triageData]);

    const refetchTriageData = React.useCallback(async () => {
        await fetchTriageData();
    }, []);

    const contextValue = React.useMemo(() => ({
        triageData,
        addTriageData,
        updateTriageData,
        deleteTriageData, // Add this line
        getTriageData,
        refetchTriageData
    }), [triageData, addTriageData, updateTriageData, deleteTriageData, getTriageData, refetchTriageData]);

    return (
        <TriageContext.Provider value={contextValue}>
            {children}
        </TriageContext.Provider>
    );
};

export const useTriageContext = () => {
    const context = useContext(TriageContext);
    if (context === undefined) {
        throw new Error('useTriageContext must be used within a TriageProvider');
    }
    return context;
};