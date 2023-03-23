const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

    const alice = await prisma.user.create({
        data: {
          name: 'kappa',
          money: 12112,
          properties: {
            create: {
              name: 'Kabul',
            },
          },
        },
      })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })