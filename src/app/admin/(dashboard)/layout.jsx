'use client';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';

export default function RootLayout({ children }) {

	return (
		<>
			<div className="flex flex-col h-screen ">
				<Navbar />
				<div className="flex flex-1">
					<Sidebar />
					<main className="flex-1 p-6 bg-gray-100 overflow-auto">
						{children}
					</main>
				</div>
			</div>
		</>
	);
}
