import NextAuth from 'next-auth'
import prisma from '@/lib/prisma'
import authConfig from '@/auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email!
        session.user.image = token.picture
        session.user.username = token.username as string
      }

      return session
    },

    async jwt({ token }) {
      if (!token.email) return token

      const existingUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!existingUser) return token

      if (!existingUser.username) {
        await prisma.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            username: existingUser.name?.split(' ').join('').toLowerCase(),
          },
        })
      }

      return {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        username: existingUser.username,
        picture: existingUser.image,
      }
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})
