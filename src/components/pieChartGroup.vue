<template>
  <ul :class="[$style.group,className]">
    <li
      :class="$style.col"
      v-for="(item,index) in data"
      :key="index"
    >
      <div :class="$style.colMain">
        <PieChart :ratio="item.ratio" :color="itemColors[index]"/>
      </div>
      <div :class="$style.colTitle" :style="{color:itemColors[index]}">{{ item.stepname }}</div>
    </li>
  </ul>
</template>

<script>
import PieChart from './pieChart';
export default {
  name: "PieChartGroup",
  components:{
    PieChart,
  },
  data(){
    return {
      itemColors: []
    }
  },
  props: {
    className: String,
    data: {
      type: Array,
      required: true
    },
    color: {
      type: Array,
      default: function(){
        return ['#3199FF','#4DDBFF','#50E3C2','#B8E886','#AA99FF']
      }
    }
  },
  created:function(){
    this.eachItemsColor();
  },
  methods:{
    eachItemsColor: function(){
      const nowData = this.data;
      const nowColor = this.color;
      const colors = [];
      let n = 1;
      if(nowData.length>nowColor.length){
        n = Math.ceil(nowData.length/nowColor.length);
      }
      for(let i=0; i<n; i++){
        for(let j=0; j<nowColor.length; j++){
          colors.push(nowColor[j]);
        }
      }
      this.itemColors = colors;
    }
  }
}
</script>

<style lang="scss" module>
  .group{
    overflow: hidden;
    .col{
      float: left;
      width: (100%/4);
      margin-bottom: rem(20);
    }
    .colMain{
      margin: 0 auto;
      width: rem(120);
      height: rem(120);
    }
    .colTitle{
      font-size: rem(28);
      margin-top: rem(10);
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>

