import NextAuth from 'next-auth'
import prisma from '@/lib/prisma'
import Google from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token }) {
      const prismaUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!prismaUser) {
        return token
      }

      if (!prismaUser.username) {
        await prisma.user.update({
          where: {
            id: prismaUser.id,
          },
          data: {
            username: prismaUser.name?.split(' ').join('').toLowerCase(),
          },
        })
      }

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        username: prismaUser.username,
        picture: prismaUser.image,
      }
    },

    async session({ session, token }) {
      if (token) {
        session.user.username = token.username as string
      }

      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})
