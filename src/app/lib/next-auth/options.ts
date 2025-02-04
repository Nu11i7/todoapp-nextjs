import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";


export const nextAuthOptions: NextAuthOptions = {
    debug: false,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUBID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLEID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    // adapter: PrismaAdapter(prisma),
    callbacks: {
        session: ({session, user}) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            };
        },
    },
};