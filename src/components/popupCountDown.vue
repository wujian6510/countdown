<template>
  <div v-if="show" :class="$style.wrap">
    <div :class="$style.main">
      <span :class="[$style.number,this.move]">{{ number }}</span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'PopupCountDown',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    number:{
      default:0
    }
  },
  data(){
    return{
      move: 'curr',
    }
  },
  watch:{
    number:function(){
      const that = this;
      that.move = 'curr';
      let moveTimer =setTimeout(function(){
        that.move = '';
        clearTimeout(moveTimer);
      },500);

    }
  }
}
</script>


<style lang="scss" module>
.wrap{
  background: url('../assets/images/coutdown/bg.png') no-repeat center;
  background-size: cover;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .main{
    width: rem(960);
    height: rem(960);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:before{
      content: '';
      background: url('../assets/images/coutdown/pic-bg.png') no-repeat;
      background-size: cover;
      width: rem(960);
      height: rem(960);
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      animation: rotateMove infinite linear 20s;
    }
    .number{
      font-size: rem(300);
      font-weight: bold;
      font-family: Impact;
      position: relative;
      z-index: 10;
      background: linear-gradient(to top, #FCDB5A, #FBD950, #FEFAE9);
      -webkit-background-clip: text;
      color: transparent;
      &:global(.curr){
        animation: numberMove linear .5s;
        animation-fill-mode: forwards;
      }
    }
  }
  @keyframes rotateMove {
    0%{
        transform:rotate(0deg);
    }
    100%{
        transform:rotate(360deg);
    }
  }
  @keyframes numberMove {
    0%{
      opacity: 0;
      transform: scale(3);
    }
    100%{
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
