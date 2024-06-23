'use client'
import "../styles/globals.css";
import Navbar from "../components/navbar/Navbar";
import { AuthContext } from "./../contexts/auth-context"
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

// export const metadata = {
// 	title: "Exotic Flights",
// 	description: "Aviation Towards Dream",
// };

export default function RootLayout({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const login = () => {
		setIsLoggedIn(true)
	}

	const logout = () => {
		setIsLoggedIn(false)
	}

	useEffect(()=>{
		if(getCookie('user'))
		{
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
					value={{ isLoggedIn, login, logout }}
				>
					<div className="root">
						<Navbar />
						<div className="w-10/12 flex justify-center items-center">
							{children}
						</div>
					</div>
				</AuthContext.Provider>
			</body>
		</html>
	);
}
