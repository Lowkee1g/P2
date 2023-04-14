const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

    const alice = await prisma.property.createMany({
        data: [
            {name: "Frederiksberg", houses: 0, price: 3000, rent: 900, collection: "København K"},
            {name: "Østrebro", houses: 0, price: 2500, rent: 750, collection: "København K"},
            {name: "Hellerup", houses: 0, price: 1500, rent: 450, collection: "Whiskeybæltet"},
            {name: "Chalottenlund", houses: 0, price: 1500, rent: 450, collection: "Whiskeybæltet"},
            {name: "Gentofte", houses: 0, price: 1500, rent: 450, collection: "Whiskeybæltet"},
            {name: "Strandvejen", houses: 0, price: 5500, rent: 1400, collection: "Expensive"},
            {name: "Amalienborg", houses: 0, price: 5000, rent: 1350, collection: "Expensive"},
            {name: "5C", houses: 0, price: 2500, rent: 750, collection: "Transport"},
            {name: "18'eren", houses: 0, price: 2500, rent: 750, collection: "Transport"},
            {name: "7A", houses: 0, price: 2500, rent: 750, collection: "Transport"},
            {name: "Nørreport Station", houses: 0, price: 2500, rent: 750, collection: "Transport"},
            {name: "Sydhavn Station", houses: 0, price: 2500, rent: 750, collection: "Transport"},
            {name: "Hovedbanegaarden", houses: 0, price: 2500, rent: 750, collection: "Transport"},
            {name: "Jespers Torvekøkken", houses: 0, price: 750, rent: 250, collection: "Universitet"},
            {name: "Slusen", houses: 0, price: 750, rent: 250, collection: "Universitet"},
            {name: "Grupperummet", houses: 0, price: 750, rent: 250, collection: "Universitet"},
            {name: "Aarhus", houses: 0, price: 500, rent: 150, collection: "Jylland"},
            {name: "Aalborg", houses: 0, price: 500, rent: 150, collection: "Jylland"},
            {name: "Ringkøbing", houses: 0, price: 500, rent: 150, collection: "Jylland"},
            {name: "Herlev", houses: 0, price: 500, rent: 150, collection: "Sjælland"},
            {name: "Hvidovre", houses: 0, price: 500, rent: 150, collection: "Sjælland"},
            {name: "Ørslev", houses: 0, price: 500, rent: 150, collection: "Sjælland"},
            {name: "Valby", houses: 0, price: 600, rent: 200, collection: "København S"},
            {name: "Sydhavn", houses: 0, price: 650, rent: 250, collection: "København S"},
            {name: "Nørrebro", houses: 0, price: 600, rent: 200, collection: "København S"},
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