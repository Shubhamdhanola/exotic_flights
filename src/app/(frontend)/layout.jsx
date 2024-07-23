'use client'
import "./styles/frontend.css";
import Navbar from "../../components/navbar/Navbar";
import Chatbot from "../../components/chatbot/Chatbot";
import { AuthContext } from "../../contexts/auth-context"
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { toast, Toaster } from 'react-hot-toast';

// export const metadata = {
// 	title: "Exotic Flights",
// 	description: "Aviation Towards Dream",
// };

export default function RootLayout({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const login = () => {
		toast.success("Login Successful!");
		setIsLoggedIn(true)
	}

	const logout = () => {
		toast.success("Logout Successful!");
		setIsLoggedIn(false)
	}

	const error = (error) => {
		toast.error(error);
		setIsLoggedIn(false)
	}

	useEffect(() => {
		if (getCookie('user')) {
			setIsLoggedIn(true)
		}
	})

	return (
		<html lang="en">
			<body>
				<div className="main">
					<div className="gradient" />
				</div>
				<AuthContext.Provider
					value={{ isLoggedIn, login, logout, error }}
				>
					<div className="root">
						<Navbar />
						<div className="w-10/12 flex justify-center items-center">
							{children}
						</div>
						<div className="absolute top-[75%] right-2">
							{isLoggedIn ? <Chatbot /> : ''}
						</div>
					</div>
				</AuthContext.Provider>
				<Toaster></Toaster>	
			</body>
		</html>
	);
}
