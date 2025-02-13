import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";


export const nextAuthOptions: NextAuthOptions = {
    debug: false,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    adapter: PrismaAdapter(prisma),
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
    secret: process.env.NEXTAUTH_SECRET,
};