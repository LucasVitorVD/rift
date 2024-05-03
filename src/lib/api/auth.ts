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
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
      }
      
      return token
    },
  
    /* async signIn({ user, account }) {
      const token = account?.access_token;

      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
    }, */
  }
}

export default NextAuth(authOptions)