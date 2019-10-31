import Vue from 'vue'
import App from './App.vue'

Vue.filter('count-word-length', function(value) {
    return `${value} (${value.split("").length})`;
});

Vue.mixin({
    created() {
        console.log('Global Mixin - Created Hook');
    }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
