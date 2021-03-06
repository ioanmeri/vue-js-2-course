# Using Conditionals and Rendering Lists

## Module Introduction

A little bit more advanced concepts:

**v-if**: Show some parts of the page under certain cirmustances

**v-for**: Show array of data in a list

## Conditional Rendering with v-if

Attaching Detaching elements to the DOM.

```
<div id="app">
  <p v-if="show">You can see me!</p>
  <p v-else>Now you see me!</p>
  <p>Do you also see me?</p>
  <button @click="show = !show">Switch</button>
</div>
```

```
new Vue({
  el: '#app',
  data: {
    show: true
  }
})
```

**v-if Important Notes**

* Element is gone from the DOM. 
* Doesn't hide them, completely removes them.
* Removes all nested ellements

**v-if** can be extended to **v-else**

#### v-else-if in Vue.js 2.1
If you're using Vue.js version 2.1 or higher, you now actually have access to a v-else-if  directive. Have a look at this link to learn more: https://vuejs.org/v2/guide/conditional.html#v-else-if.


## Don't Detach it with v-show
Same syntax with v-if

* It doesn't detach the element
* Applies "display: none;" style

```
<p v-show="show">Do you also see me?</p>
```

[Example](https://codepen.io/ioanmeri/pen/qBBRBdO)

## Rendering Lists with v-for
**Template**
```
 <li v-for="ingredient in ingredients">{{ ingredient }}</li>
```

**Intance**
```
ingredients: ['meat', 'fruit', 'cookies'],
```

### Getting the Current index

```
<li v-for="(ingredient, i) in ingredients">{{ ingredient }} ({{ i }})</li>
```

### Looping through Objects
**Template**

Order of value and key variables matters!

```
<ul>
	<li v-for="person in persons">
	  <div v-for="(value, key) in person">{{ key }}: {{ value }}</div>
	</li>
</ul>
```

**Instance**

```
persons: [
  {name: 'Max', age: 27, color: 'red'},
  {name: 'Anna', age: 'unknown', color: 'blue'}
]
```

[Example](https://codepen.io/ioanmeri/pen/ZEELRQa)

### Keeping Track of Elements when using v-for
```
<ul>
	<li v-for="(ingredient, i) in ingredients">{{ ingredient }} ({{ i }})</li>
</ul>
<button @click="ingredients.push('spices')">Add New</button>
```

**It works as expected but:**

* The array doesn't change
	* It's a reference type, and the pointer to the refence hasn't changed. Only the value in memory, but you would have to watch this value in memory
* Vue JS does this automatically

**How Vue JS updates the list?**

* By updating the position in the array where something changed
  * If you want to override the second element, Vue JS does not keep track of the specific element it created, it will only patch it the second position


If you want to be **super safe** and make sure Vue JS is not only **aware** of the position but of the actual **list item**:

* You need to assign a unique key

```
<li v-for="(ingredient, i) in ingredients" :key="ingredient">{{ ingredient }}</li>
```
**It means**

* If Vue JS needs to reorder them, or something similar, it will take the actual element and reorder it
* Not just override the values in some of the positions
* If you encounter a bug with elements being in different places than expected, check if you are assigning a key.

## Assignment 5: Conditionals & Lists
[Solution](https://codepen.io/ioanmeri/pen/gOOgjPR)