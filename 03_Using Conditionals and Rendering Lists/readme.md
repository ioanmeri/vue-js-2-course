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

[Example]()

## Don't Detach it with v-show
Same syntax with v-if

* It doesn't detach the element
* Applies "display: none;" style

```
<p v-show="show">Do you also see me?</p>
```

