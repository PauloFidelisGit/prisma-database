import { PrismaClient } from "./build";
import estadosMunicipios from "../assets/estadosMunicipios.json";
import bcrypt from "bcrypt";

const firstDatabase = new PrismaClient();

async function main() {
  await firstDatabase.administradores.create({
    data: {
      NOME: "Nome do administrador",
      EMAIL: "admin@email.com",
      SENHA: await bcrypt.hash("123456", 10),
      CRIADO_EM: "2022-11-11T14:34:35.083Z",
    },
  });

  await firstDatabase.usuarios.create({
    data: {
      NOME: "Nome do usuario",
      EMAIL: "usuario@email.com",
      SENHA: await bcrypt.hash("123456", 10),
      CRIADO_EM: "2022-11-11T14:34:35.083Z",
      PERMISSOES: {
        create: {
          USER: {
            update: true,
            findUnique: true,
            updatePassword: true,
          },
          CRIADO_EM: "2022-11-11T14:34:35.083Z",
        },
      },
    },
  });
}

main()
  .then(async () => {
    await firstDatabase.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await firstDatabase.$disconnect();
    process.exit(1);
  });
