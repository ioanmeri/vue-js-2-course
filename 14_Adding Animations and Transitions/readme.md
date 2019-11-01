# Adding Animations and Transitions

**Animations** really allow your user to know, to understand, how to use your application and in which point of the application the user currently is.

Animate:

* single objects
* the transition of two objects
* whole list of items (like sliding items in and out)

## Single Elements
v-if, v-else

Animate an elements's attaching to the DOM and removal from the DOM.

we can do that with a component, a wrapper VueJS offers us: ```<transition>```

### Transitions

#### Transition CSS Classes
You use v-if and v-show to animate such element (typically).

You have to have it **in your template already**

What VueJS do:

* First attaches a CSS class, which has a name you can set up (*) and then "-enter"
	* e.g. **fade-enter class**
	* only for **1 frame**, at the **beggining of this animation duration**
* Then, adds the *-enter-active class, and will be attached until the animation finishes
	* e.g **fade-enter-active**
	* VueJS does sniff your CSS code, to determine how long these classed should be attached

If you remove it:

* First attaches the *-leave class 
	* **fade-leave**
	* 1 frame 
* *-leave-active

_Default: v-enter etc. if no name is supplied!_

_You can animate only one element with transition_

### Creating a "Fade" Transition with the CSS Transition Property

```
<template>
	<div>
    <button class="btn btn-primary" @click="show = !show">Show Alert</button>
    <br><br>
    <transtition name="fade">
      <div class="alert alert-info" v-if="show">This is some Info</div>
    </transtition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>

<style>
  .fade-enter {
    opacity: 0; /* it gets removed after 1 frame */
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-leave {
    /*opacity: 1;*/
  }

  .fade-leave-active {
    transition: opacity 1s;
    opacity: 0;
  }
</style>
```

### Creating a "Slide" Transition with the CSS Animation Property

```
<template>
	<div>
		<transition name="slide">
		  <div class="alert alert-info" v-if="show">This is some Info</div>
		</transition>
	</div>
</template>


<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>



<style>
  .slide-enter {
    /*transform: translateY(20px);*/
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
  }

  .slide-leave {
    
  }

  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
  }

  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px);
    }
  }
</style>
```

### Mixing Transition and Animation Properties

Adjust sliding animation, show it doesn't slides only up and down but **also** it is **transparent at the begging**

Because **animation** and **transition** are the two properties to animate things.
With ```type="transition"``` we tell VueJS which one to use.

#### type=""

**Make sure which one dictates the length**

```
<transition name="slide" type="animation">
  <div class="alert alert-info" v-if="show">This is some Info</div>
</transition>
```

The removing of the element is done, once the CSS **animation** finishes

```
  .slide-enter {
    opacity: 0;
    /*transform: translateY(20px);*/
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity .5s;
  }

  .slide-leave {
    
  }

  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity 1s;
    opacity: 0;
  }

  @keyframes slide-in {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-out {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(20px);
    }
  }

```

### Animating v-if and v-show
v-show works the same way with v-if

### Setting Up an Initial (on-load) Animation

#### appear 
Animate the element at on page load
```
<transition name="fade" appear>
  <div class="alert alert-info" v-if="show">This is some Info</div>
</transition>
```

### Using Different CSS Class Names
```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
```

#### How not to use default classes
```
<transition  
        appear
        enter-active-class="animated bounce"
        leave-active-class="animated shake"
>
```

### Bind names and attributes
```
<template>
	<div>
	  <select v-model="alertAnimation" class="form-control">
	    <option value="fade">Fade</option>
	    <option value="slide">Slide</option>
	  </select>
	  <br><br>
	  <button class="btn btn-primary" @click="show = !show">Show Alert</button>
	  <br><br>
	  <transition :name="alertAnimation">
	    <div class="alert alert-info" v-show="show">This is some Info</div>
	  </transition>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        show: true,
        alertAnimation: 'fade'
      }
    }
  }
</script>
```

## Multiple Elements

Once an element is removed, you start animating another one

You need to key them with **key property**. Give each element a unique key

```
<transition :name="alertAnimation">
  <div class="alert alert-info" v-if="show" key="info">This is some Info</div>
  <div class="alert alert-warning" v-else key="warning">This is some Warning</div>
</transition>
```

**Important**: v-show will not work

* can use v-if and v-else
* or v-if and v-if with reversed condition

### Mode
Add **mode** attribute:

#### out-in

Let the old element animate out first & then animate the new one
```
<transition :name="alertAnimation" mode="out-in">
  <div class="alert alert-info" v-if="show" key="info">This is some Info</div>
  <div class="alert alert-warning" v-else key="warning">This is some Warning</div>
</transition>
```

#### in-out 
Does the opposite

## Transition JS Hooks
The transition element emits some event at certain points of time. We can listen to these events to execute our own JS code

### Hooks
```
---------------------> Element ----------------->
```

* before-enter
* enter
* after-enter
* after-enter-cancelled

* before-leave
* leave
* after-leave
* after-leave-cancelled

## Animations in Javascript

### Understanding JavaScript Animations
```
<transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"

    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled">
  <div style="width: 100px; height: 100px; background-color: lightgreen" v-if="load"></div>
</transition>


script

    methods: {
      beforeEnter(el){
        console.log('beforeEnter');
      },
      enter(el, done){
        console.log('enter');
        done();
      },
      afterEnter(el){
        console.log('afterEnter');
      },
      enterCancelled(el){
        console.log('enterCancelled');
      },
      beforeLeave(el){
        console.log('beforeLeave');
      },
      leave(el, done){
        console.log('leave');
        done();
      },
      afterLeave(el){
        console.log('afterLeave');
      },
      leaveCancelled(el){
        console.log('leaveCancelled');
      }
    }
  }
```

### Exculding CSS from your Animation

***:css="false"**

Means don't look for CSS classes, we don't use them. Immediately execute the hooks.

```
<transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"

    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
    :css="false">
  <div style="width: 100px; height: 100px; background-color: lightgreen" v-if="load"></div>
</transition>
```

### Creating an Animation in Javascript

The place to animate is the **enter** and **leave** function. These are the functions that get executed after the initial stage have been set

Animation of width:

```
    methods: {
      beforeEnter(el){
        console.log('beforeEnter');
        this.elementWidth = 100;
        el.style.width = this.elementWidth + 'px';
      },
      enter(el, done){
        console.log('enter');
        let round = 1;
        const interval = setInterval(() => {
          el.style.width = (this.elementWidth + round*10) + 'px';
          round++;
          if(round > 20){
            clearInterval(interval);
            done();
          }
        }, 20);
      },
      afterEnter(el){
        console.log('afterEnter');
      },
      enterCancelled(el){
        console.log('enterCancelled');
      },
      beforeLeave(el){
        console.log('beforeLeave');
        this.elementWidth = 300;
        el.style.width = this.elementWidth + 'px';
      },
      leave(el, done){
        console.log('leave');
        let round = 1;
        const interval = setInterval(() => {
          el.style.width = (this.elementWidth - round*10) + 'px';
          round++;
          if(round > 20){
            clearInterval(interval);
            done();
          }
        }, 20);
      },
      afterLeave(el){
        console.log('afterLeave');
      },
      leaveCancelled(el){
        console.log('leaveCancelled');
      }
    }
```

## Animating Dynamic Components
```
<button class="btn btn-primary"
    @click="selectedComponent === 'app-success-alert' ? selectedComponent = 'app-danger-alert' : selectedComponent = 'app-success-alert'">Toggle Components</button>
<br><br>
<transition name="fade" mode="out-in">
  <component :is="selectedComponent"></component>
</transition>

script
  import DangerAlert from './DangerAlert.vue';
  import SuccessAlert from './SuccessAlert.vue';	

    data() {
      return {
        selectedComponent: 'app-success-alert'
      }
    },
```

## Multiple Elements / Lists

* Animate the removal of an Item
* Animate the addition of an Item


You don't need to add any new CSS classes to animate. It works just like transitions, so you can use the same Classes.

**Important**:

One important Difference:

```
<transition>
```
is not rendered to the DOM!

```
<transition-group> does render a new HTML Tag!
```

By Default, that will be a ```<span>```, you can ovewrite this by setting:
```
<transition-gropup tag="TAG">
```

### Key the items
In order to let VueJS know which element is which, you have to key the list items.

```
<ul class="list-group">
  <transition-group name="slide">
    <li 
          class="list-group-item" 
          v-for="(number, index) in numbers" 
          @click="removeItem(index)"
          style="cursor: pointer"
          :key="number">{{ number }}</li>
  </transition-group>
</ul>


script
    data() {
      return {
        numbers: [1, 2, 3, 4, 5]
      }
    },

      addItem(){
        const pos = Math.floor(Math.random() * this.numbers.length);
        this.numbers.splice(pos, 0, this.numbers.length + 1);
      },
      removeItem(index){
        this.numbers.splice(index, 1);
      }

```

### slide-move

Because when an element is added or removed, the space created/removed is not animated. 
The whole page jumps.

Transition Group gives us access to a new Class, 

#### Solution
**slide-move** is attached to any **element which needs to change it's place**. 

For example: 

* a new element was added. Another element, therefore, needs to change it's place, because it needs to move down
* deleting an element. Another element needs to move up

```
.slide-move {
  transition: transform 1s;
}

  .slide-enter {
    opacity: 0;
    /*transform: translateY(20px);*/
  }

  .slide-enter-active {
    animation: slide-in 1s ease-out forwards;
    transition: opacity .5s;
  }

  .slide-leave {
    
  }

  .slide-leave-active {
    animation: slide-out 1s ease-out forwards;
    transition: opacity 1s;
    opacity: 0;
    position: absolute;
  }

  .slide-move {
    transition: transform 1s;
  }


```

VueJS will animate elements behind the scene.

#### Wrap Up
Whenever the transform property is changed, animate it over 1s





