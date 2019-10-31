<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <h1>Filters & Mixins Assignment</h1>
        <!-- Exercise 1) -->
        <h2>Build a local Filter which reverses the Text it is applied on</h2>
        <p><strong>Original</strong>: {{ text }}</p>
        <p><strong>Reversed</strong>: {{ text | reverseText }}</p>
        <hr>
        <!-- Exercise 2 -->
        <h2>Build a global Filter which counts the length of a word and it appends it</h2>
        <!-- Like this: "Test" => Gets Filtered to => "Test (4)" -->
        <p>{{ "Test" | count-word-length }}</p>
        <hr>
        <!-- Exercise 3 -->
        <h2>Do the same as in Exercises 1 & 2, now with Computed Properties</h2>
        <p><strong>Reversed</strong>: {{ reverseText }}</p>
        <p><strong>Count Words</strong>: {{ countWords }}</p>
        <hr>
        <!-- Exercise 4 -->
        <h2>Share the Computed Property rebuilding Exercise 2 via a Mixin</h2>
        <p><strong>Computed Property from Included Mixin </strong>: {{ countLengthInMixin }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {countWordLength} from './countLengthOfWord.js';

  export default {
    data: function(){
      return {
        text: 'Sample Text',
        countWordsVar: 'Test'
      }
    },
    filters: {
      reverseText(value){
        return value.split("").reverse().join("");
      }
    },
    computed: {
      reverseText(){
        return this.text.split("").reverse().join("");
      },
      countWords(){
        return `${this.countWordsVar} (${this.countWordsVar.split("").length})`
      }
    },
    mixins: [countWordLength]
  }
</script>

<style>
</style>
