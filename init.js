import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import fetch from 'node-fetch'

async function getData() {
  try {
    const request = await fetch(
      'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_nGVgpM36EsRFGqLsIRmhpgsxeQcGGKSRWfNGb3EJ'
    )

    const { data } = await request.json()
    const coins = Object.keys(data)

    const rates = []
    for (const [key, value] of Object.entries(data)) {
      if (key !== 'USD') {
        rates.push(`1 USD = ${value.toFixed(2)} ${key}`)
      }
    }

    return {
      data,
      coins,
      rates,
    }
  } catch (error) {
    console.error(error)
  }
}

const { data, coins, rates } = await getData()
const getList = () => coins.map((coin, idx) => `${idx + 1}. ${coin}`)
const getResult = ({ amount, from, to }) => {
  if (from === 'USD') return amount * data[to]

  const amountInBaseCoin = amount / data[from]
  return amountInBaseCoin * data[to]
}

const defaultOptions = {
  from: 'USD',
  to: 'EUR',
}
const history = []

const rl = createInterface({
  input,
  output,
})

const menus = {
  home: (from = defaultOptions.from, to = defaultOptions.to) => `
INICIO

DE: ${from} 
A: ${to}
=========================
1. Lista de monedas
2. Tasas de cambio
3. Cambiar 'DE'
4. Cambiar 'A'
5. Conversor
6. Historial
7. Salir
Selección: `,

  coins: `
LISTA DE MONEDAS

${coins.join(' - ')}
=========================
1. Volver
2. Salir
Selección: `,

  rates: `
TASAS DE CAMBIO

${rates.join('\n')}
=========================
1. Volver
2. Salir
Selección: `,

  from: (from = defaultOptions.from) => `
CAMBIAR 'DE'
Actual: ${from}
=========================
${getList().join('\n')}
${getList().length + 1}. Volver
Selección: `,

  to: (to = defaultOptions.to) => `
CAMBIAR 'A'
Actual: ${to}
=========================
${getList().join('\n')}
${getList().length + 1}. Volver
Selección: `,

  converter: (from = defaultOptions.from, to = defaultOptions.to) => `
CONVERSOR
DE: ${from}
A: ${to}
=========================
Ingrese la cantidad a convertir: 
${from} > `,

  history: (h = history) => `
HISTORIAL

${h.length ? h.join('\n') : 'No hay registros aún'}
=========================
1. Volver
2. Salir
Selección: `,
}

let isClosed = false
let answer = await rl.question(menus.home())

while (answer !== '7') {
  switch (answer) {
    case '1':
      console.clear()

      let answerOption1 = await rl.question(menus.coins)
      while (answerOption1) {
        if (answerOption1 === '1') {
          break
        } else if (answerOption1 === '2') {
          isClosed = true
          break
        }

        console.clear()
        answerOption1 = await rl.question(menus.coins) // default
      }
      break

    case '2':
      console.clear()

      let answerOption2 = await rl.question(menus.rates)
      while (answerOption2) {
        if (answerOption2 === '1') {
          break
        } else if (answerOption2 === '2') {
          isClosed = true
          break
        }

        console.clear()
        answerOption2 = await rl.question(menus.rates) // default
      }
      break

    case '3':
      console.clear()
      let answerOption3 = await rl.question(menus.from())
      while (answerOption3) {
        const newCoin = coins[answerOption3 - 1]
        if (newCoin) {
          defaultOptions.from = newCoin
          break
        } else if (answerOption3 === (getList().length + 1).toString()) {
          break
        }

        console.clear()
        answerOption3 = await rl.question(menus.from()) // default
      }
      break

    case '4':
      console.clear()
      let answerOption4 = await rl.question(menus.to())
      while (answerOption4) {
        const newCoin = coins[answerOption4 - 1]
        if (newCoin) {
          defaultOptions.to = newCoin
          break
        } else if (answerOption4 === (getList().length + 1).toString()) {
          break
        }

        console.clear()
        answerOption4 = await rl.question(menus.to()) // default
      }
      break

    case '5':
      console.clear()

      const { from, to } = defaultOptions
      let amount = await rl.question(menus.converter())
      while (!Number(amount)) {
        console.clear()
        console.log('Valor inválido')
        amount = await rl.question(menus.converter())
      }

      if (parseFloat(amount)) {
        const result = getResult({ amount, from, to })
        const message = `${amount} ${from} = ${result} ${to}`
        console.log(message)

        history.push(message)
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }
      break

    case '6':
      console.clear()

      let answerOption6 = await rl.question(menus.history())
      while (answerOption6) {
        if (answerOption6 === '1') {
          break
        } else if (answerOption6 === '2') {
          isClosed = true
          break
        }

        console.clear()
        answerOption6 = await rl.question(menus.history()) // default
      }
      break

    default:
      console.clear()
      break
  }

  console.log('isClosed', isClosed)
  if (isClosed) break

  console.clear()
  answer = await rl.question(menus.home())
}

console.log('\nHasta luego!')
rl.close()
