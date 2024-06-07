"use client"
import Link from "next/link"
import "../navbar/style.css"
import { slideAnimation, headTextAnimation, headContentAnimation, headContainerAnimation } from "../../helpers/motion"
import { motion } from "framer-motion"

const Navbar = () => {
	return (
		<motion.nav className="flex justify-between items-center backdrop-blur-sm w-3/4 gap-10 max-sm:w-auto" {...slideAnimation('right')}>
			<div className="logo">
				<h2 className="gradientText shadow-lg py-2.5 px-5 font-bold rounded-full ">Exotic Fligts</h2>
			</div>
			<div className="links-container flex flex-1 gap-5 items-center">
				<Link href="/" className="url_input"> Home</Link>
				<Link href="/pages/aboutus" className="url_input"> About us</Link>
				<Link href="/pages/services" className="url_input"> Services</Link>
			</div>
			<div className="auth-links flex gap-3 items-center">
				<Link href="/auth/sign-in" className="black_btn" > Signin</Link>
				<Link href="/auth/sign-up" className="black_btn"> Signup</Link>
			</div>
		</motion.nav>
	)
}

export default Navbar