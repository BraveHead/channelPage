
var loadingPage = new Vue({
    el: '#loading-page',
    data: {
        button: false,
        isUp: false,
        overflow:'hidden',
    },
    mounted: function(){

    },
    created: function () {

    },
    methods: {
      buttonClick: function () {
          this.button = true;
          document.querySelector('body').style.overflow = 'scroll';
          setTimeout(()=>{
              this.isUp = true;
          }, 1100);
      }
    }

});