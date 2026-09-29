import axios from 'axios'
import { API_TOKEN_URL, AUTH_FIELD_USERNAME, AUTH_FIELD_PASSWORD } from '../constants/api.js'
import { setTokens } from './tokens.js'
import { parseTokenPair } from '../constants/api.js'

export async function obtainTokens(username, password) {
  const res = await axios.post(API_TOKEN_URL, { [AUTH_FIELD_USERNAME]: username, [AUTH_FIELD_PASSWORD]: password })
  const { access, refresh } = parseTokenPair(res.data)
  setTokens(access, refresh)
  return res.data
}
