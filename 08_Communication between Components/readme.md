# Communicating between Components

## Communication Problems

I want to pass Data from the Parent to the Child

How do I get a property from parent component?

## Props

### Using Props for Parent => Child Communication

**props** means properties set from outside

In order to tell child, that will receive data from outside (props), I attach the props property to the Component export object

e.g. **name** can be set from outside

It has to use the same property name at the template 

* Behind the scenes it will create a property
* Just like a property in our Data Object, but not implicitly

#### Child

```
<template>
	<div class="component">
		<p>User Name: { name }</p>
	</div>
</template>

<script>
	export default {
		props: ['name']
	}
</script>
```

#### Parent

##### Only Passes a String - Not Dynamic
```
<template>
	<app-user-detail name="Max"></app-user-detail>
</template>
```
##### Dynamic
```
<template>
	<app-user-detail :name="Max"></app-user-detail>
</template>
```

> Case sensitive property names only works because I am using a Single File Template. 

> Single file templates is the best approach anyway.

> Dom restriction: applies case insensitive names and attributes


### Using "props" in the Child Component
Of course we can use a **prop** in the **Child** Component **methods**

I can access **this.Prop** like any data property!

```
<script>
	export default {
		props: ['myName'],
		methods: {
			switchName(){
				return this.myName.split("").reverse().join("");
			}
		}
	}
</script>
```

### Validating "props"

Passed Data must have a valid data type in order to perform operations.

e.g. cannot use reverse() at an integer, must be a string

In order to prevent errors, we must validate the props coming in.

* props should be and object
* force property to be a valid Type (String)
* can have multiple possible types, using an Array: [String, Array]

```
<script>
	export default {
		props: {
			myName: String
		}
	}
</script>
```

Now, if I pass a number and String is expected. I get an error.

#### Set Required
the prop in props can also be an object with **type**, **required** or **default** properties

```
<script>
	export default {
		myName: {
			type: String,
			required: true
		}
	}
</script>
```

##### Set Default Object

Use an function that returns an object with default values

```
<script>
	export default {
		props: {
			myName: {
				type: Object,
				default: function(){
					return {
						name: 'Max'
					}
				}
			}
		}
	}
</script>
```


## Events


