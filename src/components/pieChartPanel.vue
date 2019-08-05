<template>
  <div :class="$style.cell">
    <div :class="$style.cellChart">
      <veRing
        :title="chartOption.title"
        :legend="chartOption.legend"
        :colors="chartOption.colors"
        :series="chartOption.series"
        :height="'100%'"
      />
    </div>
    <div :class="$style.cellTit" :style="{color:color}">{{ title }}</div>
    <div :class="$style.cellCont">
      <div :class="$style.item">已验证 {{done}}</div>
      <div :class="$style.item">待验证 {{toBeDone}}</div>
    </div>
  </div>
</template>

<script>
import { resetFontSize } from '../utils/chart';
export default {
  name: "PieChartPanel",
  props:{
    title: String,
    done: {
      type: String || Number,
      default: 0
    },
    toBeDone:{
      type: String || Number,
      default: 0
    },
    ratio:{
      type: String || Number,
      default: 0
    },
    color:{
      type: String,
      default: '#3199FF'
    }
  },
  data () {
    return {
      chartOption:{
        title: {
          text: this.ratio + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontFamily: 'Impact',
            fontWeight: 'bold',
            color: this.color,
            fontSize: resetFontSize(40)
          }
        },
        colors: ['#333380'],
        series: [{
          name: this.title,
          type: 'pie',
          clockWise: true,
          radius: ['70%', '100%'],
          itemStyle: {
            normal: {
              label: {
                  show: false
              },
              labelLine: {
                  show: false
              }
            }
          },
          hoverAnimation: false,
          data: [{
            value: this.ratio,
            name: '已完成',
            itemStyle: {
              normal: {
                color: this.color,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
        }, {
            name: '未完成',
            value: 100 - this.ratio
          }]
        }],
        legend: {
          show: false
        },
      }
    }
  }
}
</script>

<style lang="scss" module>
  .cell{
    padding: 0 rem(20);
    flex: 1;
    display: flex;
    flex-direction: column;
    .cellChart{
      flex: 1;
      & + .cellTit,
      & + .cellCont{
        margin-top: rem(10);
      }
    }
    .cellTit{
      padding: 0 rem(10);
      font-size: rem(28);
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      & + .cellCont{
        margin-top: rem(5);
      }
    }
    .cellCont{
      display: flex;
      justify-content: center;
      align-items: center;
      .item{
        padding: 0 rem(10);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        position: relative;
        &:not(:first-child){
          &:before{
            content: '';
            position: absolute;
            top: rem(5);
            bottom: rem(5);
            left: 0;
            background: #6568CD;
            width: 1px;
            display: block;
          }
        }
      }
    }
  }
</style>

