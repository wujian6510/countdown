<template>
  <div :class="[$style.panel,className]">
    <div :class="$style.panelBody">
      <ul :class="$style.list">
        <li
          :class="$style.item"
          v-for="(item,index) in appData"
          :key="index"
        >
          <div :class="$style.itemMain">
            <div
              :class="$style.itemTitle"
            >{{ item.appname }}</div>
            <div
              :class="$style.itemExpand"
              :style="{color:item.color}"
            >
              <span :class="$style.num">{{ item.ratio }}</span>%
            </div>
          </div>
          <div :class="$style.itemProgress">
            <div
              :class="$style.progressLine"
              :style="{background:item.color, width:`${item.ratio}%`}"
            ></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "LineProgress",
  props: {
    className: String,
    appData: Array,
  }
};
</script>

<style lang="scss" module>
.panel {
  display: flex;
  flex-direction: column;
  .panelBody {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    margin-top: rem(20);
  }
}
.list {
  .item {
    & + .item {
      margin-top: rem(20);
    }
    .itemMain {
      display: flex;
      font-size: rem(20);
      color: $brandPrimary;
      .itemTitle {
        flex: 1;
        color: #E6EAFF;
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
        margin-top: rem(12);
      }
    }
    .itemProgress {
      position: relative;
      height: rem(6);
      background: #525697;
      overflow: hidden;
      .progressLine {
        position: absolute;
        left: 0;
        top: 0;
        height: rem(6);
        background: $brandPrimary;
      }
    }
  }
}
</style>
