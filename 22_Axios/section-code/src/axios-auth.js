import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vue-axios-36d1d.firebaseio.com'
})

instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance