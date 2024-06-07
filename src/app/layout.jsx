import "../styles/globals.css";
import Navbar from "../components/navbar/Navbar";

export const metadata = {
	title: "Exotic Flights",
	description: "Aviation Towards Dream",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<div className="main">
					<div className="gradient" />
				</div>
				<div className="root">
					<Navbar />
					<div className="w-10/12 flex justify-center items-center">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
