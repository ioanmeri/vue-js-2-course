# Advanced Component Usage

## Passing Content with Slots

**Problem**: I can't pass html code with props

```
<app-quote quote="A wonderful quote!"></app-quote>	
```
### Solution

#### Parent
```
<app-quote>
	<h2>The Quote</h2>
	<p>A wonderful Quote</p>
</app-quote>
```

#### **Child** component
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

### Styling

* The child component's styling is applied to the data being passed in from outside (not parents styling).
* Is set up in the child component
* It has changed, now we can add styles in parent component

### Everything else

* is handled in the parent component

## Using Multiple Slots (Named)

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

## Default Slots and Slot Defaults

If I have a named slot and an unnamed one

* VueJS will treat the unnamed slot as the default slot

### Default value of slot (if nothing is passed)

```
<slot name="subtitle">The subtitle</slot>
``` 
Whenever we do insert content, the default content will get replaced
