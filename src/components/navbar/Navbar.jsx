"use client"
import Link from "next/link"
import "./style.css"
import { slideAnimation } from "../../helpers/motion"
import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

const Navbar = () => {
	const [mobileView, setMobileView] = useState(false);

	function handleDropdown(e) {
		e.preventDefault();
		let checkClass = e.target.className;
		checkClass == 'open' ? setMobileView(true) : setMobileView(false);
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

					<div className="flex gap-3 items-center max-sm:hidden">
						<Link href="/auth/sign-in" className="black_btn" > Signin</Link>
						<Link href="/auth/sign-up" className="black_btn"> Signup</Link>
					</div>

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