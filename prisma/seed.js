const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

    const alice = await prisma.property.createMany({
        data: [
          {name: "Frederiksberg", houses: 0, price: 500},
          {name: "Herlev", houses: 0, price: 500},
          {name: "København", houses: 0, price: 500},
          {name: "AAU CPH", houses: 0, price: 500},
          {name: "Hvidovre", houses: 0, price: 500},
          {name: "Jylland?", houses: 0, price: 500},
          {name: "Næstved", houses: 0, price: 500},
        ]
      });
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