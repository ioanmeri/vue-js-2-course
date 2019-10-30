<template>
  <div class="container">
    <form v-if="!isSubmitted">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <!-- Exercise 1 -->
          <!-- Create a Signup Form where you retrieve the following Information -->
          <!-- Full Name (First Name + Last Name) -->
          <!-- Mail -->
          <!-- Password -->
          <!-- Store Data? Yes/No -->

<!--           <div class="form-group">
            <label for="firstName">First Name</label>
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
          <app-full-name v-model="fullName"></app-full-name>

          <div class="form-group">
            <label for="email">Mail</label>
            <input
              type="text"
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
              v-model.lazy="userData.password">
          </div>
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
            <label for="storeDbYes">
              <input
                type="radio"
                id="storeDbYes"
                value="Yes"
                v-model="storeDb"> yes
            </label>
            <label for="female">
              <input
                type="radio"
                id="storeDbNo"
                value="No"
                v-model="storeDb"> No
            </label>
          </div>
          <!-- Exercise 2 -->
          <!-- Only display the Form if it has NOT been submitted -->
          <!-- Display the Data Summary ONCE the Form HAS been submitted -->
          <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <button
                class="btn btn-primary"
                @click.prevent="submitted"
                >Submit!
              </button>
            </div>
          </div>


          <!-- Exercise 3 -->
          <!-- Edit the Example from above and create a custom "Full Name" Control -->
          <!-- which still holds the First Name and Last Name Input Field -->
        </div>
      </div>
    </form>
    <hr>
    <!-- v-if="isSubmitted" -->
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4>Your Data</h4>
          </div>
          <div class="panel-body">
            <p>Full Name: {{ fullName }}</p>
            <p>Mail: {{ userData.email }}</p>
            <p>Password: {{ userData.password }}</p>
            <p>Store in Database?: {{ storeDb }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fullName from './Fullname.vue';

  export default {
    data: function(){
      return {
        userData: {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        },
        fullName: 'Ioannis Merianos',
        storeDb: 'Yes',
        isSubmitted: false
      }
    },
    methods: {
      submitted(){
        this.isSubmitted = true;
      }
    },
    components: {
      appFullName: fullName
    }
  }
</script>

<style>
</style>
