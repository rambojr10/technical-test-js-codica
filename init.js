import { getCoins, getRates } from './data.js'
import { displayResult } from './result.js'
import { defaultOptions, historyStorage } from './constants.js'
import {
  homePrompt,
  coinsPrompt,
  ratesPrompt,
  fromPrompt,
  toPrompt,
  converterPrompt,
  historyPrompt
} from './prompts.js'

async function App ({
  from = defaultOptions.from,
  to = defaultOptions.to,
  history = historyStorage
} = {}) {
  const coins = await getCoins()
  const rates = await getRates()

  console.clear()
  let isClosed = false
  const { answerHome } = await homePrompt({ from, to })

  //
  if (answerHome === 'Lista de monedas') {
    console.clear()

    const { answerCoins } = await coinsPrompt({ coins })
    if (answerCoins === 'Volver') {
      App()
    }
    if (answerCoins === 'Salir') {
      isClosed = true
    }
  }

  //
  if (answerHome === 'Tasas de cambio') {
    console.clear()

    const { answerRates } = await ratesPrompt({ rates })
    if (answerRates === 'Volver') {
      App()
    }
    if (answerRates === 'Salir') {
      isClosed = true
    }
  }

  //
  if (answerHome === "Cambiar 'DE'") {
    console.clear()

    const { answerFrom } = await fromPrompt({ from, coins })
    if (!answerFrom.match(/Volver|Salir/)) {
      defaultOptions.from = answerFrom
      App()
    }
    if (answerFrom === 'Volver') {
      App()
    }
    if (answerFrom === 'Salir') {
      isClosed = true
    }
  }

  //
  if (answerHome === "Cambiar 'A'") {
    console.clear()

    const { answerTo } = await toPrompt({ to, coins })
    if (!answerTo.match(/Volver|Salir/)) {
      defaultOptions.to = answerTo
      App()
    }
    if (answerTo === 'Volver') {
      App()
    }
    if (answerTo === 'Salir') {
      isClosed = true
    }
  }

  //
  if (answerHome === 'Conversor') {
    console.clear()

    const { answerConverter: amount } = await converterPrompt({ from, to })
    const message = await displayResult({ amount, from, to })

    history.push(message)
    App({ history })
  }

  //
  if (answerHome === 'Historial') {
    console.clear()

    const { answerHistory } = await historyPrompt({ history })
    if (answerHistory === 'Volver') {
      App({ history })
    }
    if (answerHistory === 'Salir') {
      isClosed = true
    }
  }

  //
  if (answerHome === 'Salir') {
    isClosed = true
  }

  //
  if (isClosed) {
    console.clear()
    console.log('Hasta luego!!!')
    process.exit()
  }
}

App()
