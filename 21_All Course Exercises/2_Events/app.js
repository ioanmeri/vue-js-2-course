new Vue({
  el: '#exercise',
  data: {
    value: ''
  },
  methods: {
    showAlert: function(){
      alert('Alert on Click');
    },
    updateValue: function(e){
      this.value =  e.target.value;
    },
    refreshValue: function(e){
      this.value =  e.target.value;
    }
  }
});