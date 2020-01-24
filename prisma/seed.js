const { prisma } = require("../src/generated/prisma-client");

async function main() {
  await prisma.createUser({
    email: "brierleytom@gmail.com",
    name: "Tom",
    password: "pa55word",
    projects: {
      create: {
        title: "Example Project",
        content: "Hello!",
        public: true,
        location: "London",
        status: "New band"
      }
    }
  });
}

main();
