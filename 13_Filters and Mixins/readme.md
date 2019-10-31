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

