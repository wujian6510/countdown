<template>
  <div :class="$style.wrap">
    <div :class="$style.header">
      <img src="../assets/images/logo-cut-over.png" alt="新疆电信新一代BSS3.0割接上线">
    </div>
    <PageCutOver />
    <div :class="$style.footer">
      <img
        :class="$style.logo"
        src="../assets/images/logo-gx.png"
        alt="中国电信广西分公司"
      />
       <img
        :class="$style.logo"
        src="../assets/images/logo-wc.png"
        alt="浩鲸科技"
      />
    </div>
  </div>
</template>


<script>
export default {

};
</script>

<style lang="scss" module>
.wrap {
  position: relative;
  height: 100%;
  display: flex;
  padding: rem(30) rem(30);
  flex-direction: column;
  .header{
    margin-bottom: rem(20);
    img{
      margin: 0 auto;
      display: block;
      height: rem(119);
    }
  }
  .footer {
    padding: rem(30);
    padding-bottom: 0;
    text-align:center;
    .logo {
      margin: 0 auto;
      display: inline;
      height: rem(50);
    }
  }
}
</style>



