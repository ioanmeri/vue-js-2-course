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

## Mutations

### Understanding Mutations

Mutations == Setters

Using Mutations to **Change the State**. We **commit** such mutation from one point of our application, or from one component and this will update the State. 

All the **Components** listening with **getters** will **automatically recieve the updated state**  

### Using Mutations

**store.js**:

```
export const store = new Vuex.Store({
	state: {
		counter: 0
	},
	getters: {
		doubleCounter: state => {
			return state.counter * 2;
		},
		stringCounter: state => {
			return state.counter + ' Clicks';
		}
	},
	mutations: {
		increment: state => {
			state.counter++;
		},
		decrement: state => {
			state.counter--;
		}
	}
});
```

**Counter.vue & AnotherCounter.vue**
```
<template>
  <div>
    <button class="btn btn-primary" @click="increment">Increment</button>
    <button class="btn btn-primary" @click="decrement">Decrement</button>
  </div>
</template>

<script>
  export default {
    methods: {
      increment() {
        this.$store.commit('increment');
      },
      decrement() {
        this.$store.commit('decrement');
      }
    }
  }
</script>
```

Again, would be better if we somehow map the mutations like getters. It works exactly as map getters work.

**Shorter & Better Syntax with map**

Map mutation helper method

```
<script>
  import { mapMutations } from 'vuex';

  export default {
    methods: {
      ...mapMutations([
          'increment',
          'decrement'
        ])
    }
  }
</script>
```
gives us easy access to these functions

### Why Mutations have to run Synchronously
Mutations face a big issue: they always have to be **synchronous**

You must not run any **async** task in such a mutation. 

The benefit of knowning when state changes, get lost, because if something happens asynchronously, **you can't track which mutation is responsible for which change**. 

State might change, and then change again from another mutation which was actually started first but happened to be asynchronous and just took longer than a in between mutation that was synchronous.

You can't tell if the order of changes matches the order of mutations

How we compbine both? async tasks with mutations

## Actions

Action is an extra function where we may run asynchronous tasks

### How Actions Improve Mutations

* dispatch from a Component
* commit the mutation when the async task is done - only then do we change the state in our store

### Using Actions 

**Context**: We have access to store in general - not all features - like commit and getters.

**store.js**
```
	actions: {
		increment: context => {

			context.commit('increment');
		}
	}
```
Or desctrure only commit method from context

```
	actions: {
		increment: ({ commit }) => {
			commit('increment');
		},
		decrement: ({ commit }) => {
			commit('decrement');
		},
		asyncIncrement: ({ commit }) => {
			setTimeout(() => {
				commit('increment');
			}, 1000);
		},
		asyncDecrement: ({ commit }) => {
			setTimeout(() => {
				commit('decrement');
			}, 1000);
		}
	}
```

You might consider **using only actions** even if you don't use any async tasks, just to have that clear pattern that you always dispatch actions and not sometimes directly commit a mutation to a component and sometimes dispatch an action.

I **don't want to use mutation directly**. Instead use actions, although you only need to do if for only async tasks.

**AnotherCounter.vue use Actions**:

```
<script>
  import { mapActions } from 'vuex';

  export default {
    methods: {
      ...mapActions([
          'increment',
          'decrement'
        ])
    }
  }
</script>
```

### Mapping Actions to Methods

Behind the scenes:

What mapActions 
```
methods: {
  ...mapActions([
      'increment',
      'decrement'
    ])
}
```

is this:

```
methods: {
	increment(){
		this.$store.dispatch('increment');
	}
}
```

can also pass **argument**:

```
methods: {
	increment(by){
		this.$store.dispatch('increment', by);
	}
}
```
**mapActions** thankfully creates the method in such a way, that we are **able** to **pass** on 
**argument automatically**

#### Process: How to Pass Payload

1 **Counter.vue** 

```
<button class="btn btn-primary" @click="increment(100)">Increment</button>
```

2 **store.js** add payload
```
	mutations: {
		increment: (state, payload) => {
			state.counter += payload;
		},

	actions: {
		increment: ({ commit }, payload) => {
			commit('increment', payload);
		},
```
#### Multiple properties

To pass multiple propeties to dispatcher: **use an object**

```
 <button class="btn btn-primary" @click="asyncIncrement({by: 50, duration: 500})">Increment</button>

    methods: {
      ...mapActions([
          'asyncIncrement',
          'asyncDecrement'
        ])
    }

```

**store.js**:

```
		asyncIncrement: ({ commit }, payload) => {
			setTimeout(() => {
				commit('increment', payload.by);
			}, payload.duration);
		},
		asyncDecrement: ({ commit } , payload) => {
			setTimeout(() => {
				commit('decrement', payload.by);
			}, payload.duration);
		}
```

## Two-Way-Binding(v-model) and Vuex

If we have a two way binded property in Component binded with a state property via a computed getter, then v-model does not work, because computed is only a setter.

```
<input type="text" v-model="value">
<p>{{ value }}</p>

computed: {
  value(){
    return this.$store.getters.value;
  }
},
```

How can we fix this?

We **rarely use** computed properties to set values. Here is needed though.

```
    computed: {
      value: {
        get(){
          return this.$store.getters.value;
        },
        set(value){
          this.$store.dispatch('updateValue', value);
        }
      }
    },
```

## Modules

### Improving Folder Structures

We want to structure all our VueJS related code (store.js file) with different files. Something we want to do for bigger applications. 

Because this file with all getters, mutations and actions will grow pretty quick

1

create /store/**modules**/ folder

### Modularizing the State Management

Would be nice to separate this store.js file into two different modules where each module has it's own getters, mutations state and so on.

#### Counter related code

**/moduels/counter.js**

```
const state = {};
const setters = {};
const mutations = {};
const actions = {};

export default {
	state,
	getters,
	mutations,
	actions
}
````

To import that code into **Central State store.js**:

```
import counter from './modules/counter';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		counter
	}
})
```

## Using Separate Files

Sometimes you have some actions, getters, setters which don't belong to one module.

Create a file in /store folder: **actions.js**
1

```
export const updateValue = ({commit}, payload) => {
	commit('updateValue', payload);
};
```

2

and import * as actions in **store.js**:

```
import * as actions from './actions.js';
```

3 use the whole actions object as actions:

```
export const store = new Vuex.Store({
	actions
})
```

The same for mutations and actions

**Refactored store.js**
```
import Vue from 'vue';
import Vuex from 'vuex';
import counter from './modules/counter';

import * as actions from './actions.js';
import * as mutations from './mutations.js';
import * as getters from './getters.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		value: 0
	},
	getters,
	mutations,
	actions,
	modules: {
		counter
	}
});

```

## Using Namespaces to Avoid Naming Problems

If you are using multiple modules, you have to be sure you are not using the same name twice.

All the things here are merged into a central store. Hence, they share the same namespace.

All **getters, actions, mutations have a unique name**, in all the files which in the end get merged together in the store

For large applications:

1

Create file /store/**types.js**
```
export const DOUBLE_COUNTER = 'counter/DOUBLE_COUNTER';
export const CLICK_COUNTER = 'counter/CLICK_COUNTER';
```

2

**store/modules/counter.js**

```
import * as types from '../types';

const getters = {
	[types.DOUBLE_COUNTER]: state => {
		return state.counter * 2;
	},
	[types.CLICK_COUNTER]: state => {
		return state.counter + ' Clicks';
	}
};

```

3

import types everywhere you use: **AnotherResult.vue**:

```
script

	import * as types from '../stores/types';

		computed: {
			...mapGetters({
				doubleCounter: types.DOUBLE_COUNTER,
				stringCounter: types.CLICK_COUNTER,
			})	
		}
```

We are using the types file to manage all global getters names. You can do the same for actions and mutations. Now string names are unique because we prefix them with module names.

## Auto-namespacing with Vuex 2.1

If you're using Vuex version 2.1 or higher, you may use its auto-namespacing feature to avoid having to set up all the namespaces manually. You may learn more about it here: https://github.com/vuejs/vuex/releases/tag/v2.1.0