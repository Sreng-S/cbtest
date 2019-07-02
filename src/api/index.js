import { decode }    from 'he'
import { stringify } from 'qs'
const API_ENDPOINT   = 'https://opentdb.com/api.php'
const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php';

export default {
  questions: async token => {
    const response = await fetch(`${API_ENDPOINT}?${stringify({ amount: 10, token })}`)
    const data = await response.json()
    return data.results.map(item => ({
      ...item,
      question: decode(item.question),
      incorrect_answers: item.incorrect_answers.map(decode)
    }))
  },
  token: async () => {
    const response = await fetch(
      `${TOKEN_ENDPOINT}?${stringify({ command: 'request' })}`
    )
    const data = await response.json()
    return data.token
  },
  reset: async token => {
    const response = await fetch(
      `${API_ENDPOINT}?${stringify({ command: 'reset', token })}`
    )
    const data = await response.json()
    return data.token
  }
}
