# An Introduction to Components

Components are a major piece of VueJS. Re-render the same code or business logic in different places.

## An Introduction to Components

We only have **ONE** Vue instance;

Add a prefix to the component tag name to make it unique.

#### Component

* A component, basically, extends the Vue Instance.

* **Cannot** use **data** as an **object** in the **Component** because will give an error (interferes with instance data).

* It's data must be a function that returns an object:

```
Vue.component('my-cmp'{
	data: function(){
		return {
			status: 'Critical'
		}
	},
	template: '<p>Server Status: {{ status }}</p>'
})
```
[Example](https://codepen.io/ioanmeri/pen/VwwbPqK)


## Storing Data In Components with the Data Method

Data In component **cannot be a global object**, because different instances of components (tags) would point to the same (global) data properties. And changing one property would change that property in all component instances (tags)

Using a function is **OK** because:
> Function gets executed for each separate Component

```
Vue.component('my-cmp', {
	data: function(){
		return {
			status: 'Critical'
		};
	},
	template: '<p>Server Status: {{ status }} (<button @click="changeStatus">Change</button>)</p>',
	methods: {
		changeStatus: function(){
			this.status = 'Normal';
		}
	}
});
```
this.status will refer to this instance of Vue Component

## Registering Components Locally and Globally

2 Methods for registering components:

* Vue.component('my-cmp', {}); // Global

* var cmp = {}
	```
	new Vue({
	  el: '#app',
	  components: {
	    'my-cmp': cmp // local component, register the instance
	  }
	})

	``` 

[Example](https://codepen.io/ioanmeri/pen/YzzVZQr)

## The "Root Component" in the App.vue File

## Creating a Component

## Using Components

I want to render 5 times a component at Home Page.

**process**

**ServerStatus.vue**
```
<template>
	<div>
		<p>Server Status: {{ status }}</p>
		<hr>
		<button @click="changeStatus">Change Status</button>
	</div>
</template>

<script>
	export default {
		data: function(){
			return {
				status: 'Critical'
			}
		},
		methods: {
			changeStatus(){
				this.status = 'Normal';
			}
		}
	}
</script>

<style>

</style>
```

**Home.vue**
```
<template>
	<div>
		<app-server-status v-for="server in 5"></app-server-status>
	</div>
</template>

<script>
	import ServerStatus from './ServerStatus.vue';

	export default {
		components: {
			'app-server-status': ServerStatus
		}
	}
</script>

<style>
	
</style>
```

**App.vue**
```
<template>
  <app-servers></app-servers>
</template>

<script>
</script>

<style>

</style>
```

**main.js**
```
import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue';

Vue.component('app-servers', Home);

new Vue({
  el: '#app',
  render: h => h(App)
})

```
