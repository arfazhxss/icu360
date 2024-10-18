// src/contexts/RoleContext.tsx

"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Role = 'doctor' | 'patient' | 'nurse';

interface RoleContextType {
    role: Role | null;
    setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [role, setRole] = useState<Role | null>(null);

    const value = React.useMemo(() => ({ role, setRole }), [role, setRole]);

    return (
        <RoleContext.Provider value={value}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
}