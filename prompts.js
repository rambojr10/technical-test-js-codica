import inquirer from "inquirer"

const { prompt, Separator } = inquirer

const homePrompt = async ({ from, to }) => {
  console.log(`INICIO\nDE: ${from} - A: ${to}`)
  const answerHome = await prompt([
    {
      type: "list",
      name: "answerHome",
      message: "Selección: ",
      choices: [
        "Lista de monedas",
        "Tasas de cambio",
        "Cambiar 'DE'",
        "Cambiar 'A'",
        "Conversor",
        "Historial",
        "Salir",
      ],
    },
  ])

  return answerHome
}

const coinsPrompt = async ({ coins }) => {
  console.log(`LISTA DE MONEDAS\n${coins.join(" - ")}`)
  const answerCoins = await prompt([
    {
      type: "list",
      name: "answerCoins",
      message: "Selección: ",
      choices: ["Volver", "Salir"],
    },
  ])

  return answerCoins
}

const ratesPrompt = async ({ rates }) => {
  console.log(`TASAS DE CAMBIO\n${rates.join("\n")}`)
  const answerRates = await prompt([
    {
      type: "list",
      name: "answerRates",
      message: "Selección: ",
      choices: ["Volver", "Salir"],
    },
  ])

  return answerRates
}

const fromPrompt = async ({ from, coins }) => {
  console.log(`CAMBIAR 'DE'\nActual: ${from}`)
  const answerFrom = await prompt([
    {
      type: "list",
      name: "answerFrom",
      message: "Selección: ",
      choices: [...coins, "Volver", "Salir"],
      loop: false,
    },
  ])

  return answerFrom
}

const toPrompt = async ({ to, coins }) => {
  console.log(`CAMBIAR 'A'\nActual: ${to}`)
  const answerTo = await prompt([
    {
      type: "list",
      name: "answerTo",
      message: "Selección: ",
      choices: [...coins, "Volver", "Salir"],
    },
  ])

  return answerTo
}

const converterPrompt = async (
  from = defaultOptions.from,
  to = defaultOptions.to
) => {
  console.log("CONVERSOR", "\n", `DE: ${from}`, "\n", `A: ${to}`)
  const answerConverter = await prompt([
    {
      type: "number",
      name: "answerConverter",
      message: "Ingrese la cantidad a convertir: ",
    },
  ])

  return answerConverter
}

const historyPrompt = async (h = history) => {
  console.log(
    "HISTORIAL",
    "\n",
    h.length ? h.join("\n") : "No hay registros aún"
  )
  const answerHistory = await prompt([
    {
      type: "list",
      name: "answerHistory",
      message: "Selección: ",
      choices: ["Volver", "Salir"],
    },
  ])

  return answerHistory
}

export {
  homePrompt,
  coinsPrompt,
  ratesPrompt,
  fromPrompt,
  toPrompt,
  converterPrompt,
  historyPrompt,
}
