"use client"
import Link from "next/link"
import "./style.css"
import { slideAnimation } from "../../helpers/motion"
import { motion } from "framer-motion"
import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import { getCookie, deleteCookie, getCookies } from 'cookies-next';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from "../../contexts/auth-context"

const Navbar = () => {
	const router = useRouter()
	// Fetching the user's cookie
	const auth = useContext(AuthContext)
	const [mobileView, setMobileView] = useState(false);
	const [user, setUser] = useState(()=>{
		return getCookie('user') ? true : false;
	});

	useEffect(() => {
		const hasUser = getCookie('user');
		if (hasUser) {
			setUser(true);
		}
	}, []);

	function handleDropdown(e) {
		e.preventDefault();
		setMobileView((prev) => !prev);
	};
	
	// Handling logout 
	const handleLogout = async (e) => {
		const cookie = getCookies('user')
		e.preventDefault();
		axios.get('http://localhost:8080/api/users/logout', {
			headers: {
				Authorization: 'Bearer ' + cookie.user
			}
		}).then(res => {
			if (res.status === 200) {
				deleteCookie('user');
				setUser(false);
				auth.logout()
				router.push("/")
			}
		}).catch( (err) =>  {
			console.error('Logout error:', err);
		})
	};

	return (
		<>
			{mobileView ? "" :
				<motion.nav className="flex justify-between items-center backdrop-blur-sm w-3/4 gap-10  max-sm:w-full" {...slideAnimation('right')}>
					<motion.div className="logo" {...slideAnimation('down')}>
						<h2 className="gradientText shadow-lg py-2.5 px-5 font-bold rounded-full ">Exotic Fligts</h2>
					</motion.div>

					<div className="flex flex-1 gap-5 items-center max-sm:hidden">
						<Link href="/" className="url_input"> Home</Link>
						<Link href="/pages/aboutus" className="url_input"> About us</Link>
						<Link href="/pages/services" className="url_input"> Services</Link>
					</div>

					{auth && auth.isLoggedIn ?
						<div className="flex gap-3 items-center max-sm:hidden">
							<button className="black_btn" onClick={handleLogout}> Logout</button>
						</div>
						:
						<div className="flex gap-3 items-center max-sm:hidden">
							<Link href="/auth/sign-in" className="black_btn" > Signin</Link>
							<Link href="/auth/sign-up" className="black_btn"> Signup</Link>
						</div>
					}

					<div className="lg:hidden md:hidden">
						<Image src="/icons/hamburger-menu.svg" height="30" width="30" alt="" className="open" onClick={handleDropdown}></Image>
					</div>
				</motion.nav>
			}

			{/* Mobile View */}
			{mobileView ?
				<motion.div className="w-full absolute h-dvh z-10 top-0 bg-white/70" {...slideAnimation('down')}>
					<div className="flex flex-col items-left justify-top w-full px-3 h-full gap-2 pt-5">
						<div className="flex  justify-between items-center mb-2">
							<h2 className="gradientText shadow-lg py-2.5 px-5 font-bold rounded-full ">Exotic Fligts</h2>
							<Image src="/icons/x-letter.svg" height="30" width="30" alt="" className="close" onClick={handleDropdown}></Image>
						</div>
						<Link href="/" className="black_btn"> Home</Link>
						<Link href="/pages/aboutus" className="black_btn"> About us</Link>
						<Link href="/pages/services" className="black_btn"> Services</Link>
						<Link href="/auth/sign-in" className="black_btn" > Signin</Link>
						<Link href="/auth/sign-up" className="black_btn"> Signup</Link>
					</div>
				</motion.div> : ""}
		</>

	)
}

export default Navbar