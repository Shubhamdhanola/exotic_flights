'use client';
import "./styles/admin.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { toast, Toaster } from 'react-hot-toast';
import { AdminAuthContext } from './contexts/admin-context';

export default function AdminLayout({ children }) {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const adminCookie = getCookie('admin');
        if (adminCookie) {
            setIsLoggedIn(true);
        } else {
            router.push('/admin/auth');
        }
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        toast.success('Welcome Admin!');
        router.push('/admin');
    };

    const logout = () => {
        setIsLoggedIn(false);
        toast.success('Logout Successful!');
        router.push('/admin/auth');
    };

    return (
        <html>
            <body>
                <AdminAuthContext.Provider value={{ isLoggedIn, login, logout }}>
                    {children}
                </AdminAuthContext.Provider>
                <Toaster />
            </body>
        </html>
    );
}
