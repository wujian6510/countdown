<template>
  <div :class="$style.panel">
    <div :class="$style.panelMain">
      <div :class="$style.title">倒计时</div>
      <div :class="$style.count">距离割接上线 99天99时</div>
      <div :class="$style.total">
        <div :class="$style.dateCell">99</div>
        <div :class="$style.dateUnit">分</div>
        <div :class="$style.dateCell">99</div>
        <div :class="$style.dateUnit">秒</div>
      </div>
    </div>
    <div :class="$style.panelFooter">
      割接耗时
      <span :class="$style.time">
        {{`${countDown.h}:${countDown.m}:${countDown.s}`}}
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CountDown",
  data() {
    return {
      curTime: new Date()
    };
  },
  mounted() {
    setInterval(this.updateCurTime, 1000);
  },
  computed: {
    beginTime() {
      return this.$store.getters.beginTime;
    },
    countDown() {
      const curTimeStamp = Date.parse(this.curTime);
      const beginTimeStamp = Date.parse(
        `${this.beginTime[0]} ${this.beginTime[1]}`
      );
      let [h, m, s] = [0, 0, 0];
      if (curTimeStamp - beginTimeStamp > 0) {
        let countDown = (curTimeStamp - beginTimeStamp) / 1000;
        h = parseInt(countDown / 3600);
        countDown = countDown % 3600;
        m = parseInt(countDown / 60);
        countDown = countDown % 60;
        s = countDown;
      }

      return { h, m, s };
    }
  },
  methods: {
    updateCurTime() {
      this.curTime = moment(new Date())
        .format("YYYY-MM-DD HH:mm:ss")
        .split(" ");
    }
  }
};
</script>

<style lang="scss" module>
.panel {
  margin-left: rem(20);
  margin-right: rem(20);
  width: rem(560);
  height: rem(400);
  display: flex;
  flex-direction: column;
  .panelMain {
    background: rgba(51, 187, 255, 0.25);
    flex: 1;
    padding: rem(20);
    padding-bottom: 0;
    text-align: center;
    .title {
      color: $brandWarning;
      font-size: rem(48);
      margin-bottom: rem(24);
    }
    .count {
      color: $brandWarning;
      font-size: rem(24);
      margin-bottom: rem(24);
    }
    .total {
      font-size: rem(32);
      display: flex;
      align-items: center;
      justify-content: center;
      .dateCell {
        background: rgba(39, 33, 88, 0.92);
        border-radius: rem(8);
        padding: rem(12) rem(30);
        white-space: nowrap;
        font-family: Impact;
        font-size: rem(64);
        font-weight: bold;
      }
      .dateUnit {
        margin-left: rem(10);
        margin-right: rem(10);
      }
    }
  }
  .panelFooter {
    text-align: center;
    color: $brandWarning;
    font-size: rem(36);
    margin-top: rem(20);
    padding: rem(20);
    background: rgba(0, 0, 0, 0.24);
    border: 1px solid $borderColor;
    .time {
      margin-left: rem(20);
    }
  }
}
</style>

