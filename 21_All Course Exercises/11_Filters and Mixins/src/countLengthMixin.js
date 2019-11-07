export const countLengthMixin = {
  data(){
    return {
      test: 'Count Length from Mixin'
    }
  },
  computed: {
    countLengthMixinFn(){
      return this.test + " (" + this.test.length + ")";
    }
  }
}