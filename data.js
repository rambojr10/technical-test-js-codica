import fetch from 'node-fetch'
import { API_URL, API_KEY } from './constants.js'

export async function getData () {
  try {
    const request = await fetch(
      `${API_URL}${API_KEY}`
    )
    const { data } = await request.json()

    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getCoins () {
  const data = await getData()
  return Object.keys(data)
}

export async function getRates () {
  const data = await getData()
  const rates = []
  for (const [key, value] of Object.entries(data)) {
    if (key !== 'USD') {
      rates.push(`1 USD = ${value.toFixed(2)} ${key}`)
    }
  }

  return rates
}
