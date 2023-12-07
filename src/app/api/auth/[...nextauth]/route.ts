import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { findEmployee } from "../../../../api/employee";
import { rSession, rToken, rUser } from "../../../../types";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async signIn({ user, profile }) {
            const lastName = (profile as any).family_name;
            const firstName = (profile as any).given_name;

            const employee = await findEmployee(lastName, firstName);

            if (employee === null) {
                return "/unauthorized";
            }

            if (employee.role === "manager") {
                (user as rUser).employee = employee;
            }
            
            return true;
        },
        async jwt({ token, user }) {
            if ((user as rUser)?.employee) {
                token.employee = (user as rUser).employee;
            }
            token.user = user;
            return token;
        },
        async session({ session, token, user }) {
            if ((token as rToken)?.employee && (session as rSession)?.user) {
                (session as rSession)!.user!.employee = (token as rToken).employee;
            }
            return session;

        }
    }
})

export { handler as GET, handler as POST }