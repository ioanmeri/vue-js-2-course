# Final Project - The Stock Trader

## Requirements

**NavBar** 

* Portfolio
* Stocks
* End Day
  * We can see where each stock went (Stock Price updates both in Portfolio and Stocks)
* Save & Load
  * Save Data in the Web
  * And load them
* Total Funds

**Starting Page**

**Stocks** page

* we can **buy** stocks (4 options)

**Portfolio** Page

* List of bought stocks
* We can **Sell** stocks

## Planning

* Header Component
* 3 routes
  * Home Page
  * Stocks
  * Portfolio

## Process

> Install **babel-preset** for spread and rest operations

```
_> npm install --save-dev babel-preset-stage-2
```

add in **.babelrc**: ["stage-2"]

> Set Up the main components and mark them with h1

**/src/**

* Header.vue
* Home.vue
* portfolio/
  * Portfolio.vue
  * Stock.vue
* stocks/
  * Stocks.vue
  * Stock.vue

> Set Up Routes

```
_> npm install --save vue-router

```

create file src/**routes.js**:

```
import Home from './components/Home.vue';
import Portfolio from './components/portfolio/Portfolio.vue';
import Stocks from './components/stocks/Stocks.vue';

export const routes = [
  { path: '/', component:  Home },
  { path: '/portfolio', component:  Home },
  { path: '/stocks', component: Stocks }
]
```

import routes in src/**main.js**

```
import VueRouter from 'vue-router';
import { routes } from './routes';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```

view router in src/**App.vue**:

```
<div class="container">
  <router-view></router-view>
</div>
```


> Implement Header and Navigation

**Header.vue**:

Markup bootstrap nav and links:
```
<router-link to="/" class="navbar-brand">Stock Trader</router-link>

<router-link to="/portfolio" activeClass="active" tag="li"><a>Portfolio</a></router-link>
``` 


in **App.vue**:

```
template
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <div class="col-xs-12">
        <router-view></router-view>
      </div>
    </div>
  </div>

script
  import Header from './components/Header.vue';

  export default {
    components: {
      appHeader: Header
    }
  }
```