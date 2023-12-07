"use client";
import { SessionProvider } from "next-auth/react";

/**
 * Layout for the authorized pages
 */
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
