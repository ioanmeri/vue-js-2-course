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

## Nested Routes

More realistic to have a **list of users** we can choose from, not hardcoded ids, and **click them**

### Setting Up Nested Routes

* All **other User Components**: UserDetail, UserEdit, UserStart **should be nested inside the User** component

* I want to have **sub-routes** in our User component so that we can load different components inside there

If child path starts with **/**, then the path is **absolute**, else it is relative to parent. 

```
export const routes = [
  { path: '', component: Home},
  { path: '/user', component: User, children: [
    {path: '', component: UserStart },
    {path: ':id', component: UserDetail },
    {path: ':id/edit', component: UserEdit },
  ]},
];
```

Children components won't be rendered in router-view
**Router-view** in App.vue is the **Root Router**

#### New Router View in User.vue
```
<router-view></router-view>
```

### Navigating to Nested Routes
I want to be able to click a list item, and load the appropriate User Detail Component and pass the parameter to it

**UserStart.vue**
```
<router-link 
  tag="li" 
  to="/user/1"
  class="list-group-item" 
  style="cursor: pointer">User 1</router-link>
```

**UserDetail.vue**
```
<p>User Loaded has ID: {{ $route.params.id }}</p>
```

## Dynamic Routes

### Making Router Links more Dynamic
```
<router-link 
    tag="button" 
    :to="'/user/' + $route.params.id + '/edit'"
    class="btn btn-primary">Edit User</router-link>
```

### Named Routes - A Better Way of Creating Links
Assign names to the route:
**routes.js**
```
export const routes = [
  { path: '', component: Home},
  { path: '/user', component: User, children: [
    {path: '', component: UserStart },
    {path: ':id', component: UserDetail },
    {path: ':id/edit', component: UserEdit, name: 'userEdit' },
  ]},
];
```
VueJS will automatically populate this real path

```
<router-link 
    tag="button" 
    :to="{ name: 'userEdit', params: { id: $route.params.id } }"
    class="btn btn-primary">Edit User</router-link>
```

## Using Query Parameters
Optional data you pass with a route:

/?a=100&b=hello

2 ways:

* String syntax: to="/?a=100&b=hello"
* Object syntax: :to="{name: '', params: {}, query: { locale: 'en', q: 100 } }"
  * set up key: value pairs where you set your parameters


## Multiple Router View (Named Router Views)
Named router views make it easy for you to reserve certain spots in your layout, in your html code, to dynamically render pieces of your application there, depending on which route you navigating to..

Header appears in **Home Page** at **top**
in **User page** at **bottom**

### Load multiple components

**routes.js**
```
import Header from './components/Header.vue';

export const routes = [
  { path: '', name: 'home', components: {
    default: Home,
    'header-top': Header
  } },
  { path: '/user', components: {
    default: User,
    'header-bottom': Header
  }, children: [
    {path: '', component: UserStart },
    {path: ':id', component: UserDetail },
    {path: ':id/edit', component: UserEdit, name: 'userEdit' },
  ]},
];
```

**App.vue**
```
<router-view name="header-top"></router-view>
<router-view></router-view>
<router-view name="header-bottom"></router-view>
```

## Redirecting
What if the user enters anything which is not covered by the App: **/something**

We want to **redirect**:

```
export const routes = [
  { path: '/redirect-me', redirect: '/user' }

  or

  { path: '/redirect-me', redirect: { name: 'home' } }
]
```

### Setting Up "Catch All" Routes / Wildcards

Everything that it is not handled by other routes, is now catched by the star route, which in this case redirects to home page.

```
{ path: '*', redirect: '/' }
```

## Animating Route Transitions

Wrap the router-view which you want to animate with transition and then set up the transition as learned
```
<transition name="slide" mode="out-in">
  <router-view></router-view>
</transition>
```

with name, with class

## Passing the Hash Fragment
To navigate at specific part of the page with '#'

We want to control, where the page scrolls when we navigate

```
template

<router-link 
    tag="button" 
    :to="link"
    class="btn btn-primary">Edit User</router-link>

script
    data(){
      return {
        link: { 
          name: 'userEdit', 
          params: { 
            id: this.$route.params.id 
          },
          query: { 
            locale: 'en', 
            q: 100 
          },
          hash: '#data' 
        }
      }
    }
```
But it dosn't scroll at the bottom..

### Controlling the Scroll Behavior
Really Simple in VueJS

**main.js**
```
const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition){
    return {x: 0, y: 0};
  }
});
```

**Fine scroll Behavior:**

```
  scrollBehavior(to, from, savedPosition){
    if(savedPosition){
      return savedPosition;
    }
    if(to.hash){
      return { selector: to.hash };
    }
    return {x: 0, y: 0};
  }
```

## Guards

### Protecting Routes with Guards

You wanna control, if a **user is allowed to enter a certain route** or he is allow to leave it

2 checks:

* **Before** a User enters a Route
* Once he wants to **leave** a Route

**3 places** where we can set up: is a User **allowed to enter** a Route **check**. 

**1 place** is allowed to **leave check**

### Using the "beforeEnter" Guard

#### 1st Place: Global

**main.js**

```
router.beforeEach((to, from, next) => {
  console.log('global beforeEach');
  next();
});
```
_If you **don't add next()**, it is assumed that is not allowed to continue and it **will exit**_

##### 3 options for next()
* Pass **nothing**
* Pass false, it will **abort**
* Pass either a path, or an object defining that path (inc. params etc) to **redirect**

#### 2nd Place: Protect certain routes (more common)
**routes.js**

beforeEnter method in route setup, directly limited to this route

```
export const routes = [
  { path: '', name: 'home', components: {
    default: Home,
    'header-top': Header
  } },
  { path: '/user', components: {
    default: User,
    'header-bottom': Header
  }, children: [
    {path: '', component: UserStart },
    {path: ':id', component: UserDetail, beforeEnter: (to, from, next)  => {
      console.log('inside route setup');
      next();
    } },
    {path: ':id/edit', component: UserEdit, name: 'userEdit' },
  ]},
  { path: '/redirect-me', redirect: { name: 'home' } },
  { path: '*', redirect: '/' }
];
```
#### 3rd Place: Component Instance

2 new methods available: beforeRouteEnter()

**Important**: As long as you **don't call next()**, this **component** is **not loaded**. So you can't access your Vue Instance, or data.. **this.link will not work**. Object hasn't fully initialized.

If you want to access the Component Instance:
``
next(vm => {
  vm.link;
});
``

```
beforeRouteEnter(to, from, next){
  if(true){ //authenticated
    next();
  }else{
    next(false); // abort
  }
}
```

### Using the "beforeLeave" Guard

The only place I can add the beforeLeave is in the Component.
Typical set up when you want to ensure that user does not navigate away be accintentally clicking the back button or something like this.

**UserEdit.vue**
```
template
  <button class="btn btn-primary" @click="confirmed = true">Confirm</button>


<script>
  export default {
    data(){
      return {
        confirmed: false
      }
    },
    beforeRouteLeave(to, from, next){
      if(this.confirmed){
        next();
      }else{
        if(confirm('Are you sure?')){
          next();
        }else{
          next(false);
        }
      }
    }
  }
</script>
```

## Loading Routes Lazily
Advanced topic that can really improve your applications

It might be unnecessary to load all the components, at the beginning of the application.

If we bundle everything with webpack, into one file. That has the disadvantage that while limiting the number of HTTP requests you send, you might limited too much because the bundle there is really big. So, you want to find the right balance having a big bungle and loading staff you only need when you need them.

We can do this with webpack

**Lazy load**: We only load parts of the application when we need it.

Right now it loads eagerly (all the time). All the **imports** at the top of **routes.js** are loaded no matter if you use it or not..

**routes.js**
```
import Home from './components/Home.vue';
import Header from './components/Header.vue';

const User = resolve => {
  require.ensure(['./components/user/User.vue'], () => {
    resolve(require('./components/user/User.vue'));
  }, 'user');
};  

const UserStart = resolve => {
  require.ensure(['./components/user/UserStart.vue'], () => {
    resolve(require('./components/user/UserStart.vue'));
  }, 'user');
};  

const UserEdit = resolve => {
  require.ensure(['./components/user/UserEdit.vue'], () => {
    resolve(require('./components/user/UserEdit.vue'));
  }, 'user');
};  

const UserDetail = resolve => {
  require.ensure(['./components/user/UserDetail.vue'], () => {
    resolve(require('./components/user/UserDetail.vue'));
  }, 'user');
};  

```

User function is a syntax that webpack recognises. Whenever we want to load somethings that lives in this place _./components/user/User.vue_ execute the resolve function, which is like a Promise. It resolves the path you want to really use.

Async function that has to resolve before it gets executed. Webpack is only doing this if we actually need that file. It will create appropriate bundles to be loaded at this point of time during the build process

if you want to bundle a group of components, add the 3rd argument 'user'










