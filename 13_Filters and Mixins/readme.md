# Imporving your App with Filters and Mixins

## Filters

**transform some data**

Is a little syntax feature you can use in your template to transform some output into template.

* Helps you transform **output into data**
* Doesn't transform the data itself, **only what user sees**
* example: a filter takes in a string and transform it all in uppercase letters
* VueJS doesn't ship with build in filters, we have to build them on our own.

### Creating a Local Filter

use the **filters** property in the local Vue Instance. It will create a new filter, which we can use in this components template.

* **Locally**, it can only be used in this template

```
<p>{{ text | toUppercase }}</p>

<script>
	export default {
		data(){
			return {
				text: 'Hello there!'
			}
		},
		filters: {
			toUppercase(value){
				return value.toUpperCase();
			}
		}
	}
</script>
```


### Global Filter

in **main.js**:
```
Vue.filter('to-lowercase', function(value){
	return value.toLowerCase();
})
```

### Chain Multiple Filters
```
<p>{{ text | toUppercase | to-lowercase}}</p>
```

### An (often-times better) Alternative to Filters: Computed Properties

Example: Fitler a list of fruits (write 'm' in input and only show fruit that starts with 'm')

**Filters** are a very **suboptimal solution** from performance perspective. 
VueJS is not able to detect when it should re-run the filter. 

Actually, it will **re-run the filtering at each re-rendering of the DOM !**

#### Solution: Computed Properties (Better Filter)
VueJS knows on what such a property depends and therefore, only recalculates it if something changes in the things we using in this method

##### template: 
```
<input v-model="filterText">
<ul>
	<li v-for="fruit in filteredFruits">{{ fruit }}</li>
</ul>
```

##### script:

```
		computed: {
			filteredFruits(){
				return this.fruits.filter((element) => {
					return element.match(this.filterText);
				});
			}
		}
```

This computed property, will be recalculated only when filterText or fruit, changes. Therefore, is very performant.

## Mixins

### Why Mixins?
If I have another component with same logic, that filters a list with computed properties. 

* Avoid code duplication
	* I could use a filter Globally, but filters aren't that good to be used.
* Code or Data which you want to share amongs multiple view Instances or components

### Creating and Using Mixing

Create a file in src folder **fruitMixin.js**:

```
export const fruitMixin = {
	data(){
		return {
			fruits: ['Apple', 'Banana', 'Mango', 'Melon'],
			filterText: ''
		}
	},
	computed: {
		filteredFruits(){
			return this.fruits.filter((element) => {
				return element.match(this.filterText);
			});
		}
	}
}
```

In my component, 

* import that mixin
* use the **mixins** property to use it

```
<script>
	import { fruitMixin } from './fruitMixin';
	
	export default {
		mixins: [fruitMixin]
	}
</script>
```

* Now it can be included in any component

### How Mixins get Merged

VueJS cleverly merges the mixin into our existing Vue Instance.

#### Merging process 
It doesnt destroy the data in our Vue Instance. VueJS tries to add the new things added by the mixin to the existing Instance.

#### Life cycle Hooks
We can provide a life cycle hook in the mixin and in our component or Instance and both will be executed, even if it's the same name. There the order is mixin first, then the component.

**Example**:

If a add the ```created()``` life cycle method in both the mixin and one Component with ```console.log('created')``` and ```console.log('Inside List Created Hook')``` 

In the console we see:
```
created
created
Inside List Created Hook
```

meaning that the **mixin hook** is executed **first** (2 times, because we are using it in 2 places), and **then** the **components** created **lifecycle hook**

The component is able to ovveride changes introduced by the mixin. Component always acts last.


### Creating a Global Mixin (Special Case!)

**Important**

A global Mixin is Added to **Every Instance**, thus every component too in your Application

* Rarely want to use it
* You wanna use this, if you create 3rd party plugins for VueJS, not in production application.

```
Vue.mixin({
	created(){
		console.log('Global mixin - Created Hook');
	}
});
```
That console.log() is executed 3 times, from:

* new Vue() call
* App.vue
* from the Component

### Mixins and Scope

Are mixin's data shared between the components which is added?

If we change data, is this reflected to all components? 

```
<button @click="fruits.push('Berries')">Add New Item</button>
```

If we add an item, is only inserted in the first List.

**Answer**

Each component, which has a mixin, **gets a fresh copy**, of this object. Not sharing one

It's safe to access the data and manipulate them without affecting other places in your application.

If you want to share, consider the event bus, or use a normal JS object