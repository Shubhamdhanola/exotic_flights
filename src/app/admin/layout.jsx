import "./styles/admin.css";
import Sidebar from './components/sidebar/Sidebar';
import Navbar from "./components/navbar/Navbar";

export const metadata = {
	title: "Admin Dashboard",
	description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				<div className="flex flex-col h-screen">
					<Navbar />
					<div className="flex flex-1">
						<Sidebar />
						<main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
