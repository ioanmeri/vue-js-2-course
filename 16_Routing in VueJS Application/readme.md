# Routing

The **router** is the important thing about **SPA**, because technically it means we only have **1 Single Page**, which is the **index.html** file we load.

And then we use this Single Page, to emulate navigation. It looks like as we are visiting different pages - url changes -, but behind the scenes is always the same page.

The whole app is handle by VueJS. Allows you to build **very big applications** based on **VueJS**.

## Setting Up

The components represent our pages, it's key to have multiple of them.

### vue-router

#### Install Vue Router
```
_> npm install --save vue-router
```

#### Add to main.js
```
import VueRouter from 'vue-router'; 

Vue.use(VueRouter);
```

### Loading Routes

**Register the routes** in the root Vue Instance - **new Vue()** in **main.js**

You can:

* set it up in the main.js file
* outsource it

#### Outsource

* create **routes.js** file in **src** folder

* Each **object** in exported array, will represent **a route**
```
import User from './components/user/User.vue';
import Home from './components/Home.vue';

export const routes = [
	{ path: '', component: Home},
	{ path: '/user', component: User},
];
```

* Register in **main.js**
```
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
	routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

```

_routes in es6 is the shortcut for routes: routes_

* Also need a place to **render them** - where to load that component (Home or User)
	* Add in **App.vue template**:
```
<router-view></router-view>
```


##### Route Options

* **path**: will trigger whenever we visit that path
	* e.g. if path: '/user' => www.example.com/user
* **component**: which component to load, when we visiting that path


## Routing Modes

A style you see a lot in SPA due to a specific reason

We want to handle each request on our local page

But the first time, in this case, we want to get the request to the server because we need to get the Single Page. 

So:
localhost:8080/#/user

the first part:

**localhost:8080** would give us back the HTML file

after the hashtag:

is then handed over to our running JS application, and maybe handled by that application

**But** having these URLs **isn't that pretty**.

Would be nicer, not to have that hashtag, and still be able to use our SPA as used to do.

### Configure the Server
You have to **return the index.html file in all cases**, even in 404

* because in the **index.html** file, our **VueJS** app **get launched** through /dist/build.js
* hence it is able to then parse our URL and take over
* it gives us nicer routes

### Use History Mode
in **main.js**
```
const router = new VueRouter({
	routes,
	mode: 'history'
});
```

_the default is hash mode_

It works, because our dev server we are using here in webpack project, is automatically set up in a way to give us back the index.html file in all circumstances. Otherwise this would not work. You need to configure your server appropriately.

[Documentation](https://router.vuejs.org/guide/essentials/history-mode.html)

## Navigating with Router Links

We don't want to send the requests to the Server - I don't want to leave the Application

Instead use: ```<router-link to="Home">Home</router-link>```

At the end it gets replaced by an anchor tag

**src/components/Header.vue**

```
<template>
	<ul class="nav nav-pills">
	  <li role="presentation"><router-link to="/">Home</router-link></li>
	  <li role="presentation"><router-link to="/user">User</router-link></li>
	</ul>
</template>
```
**src/App.vue**
```
<template>
  ...
  <h1>Routing</h1>
  <hr>
  <app-header></app-header>
  <router-view></router-view>
</template>
```
```
<script>
  import Header from './components/Header.vue';

  export default {
    components: {
      appHeader: Header
    }
  }
</script>
```

Now, if you click a link, the page is **not reloading** (no reload animation in the browser)

* it doesn't do the default behavior of sending a request
* there is an implicit click listener attached to it

### Where am I? Styling Active Links

* Create a list item with router-link, which is the **real** link
  * it has an anchor tag as content
* override the default active class with **active-class="active"**
* add **exact** for exact much
	* otherwise Home is active when User is active because both start with /
  * exact means: it has to be the **full path** which matches

```
<template>
  <ul class="nav nav-pills">
    <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
    <router-link to="/user" tag="li" active-class="active"><a>User</a></router-link>
  </ul>
</template>
```

### Navigating from Code (Imperative Navigation)
Link from User page to Home Page

```
<template>
  <div>
    <h1>The User Page</h1>
    <button @click="navigateToHome" class="btn btn-primary">Go To Home</button>
  </div>
</template>

<script>
  export default {
    methods: {
      navigateToHome(){
        this.$router.push('/');
      }
    }
  }
</script>
```
## Route Parameters

### Setting Up Route Parameters

Add dynamic pieces in these routes.

E.g. for the user we want to pass an Id.

```
export const routes = [
  { path: '', component: Home},
  { path: '/user/:id', component: User},
];
```
**:id** => a flexible element you embed in the URL

### Fetching and Using Route Parameters
To retrieve such a dynamic parameter:

```
template
  <p>Loaded ID: {{ id }}</p>

script

    data(){
      return {
        id: this.$route.params.id
      }
    },
```

### Reacting to Changes in Route Parameters

**Problem**:

The User Component **isn't re-created**. 

If I have two links: user/1 and user/2 and I visit **first user/1 and then user/2**

The Loaded **Id stays at 1**

VueJS by default will save these resources and simply keep the existing component. That, of course, is an issue if some pieces on that component have to change.

Therefore **solution**:

We have to **watch** for these **router params** to change. If they change, we want to update the pieces on that page which need to be updated depending on our parameters.

The **$route** does change! It's only the id is not updated because this is not computed or dynamic component.

#### Code to Watch Changes in Route Params
**to** and **from**: routes. 

**from** which route we are **coming from** and **to**, which route are we going 

The **new params** are **stored** in **to** route

**Header.js**
```
  <ul class="nav nav-pills">
    <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
    <router-link to="/user/1" tag="li" active-class="active"><a>User 1</a></router-link>
    <router-link to="/user/2" tag="li" active-class="active"><a>User 2</a></router-link>
  </ul>
```

**User.js**

```
template
<p>Loaded ID: {{ id }}</p>

script

    watch: {
      '$route'(to, from){
        this.id = to.params.id;
      }
    },
```



