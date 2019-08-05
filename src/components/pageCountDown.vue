<template>
  <div :class="$style.row">
    <div :class="$style.col">
      <LineProgress title="中心割接进度" :className="$style.panel" :data="centerProgressData"/>
    </div>
    <CountDown />
    <div :class="$style.col">
      <LineCharPanel
        title="割接效率"
        :className="$style.panel"
      />
    </div>
  </div>
</template>

<script>
import LineProgress from './lineProgress';
import CountDown from './countDown';
import LineCharPanel from './lineChartPanel';

export default {
  name: "PageCountDown",
  data() {
    return {};
  },
  components:{
    LineProgress,
    CountDown,
    LineCharPanel
  },
  computed: {
    centers() {
      return this.$store.state.data.centers || [];
    }
  }
};
</script>

<style lang="scss" module>
.row {
  display: flex;
  .col {
    flex: 1;
  }
  .panel {
    height: rem(400);
  }
}
</style>
