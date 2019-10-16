# Using VueJS to Interact with the DOM

## Understanding VueJS Templates
VueJS creates a template based on the HTML code, stores that internally and uses this template to render the real HTML in the DOM

* VueJS is the layer in the middle
* takes HTML code, creates a template, renders this template (e.g. by putting the title) and then outputs the final HTML.

## How the VueJS Template Syntax and Instance work Together
In the Vue template, we can access all properties in the data object!

* No need for data.title or this.title in the **Template**
	* {{ title }}
* We can invoke a Vue instance method in the **Template** 
	* {{ sayHello() }}
* It has to be something that can be converted to a string

## Accessing Data in the Vue Instance
In the Vue **instance** we have to use:

* this.title; 
* although its in a method, Vue proxies these properties in the data field
* It creates easy access

## Binding the Attributes
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

## Understanding and Using Directives
A directive is an instruction you put in your code

* Bind something to my data

## Disable Re-Rendering with v-once
[Example](https://codepen.io/ioanmeri/pen/qBBNrVG)

_All usages of "title" get re-rendered once the property changes!_

Now will only be rendered once: 
```
<h1 v-once>{{ title }}</h1>
```

## How to Output Raw HTML
* By default Vue escapes HTML
	* It doesn't render HTML elements, only text
* Use **v-html** directive
	* Don't escape HTML code, it exposes you to XSS!
```
<p v-html="finishedLink"></p>
```

## Assignment 1: Outputting Data to Templates
[Solution](https://codepen.io/ioanmeri/pen/poobeBZ)