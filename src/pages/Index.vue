<template>
  <div :class="$style.wrap">
    <PageHeader title="重庆新一代BSS3.0割接上线" />
    <PageCountDown />
    <pageProgressPanel value="40" />
    <pageWorkPanel />
  </div>
</template>

<script>
import api from "../services";

export default {
  data() {
    return {};
  },
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.$store.dispatch("getData");
    }
  }
};
</script>

<style lang="scss" module>
.wrap {
  position: relative;
  min-height: 100%;
  display: flex;
  padding: rem(20) rem(30);
  flex-direction: column;
}
</style>



