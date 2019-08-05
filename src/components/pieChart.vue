<template>
  <veRing
    :title="chartOption.title"
    :legend="chartOption.legend"
    :colors="chartOption.colors"
    :series="chartOption.series"
    :height="'100%'"
  />
</template>

<script>
import { resetFontSize } from "../utils/chart";
export default {
  name: "PieChart",
  props: {
    ratio: {},
    ratioSize: {
      type: Number,
      default: 32
    },
    titleSize: {
      type: Number,
      default: 32
    },
    title: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#3199FF"
    },
    otherColor: {
      type: String,
      default: "#525697"
    }
  },
  watch: {
    ratio: function(value) {
      const option = { ...this.chartOption };
      option.title.text = `${value}%`;
      option.series[0].data[0].value = value;
      option.series[0].data[1].value = 100 - value;
      this.chartOption = option;
    }
  },
  data() {
    return {
      chartOption: {
        title: {
          text: this.ratio + "%",
          subtext: this.title,
          x: "center",
          y: "center",
          itemGap: 0,
          padding: 0,
          textStyle: {
            fontFamily: "Impact",
            fontWeight: "bold",
            color: this.color,
            fontSize: resetFontSize(this.ratioSize)
          },
          subtextStyle: {
            fontSize: resetFontSize(this.titleSize),
            color: "#fff"
          }
        },
        colors: [this.otherColor],
        series: [
          {
            name: this.title,
            type: "pie",
            clockWise: true,
            radius: ["80%", "100%"],
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
            data: [
              {
                value: this.ratio,
                name: "已完成",
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
              },
              {
                name: "未完成",
                value: 100 - this.ratio
              }
            ]
          }
        ],
        legend: {
          show: false
        }
      }
    };
  }
};
</script>



