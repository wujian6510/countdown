<template>
  <div :class="[$style.panel,className]">
    <div :class="$style.panelHeader">{{ title }}</div>
    <div :class="$style.panelBody">
      <ul :class="$style.list">
        <li
          :class="$style.item"
          v-for="(item,index) in data"
          :key="index"
        >
          <div :class="$style.itemMain">
            <div
              :class="$style.itemTitle"
              :style="{color:color[index]}"
            >{{ item.title }}</div>
            <div
              :class="$style.itemExpand"
              :style="{color:color[index]}"
            >
              <span :class="$style.num">{{ ratio(item.hascust, item.totalcust) }}</span>%
            </div>
          </div>
          <div :class="$style.itemProgress">
            <div
              :class="$style.progressLine"
              :style="{background:color[index],width:`${ratio(item.hascust, item.totalcust)}%`}"
            ></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CenterProgress",
  props: {
    title: String,
    className: String,
    data: {
      type: Array,
      required: true
    },
    color: {
      type: Array,
      default: function() {
        return ["#3199FF", "#4DDBFF", "#50E3C2", "#B8E886", "#AA99FF"];
      }
    }
  },
  methods: {
    ratio(hascust, totalcust) {
      return ((Number(hascust) / Number(totalcust)) * 100).toFixed(2);
    }
  }
};
</script>

<style lang="scss" module>
.panel {
  display: flex;
  flex-direction: column;
  border: 1px solid $borderColor;
  .panelHeader,
  .panelBody,
  .panelFooter {
    padding: rem(15) rem(20);
  }
  .panelHeader {
    font-size: rem(24);
    & + .panelBody {
      padding-top: 0;
    }
  }
  .panelBody {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
.list {
  .item {
    & + .item {
      margin-top: rem(14);
    }
    .itemMain {
      display: flex;
      font-size: rem(20);
      color: $brandPrimary;
      .itemTitle {
        flex: 1;
      }
      .itemExpand {
        margin-left: rem(20);
        .num {
          font-family: Impact;
          font-weight: bold;
          margin-right: rem(6);
        }
      }
      & + .itemProgress {
        margin-top: rem(6);
      }
    }
    .itemProgress {
      position: relative;
      height: rem(14);
      background: #333380;
      border-radius: rem(7);
      overflow: hidden;
      .progressLine {
        position: absolute;
        left: 0;
        top: 0;
        border-radius: rem(7);
        height: rem(14);
        background: $brandPrimary;
      }
    }
  }
}
</style>
