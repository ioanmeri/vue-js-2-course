# Moving to a "Real" Development Workflow with Webpack and Vue CLI

Dive into components, into building bigger applications from different parts and pieces

## Why do we need a Development Server

VueJS runs in the browser, why would I need a development Server ?

VueJS runs on the Client...

... but the App **will be served by a Server** nonetheless!

Why use a Server?

* you have to fetch from some Server eventually
* we want to test under realistic circumstances
	* The file:// protocol is not the http:// protocol!
* not loading all Files on Startup

## What does "Development Workflow" mean?
```
	  {Code}
		|
		|
		v
"Special Features"
		|
		|
		v
 Production Server ------> User
```

Special Features:

* Compile Single File Templates (don't use "template"!)
	* A powerful alternative to using the **el** property
	* the template outsources into a separate file
* Case-insensitive Component Selectors
* Preprocessors and more
	* babel
	* sass
* Side Effect: Compiler removed from VueJS Package => 30% reduced Package Size

This workflow allows us to:

* write better code
* shrink the size
* bundle it all together
* all the things we need for medium sized & bigger applications

## Using the Vue CLI to create Projects

Vue CLI has one major task. 

* Allow us to fetch VueJS Project Templates
* npm install -g vue-cli
* Choose from different Templates
	* Simple
		* index.html + Vue CDN Import
	* webpack-simple
		* Basic Webpack Workflow
	* webpack
		* Complex Webpack Workflow (incl. Testing)
	* browserify / browserify-simple
		* Browserify Workflows

## Installing the Vue CLI and Creating a new Project

First install node.js and npm 

_> sudo npm install -g vue-cli

[Documentation](https://github.com/vuejs/vue-cli)
```
_> vue init webpack-simple vue-cli
```

To pull down all the dependencies:

```
_> cd vue-cli
_> sudo npm install
_> npm run dev
```

Will **recompile** and **reload** everything whenever we change a file

## Understanding ".vue" Files

We have a special kind of file, which gets compiled, during the build process so we can ship compiled code to the browser

```
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
```

Use of el property only to select the #app.

The render function:

* es6 arrow function
	* h: the argument
	* Takes as the argument, the template to be rendered

#### Vue files structure

**Single File Template**

```
<template>
	<h1>Hello world</h1>
</template>

<script>
	Vue js code for this template
</script>

<style>

</style>
```
We outsource a template and script logic in a separate file.

**Important**: 

In our build process with webpack, this will get compiled to JS code, which we can render in the main.js

render === override the content sellected in el: '#app'


## Understanding the Object in the Vue File

Whetever we export from the Single File Template Script Object:

```
export default {

}
```

is the same object we use in the Vue Instance

and it has the same properties

```
export default {
	methods: ...,
	computed: ...
}
```

The script is not required, but it is required if you want to attach business logic to this template

## How to Build your App for Production
Run the script
```
_> npm run build
```
and it's ready for production

It will create the dist folder, the build.js file in it and it will also have some optimization in place (minified)




