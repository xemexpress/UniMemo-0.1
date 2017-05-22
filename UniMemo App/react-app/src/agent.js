import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

const API_ROOT = 'http://localhost:3000/api'

const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
  if(token){
    req.set('Authorization', `Token ${token}`)
  }
}

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Auth = {
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  current: () =>
    requests.get('/user')
}

const Requests = {
  all: page =>
    requests.get('/requests?limit=3')
}

export default {
  Requests,
  Auth,
  setToken: (_token) => { token = _token}
}
