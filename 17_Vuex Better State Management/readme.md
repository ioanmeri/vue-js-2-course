# Vuex

State Management so far

**Way 1:**

Between components in different layers, communication becomes harder via **passing callbacks as prop**.

**Way 2:**

Use **Event Bus** by calling $emit on Bus and listening on changes via $on

Better, shorter but still has it's issues. 

* One Bus will quickly get **pretty crowded** in bigger applications
* The **changes** we make, are **hard to track**

For large application we want real separation of concerns.

## Centralized State with Vuex

### Understanding "Centralized State"

Similar to redux or flux implementations. But it is directly aimed at VueJS and it is actually written by VueJS team

Uses a (Central) **Store** that holds the **state**

* That does **not mean** that our **components can't have their own state**
	* If you have a property in a Component which is only used in this Component and only changed in this Component, there is no need to Put it in the application State
* Everything you **use in different parts** of the application **should go in there**

With such a state we can access it from one Child's Child 1 Component and change it, and in another component we can get/access the data.

### Using the Centralized State

The goal is to **get the counter**, **out of** this **App.vue** file **into a new module** of the application, which holds the Central State.

#### Process:

1

New **folder**: **store** (same level as components)

2

New file: **store.js** (in /store)

3

```
_> npm install --save vuex
```

4

```
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		counter: 0
	}
});


```

In **state** we can store all the properties tha application may have

5

Add the store in App Root Instance
**main.js**
```
import { store } from './store/store';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
```

6

**Access store** from  components

**Counter.vue**:

```
<script>
  export default {
    methods: {
      increment() {
        this.$store.state.counter++;
      },
      decrement() {
        this.$store.state.counter++;
      }
    }
  }
</script>
```

**Result.vue**

```
<template>
    <p>Counter is: {{ counter }}</p>
</template>

<script>
    export default {
       computed: {
       	counter(){
       		return this.$state.state.counter;
       	}
       }
    }
</script>
```

### Why a Centralized State Alone Won't Fix it

If I have a calculation in two different components we would quickly face the problem that we have **duplicated code** all over the place.

**Result.vue**
```
       computed: {
       	counter(){
       		return this.$store.state.counter * 2;
       	}
       }
```

**AnotherResult.vue**
```
       computed: {
       	counter(){
       		return this.$store.state.counter * 2;
       	}
       }
```

## Getters

### Understanding Getters
When having more complex calculations when fetching our state, and possibly having it in multiple parts, we have a **solution**. 

Instead of directly accessing the state, we can create a **Getter**

Such a Getter would:

* get the state from the Store
* and perform any calculations it should perform
* then we access this getter from our different components

### Using Getters

**store.js**:

```
export const store = new Vuex.Store({
	state: {
		counter: 0
	},
	getters: {
		doubleCounter: state => {
			return state.counter * 2;
		}
	}
});
```

**Result.vue & AnotherResult.vue**

```
<script>
    export default {
       computed: {
       	counter(){
       		return this.$store.getters.doubleCounter;
       	}
       }
    }
</script>
```

### Mapping Getters to Properties

Access all the getters automatically, from template without using a computed property. Vuex has a helper method for it and we can use.

It has a method that will create all computed properties we need on it's own.

**AnotherResult.vue**

```
script
	import { mapGetters } from 'vuex';

		computed: mapGetters([
			'doubleCounter',
			'stringCounter'
		])
```

**Info**

> You can also pass an Object and map the Getters to different Names!

**Example**

```
mapGetters({
	propertyName: 'doubleCounter'
})
```
**Problem**:

We can't use our own computed properties. Not optimal

**Solution: Use ES6 and babel-preset-stage**

**Spread(...) Operator**: Pull out all the properties and methods in the object, and create separate key: value pairs for each of them

But first add package to support spread & rest es6 operators in babel.

1

```
_> sudo npm install --save-dev babel-preset-stage
```

2

Include preset in **.babelrc**

```
{
  "presets": [
    ["es2015", { "modules": false }],
    ["stage-2"]
  ]
}
```

3

```
	import { mapGetters } from 'vuex';

  export default {
		computed: {
			...mapGetters([
				'doubleCounter',
				'stringCounter'
			])	
		}
	}
```