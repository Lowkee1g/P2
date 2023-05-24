const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {

    await prisma.property.createMany({
        data: [
            {name: "Frederiksberg", houses: 0, price: 3000, rent: parseInt(3000 * 0.3), collection: "København K"},
            {name: "Oesterbro", houses: 0, price: 2500, rent: parseInt(2500 * 0.3), collection: "København K"},
            {name: "Hellerup", houses: 0, price: 1500, rent: parseInt(1500 * 0.3), collection: "Whiskeybæltet"},
            {name: "Skodsborg", houses: 0, price: 1500, rent: parseInt(1500 * 0.3), collection: "Whiskeybæltet"},
            {name: "Gentofte", houses: 0, price: 1500, rent: parseInt(1500 * 0.3), collection: "Whiskeybæltet"},
            {name: "Strandvejen", houses: 0, price: 5500, rent: parseInt(5500 * 0.3), collection: "Expensive"},
            {name: "Amalienborg", houses: 0, price: 5000, rent: parseInt(5000 * 0.3), collection: "Expensive"},
            {name: "5C", houses: 0, price: 2500, rent: parseInt(2500 * 0.3), collection: "Transport"},
            {name: "18'eren", houses: 0, price: 2500, rent: parseInt(2500 * 0.3), collection: "Transport"},
            {name: "7A", houses: 0, price: 2500, rent: parseInt(2500 * 0.3), collection: "Transport"},
            {name: "Noerreport Station", houses: 0, price: 2500, rent: parseInt(2500 * 0.3), collection: "Transport"},
            {name: "Sydhavn Station", houses: 0, price: 2500, rent: parseInt(2500 * 0.3), collection: "Transport"},
            {name: "Hovedbanegaarden", houses: 0, price: 2500, rent: parseInt(2500 * 0.3), collection: "Transport"},
            {name: "Jespers Torvekoekken", houses: 0, price: 750, rent: parseInt(750 * 0.3), collection: "Universitet"},
            {name: "Slusen", houses: 0, price: 750, rent: parseInt(750 * 0.3), collection: "Universitet"},
            {name: "Grupperummet", houses: 0, price: 750, rent: parseInt(750 * 0.3), collection: "Universitet"},
            {name: "Aarhus", houses: 0, price: 500, rent: parseInt(500 * 0.3), collection: "Jylland"},
            {name: "Aalborg", houses: 0, price: 500, rent: parseInt(500 * 0.3), collection: "Jylland"},
            {name: "Ringkoebing", houses: 0, price: 500, rent: parseInt(500 * 0.3), collection: "Jylland"},
            {name: "Herlev", houses: 0, price: 500, rent: parseInt(500 * 0.3), collection: "Sjælland"},
            {name: "Hvidovre", houses: 0, price: 500, rent: parseInt(500 * 0.3), collection: "Sjælland"},
            {name: "Oerslev", houses: 0, price: 500, rent: parseInt(500 * 0.3), collection: "Sjælland"},
            {name: "Valby", houses: 0, price: 600, rent: parseInt(600 * 0.3), collection: "København S"},
            {name: "Sydhavn", houses: 0, price: 650, rent: parseInt(650 * 0.3), collection: "København S"},
            {name: "Noerrebro", houses: 0, price: 600, rent: parseInt(600 * 0.3), collection: "København S"},
            {name: "Amager Strandpark", houses: 0, price: 600, rent: parseInt(600 * 0.3), collection: "Amager"},
            {name: "Flyvergrillen", houses: 0, price: 600, rent: parseInt(600 * 0.3), collection: "Amager"},
            {name: "Islands Brygge", houses: 0, price: 600, rent: parseInt(600 * 0.3), collection: "Amager"},
        ],
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