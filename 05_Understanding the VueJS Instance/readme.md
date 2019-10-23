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


