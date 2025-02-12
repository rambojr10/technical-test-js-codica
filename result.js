import { getData } from './data.js'

export const calculateResult = async ({ amount, from, to }) => {
  const data = await getData()
  if (from === 'USD') return amount * data[to]

  const amountInBaseCoin = amount / data[from]
  return amountInBaseCoin * data[to]
}

export const displayResult = async ({ amount, from, to }) => {
  const result = await calculateResult({ amount, from, to })

  const message = `${amount} ${from} = ${result} ${to}`
  console.log(message)

  await new Promise((resolve) => setTimeout(resolve, 3000))

  return message
}
