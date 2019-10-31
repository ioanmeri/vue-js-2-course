# Using and Creating Directives

Directives: the commands starting with the **v-** on DOM elements

## Built-in Directives

### v-text
```
<p v-text="'Some Text'"></p>
```

### v-html
Alsways sanitize!

```
<p v-html="'<strong>Some strong text</strong>'"></p>
```

## Custom Directives

How to register them? 

### Globally at main.js
```
Vue.directive('highlight', {
	
});
```

> It is important to understand the 5 hooks to configure a directive, kind of the lifecycle hooks on the component, but on directives

### Hook functions

#### bind

bind(el, binding, vno) => Once Directive is Attached

* el: the element the directive sits on
* binding: referes to the way this directive is set up (arguments, modifiers)
* vnode: node to the virtual DOM (rarely use)

#### inserted

inserted(el, binding, vnode) => Inserted in Parent Node

#### update
update(el, binding, vnode, oldVnode) => Once Component is Updated (without Children)

#### componentUpdated
componentUpdated(el, binding, vnode, oldVnode) => Once Component is Updated (with Children)

#### unbind
unbind(el, binding, vnode) = Once Directive is Removed

### Simple Directive

**main.js**: Register Globally Directive
```
Vue.directive('highlight', {
	bind(el, binding, vnode){
		el.style.backgroundColor = 'green';
	}
});
```

**App.vue**: 
```
<p v-highlight>Color this</p>
```

### Passing Values to Custom Directive

Binding is the information about our directive binding.

```
Vue.directive('highlight', {
	bind(el, binding, vnode){
		// el.style.backgroundColor = 'green';
		el.style.backgroundColor = binding.value;
	}
});

value === 'red

<p v-highlight="'red'">Color this</p>
```

### Passing Arguments to Custom Directives
```
Vue.directive('highlight', {
	bind(el, binding, vnode){
		if(binding.arg == 'background'){
			el.style.backgroundColor = binding.value;
		}else {
			el.style.color = binding.value;
		}
	}
});
```


```
<p v-highlight:background="'red'">Color this</p>
```

### Modifying a Custom Directive with Modifiers

**main.js**
```
Vue.directive('highlight', {
	bind(el, binding, vnode){
		// el.style.backgroundColor = 'green';
		// el.style.backgroundColor = binding.value;
		var delay = 0;
		if(binding.modifiers['delayed']){
			delay = 3000;
		}
		setTimeout(() => {
			if(binding.arg == 'background'){
				el.style.backgroundColor = binding.value;
			}else {
				el.style.color = binding.value;
			}
		},delay);
	}
});
```

**App.vue**
```
<p v-highlight:background.delayed="'red'">Color this</p>
```

### Local Directives

#### Registering Directives Locally

Like Components, I can register directives locally in the Instance with the **directives** property:

```
<p v-local-highlight:background.delayed="'red'">Color this, too</p>
```

```
<script>
	export default {
		directives: {
			'local-highlight': {
				bind(el, binding, vnode){
					var delay = 0;
					if(binding.modifiers['delayed']){
						delay = 3000;
					}
					setTimeout(() => {
						if(binding.arg == 'background'){
							el.style.backgroundColor = binding.value;
						}else {
							el.style.color = binding.value;
						}
					},delay);
				}
			}
		}
	}
</script>
```

#### Using Multiple Modifiers

```
<p v-local-highlight:background.delayed.blink="'red'">Color this, too</p>
```

#### Passing more Complex Values to Directives

I can pass an **object as a value**:
```
<p v-local-highlight:background.delayed.blink="{mainColor: 'red', secondColor: 'green', delay: 500}">Color this, too</p>
```

I can access the values in the **directive**:
```
binding.value.delay
```
