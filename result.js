export const calculateResult = async ({ amount, from, to, data }) => {
  if (from === 'USD') return amount * data[to]

  const amountInBaseCoin = amount / data[from]
  return amountInBaseCoin * data[to]
}

export const displayResult = async ({ amount, from, to, data }) => {
  const result = await calculateResult({ amount, from, to, data })

  const message = `${amount} ${from} = ${result} ${to}`
  console.log(message)

  await new Promise((resolve) => setTimeout(resolve, 1500))

  return message
}
