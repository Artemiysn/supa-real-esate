import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const addedPosts = await prisma.posts.createMany({
    data: [
      {
        userId: "cm1uv8l6l0000ebn3ww6y6yii",
        title: "Munich apartment",
        price: 20000,
        address: "some shtrasse 40 3",
        description: "some description over time",
        type: "sell",
        property: "apartment",
        city: "Munich",
        area: 80,
        kitchen: 25,
        floor: 4,
        year: 1999,
      },
      {
        userId: "cm1uv8l6l0000ebn3ww6y6yii",
        title: "Berlin apartment",
        price: 30000,
        address: "zieg shtrasse 50 3",
        description: "some description over time 222",
        type: "rent",
        property: "apartment",
        city: "Munich",
        area: 90,
        kitchen: 35,
        floor: 7,
        year: 1992,
      },
      {
        userId: "cm1uv8l6l0000ebn3ww6y6yii",
        title: "Hamburg apartment",
        price: 70000,
        address: "Uber shtrasse 40 3",
        description: "another great description over time",
        type: "sell",
        property: "apartment",
        city: "Munich",
        area: 90,
        kitchen: 20,
        floor: 2,
        year: 2007,
      },
    ],
    skipDuplicates: true,
  });
  console.log({ addedPosts });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
