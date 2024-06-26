import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import type { EmployeeType } from "@/app/types/dashboardTypes/types";
import sql from "@/app/lib/db";

// Validate credentials schema using Zod
const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

// Function to fetch user by email from the database
async function getUser(email: string): Promise<EmployeeType | undefined> {
    try {
        const users = await sql<EmployeeType[]>`SELECT * FROM c_employee WHERE emp_email=${email}`;
        return users[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user');
    }
}

// NextAuth configuration
export const { auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                // Validate credentials format
                const parsedCredentials = credentialsSchema.safeParse(credentials);

                if (!parsedCredentials.success) {
                    console.log('Invalid credentials format:', parsedCredentials.error);
                    return null;
                }

                const { email, password } = parsedCredentials.data;

                try {
                    const user = await getUser(email);

                    if (!user) {
                        console.log('User not found.');
                        return null;
                    }

                    // For production, replace with proper password hashing and comparison
                    const passwordsMatch = user.password === password;

                    if (passwordsMatch) {
                        return {
                            id: user.emp_id,
                            name: `${user.emp_fname} ${user.emp_lname}`,
                            email: user.emp_email,
                            jobTitle: user.emp_jobtitle,
                            storeId: user.store_id,
                        };
                    } else {
                        console.log('Incorrect password.');
                        return null;
                    }
                } catch (error) {
                    console.error('Failed to authenticate user:', error);
                    throw new Error('Failed to authenticate user');
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.jobTitle = user.jobTitle;
                token.storeId = user.storeId; 
            }

            console.log('JWT Callback - Token:', token);
            return token;
        },
        async session({ session, token }: { session: Session; token: any }) {
            session.user =  token
        
            console.log('Session Callback - User:', session.user);
            return session;
        }
    },
});
