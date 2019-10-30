# Advanced Component Usage

## Slots

### Passing Content with Slots

**Problem**: I can't pass **html code** with props

```
<app-quote quote="A wonderful quote!"></app-quote>	
```
#### Solution

##### Parent
```
<app-quote>
	<h2>The Quote</h2>
	<p>A wonderful Quote</p>
</app-quote>
```

##### **Child** component
(that I want to receive the data)

```
<template>
	<slot></slot>
</template>

<style scoped>

	h2 {
		color: red;
	}
</style>
```
It renders the part between opening and closing selector

#### Styling

* The child component's styling is applied to the data being passed in from outside (not parents styling).
* Is set up in the child component
* It has changed, now we can add styles in parent component

#### Everything else

* is handled in the parent component

### Using Multiple Slots (Named)

**Child component**:

```
	<div>
		<div class="title">
			<slot name="title"></slot>
		</div>
		<hr>
		<div>
			<slot name="content"></slot>
		</div>
	</div>
```

**Parent**:
```
<app-quote>
	<h2 slot="title">{{ quoteTitle }}</h2>
	<p slot="content">A wonderful Quote</p>
</app-quote>
```

### Default Slots and Slot Defaults

If I have a named slot and an unnamed one

* VueJS will treat the unnamed slot as the default slot

#### Default value of slot (if nothing is passed)

```
<slot name="subtitle">The subtitle</slot>
``` 
Whenever we do insert content, the default content will get replaced


## Dynamic Components

### Swithing Multiple Components with Dynamic Components

#### What are Dynamic Components?

Let's say I have multiple components in App.vue

I want to **dynamically decide** which component to **display**.

Using **component** (reserved word)

##### component

* Component allows us to dynamically add components
* I can bind component to a property which holds the component which should get loaded
* **is** is a keyword
* selectedComponent must be a string
* that string is interpreted as the selector component, which now should get loaded dynamically


```
<template>
	<component :is="selectedComponent"></component>
</template>

<script>
	import Quote from './components/Quote.vue';
	import Author from './components/Author.vue';
	import New from './components/New.vue';

	export default {
		data: function(){
			return {
				quoteTitle: 'The Quote',
				selectedComponent: 'appQuote'
			}
		},
		components: {
			appQuote: Quote,
			appAuthor: Author,
			appNew: New
		}
	}
</script>
```


### Understanding Dynamic Component Behavior

#### Is the component recreated when it gets loaded, or do we use an existing instance ?

By default, the component dies

### Keeping Dynamic Components Alive

* I can use the **keep-alive** keyword, in to which I can wrap component.
* keep-alive makes sure that this component is kept alive
* **we preserve the state**
* we lose the **destroyed** lifecycle hook
```
<keep-alive>
	<component :is="selectedComponent">
		<p>Default Content</p>
	</component>
</keep-alive>
```






