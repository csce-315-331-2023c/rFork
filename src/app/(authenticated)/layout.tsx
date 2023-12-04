"use client";
import { SessionProvider } from "next-auth/react";
import AuthSessionHeader from "../../components/AuthSessionHeader";

export default function AuthedLayout({ children, }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<SessionProvider>
					{children}
				</SessionProvider>
			</body>
		</html>
	)
}
