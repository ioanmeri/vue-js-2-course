# Using VueJS to Interact with the DOM

## Outputting Data to Templates

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
A mixture of HTML and JS code

At all the places, where you can access the Vue Instance, you can write any JS code. As long as it is:

* One Expression
* No if/for loop

They are called: **template expressions**

```
<button v-on:click="counter++">Click me</button>
<p>{{ counter*2 }}</p>
<p>{{ counter * 2 > 10 ? 'Greater than 10' : 'Smaller than 10' }}</p>
```
[Example](https://codepen.io/ioanmeri/pen/xxxOvga)

### Using Two-Way-Binding
**v-model** Directive => v-on + v-bind

e.g.: If I have an input field with my name:

  * I want to update the data property
  * and update it, everywhere I output it in templates

v-model tells VueJS, set up 2 way Data Binding

```
<input type="text" v-model="name">
```
[Example]()


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

For computed properties, it is aware that output it is not interested in the secondCounter at all. 

**For this case**:

**computed**: Dependent Properties

* Caching the result
* only use the function if you know you don't want to cache the result

#### Computed Properties are Better Understood with an Example

[Example](https://codepen.io/ioanmeri/pen/WNNGedK)

**Computed Props:** Only for Synchronous Operations 

**Best Practice:** Use Computed properties wherever you can, due to caching

### Watching for Changes
**If you want asynchronous tasks to be run:**


For **Dependencies**:

  * Computed Properties
    * Dependent Properties
  * Watch object in Vue Instance
    * Execute code upon data changes

```
new Vue({
  data: {
    counter: 0
  },
  watch: {
    counter: function(value){
      var vm = this;

      setTimeout(function(){
        vm.counter = 0;
      },2000)
    } 
  }

  ...
  })
```
[Example](https://codepen.io/ioanmeri/pen/gOOwJKR)

### Saving Time With Shorthands
Shorthands:

* **v-on => @**
* **v-bind => :**

Vue JS will recognise them behind the scenes.

### Assignment 3: Reactive Properties 
https://codepen.io/ioanmeri/pen/oNNzROz