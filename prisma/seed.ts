import { fakerEN_IN as faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$connect();
  await prisma.user.deleteMany();
  const hashedPassword = await hash("test1234", 12);
  //creating users and their posts
  for (let i = 0; i < 20; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        address: faker.location.streetAddress(),
        email: faker.internet.email(),
        bio: faker.lorem.words(10),
        password: hashedPassword,
        name: faker.person.fullName(),
        phone: faker.phone.number("+91 ##### #####"),
        image: faker.image.avatarGitHub(),
        role: faker.helpers.arrayElement(["DONOR", "ORG"]),
      },
    });
  }
};

main()
  .then(() => {
    console.log("Seeded successfully 🚀");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
