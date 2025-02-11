import { getData } from './data.js'

export const getResult = async ({ amount, from, to }) => {
  const data = await getData()
  if (from === 'USD') return amount * data[to]

  const amountInBaseCoin = amount / data[from]
  return amountInBaseCoin * data[to]
}
