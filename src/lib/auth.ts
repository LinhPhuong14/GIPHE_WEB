import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

interface Session {
  user: {
    id: string;
    role: string;
  };
}
type Token = {
  id: string;
  role: string;
};
// Mock user database
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    image: "/placeholder.svg?height=40&width=40",
    role: "student",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    image: "/placeholder.svg?height=40&width=40",
    role: "admin",
  },
]

export const authOptions = {
  providers: [
    // Commented out OAuth providers
    /*
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    */

    // Simple credentials provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Find user in the mock database
        const user = users.find((user) => user.email === credentials.email)

        // Check if user exists and password matches
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: Token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-for-development",
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)

