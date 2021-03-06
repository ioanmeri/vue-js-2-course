# Understanding the VueJS Instance

Theoretical section

## Some Basics about the VueJS Instance

**Vue Instance** is kind of the **middleman** between the **DOM**, and **business logic**

el, data, methods, computed, watch compose the VueJS Instance.

Things to consider:

* Can I have more than 1 Vue Instance?
	* Spoiler, yes! with another id

* Could we access the VueJS instance from outside?
	* Yes, too.


## Using Multiple Vue Instances

**Two VueJS instances controlling different parts of your DOM** 

new Vue({
	el: '#app1'
})

new Vue({
	el: '#app2'
})



In real apps, you don't want to build one complex VueJS instance, but build widgets.

* Calendar

May have, multiple JS instances controlling different tasks as long there is no connection

## Accessing the Vue Instance from Outside
```
var vm1 = new Vue({
	el: '#app1',
	data: {
		title: 'The VueJS Instance'
	}
})

setTimeout(function(){
  vm1.title = 'Changed by Timer';
},3000);
```

## How VueJS manages your Data and Methods

**Vue is Proxing the method show:**

```
setTimeout(function(){
  vm1.title = 'Changed by Timer';
  vm1.show();
},3000);
```

Proxing: **vm1.show()** but not vm1.methods.show();

Behind the scenes, when creating an instance, VueJS will take our object we pass, then the data properties and methods and **use them as native properties** on the Vue instance object itself, **kind of copy them**

We cannot create a property like:
```
vm1.newProp = 'New!';
```
_well, we can, but cannot use it in the Vue Instance, VueJS is not reactive!_

**VueJS watches only what we pass in the constructor**

## A Closer Look at $el and $data

Vue Instance:

**$data**: is an object that holds the data properties.

Another way of accessing the data from outside:

**vm1.$data.title** equals to **vm1.title**;

**Also:**

```
var data = {
	title: 'The VueJS Instance',
	showParagraph: false
}
```
The $data object stored in the Vue Instance, is still the data object we set up above

```
console.log(vm1.$data === data); // true !!!
```

You can create the **data** variable **before the VueJS Instance** and pass it as the value for the key value pair. 

VueJS doesn't create it's own enclosed world. It's normal JS code and it's able to interact with the JS code around it.

We can:

* create normal JS code to populate our data
* access the instance from outside
* use the proxied properties of the Vue Instance from outside
* use multiple Vue Instances
* through normal JS code

Generally, there is nothing wrong of mixing the normal JS code and VueJS code

# Placing $refs and Using them on your Templates

If I want to get the content of a button

* In VanillaJS, we can use querySelector
* In VueJS, ref attribute (by VueJS)

```
<button v-on:click="show" ref="myButton">Show Paragraph</button>
```
_i can register as many as i want with that ref key_

In the Instance:

In any method:
```
console.log(this.$refs);
```

Object{myButton: button}

We can access:

```
console.log(this.$refs);
```

If you need to access a VueJS element, better use the ref than the querySelector


[Example](https://codepen.io/ioanmeri/pen/pooeLzL)

## More about the Vue API

[Documentation](https://vuejs.org/v2/api/)


## Mounting a Template
remove the el: '#app' property

use instead:
```
vm1.$mount('#app1');
```

**Pattern**

The properties prefixed with **$** are the native VueJS methods and properties we can use.

**$mount**:

It's a method. It allows us to do the same with the el property.

If we know where to mount it, use the el property (it is meant for).

Use case, If you have configured and set up your Vue Instance but you don't know where to mount it.
Configure it and pass it later.

#### Create our own template inside the Vue Instance
```
var vm3 = new Vue({
	template: '<h1>Hello!</h1>'
});

vm3.$mount('#app3');
```
OR

```
vm3.$mount(); // will render it, create it off screeen
document.getElementById('app3').appendChild(vm3.$el);
```

## Using Components

Use a template in multiple places

Register globally:

```
Vue.component('hello', {});
```

Allows me to create a new component which I can reuse in **all my other** Vue **Instances**, and their **templates**. 

Vue component arguments:

* 1st: selector of the component
* 2nd: js object similar to the one we pass in the Vue Instance

Now, in any template, I can add:

```
<hello></hello>
<hello></hello>
```

VueJS, replaces any ```<hello></hello>``` with the template in the component.

## Limitations of some Templates

Instance template limitations:

* It's a string, can't write multiline
* No syntax highlighting

There are 2 versions of VueJS

* Has a compiler built in, supports our templates. Has to respect the DOM and it's limitations, like case insensitive names of elements
* Re compiled version

## How VueJS Updates the DOM


#### Change
It's property we set up, has it's own watcher.

VueJS when we pass a property to the constructor, creates theses watchers for all the properties in our data property. Thus allowing itself to watch for changes to these properties, which mean that it probably means to update something. 

#### Update
But, **it doesn't update just because it changed**

JS is super fast, but **accessing the DOM is super slow**. We wanna do this, as seldom as possible.

It has The Virtual DOM as a middleware, it's a representation of the real DOM. A copy parsed in JS, and therefore, very quick to be accessed.

Vue Instance <----  Virtual DOM ------> DOM:

* VueJS watches these changes, writes them to the VirtualDOM (if we update message for example)
* It recreates this Virtual DOM (JS)
* Check for Differences between "New" and "Old" Virtual DOM
* And **only** updates **this part** in the Real DOM

It knows which property did change, which part of the template is affected, what is the current state of the DOM (represented by the VirtualDOM)

Since it also updated the Virtual DOM, it now automatically got an up to date representation of the Real DOM without having to take a full copy. VueJS contantly updates

## The VueJS Instance Lifecycle

What happens behind the scenes, when we create a **new Vue** Instance

```
new Vue({
	el: '#app',
	data: {
		title: 'The VueJS Instance'
	}
});
```
> It takes a templates, and updates the DOM based on that template

Behind the scenes, is more complex:

* beforeCreate()
* Intitialize Data & Events
* Intance Created -> created()
* Compile template or **el**'s template
* beforeMount()
* Replace **el** with compiled template
* Mounted to DOM
	* Data Changed
	* beforeUpdate()
	* Re-render DOM
	* updated()
	* Mounted to DOM
* beforeDestroy()
* Destroyed

## The VueJS Instance Lifecycle in Practice

**beforeCreate**, **created**, **beforeMount**, **mounted** methods are automatically called at refresh.

**beforeUpdate** and **updated** are called after a piece of data have changed

* If data property (title) hasn't changed, these methods are not called even if we force them to update. They update only when values have changed.  
* Is the same value, hence no neeed to render anything, hence no need to call these methods!

**beforeDestory** and **destroy** it removes all JS logic!


[Example](https://codepen.io/ioanmeri/pen/gOOWray)











