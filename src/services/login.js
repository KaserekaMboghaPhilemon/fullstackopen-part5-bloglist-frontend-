import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  // credentials matches the { username, password } object sent from App.jsx
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }