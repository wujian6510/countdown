<template>
  <div :class="$style.panel">
    <div :class="$style.panelHead">业务验证</div>
    <ul :class="$style.panelList">
      <li
        :class="$style.col"
        v-for="(item,index) in chartData"
        :key="index"
      >
        <pieChartPanel
          :title="item.title"
          :done="item.done"
          :toBeDone="item.toBeDone"
          :ratio="item.ratio"
          :color="item.color"
        />
      </li>
    </ul>
  </div>
</template>


<script>
import pieChartPanel from './pieChartPanel';
export default {
  name: "pageWorkPanel",
  components: {
    pieChartPanel
  },
  data(){
    return {
      chartData: [
        {
          'title':'CPC中心',
          'done': '10',
          'toBeDone': '0',
          'ratio': '25',
          'color' : '#3199FF'
        },
        {
          'title':'基础运营中心',
          'done': '10',
          'toBeDone': '40',
          'ratio': '35',
          'color' : '#4DDBFF'
        },
        {
          'title':'客户中心',
          'done': '10',
          'toBeDone': '40',
          'ratio': '20',
          'color' : '#50E3C2'
        },
        {
          'title':'受理中心',
          'done': '10',
          'toBeDone': '40',
          'ratio': '20',
          'color' : '#B8E886'
        },
        {
          'title':'营销资源中心',
          'done': '10',
          'toBeDone': '40',
          'ratio': '20',
          'color' : '#AA99FF'
        },
        {
          'title':'总体验证进度',
          'done': '10',
          'toBeDone': '40',
          'ratio': '20',
          'color' : '#FFD300'
        }
      ]
    }
  }
}
</script>


<style lang="scss" module>
  .panel{
    flex: 1;
    display: flex;
    flex-direction: column;
    border: 1px solid $borderColor;
    .panelHead,
    .panelList{
      padding: rem(15) rem(20);
    }
    .panelHead{
      font-size: rem(24);
      & + .panelList{
        padding-top: 0;
      }
    }
    .panelList{
      flex: 1;
      display: flex;
      .col{
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>

