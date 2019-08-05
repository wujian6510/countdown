<template>
  <div :class="[$style.panel,className]">
    <div :class="$style.panelHeader">{{ title }}</div>
    <div :class="$style.panelBody">
      <VeLine
        :data="chartData"
        :settings="chartOption.settings"
        :colors="chartOption.color"
        :xAxis="chartOption.xAxis"
        :yAxis="chartOption.yAxis"
        :grid="chartOption.grid"
        :legend="chartOption.legend"
        :height="'100%'"
      />
    </div>
    <div :class="$style.panelFooter">
      <ul
        :class="$style.labelRow"
        v-for="(item,index) in legendData"
        :key="index"
      >
        <li :class="$style.labelCol">
          <div :class="$style.labelItem">
            <div :class="$style.labelItemLegend" :style="{background:item.color}"></div>
            {{ item.name }}
          </div>
        </li>
        <li :class="$style.labelCol">
          <div :class="$style.labelItem">
            高峰值
            <span :class="$style.labelItemCont" :style="{color:item.color}">17418</span>
          </div>
        </li>
        <li :class="$style.labelCol">
          <div :class="$style.labelItem">
            平均值
            <span :class="$style.labelItemCont" :style="{color:item.color}">17418</span>
          </div>
        </li>
        <li :class="$style.labelCol">
          <div :class="$style.labelItem">
            当前值
            <span :class="$style.labelItemCont" :style="{color:item.color}">17418</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { resetFontSize } from '../utils/chart';
export default {
  name: "LineChartPanel",
  props: {
    title: String,
    className: String
  },
  data () {
    return {
      legendData: [],
      chartOption:{
        settings: {
          metrics: ['TPS'],
          dimension: ['DATE']
        },
        grid: {
          top: '10%',
          bottom: 0,
          right: '3%',
        },
        legend: {
          show: false
        },
        color: ['#FFC54D'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#333380'
            }
          },
          axisLabel:{
            fontSize:resetFontSize(14),
            textStyle:{
              color: '#858DB2'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#333380'
            }
          },
          axisLabel:{
            fontSize:resetFontSize(14),
            textStyle:{
              color: '#858DB2'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#333380'
            }
          }
        },
      },
      chartData: {
        columns: ['DATE', 'TPS'],
        rows: [
          { 'DATE': '08:00', 'TPS': 1393 },
          { 'DATE': '09:00', 'TPS': 3530 },
          { 'DATE': '10:00', 'TPS': 2923 },
          { 'DATE': '11:00', 'TPS': 1723 },
          { 'DATE': '12:00', 'TPS': 3792 },
          { 'DATE': '13:00', 'TPS': 4593 }
        ]
      }
    }
  },
  created:function(){
    this.FormatLegendData(this.chartOption)
  },
  methods: {
    FormatLegendData: function(data){
      let arr = [];
      data.settings.metrics.forEach((item,index) => {
        arr.push({
          name: item,
          color: data.color[index]
        })
      });
      this.legendData = arr;
    }
  }
}
</script>

<style lang="scss" module>
  .panel{
    display: flex;
    flex-direction: column;
    border: 1px solid $borderColor;
    .panelHeader,
    .panelBody,
    .panelFooter{
      padding: rem(15) rem(20);
    }
    .panelHeader{
      font-size: rem(24);
      & + .panelBody{
        padding-top: 0;
      }
    }
    .panelBody{
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .panelFooter{
      border-top: 1px solid $borderColor;
      .labelRow{
        margin: 0 rem(-10);
        display: flex;
        .labelCol{
          padding: 0 rem(10);
          &:first-child{
            flex: 1;
          }
        }
        .labelItem{
          font-size: rem(16);
          display: flex;
          align-items: center;
          .labelItemLegend{
            width: rem(40);
            height: rem(12);
            background: $brandPrimary;
            margin-right: rem(20);
          }
          .labelItemCont{
            margin-left: rem(10);
          }
          & + .labelItem{
            margin-top: rem(6);
          }
        }
      }
    }
  }
</style>

