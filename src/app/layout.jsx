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
				<div className="root bgGradient">
					<Navbar />
					<div className="content">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
