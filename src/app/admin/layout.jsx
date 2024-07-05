import "./styles/admin.css";

export const metadata = {
	title: "Admin Dashboard",
	description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>{metadata.title}</title>
				<meta name="description" content={metadata.description} />
			</head>
			<body>
				<admin>
					{children}
				</admin>
			</body>
		</html>
	);
}
