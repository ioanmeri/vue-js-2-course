# Routing

The **router** is the important thing about **SPA**, because technically it means we only have **1 Single Page**, which is the **index.html** file we load.

And then we use this Single Page, to emulate navigation. It looks like as are visiting different pages - url changes -, but behind the scenes is always the same page.

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
