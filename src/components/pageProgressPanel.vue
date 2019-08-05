<template>
  <div :class="$style.panel">
    <div :class="$style.panelHeader">总体割接进度</div>
    <div :class="$style.panelBody">
      <veBar
        :grid="chartOption.grid"
        :legend="chartOption.legend"
        :xAxis="chartOption.xAxis"
        :yAxis="chartOption.yAxis"
        :series="chartOption.series"
        :settings="chartOption.settings"
        :height="'100%'"
      >
      </veBar>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import { resetFontSize } from '../utils/chart';
export default {
  name: "pageProgressPanel",
  props:{
    value:{
      type: String,
      default: "0"
    }
  },
  data () {
    return {
      chartOption: {
        settings:{
          xAxisType: 'value'
        },
        legend: {
          show: false
        },
        grid: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
        xAxis: {
          type: 'value',
          axisLabel:{
            fontSize:16,
            boundaryGap: true,
            show: false,
            textStyle:{
              color: '#858DB2'
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          axisLabel:{
            show: false
          }
        },
        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: {color: '#333380'},
              emphasis: {color: '#333380'}
            },
            zlevel: 1,
            barGap:'-100%',
            data: [100],
            animation: false
          },
          {
            type: 'bar',
            zlevel: 2,
            label:{
              normal: {
                show: true,
                fontSize: resetFontSize(32),
                fontFamily: 'Impact',
                textBorderColor: 'transparent',
                formatter: function(e){
                  return `${e.value}%`
                },
                position: 'insideRight'
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    {offset: 0, color: '#FF644D'},
                    {offset: 0.25, color: '#FFC54D'},
                    {offset: 0.5, color: '#50E3C2'},
                    {offset: 1, color: '#3199FF'}
                  ]
                )
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 1, 0,
                  [
                    {offset: 0, color: '#FF644D'},
                    {offset: 0.25, color: '#FFC54D'},
                    {offset: 0.5, color: '#50E3C2'},
                    {offset: 1, color: '#3199FF'}
                  ]
                )
              }
            },
            data: [this.value]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" module>
  .panel{
    margin: rem(20) 0;
    .panelHeader{
      font-size: rem(24);
      margin-bottom: rem(10);
    }
    .panelBody{
      height: rem(80);
    }
  }
</style>

