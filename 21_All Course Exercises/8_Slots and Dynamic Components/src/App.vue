<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <br>
        <button class="btn btn-primary" @click="activeComponent = 'blue'">Load Blue Template</button>
        <button class="btn btn-success" @click="activeComponent = 'green'">Load Green Template</button>
        <button class="btn btn-danger" @click="activeComponent = 'red'">Load Red Template</button>
        <hr>
        <app-blue v-if="activeComponent === 'blue'">
          Passing Test to Slot
        </app-blue>
        <app-green v-if="activeComponent === 'green'">
          <h3>Html to Slot</h3>
          <p>And the context</p>
        </app-green>
        <app-red v-if="activeComponent === 'red'">Normal Text</app-red>
      </div>
    </div>
  </div>
</template>

<script>
  import Blue from './components/Blue.vue';
  import Green from './components/Green.vue';
  import Red from './components/Red.vue';

  export default {
    data: function(){
      return {
        activeComponent: 'blue'
      }
    },
    components: {
      appBlue: Blue,
      appGreen: Green,
      appRed: Red
    }
  }
</script>

<style>
</style>
