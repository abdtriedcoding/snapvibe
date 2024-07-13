import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export default prisma
