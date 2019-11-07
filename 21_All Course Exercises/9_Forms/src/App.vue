<template>
  <div class="container">
    <form v-if="!submitted">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <!-- Exercise 1 -->
          <!-- Create a Signup Form where you retrieve the following Information -->
          <!-- Full Name (First Name + Last Name) -->
          <!-- Mail -->
          <!-- Password -->
          <!-- Store Data? Yes/No -->
          <app-full-name v-model="fullName"></app-full-name>
<!--           <div class="form-group">
            <label for="firstName" >First Name</label>
            <input 
                type="text"
                id="firstName"
                class="form-control"
                v-model="userData.firstName">
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input 
                type="text"
                id="lastName"
                class="form-control"
                v-model="userData.lastName">
          </div> -->
          <div class="form-group">
            <label for="email">Email</label>
            <input 
                type="email"
                id="email"
                class="form-control"
                v-model="userData.email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="userData.password">
          </div>
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
            <span>Save to Db: </span>
            <label for="saveDbYes">
              <input
                type="radio"
                id="saveDbYes"
                value="Yes"
                v-model="saveDb"> Yes
            </label>
            <label for="saveDbNo">
              <input
                type="radio"
                id="saveDbNo"
                value="No"
                v-model="saveDb"> No
            </label>
          </div>
           <button
            class="btn btn-primary"
            @click.prevent="submittedFn"
            >Submit!
          </button>
          <!-- Exercise 2 -->
          <!-- Only display the Form if it has NOT been submitted -->
          <!-- Display the Data Summary ONCE the Form HAS been submitted -->

          <!-- Exercise 3 -->
          <!-- Edit the Example from above and create a custom "Full Name" Control -->
          <!-- which still holds the First Name and Last Name Input Field -->
        </div>
      </div>
    </form>
    <hr>
    <div class="row" v-if="submitted">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4>Your Data</h4>
          </div>
          <div class="panel-body">
            <p>Full Name: {{ fullName }}</p>
            <p>Mail: {{ userData.email }}</p>
            <p>Password: {{ userData.password }}</p>
            <p>Store in Database?: {{ saveDb }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FullName from './Fullname.vue';

  export default {
    data: function(){
      return {
        fullName: 'Ioan Meri',
        userData: {
          email: '',
          password: '',
        },
        saveDb: 'Yes',
        submitted: false
      }
    },
    methods: {
      submittedFn: function(){
        this.submitted = true;
        console.log('submitting');
      }
    },
    components: {
      appFullName: FullName
    }
  }
</script>

<style>
</style>
