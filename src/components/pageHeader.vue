<template>
  <div :class="$style.header">
    <div :class="$style.timeCell" v-if="showTime">
      <div
        :class="$style.timeDt"
        @click="print"
      >开始时间</div>
      <div :class="$style.timeDd">
        <div :class="$style.timeDate">{{beginTime[0]}}</div>
        <div :class="$style.timeHour">{{beginTime[1]}}</div>
      </div>
    </div>
    <div :class="$style.headerCell">
      <div :class="$style.logo">
        <img
          src="../assets/images/logo.png"
          alt="中国电信"
        >
      </div>
      <div :class="$style.title">{{ title }}</div>
    </div>
    <div :class="$style.timeCell" v-if="showTime">
      <div :class="$style.timeDd">
        <div :class="$style.timeDate">{{curTime[0]}}</div>
        <div :class="$style.timeHour">{{curTime[1]}}</div>
      </div>
      <div :class="$style.timeDt">当前时间</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PageHeader",
  data() {
    return {
      curTime: new Date()
    };
  },
  props: {
    title: String,
    showTime: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setInterval(this.updateCurTime, 1000);
  },
  computed: {
    data() {
      return this.$store.state.data;
    },
    beginTime() {
      return this.$store.getters.beginTime;
    }
  },
  methods: {
    print() {
      console.log(this.data);
    },
    updateCurTime() {
      this.curTime = moment(new Date())
        .format("YYYY-MM-DD HH:mm:ss")
        .split(" ");
    }
  }
};
</script>


<style lang="scss" module>
.header,
.headerCell {
  display: flex;
  align-items: center;
}
.header {
  margin-bottom: rem(18);
}
.headerCell {
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 rem(10);
  .logo {
    margin-right: rem(20);
    img {
      display: block;
      height: rem(70);
    }
  }
  .title {
    text-align: center;
    font-weight: bold;
    font-size: rem(120);
    color: $brandWarning;
  }
}
.timeCell {
  display: flex;
  border: 1px solid $borderColor;
  .timeDt {
    font-size: rem(24);
    line-height: 1;
    background: $brandPrimary;
    color: $fontColorBase;
    width: rem(70);
    padding: rem(10);
  }
  .timeDd {
    font-size: rem(20);
    padding: rem(10);
    .timeDate {
      color: $brandStrong;
    }
    .timeHour {
      color: $fontColorBase;
    }
  }
}
</style>
