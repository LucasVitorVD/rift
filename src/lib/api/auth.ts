import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_CLIENT_KEY!,
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },

    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  
    async signIn({ user, account }) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
        }),
      });

      if (response.ok) {
        console.log("Usuário salvo com sucesso!");
        return true;
      } else {
        console.error("Erro ao salvar o usuário:", response.status);
        return false;
      }
    },
  },

  session: {
    strategy: 'jwt',
  },
}

export default NextAuth(authOptions)