import "../styles/globals.css";
import Navbar from "../components/navbar";

export const metadata = {
	title: "Exotic Flights",
	description: "Aviation Towards Dream",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<div className="container py-2 px-3">
					<Navbar />
					<div className="content">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
