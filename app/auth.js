import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authconfig";
import sql from "./db";


const login = async (credentials) => {
    try {
        const user = await sql`SELECT * FROM c_user WHERE username = ${credentials.emp_email} AND password = ${credentials.password}`
        
        if(!user) throw new Error("Invalid email")

        if(!password) throw new Error("Invalid password")

    } catch (error) {
        console.log(error)
        throw new Error("Failed to login user")
    }
}

export const { signIN, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
            
            },
        })
    ],
});