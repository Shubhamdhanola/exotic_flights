'use client';

import './styles/admin.css';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { toast, Toaster } from 'react-hot-toast';
import { AdminAuthContext } from '../../contexts/auth-context';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
	const router = useRouter();

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const adminCookie = getCookie('admin');
		if (adminCookie) {
			setIsLoggedIn(true);
		} else {
			router.push('/admin/auth/sign-in');
		}
	}, []);

	const login = () => {
		toast.success('Login Successful!');
		setIsLoggedIn(true);
	};

	const logout = () => {
		toast.success('Logout Successful!');
		setIsLoggedIn(false);
		router.push('/admin/auth/sign-in'); 
	};

	return (
		<html>
			<body>
				<AdminAuthContext.Provider value={{ isLoggedIn, login, logout }}>
					<div className="flex flex-col h-screen">
						<Navbar />
						<div className="flex flex-1">
							<Sidebar />
							<main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
								{children}
							</main>
						</div>
					</div>
				</AdminAuthContext.Provider>
				<Toaster />
			</body>
		</html>
	);
}
