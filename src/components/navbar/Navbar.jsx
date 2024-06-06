import Image from "next/image"
import Link from "next/link"
import "../navbar/style.css"

const Navbar = () => {
	return (
		<nav className="flex justify-between items-center backdrop-blur-sm py-4 px-6 gap-32">
			<div className="logo">
				<h2 className="gradientText">Exotic Fligts</h2>
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