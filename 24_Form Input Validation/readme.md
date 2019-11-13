# Form Input Validation

3rd party package which offers validation funcionality. Vue itself doesn't have it built in to it.

* is it current what user enters
* if it fulfils your requirements

Includes things like: 

* if we have a valid email address 
* if passwords much
* if email address is already taken

## Install Vuelidate
```
npm install --save vuelidate
```

## Adding a Validator

### Email
* Not Empty
* Valid Email Address

**main.js**

```
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
```

We can now use Vuelidate features in our Vue components and instances.

**signup.js**

Validation has to have the same property you are binding to with v-model. That's required by Vuelidate so that automatically synchonises this.

email takes a JS object where we configure the validators we want to registers. 

So **import validators**:

* required (check if field is not empty)
* email (check if it's a valid email address)

```
import { required, email } from 'vuelidate/lib/validators'

validations: {
  email: {
    required,
    email
  }
},
```

To connect to template input use **@input:$v**:

* $v is exposed by the vuelidate package
* gives us access to validators

**$touch**:

A method exposed and added by Vuelidate package:

```
<input
        type="email"
        id="email"
        @input="$v.email.$touch()"
        v-model="email">
```

### Find out if it works

{{ $v }}

```

{ 
  "email": { 
    "required": false, 
    "email": true, 
    "$model": "", 
    "$invalid": true, 
    "$dirty": false, 
    "$anyDirty": false, 
    "$error": false, 
    "$anyError": false, 
    "$pending": false, 
    "$params": { 
      "required": { 
        "type": "required" 
      }, 
      "email": { 
        "type": "email" 
      } 
    } 
  }, 
  "$model": null, 
  "$invalid": true, 
  "$dirty": false, 
  "$anyDirty": false, "$error": false, "$anyError": false, "$pending": false, "$params": { "email": null 
  } 
}
```

If I enter a letter, email becomes false, required: true

Other useful properties vuelidator gives us:

* $invalid: if invalide
* $dirty: if touched
* $error: invalid + dirty

## Adding Validation in UI Feedback

Add invalid class if user has a chance to edit the value:

```
template
  <div class="input" :class="{invalid: $v.email.$error}">
    
    <p v-if="$v.email.email">Please provide a valid email address.</p>
  </div>

style
  .input.invalid label {
    color: red;
  }

  .input.invalid input {
    border: 1px solid red;
    background-color: #ffc9aa;
  }

If I complete to a valid value, styles are gone
```

### Controlling Styles for Invalid Entries

You can fire the validator when input loses focus == Better UX

```
<div class="input"  :class="{invalid: $v.email.$error}">
  <label for="email">Mail</label>
  <input
          type="email"
          id="email"
          @blur="$v.email.$touch()"
          v-model="email">
  <p v-if="!$v.email.email">Please provide a valid email address.</p>
  <p v-if="!$v.email.required"> This field must not be empty</p>
</div>
```

You can also **connect $touch to a button**

