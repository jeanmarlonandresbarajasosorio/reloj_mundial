import inquirer from "inquirer";
import moment from "moment-timezone";
import chalk from "chalk";

function mostrarHora(ciudad, zona, color) {
  const hora = moment().tz(zona).format('HH:mm:ss');
  console.log(chalk[color](`La hora actual en ${ciudad} es: ${hora}`));
}

async function main() {
  const respuesta = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "¿Qué quieres hacer?",
      choices: [
        "1. Mostrar hora actual en Nueva York",
        "2. Mostrar hora actual en Londres",
        "3. Mostrar hora actual en ciudad ingresada manualmente",
        "4. Salir"
      ]
    }
  ]);

  switch (respuesta.opcion) {
    case "1. Mostrar hora actual en Nueva York":
      mostrarHora("Nueva York", "America/New_York", "blue");
      break;

    case "2. Mostrar hora actual en Londres":
      mostrarHora("Londres", "Europe/London", "green");
      break;

    case "3. Mostrar hora actual en ciudad ingresada manualmente":
      const ciudadManual = await inquirer.prompt([
        {
          type: "input",
          name: "ciudad",
          message: "Ingresa el nombre de la ciudad o zona horaria (Ej: Asia/Tokyo):"
        }
      ]);
      const zona = ciudadManual.ciudad;

      if (moment.tz.zone(zona)) {
        mostrarHora(zona, zona, "yellow");
      } else {
        console.log(chalk.red("❌ Zona horaria inválida. Consulta la lista de zonas horarias de IANA."));
      }
      break;

    case "4. Salir":
      console.log(chalk.magenta("👋 Saliendo de la aplicación."));
      process.exit();
  }

  main();
}

main();
