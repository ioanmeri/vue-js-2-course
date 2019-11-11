# Authentication

Authentication happens on the backend, on the server. Therefore, is not very relevant to VueJS.

But, this section will be about authentication on the front end. 

* How to **get a token** from the backend
* how to **store and manage** that token
* integrate it with vuex 
* protect routes against unwanted access and more

Demo backend => Firebase.

## How Authentication Works in SPAs

The classic model: You have a session which you manage with the server

**Server** <=> **SPA**

We work with **RESTful APIs** that are **Stateless**. They don't care about connected clients and therefore, don't manage sessions. Instead, 

* login in request
* a **token** is generated and **stored on** the **server**
  * token is essentially a very long string, which can be decoded to a Javascript object with some 
      * information about the user
      * validitity of the token (when expires) and so on
  * the token also is generated in a way, that the **server** can always **verify** if it was **created by him**. Not possible to fake it.

* we **receive the token**
  * **token** is **stored** on the frontEnd - browser's storage throught the **localStorage** API

* when we request some data, from an API endpoint that actually requires us to be logged in, we simply **attach the token** to it
  * this token is what allows us to authenticate the user


## Auth in Firebase

Enable Authentication in Firebase:

Authentication > Set Up Sign-In Method > Email/Password > Enable

Allow only authenticated users:

Database > Rules > 
```
    ".read": "auth != null",
```

[Firebase Auth REST API Docs](https://firebase.google.com/docs/reference/rest/auth)

Typical API Usage:

Sign up with email/password

Then you see the API endpoint which you have to send that request, and the data


### Adding User Signup
Copy api endpoint URL
```
https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
```

Add baseURL in axios-instance:
https://identitytoolkit.googleapis.com/v1/

Remove custom authorization headers from previous section


### Adding User Signin (Login)

Firebase endpoint for: Sign in with email /password

```
https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
```

## Store token

### Using Vuex to send Auth Requests

The goal is to store the token in vuex store. The **store is** already **injected** in the **main.js** file

* Pass **post request** into an **action** because we should be able to handle the result of our requests in the vuex store. 

* dispatch an action from signup component

**signup.vue**
```
  this.$store.dispatch('signup', {
    email: formData.email,
    password: formData.password,
  })
```

**store.js**
```
actions: {
  signup({commit}, authData){
    axios.post('accounts:signUp?key=' + keys.VUE_APP_FIREBASE_KEY, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    })
      .then(res => console.log(res))
      .catch(error => console.log(error))
  },
```

We lose our state, if we reload the page plus the authUser token and userId.It's only stored in JS and that is lost if we reload

Needs refactoring

## Attach token to outgoing requests

Be careful of the axios Instances we use. 

```
import globalAxios from 'axios';
```

globalAxios will be used for storing and fetching Data.

### Process

**Sign Page**

* SignUp Component onSubmit: dispatch signUp with **all Form Data**
* Action signUp: axios Post with only needed data for Firebase signup
  * then => commit mutation authUser (token, userId)
  * and => dispatch storeUser with authData(all Form Data)
* Action storeUser: globalAxios post to store all Form Data


**Dashboard Page**

* onCreate dispatch fetchUser
* Action fetch User: globalAxios post
  * commit mutation storeUser (the first user)

### Authorize ourselfs
* Extract Token from the State
* Append to the request

Some Backends requires an authorization header which contains the token, Firebase needs to pass an additional query param: '?auth='

Now we need that because Firebase rules allows only authorized users to read and write:

```
if(!state.idToken){
  return
}
globalAxios.get('/users.json' + '?auth=' + state.idToken, userData)
```

## Protecting Routes (Auth Guards)
Navigation guard:

with beforeEnter and by accessing the store there

**routes.js**:

import store Instance as the Instance I access in my components with **$store**

```
import store from './store'


const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/signin', component: SigninPage },
  { 
    path: '/dashboard', 
    component: DashboardPage,
    beforeEnter(to, from, next){
      if(store.state.idToken){
        next()
      }else{
        next('/signin')
      }
    } 
  }
]
```

## Updating the UI State (based on Authentication State)

 Show navigation links depending if user is authenticated.

 **store.js**: Add isAuthenticated getter

 ```
 isAuthenticated (state){
  return state.idToken !== null
}
 ```

**header.vue**

```
template
<li v-if="!auth">
  <router-link to="/signup">Sign Up</router-link>
</li>
<li v-if="!auth">
  <router-link to="/signin">Sign In</router-link>
</li>
<li v-if="auth">
  <router-link to="/dashboard">Dashboard</router-link>
</li>

script
  export default {
    computed: {
      auth () {
        return this.$store.getters.isAuthenticated;
      }
    }
  }
```

## User Logout

### Logout Action

**header.js**: Dispatch Action

```
template
  <li v-if="auth">
    <button class="logout" @click="onLogout">Logout</button>
  </li>

script
      methods: {
      onLogout(){
        this.$store.dispatch('logout')
      }
    }
```

**store.js**: Add Action and mutation
```
  mutations: {
    clearAuthData(state){
      state.idToken = null
      state.userId = null
    }
  },

  actions: {
    logout({commit}){
      commit('clearAuthData')
    },

```

### Navigate away

Better than push, use **replace**

* replace the current route, so we can't go back

**store.js**:

```
import router from './router'


logout({commit}){
  commit('clearAuthData')
  router.replace('/signin')
},

```

One big **flaw** that app still has, is that we can always **logout**, if we **reload** the app. That might not be the desired result, because the user looses his session (token). Additionaly, the token is only valid for 1 hour.

## Auto Logout

If a token expired, because the user stayed in the app for more that a hour. He is automatically logged out

Firebase gives us a **refresh token**, that **never expires**. You can send that to a specific endpoint, that you can find in the documentation

Get a New id Token

[API: Exchange a refresh token for an ID token](https://firebase.google.com/docs/reference/rest/auth#section-refresh-token)

```
https://securetoken.googleapis.com/v1/token?key=[API_KEY]
```

Theoretically, create **infinite session**. A bit less secure because refresh token is valid forever, anyone with that token can generate id Tokens. Of course, is not that easy to get the refresh token though. 

You store it in local storage and there you can only access it with XSS, which Vue prevents by default. So less secure, but not insecure.

Refresh token won't be used here.

### Auto Logout after 1h

#### Add action setLogoutTimer

**store.js**:

```
actions

setLogoutTimer({commit, dispatch}, expirationTime){
  setTimeout(() => {
    commit('clearAuthData')
  }, expirationTime*1000)
},

signup({commit, dispatch}, authData){
  axios.post('accounts:signUp?key=' + keys.VUE_APP_FIREBASE_KEY, {
    .then(res => {
      dispatch('setLogoutTimer', res.data.expiresIn)
    })
},


login({commit, dispatch}, authData){
  axios.post('accounts:signInWithPassword?key=' + keys.VUE_APP_FIREBASE_KEY, {
  })
      dispatch('setLogoutTimer', res.data.expiresIn)
},

```

## Adding Auto Login

If I reload the page, I am still logged in

Store the token somewhere else, instead of vuex store. 

Because vuex store, of course, is JS and therefore is lost just like all the other data in JS is, on page reloads.


### Store expiresIn and token

Use a **broswer API: localStorage** which allows us to store key-value pairs in a percistent browser storage

Both **signup** and **login**

Store the Date the token becomes invalid, not the amount of seconds.
```
const now = new Date()
const expirationData = new Date(now.getTime() + res.data.expiresIn * 1000)

localStorage.setItem('token', res.data.idToken)
localStorage.setItem('expiresIn', expirationData)
```

### Ispect local Storage
Chrome Developer Tools > Local Storage > Expand

We see the items we got in the Local Storage

* token (value)
* expiresIn


### Extract 

At some **point of time** to automatically log the user in

* at application startup

First add action tryAutoLogin()
  * see if I have a valid token at local storage

```
tryAutoLogin({commit}){
  const token = localStorage.getItem('token')
  if(!token){
    return
  }
  const expirationDate = localStorage.getItem('expirationDate')
  const now = new Date()
  if(now >= expirationDate){
    return
  }
  const userId = localStorage.getItem('userId')
  commit('authUser', {
    token: token,
    userId: userId
  })
},

```

**App.vue** (Root Component):
```
created(){
  this.$store.dispatch('tryAutoLogin')
}
```


#### Also clear localStorage Data
**store.js**:

```
logout({commit}){
  commit('clearAuthData')
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  router.replace('/signin')
},
```

## Wrap Up

Features typical to User Authentication:

* token which we fetch when signup/login
* store token in both vuex and more precistent localstorage
* auto logout
* auto login
* UI that takes authentication status into account
  * blocking access to Dashboard if not authenticated