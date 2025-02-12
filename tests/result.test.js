import { strictEqual } from 'node:assert'
import { test } from 'node:test'
import { calculateResult, displayResult } from '../result.js'

const data = { USD: 1, EUR: 0.90, GBP: 0.86, AUD: 1.59 }

test('calculateResult should calculate the correct result when converting from default currencies', async () => {
  const result = await calculateResult({ amount: 100, from: 'USD', to: 'EUR', data })
  strictEqual(result, 90)
})

test('calculateResult should calculate the correct result when converting between non-default currencies', async () => {
  const result = await calculateResult({ amount: 100, from: 'GBP', to: 'AUD', data })
  strictEqual(result.toFixed(2), '184.88')
})

test('displayResult should display the correct result message', async () => {
  const message = await displayResult({ amount: 100, from: 'USD', to: 'GBP', data })
  strictEqual(message, '100 USD = 86 GBP')
})
