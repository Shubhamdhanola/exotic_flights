import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
	return (
		<nav className="flex justify-between items-center backdrop-blur-sm py-4 px-6">
			<div className="logo">
				<Image src="/images/logo.png" width={50} height={50} alt="company logo" />
			</div>
			<div className="links-container flex gap-5 items-center">
				<Link href="/"> Home</Link>
				<Link href="/aboutus"> About us</Link>
				<Link href="/services"> Services</Link>
			</div>
			<div className="auth-links flex gap-3 items-center">
				<Link href="/auth/sign-in" > Sign in</Link>
				<Link href="/profile"> Profile</Link>
			</div>
		</nav>
	)
}

export default Navbar