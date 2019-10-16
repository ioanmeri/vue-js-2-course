# Getting Started

## Introduction

###VueJS allows you to create:

* Small widgets
* Medium sized apps
	* rerender various parts, making the app reactive
* Bid enterprise level SPA
	* with multiple pages (what is seems like to end user)

### Why Javascript
* Because it runs in the browser
* You **don't** have to **wait for any responses** if you only want to rerender parts of the application
* The app looks reactive
* It provides awesome UX

### Why not Angular or React
**VueJS**:

* Extremely Lean & Small (16kb) - core framework
	* fast loading time
* Great Runtime Performance
* Feature-Rich
	* Extendable


## First VueJS Application
**[Live example](https://codepen.io/ioanmeri/pen/yLLJVVZ)**

* [Download](https://vuejs.org/v2/guide/installation.html) VueJS or grab [CDN](https://cdn.jsdelivr.net/npm/vue/dist/vue.js)

* Use the new keyword
	* Gives a new Vue Instance 
	* You create such instances
	* each instance have a major job => control their own template of HTML code, which they render to the screen
* Pass an object with properties
	* **el** property
		* which element is under control (app)
	* **data** object
		* all the data we want to use in this Vue Instance

## Extending the VueJS Application
_title should update depending on user input_

**[Live example](https://codepen.io/ioanmeri/pen/poobNdB)**

* Add v-on **Directive** in input
	* Tells VueJS, please listen to some event
* call a method with
	* v-on:input="changeTitle"
* Add method in VueJS instance methods
	* **this** keyword proxies all our **data** properties to the top VueJS instance automatically
	* You can access all **data** properties with **this** and then the name
	* event created by JS is passed to the method automatically

