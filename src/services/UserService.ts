import axios from 'axios'


export default {
  createUser(email: string, password: string, signInMethod: string) {
    return axios.post('users/createUser',{
            email: email,
            password: password,
            signInMethod: signInMethod
            })
    }
  }