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