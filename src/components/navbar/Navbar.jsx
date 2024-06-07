import Image from "next/image"
import Link from "next/link"
import "../navbar/style.css"

const Navbar = () => {
	return (
		<nav className="flex justify-between items-center backdrop-blur-sm py-4 px-6 gap-32 max-md:gap-10 max-sm:gap-0 max-sm:">
			<div className="logo">
				<h2 className="gradientText lg:text-2xl sm:text-2sm">Exotic Fligts</h2>
			</div>
			<div className="links-container flex flex-1 gap-5 items-center">
				<Link href="/"> Home</Link>
				<Link href="/aboutus"> About us</Link>
				<Link href="/services"> Services</Link>
			</div>
			<div className="auth-links flex gap-3 items-center">
				<Link href="/auth/sign-in" > Signin</Link>
				<Link href="/auth/sign-up"> Signup</Link>
			</div>
		</nav>
	)
}

export default Navbar