import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { findEmployee } from "../../../../api/employee";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ profile }) {
            const lastName = (profile as any).family_name;
            const firstName = (profile as any).given_name;

            const employee = await findEmployee(lastName, firstName);

            if (employee === null) {
                return "/unauthorized";
            }

            return true;
        }
    }
})

export { handler as GET, handler as POST }