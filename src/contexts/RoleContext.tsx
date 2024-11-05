// src/contexts/RoleContext.tsx

"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'doctor' | 'patient' | 'nurse' | 'pharmacist' | 'receptionist' | null;

interface User {
    id: string;
    name: string;
    role: Role;
    username: string;
}

interface RoleContextType {
    role: Role;
    setRole: (role: Role) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    signOut: () => Promise<void>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [role, setRole] = useState<Role>(null);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch('/api/auth/session');
            if (response.ok) {
                const session = await response.json();
                if (session) {
                    setUser(session);
                    setRole(session.role as Role);
                }
            }
        };

        checkSession();
    }, []);

    const signOut = async () => {
        const response = await fetch('/api/auth/signout', { method: 'POST' });
        if (response.ok) {
            setUser(null);
            setRole(null);
            router.push('/account/login');
        }
    };

    const value = React.useMemo(() => ({ role, setRole, user, setUser, signOut }), [role, user, router]);

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