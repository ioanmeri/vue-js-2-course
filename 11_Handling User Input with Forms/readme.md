# Handling User Input with Forms

* fetch values from input fields
* work with them
* how to use different form controls
	* radio buttons
	* checkboxes
* build your own form control with your own component working as a form control

## Input form binding
```
<form action="">
  <div class="form-group">
    <label for="email">Mail</label>
    <input
      type="text"
      id="email"
      class="form-control"
      v-model="email">
  </div>
</form>

<p>Mail: {{ email }}</p>

<script>
  export default {
    data (){
      return {
        email: ''
      }
    }
  }
</script>
```

### Grouping Data and Pre-populating inputs
```
<input
    type="password"
    id="password"
    class="form-control"
    v-model="userData.password">

<script>
  export default {
    data (){
      return {
        userData: {
          email: '',
          password: '',
          age: 27
        }
      }
    }
  }
</script>
```

## Modifiers

### Lazy

* If you don't want to update properties in each keystroke, but at click
* If you want to validate the form at Submit
* Don't use if you want real-time validation

```
<input
  type="password"
  id="password"
  class="form-control"
  v-model.lazy="userData.password">
```
Will not listen to the input event (whever we type something), but to the change event. 

Only fires when we **click somewhere else**

### Trim

trim any excess whitespace at the beginning and end

### Number

Force it to transform to a number automatically

## Textarea

2 way binding with v-model

If you want to prepopulate the message don't put it between the 
```<textare></textarea>``` tags. It won't work. Use v-model instead.

```
<textarea
  id="message"
  rows="5"
  class="form-control"
  v-model="message"></textarea>
```

If I enter new line is stored like that. To output the new Line:
```
<p style="white-space: pre"></p>
```

## Checkboxes

How to add checkboxes to an array with VueJS?

Binding two inputs to the same model. VueJS it will detect this and will automatically merge the values of these checkboxes into the single array.
```
<label for="sendmail">
  <input
    type="checkbox"
    id="sendmail"
    value="SendMail"
    v-model="sendMail"> Send Mail
</label>
<label for="sendInfomail">
  <input
    type="checkbox"
    id="sendInfomail"
    value="SendInfoMail"
    v-model="sendMail"> Send Infomail
</label>

<script>
data (){
  return {
    userData: {
      email: '',
      password: '',
      age: 27
    },
    message: 'A new Text',
    sendMail: []
  }
}
</script>

```

## Radio Buttons

Use the same model, VueJS will handle the rest.

```
<div class="row">
  <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
    <label for="male">
      <input
        type="radio"
        id="male"
        value="Male"
        v-model="gender"> Male
    </label>
    <label for="female">
      <input
        type="radio"
        id="female"
        value="Female"
        v-model="gender"> Female
    </label>
  </div>
</div>

<script>
  export default {
    data (){
      return {
        userData: {
          email: '',
          password: '',
          age: 27
        },
        message: 'A new Text',
        sendMail: [],
        gender: 'Male'
      }
    }
  }
</script>
```

## Select and option
```
<div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 from-group">
    <label for="priority">Priority</label>
    <select
      id="priority"
      class="form-control"
      v-model="selectedPriority">
      <option 
          v-for="priority in priorities" >
          {{ priority }}</option>
    </select>
</div>

<script>
  export default {
    data (){
      return {
        priorities: ['High', 'Medium', 'Low'],
        selectedPriority: 'High'
      }
    }
  }
</script>
```

## Custom Control
Build our own component

### v-model

First we need to understand what v-model does:

**v-model**: 

* Binds to the value (:value)
	* ```:value="userData.email"```
* Also gives us @input (or @change, lazy) event listener
	* ```@input="userData.email = $event.target.value"```

It has to have a prop value, it has to emit an event to allow v-model to react to that!

## component
```
<template>
	<div>
		<div
			id="on"
			@click="switched(true)"
			:class="{active: value}">On</div>
		<div
			id="off"
			@click="switched(false)"
			:class="{active: !value}">Off</div>
	</div>
</template>

<script>
	export default {
		props: ['value'],
		methods: {
			switched(isOn) {
				this.$emit('input', isOn);
			}
		}
	}
</script>
```

**App.vue**
```
 <app-switch v-model="dataSwitch"></app-switch>
```

## Submitting a Form

prevent default behavior
```
 <button
  class="btn btn-primary"
  @click.prevent="submitted"
  >Submit!
</button>
```