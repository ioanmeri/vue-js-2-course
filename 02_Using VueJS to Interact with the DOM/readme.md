# Using VueJS to Interact with the DOM

## Template <=> Instance Basics

### Understanding VueJS Templates
VueJS creates a template based on the HTML code, stores that internally and uses this template to render the real HTML in the DOM

* VueJS is the layer in the middle
* takes HTML code, creates a template, renders this template (e.g. by putting the title) and then outputs the final HTML.

### How the VueJS Template Syntax and Instance work Together
In the Vue template, we can access all properties in the data object!

* No need for data.title or this.title in the **Template**
	* {{ title }}
* We can invoke a Vue instance method in the **Template** 
	* {{ sayHello() }}
* It has to be something that can be converted to a string

### Accessing Data in the Vue Instance
In the Vue **instance** we have to use:

* this.title; 
* although its in a method, Vue proxies these properties in the data field
* It creates easy access

### Binding the Attributes
* **Curly braces** work only when we would use **text**
* We can't use any curly braces in any HTML element attribute.


This **does not** work:
```
<a href="{{ link }}">Google</a> 
```
instead: bind dynamically with Directive **v-bind**
```
<a v-bind:href="link">Google></a>
```

### Understanding and Using Directives
A directive is an instruction you put in your code

* Bind something to my data

### Disable Re-Rendering with v-once
[Example](https://codepen.io/ioanmeri/pen/qBBNrVG)

_All usages of "title" get re-rendered once the property changes!_

Now will only be rendered once: 
```
<h1 v-once>{{ title }}</h1>
```

### How to Output Raw HTML
* By default Vue escapes HTML
	* It doesn't render HTML elements, only text
* Use **v-html** directive
	* Don't escape HTML code, it exposes you to XSS!
```
<p v-html="finishedLink"></p>
```

### Assignment 1: Outputting Data to Templates

[Solution](https://codepen.io/ioanmeri/pen/poobeBZ)
---------------------------------------

## Events

### Listening to Events
**v-on** 

* directive => listen to something, receive somthing from the template
* an event (click, mouseenter, mouseleave..)

```
<button v-on:click="increase">Click me</button
```

### Getting Event Data from the Event Object
**Template:**

```
<p v-on:mousemove="updateCoordinates">Coordinates: {{ x }}/ {{ y }}</p>
```

**Instance:**

```
    updateCoordinates: function(event){
      this.x = event.clientX;
      this.y = event.clientY;
    }
```

### Passing your own Arguments with Events

**Template:**

```
<button v-on:click="increase(2)">Click me</button>
```

**Instance:**

```
    increase: function(step){
      this.counter+=step;
    },
```
#### Passing the Event as well
```
<button v-on:click="increase(2, $event)">Click me</button
```

### Modifying an Event - with Event Modifiers
The **stop** modifier is a Vue JS intermediate function that stops propagation
Equivalent to event.stopPropagation();
```
<span v-on:mousemove.stop=""></span>
```

### Listening to Keyboard Events
**Template**:

```
<input type="text" v-on:keyup="alertMe">
```

**Instance:**

```
	alertMe: function(){
		alert('Alert!);	
	}
```
you can specify the event: 
```
<input type="text" v-on:keyup.enter="alertMe">
```
or chain them: 
```
<input type="text" v-on:keyup.enter.space="alertMe">
```

## Reactive Properties

### Writing Javascript Code In the Templates
Simple JS statements can be evaluated in the templates

**template expressions**
```
<button v-on:click="counter++">Click me</button>
<p>{{ counter*2 }}</p>
<p>{{ counter * 2 > 10 ? 'Greater than 10' : 'Smaller than 10' }}</p>
```

### Using Two-Way-Binding
**v-model** Directive
```
<input type="text" v-model="name">
```
* It will update the name property at the view instance

### Reacting to Changes with Computed Properties
The **problem**

At this point:
```
<div id="app">
  <button v-on:click="counter++">Increase</button>
  <button v-on:click="counter--">Decrease</button>
  <button v-on:click="secondCounter++">Increase Second</button>
  <p>Counter: {{ counter }}</p>
  <p>Result: {{ result() }}</p>
</div>


new Vue({
  el: '#app',
  data: {
    counter: 0,
    secondCounter: 0,
  },
  methods: {
    result(){
      return this.counter > 5 ? 'Greater 5' : 'Smaller than 5';
    }
  }
})
```
* **VueJS** will update the page when a data property changes
* It doesn't know if 
	* the result() that will execute here does use any of the properties
	* the change of secondCounter influences the result method


**For this case**:

**computed**: Dependent Properties

* Also allows us to store properties

```
computed: 


<p>Result: {{ result() }} | {{ output  }}</p>
```

For computed properties, it is aware that output it is not interested in the secondCounter at all.