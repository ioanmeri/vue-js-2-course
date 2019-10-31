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

