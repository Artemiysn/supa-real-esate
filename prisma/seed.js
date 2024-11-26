import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {

  await prisma.category.deleteMany({});

  const addedCategories = await prisma.category.createMany({
    data: [
      {
        name: "newly built 2024",
      },
      {
        name: "newly renovated",
      },
      {
        name: "cheapest price",
      },
    ],
  });

// user is created when logged in with Google
const firstUser = await prisma.user.findFirst({});

if (!firstUser) return null;

await prisma.posts.deleteMany({});

const addedPosts = await prisma.posts.createMany({
  data: [
    {
      userId: firstUser.id,
      title: "Munich apartment",
      price: 20000,
      address: "Maximilian Strabe 40 3",
      description:
        "Experience urban living at its finest in this sleek, contemporary apartment. Enjoy stunning city views, open-plan living spaces, and top-of-the-line appliances. This apartment is perfect for professionals and couples seeking a stylish and convenient lifestyle.",
      type: "sell",
      property: "apartment",
      city: "Munich",
      area: 80,
      kitchen: 25,
      floor: 4,
      year: 1999,
      lat: 48.137154,
      lon: 11.576124,
    },
    {
      userId: firstUser.id,
      title: "Munich house",
      price: 120000,
      address: "Leopold Strabe 50 3",
      description:
        "This warm and inviting family home offers spacious bedrooms, a fully equipped kitchen, and a private backyard. Located in a quiet neighborhood, this property is ideal for families looking for a peaceful retreat",
      type: "rent",
      property: "house",
      city: "Munich",
      area: 130,
      kitchen: 35,
      floor: 1,
      year: 1992,
      lat: 48.149154,
      lon: 11.562124,
    },
    {
      userId: firstUser.id,
      title: "Berlin apartment",
      price: 130000,
      address: "Leopold Strabe 54 3",
      description:
        "Experience urban living at its finest in this sleek, contemporary apartment. Enjoy stunning city views, open-plan living spaces, and top-of-the-line appliances. This apartment is perfect for professionals and couples seeking a stylish and convenient lifestyle.",
      type: "sell",
      property: "apartment",
      city: "Berlin",
      area: 90,
      kitchen: 33,
      floor: 8,
      year: 2001,
      lat: 52.520008,
      lon: 13.404954,
    },
    {
      userId: firstUser.id,
      title: "Istanbul apartment",
      price: 60000,
      address: "Some street 42 3",
      description:
        "Experience urban living at its finest in this sleek, contemporary apartment. Enjoy stunning city views, open-plan living spaces, and top-of-the-line appliances. This apartment is perfect for professionals and couples seeking a stylish and convenient lifestyle.",
      type: "rent",
      property: "apartment",
      city: "Istanbul",
      area: 60,
      kitchen: 23,
      floor: 12,
      year: 2009,
      lat: 41.015137,
      lon: 28.97953,
    },
    {
      userId: firstUser.id,
      title: "Paris house",
      price: 140000,
      address: "Rue des Francs-Bourgeois 20 3",
      description:
        "Indulge in the ultimate luxury with this breathtaking penthouse suite. Enjoy panoramic city views, a private rooftop terrace, and world-class amenities. This exclusive residence is perfect for those who demand the best.",
      type: "sell",
      property: "house",
      city: "Paris",
      area: 160,
      kitchen: 45,
      floor: 1,
      year: 1993,
      lat: 48.856614,
      lon: 2.352222,
    },
    {
      userId: firstUser.id,
      title: "Amsterdam apartment",
      price: 50000,
      address: "Willgelm Orange street 22 3",
      description:
        "Experience urban living at its finest in this sleek, contemporary apartment. Enjoy stunning city views, open-plan living spaces, and top-of-the-line appliances. This apartment is perfect for professionals and couples seeking a stylish and convenient lifestyle.",
      type: "rent",
      property: "apartment",
      city: "Amsterdam",
      area: 55,
      kitchen: 19,
      floor: 11,
      year: 2011,
      lat: 52.370216,
      lon: 4.895168,
    },
    {
      userId: firstUser.id,
      title: "Another Amsterdam apartment",
      price: 53000,
      address: "Willgelm Orange street 22 4",
      description:
        "Experience urban living at its finest in this sleek, contemporary apartment. Enjoy stunning city views, open-plan living spaces, and top-of-the-line appliances. This apartment is perfect for professionals and couples seeking a stylish and convenient lifestyle.",
      type: "rent",
      property: "apartment",
      city: "Amsterdam",
      area: 58,
      kitchen: 23,
      floor: 14,
      year: 2012,
      lat: 52.390216,
      lon: 4.845168,
    },
    {
      userId: firstUser.id,
      title: "Warsaw apart hotel",
      price: 51000,
      address: "Flying Gusar street 12 4",
      description:
        "Experience urban living at its finest in this sleek, contemporary apartment. Enjoy stunning city views, open-plan living spaces, and top-of-the-line appliances. This apartment is perfect for professionals and couples seeking a stylish and convenient lifestyle.",
      type: "sell",
      property: "apartment",
      city: "Warsaw",
      area: 68,
      kitchen: 23,
      floor: 12,
      year: 2013,
      lat: 52.2297746,
      lon: 21.012229,
    },
    {
      userId: firstUser.id,
      title: "New Warsaw apartment",
      price: 71000,
      address: "Flying Gusar street 19 4",
      description:
        "Experience urban living at its finest in this sleek, contemporary apartment. Enjoy stunning city views, open-plan living spaces, and top-of-the-line appliances. This apartment is perfect for professionals and couples seeking a stylish and convenient lifestyle.",
      type: "sell",
      property: "apartment",
      city: "Warsaw",
      area: 69,
      kitchen: 23,
      floor: 17,
      year: 2014,
      lat: 52.287746,
      lon: 21.072229,
    },
  ],
  skipDuplicates: true,
});

console.log({ addedPosts });

const CatIds = await prisma.category.findMany({
  select: {
    id: true
  },
  take: 3
});

console.log(CatIds); //id[0].id

const postIds = await prisma.posts.findMany({
  take: 4,
  select: {id: true}
})

console.log(postIds); //postIds[0].id

const createCategoriesOnPosts = await prisma.CategoriesOnPosts.createMany({
  data: [
    {
      postId: postIds[0].id,
      categoryId: CatIds[0].id
    },
    {
      postId: postIds[0].id,
      categoryId: CatIds[1].id
    },
    {
      postId: postIds[1].id,
      categoryId: CatIds[2].id
    },
    {
      postId: postIds[1].id,
      categoryId: CatIds[1].id
    },
    {
      postId: postIds[2].id,
      categoryId: CatIds[0].id
    },
    {
      postId: postIds[3].id,
      categoryId: CatIds[2].id
    },
  ]
})

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
