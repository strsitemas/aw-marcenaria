const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash("TrocarEssaSenha123!", 10);

  const admin = await prisma.usuario.upsert({
    where: { email: "strsitemas@gmail.com" },
    update: {},
    create: {
      nome: "Administrador AW",
      email: "strsitemas@gmail.com",
      senhaHash,
      papel: "ADMIN",
    },
  });

  console.log("Usuario admin criado/confirmado:", admin.email);
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });