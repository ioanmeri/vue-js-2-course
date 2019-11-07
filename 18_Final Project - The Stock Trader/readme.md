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

> Stocks Component Planning

Grid of stocks and individual stock items

Indivual Stock:

* Name of the stock
* Price
* Input field
* Buy Button (only buy if input not empty & valid number, number > 0)

> Stocks Component MarkUp and Dummy Data

It contains the grid for individual stocks

```
template
  <div>
     <app-stock v-for="stock in stocks"></app-stock>  
  </div>

script
  import Stock from './Stock.vue';

  export default {
    data(){
      return {
        stocks: [
          { id: 1, name: 'BMW', price: 110},
          { id: 2, name: 'Google', price: 200},
          { id: 3, name: 'Apple', price: 250},
          { id: 4, name: 'Twitter', price: 8}
        ]
      }
    },
    components: {
      appStock: Stock
    }
  }
```


> Stock Component MarkUp

```
<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          NAME
          <small>(Price: PRICE)</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input 
              type="number" 
              class="form-control"
              placeholder="Quantity">
        </div>
        <div class="pull-right">
          <button 
              class="btn btn-success">
              Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>
```

> Stock Component: pass Stock data with props

```
<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(Price: {{ stock.price }})</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input 
              type="number" 
              class="form-control"
              placeholder="Quantity"
              v-model.number="quantity">
        </div>
        <div class="pull-right">
          <button 
              class="btn btn-success"
              @click="buyStock"
              :disabled="quantity <= 0 || !Number.isInteger(quantity)"
              >Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['stock'],
    data(){
      return {
        quantity: 0
      }
    },
    methods: {
      buyStock(){
        const order = {
          stockId: this.stock.id,
          stockPrice: this.stock.price,
          quantity: this.quantity
        };
        console.log(order);
        this.quantity = 0;
      }
    }
  }
</script>
``` 

> Vuex State Management

```
_> npm install --save vuex
```

new folder: /src/**store**/

new file: /src/store/**store.js**

state will have 2 modules: portfolio, stocks, each one will have each own state. Nothing in the global state

new folder: /src/store/**modules**/

new file: /src/store/modules/**stocks.js**

```
import Vue from 'vue';
import Vuex from 'vuex';

import stocks from './modules/stocks';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stocks
  }
});
```


Dummy data moved from Stocks.vue to src/**data/stocks.js** as exported default array

new file: /src/store/modules/**stocks.js**
```
import stocks from '../../data/stocks';

const state = {
  stocks: []
};

const mutations = {
  'SET_STOCKS' (state, stocks){
    state.stocks = stocks;
  },
  'RND_STOCKS' (state){

  }
};

const actions = {
  buyStock: ({commit}, order) => {
    commit();
  },
  initStocks: ({commit}) => {
    commit('SET_STOCKS', stocks);
  },
  randomizeStocks: ({commit}) => {
    commit('RND_STOCKS');
  }
}

const getters = {
  stocks: state => {
    return state.stocks;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
```

add this store to our **main.js** file
```
import store from './store/store';


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

init stores in **App.vue**:
```
    created(){
      this.$store.dispatch('initStocks');
    }
```

get stocks in src/components/stocks/**Stocks.vue**
```
    computed: {
      stocks(){
        return this.$store.getters.stocks;
      }
    }
```

> Portfolio state

New file: src/store/modules/**portfolio.js**

Reaching to our overall stocks array to get name and price

> Add portfolio module in store.js

**Important**:
In stock component 

we are dispatching an action **buyStock** which is in /store/modules/**stocks.js**

but the **mutation** for that action is **in** /store/modules/**portfolio.js**

That's why it is better to use capital letters for mutations.

**You can commit mutations across modules**

> Work on portfolio/Stock.vue

cp code from stocks/Stock.vue, quite similar template

> Add Home Component and funds from state

```
template
    <p>Your Funds: {{ funds }}</p>

    computed: {
      funds(){
        return this.$store.getters.funds;
      }
    }
```

> Display funds in Home and Navbar

> Add Checks for not selling or buying more stocks than we can afford

> Make funds Look Nicer with filters

Global filter in **main.js**:

```
Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
});
```

Use it in both **Header** and **Home**

> Randomize Stocks with End Day Button

Changing stock prices now, is reflected in all components. That's the benefit of using a centrilized state

> Animating the Route Transitions

> Http functionalities

```
npm install --save vue-resource
```

Import in **main.js**:

```
import VueResource from 'vue-resource';

Vue.use(VueResource);
```

[Firebase console](https://console.firebase.google.com/)

new project

create database

change to realtime database

* read, write true to everyone 
* copy db url

> Save Data functionality PUT request

> Load Data functionality GET request

Also add src/store/**actions.js** file for global state actions with
**loadData()** action

& SET_PORTFOLIO mutation

loadData() is a global action because it influences both states: portfolio and stocks

