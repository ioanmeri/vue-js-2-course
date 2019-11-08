# Axios

Send data over http. Alternative to Vue resource. 

**Project**: Add code to send data to the backEnd (fireBase)

Axios is not integrated into vue, so no import at main.js, this axios is not available inside components. We are going with the raw way of using it.

The goal:

* Submit Data on the SignUp Page
* Get this Data on the Dashboard Page

## Setup

```
npm install --save axios
```

## Sending a POST request

**signup.vue**:
```
import axios from 'axios';

axios.post('https://vue-axios-36d1d.firebaseio.com/users.json', formData)
  .then(res => console.log(res))
  .catch(error => console.log(error))
```

## Sending a GET request

```
import axios from 'axios';

axios.get('https://vue-axios-36d1d.firebaseio.com/users.json')
  .then(res => console.log(res))
  .catch(error => console.log(error))
}
```

## Accessing & Using Response Data
```
<script>
  import axios from 'axios';

  export default {
    data(){
      return {
        email: ''
      }
    },
    created(){
      axios.get('https://vue-axios-36d1d.firebaseio.com/users.json')
        .then(res => {
          console.log(res);
          const data = res.data;
          const users = [];
          for(let key in data){
            const user = data[key]
            user.id = key;
            users.push(user);
          }
          console.log(users);
          this.email = users[0].email;
        })
        .catch(error => console.log(error))
    }
  }
</script>

```

## Setting a Global Request Configuration

### Set default Settings for Axios in main.js

could be request specific settings, or baseUrl

axios that you import at main.js is the same shared instance across all your files

**main.js**:

```
import axios from 'axios'

axios.defaults.baseURL = 'https://vue-axios-36d1d.firebaseio.com';
```

**dashboard.js**:
```
 axios.get('/users.json')
```

#### Also can add headers
This could be a good way to pass some generic token to the backend on every request

```
axios.defaults.headers.common['Authorization'] = 'fasdfs'
```

**Just target GET requests**:
Accept only application/json

```
axios.defaults.headers.get['Accepts'] = 'application/json';
```

Check by going to: **Console > Network Tab > users.json > Headers**

## Interceptors

Executes on every request that leaves the app or reaches it

Interceptors are like **middleware**, they run in between. They should rarely block the response or request.

return the config or res, otherwise other code in my application, which waits for it will never recieve it.

**main.js**:
```
axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
});
axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})
```

Sometimes you want to **remove Interceptors**:

eject uses the Interceptor **id**, so store it first:

```
const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
}) ;
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})

axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)
```

## Custom Axios Instances

When you target different URLs:

* for **one set of URLs**, you want to attach **authorization**
* for **the other set**, you **don't want that**

### Process
create new file: /src/**axios-auth.js**

```
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://vue-axios-36d1d.firebaseio.com'
})

instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance
```

now we can import it from anywhere in the App:

/components/auth/**signup.vue**:

```
import axios from '../../axios-auth';
```

axios Instance works just like the global Instance, it's just a customized version. We can create as many custom Instances we want and need