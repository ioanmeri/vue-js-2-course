# Communicating between Components

## Communication Problems

I want to pass Data from the Parent to the Child

How do I get a property from parent component?


## Props (Parent -> Child)

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
## Ways to communicate between parent and child

* Props and custom events
* Props and passing a callback as a prop (which actually executes a method in the parent)
	* Passing it as a prop, makes it executable from the child.

## Events (Parent <- Child)

### Using Custom Events for Child => Parent Communication

I want to pass an event the other way around. From Child to Parent.

* Parent Component gets a new value 


#### Primitive types

* String is passed by coping it, **it doesn't change in the parent**
```
<script>
	export default {
		props: {
			myName: {
				type: String
			}
		},
		methods: {
			resetName (){
				this.myName = 'Max';
			}
		}
	}
</script>
```

* In order to pass that to the parent component
	* **Emmi**t a **custom event**

#### Custom Events
In each Vue Instance (Components extend the Vue Instance, so they are kind of Instances of VueJS) you get access to the **$emit method**

* **$emit** Dollar sign => meaning is a build in method

##### Child
```
<script>
	export default {
		props: {
			myName: {
				type: String
			}
		},
		methods: {
			resetName(){
				this.name = 'Max';
				this.$emit('nameWasReset', this.myName); //updated name
			}
		}
	}
</script>
```

##### Parent
To listen to an event, like all events

At the component emmiting the event, I can add v-on or **@nameWasReset**(event listener)

**$event** refers to the data passed through the event

```
<template>
	<app-user-detail :myName="name" @nameWasReset="name = name = $event"></app-user-detail>
</template>
```


### Reference types

> Not primitive types like **Object** and **Array**, they only exist in the memory once. The properties storing them, actually store a pointer to the place in memory

> If you pass an Object or Array from parent to child, you actually **passing the pointer to the place in memory**

> Hence if you change it in the **child** Component, you also change it in the **parent** component! 


## Communication between Children

### Unidirectional Data Flow

```
Parent
|
v
Child 1 - Child 2 - Child 3
```

If I want to **reach out** from one **child to other**, that does not work!

#### Solution
##### Unidirectional Data Flow from Top to Bottom!

* pass callback as prop (Parent -> Child 1)
* use callback to pass data (Child 1 -> Parent)
* pass data as props (Parent -> Child 3)


### Communicating with Callback Functions

Way to communicate from child to parent, without using custom event

#### Parent
```
<template>
	<app-user-detail 
	        :myName="name" 
	        :resetFn="resetName"></app-user-detail>
</template>

<script>
	export default {
		data:...,
		methods: {
			resetName(){
				this.name = 'Max';
			}
		},
		components: {
      appUserDetail: UserDetail
    }
	}
</script>
```
#### Child
```
<template>
	<button @click="resetFn()">Reset Name</button>
</template>

<script>
	export default {
		props: {
			myName: {
				type: String,
				default: 'Max'
			},
			resetFn: Function
		}
	}
</script>
```

## Communication between Sibling Components

#### Parent
```
<template>
	...
  <div class="col-xs-12 col-sm-6">
    <app-user-detail 
            :userAge="age"></app-user-detail>
  </div>
  <div class="col-xs-12 col-sm-6">
    <app-user-edit :userAge="age"></app-user-edit>
  </div>
  ...
</template>

<script>
  export default {
    data: function(){
      return {
        name: 'Max',
        age: 27
      }
    },
</script>

```



#### Child 2
```
<template>
	<button @click="editAge">Edit Age</button>
</template>
<script>
	export default {
		props: ['userAge'],
		methods: {
			editAge(){
				this.userAge = 30;
			}
		}
	}
</script>
```

#### Child 1
```
<template>
	<p>User Age: {{ userAge }}</p>
</template>

<script>
	export default {
		props: {
			userAge: Number
		}
	}
</script>
```


3 different ways of doing so:

### Using $emit at Child 2

#### Child 2
```
<script>
		methods: {
			editAge(){
				this.$emit('ageWasEdited', this.userAge);
			}
		}
</script>
```

#### Parent
```
  <app-user-edit 
          :userAge="age"
          @ageWasEdited="age = $event"></app-user-edit>
```

### Using callback function

### Third alternative (Brand New!)

Imagine communicaton between components at 2nd level:

* Parent -> child -> **child** 
* to Parent -> another child -> **child**

It can get **too complicated using events**


### Using an Event Bus for Communication
Using a central object to pass the data (Angular 2 = services)

#### main.js
New Vue object at main file. No need to declare methods.. they already exist 

```
export const eventBus = new Vue();

new Vue()...
```

### Child 2
I want to emit the same data, but not to this Vue instance, instead in the eventBus Instance

```
<script>
import { eventBus } from '../main';

export default {
	props: ...,
	methods: {
		editAge(){
			this.userAge = 30;
//			this.$emit('ageWasEdited', this.userAge);
			eventBus.$emit('ageWasEdited', this.userAge);
		}
	}
}
</script>
```

### Child 1
New LifeCycle Hook: **created**

Set up a listener to this event. This listener should keep running, from the begginning of this component

```
<script>
	import { eventBus } from '../main';

	export default {
		props: {},
			methods: {},
			created(){
				eventBus.$on('ageWasEdited', (age) => {
					this.userAge = age;
				});
			}
	}
</script>
```

eventBus.$on() will now listen to events emmited on this view Instance (eventBus stored in main.js)

#### Important

The Age doesn't change in the Parent component. Only in 2 children components

> For small to medium size applications, there is nothing wrong with this approach


### Centralizing Code in an Event Bus
If you don't want to duplicate code, but store it centrally.

Accessible from anywhere, as long as you import it..Or access data properties
```
export const eventBus = new Vue({
	data: {

	},
	methods: {
		changeAge(age){
			this.$emit('ageWasEdited', age);
		}
	}
});

```

## Assignment 7: Component Communication
We loop through all components created with v-for
and pass the current index to this server

Loop Through all these servers, 
create a new component for the list item, 
pass the id - status to that, 
be able to click this component. 
And then load the server in the server details 
where we have a button to change the status back to normal