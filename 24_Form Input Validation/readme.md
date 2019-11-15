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

## Email Validator

### Email shoud be
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

### Adding Validation in UI Feedback

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


## Age Validation

Accept only people that are 18 years old

Add **age validator** (must named age, because we are binding age with v-model)

Validators used:

* **numeric** => checks if value is a number

* **minValue** => allows us to check if a numeric or Date Value is higher than a specific value you enter

Unlike, required and numeric, **minValue** is a function. You can also access the function **$params**


```
template
  <div class="input" :class="{invalid: $v.age.$error}">
    <input
            type="number"
            id="age"
            @blur="$v.age.$touch()"
            v-model.number="age">
    <p v-if="!$v.age.minVal">You have to be at least {{ $v.age.$params.minVal.min }} years old.</p> 
script
  validations: {
    age: {
      required,
      numeric,
      minVal: minValue(18)
    }
  }
```

## Passwords Equality Validation

* Passwords should be equal

**sameAs** function: You can pass 2 types of data

* a property name of your Vue instance (password)
* or a callback with vm

```
template
  <div class="input" :class="{invalid: $v.password.$error}">
    <label for="password">Password</label>
    <input
            type="password"
            id="password"
            @blur="$v.password.$touch"
            v-model="password">
  </div>
  <div class="input" :class="{invalid: $v.confirmPassword.$error}">
    <label for="confirm-password">Confirm Password</label>
    <input
            type="password"
            id="confirm-password"
            @blur="$v.confirmPassword.$touch()"
            v-model="confirmPassword">
  </div>

script

  import { required, email, numeric, minValue, minLength, sameAs } from 'vuelidate/lib/validators'

    validations: {
      password: {
        required,
        minLen: minLength(6)
      },
      confirmPassword: {
        // sameAs: sameAs('password')
        sameAs: sameAs(vm => {
          return vm.password
        })
      }
    },

```

## CheckBox Validation

Required to check Terms, unless you picked Germany in a totally different input

```
  <div class="input inline" :class="{invalid: $v.terms.$error}">
    <input 
            type="checkbox" 
            id="terms" 
            @change="$v.terms.$touch()"
            v-model="terms">
    <label for="terms">Accept Terms of Use</label>
  </div>
  validations: {
    terms: {
      // customRequired: sameAs(() => true)
      customRequiredUnless: (value, vm) => vm.country === 'germany' ? true : value
    }
  },
```

## Array Validation

We are storing new elements in **onAddHobby** method.

* Array must have at least 2 items (2 hobbies)
  * Each item must have at least 5 characters

```
template

  <div class="hobbies">
    <h3>Add some Hobbies</h3>
    <button @click="onAddHobby" type="button">Add Hobby</button>
    <div class="hobby-list">
      <div
              class="input"
              v-for="(hobbyInput, index) in hobbyInputs"
              :class="{invalid: $v.hobbyInputs.$each[index].$error}"
              :key="hobbyInput.id">
        <label :for="hobbyInput.id">Hobby #{{ index }}</label>
        <input
                type="text"
                :id="hobbyInput.id"
                @blur="$v.hobbyInputs.$each[index].value.$touch()"
                v-model="hobbyInput.value">
        <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
      </div>
      <p v-if="!$v.hobbyInputs.minLen">You have to specify at least {{ $v.hobbyInputs.$params.minLen.min }} hobbies.</p>
      <p v-if="!$v.hobbyInputs.required">Please add hobbies.</p>
    </div>
  </div>

    validations: {
      hobbyInputs: {
        required,
        minLen: minLength(2),
        $each: {
          value: {
            required,
            minLen: minLength(5)
          }
        }
      }
    },

```

## Controlling Form Submit Button

We want to disable the form submit button if we got any validation errors in our form.

Access $v.error or **$v.invalid**:

```
<button type="submit" :disabled="$v.$invalid">Submit</button>
```