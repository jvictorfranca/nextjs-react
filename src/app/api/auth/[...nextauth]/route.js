import db from "@/lib/dbsetup";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"


export const authOptions = {
    
    providers: [CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {label: "Email", type: "email"},
            password: {label: "Password", type: "password"},
            
            
        },
        async authorize(credentials) {
            const user = db.prepare("SELECT * FROM users WHERE email = ?").get(credentials.email)

            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                return {id: user.id, name: user.name, email: user.email}
            }

            return null
        }
    })],
    session: {
        strategy: "jwt"
    },
    callbacks: {

        async jwt({token, user}) {
            if (user) {
                const dbUser = db.prepare("SELECT id FROM users WHERE email = ?").get(user.email)

                if(dbUser) {
                    token.id = dbUser.id
                    token.is_admin = dbUser.is_admin
                } else {
                    token.is_admin = 0
                }
            } else if (token?.email) {
                const dbUser =  db.prepare("SELECT id FROM users WHERE email = ?").get(token.email)
                if(dbUser) {
                    token.is_admin = dbUser.is_admin
                }
            }
            return token
        },

        async session({session, token}) {
            if(token?.id) {
                session.user.id = token.id
            }
            return session
        },
        async redirect ({url, baseUrl}) {
            return `${baseUrl}/chat`
        }

    },

    pages: {
        signIn: "/login",
    }

}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
