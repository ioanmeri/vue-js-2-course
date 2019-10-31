export const countWordLength = {
	data: function(){
      return {
        countLengthVar: 'Test'
      }
    },
    computed: {
      countLengthInMixin(){
        return `${this.countLengthVar} (${this.countLengthVar.split("").length})`;
      }
    }
}