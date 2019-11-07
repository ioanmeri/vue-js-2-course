<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Filters & Mixins</h1>
        <!-- Exercise 1) -->
        <!-- Build a local Filter which reverses the Text it is applied on -->
        <h4>Reverse value with local Filter</h4>
        <p>reverseValue</p>
        <p>{{ "reverseValue" | reverseText }}</p>
        <hr>
        <!-- Exercise 2 -->
        <h4>Build a global Filter which counts the length of a word and it appends it</h4>
        <!-- Like this: "Test" => Gets Filtered to => "Test (4)" -->
        <p>{{ "count the length" | countLength }}</p>
        <hr>
        <!-- Exercise 3 -->
        <h4>Do the same as in Exercises 1 & 2, now with Computed Properties</h4>
        <p>{{ testComputed }}</p>
        <p>{{ reverseValue }}</p>
        <p>{{ countLength }}</p>

        <hr>
        <!-- Exercise 4 -->
        <h4>Share the Computed Property rebuilding Exercise 2 via a Mixin</h4>
        {{ countLengthMixinFn }}
      </div>
    </div>
  </div>
</template>

<script>
  import { countLengthMixin } from './countLengthMixin';

  export default {
    data: function(){
      return {
        testComputed: 'reverse with Computed'
      }
    },
    filters: {
      reverseText(value){
        return value.split("").reverse().join("");
      }
    },
    computed: {
      reverseValue(){
        return this.testComputed.split("").reverse().join("");
      },
      countLength(){
        return this.testComputed + " (" + this.testComputed.length + ")";
      }
    },
    mixins: [countLengthMixin]
  }
</script>

<style>
</style>
