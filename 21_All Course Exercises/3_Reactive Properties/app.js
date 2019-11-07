new Vue({
  el: '#exercise',
  data: {
    value: 0
  },
  computed: {
    result: function(){
      return this.value == 37 ? 'Not there yet' : 'Done';
    }
  },
  watch: {
    result: function(val){
      var vm = this;
      setTimeout(function(){
        vm.value = 0;
      }, 5000);
    }
  }
});