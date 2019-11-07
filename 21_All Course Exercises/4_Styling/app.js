new Vue({
  el: '#exercise',
  data: {
    highlight: false,
    shrink: false,
    attachClass1: 'attachClass1',
    attachClass2: 'attachClass2',
    userClass: '',
    anotherClassBool: '',
    userBackgroundColor: '',
    barWidth: 0
  },
  computed: {
    anotherClass: function(){
      return this.anotherClassBool === 'true' ? 'classEx4' : ''
    },
    computeBarWidth: function(){
      console.log('Return', this.barWidth);
      return this.barWidth;
    }
  },
  watch: {
    barWidth: function(value){
      var vm = this;
      if(value >= 200){
        console.log('Must stop');
        clearInterval(this.barInterval);
      }
    }
  },
  methods: {
    startEffect: function() {
      var vm = this;
      setInterval(function(){
        if(vm.highlight){
          vm.shrink = true;
          vm.highlight = false; 
        }else{
          vm.shrink = false;
          vm.highlight = true;
        }
      },1000);
    },
    startProgressBar: function(){
      var vm = this;
      vm.barInterval = setInterval(function(){
        // console.log(vm.barWidth);
        vm.barWidth += 40;
      }, 1000)
    }
  }
});
