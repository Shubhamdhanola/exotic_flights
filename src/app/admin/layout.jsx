import "./styles/admin.css";

export const metadata = {
	title: "Admin Dashboard",
	description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
                <div className="admin-main">
                    {children}
                </div>
			</body>
		</html>
	);
}
