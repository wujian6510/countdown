<template>
  <div :class="[$style.panel,className]">
    <ul :class="$style.panelList">
      <li
        :class="$style.item"
        v-for="(item,index) in data"
        :key="index"
      >
        <div :class="$style.itemTit">
          {{ item.id }}
          <span :class="$style.itemState">完成</span>
        </div>
        <div :class="$style.itemCont">
          {{ item.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "OrderList",
  props: {
    className: String,
    data: Array
  }
}
</script>

<style lang="scss" module>
  .panel{
    display: flex;
    flex-direction: column;
    .panelList{
      flex: 1;
      height: 1px;
      overflow: hidden;
      .item{
        background: rgba(0,0,0,.2);
        padding: rem(15) rem(20);
        border-radius: rem(4);
        font-size: rem(18);
        & + .item{
          margin-top: rem(5);
        }
        .itemTit{
          font-size: rem(20);
          color: #FFD300;
          .itemState{
            color: #7ED321;
            margin-left: rem(10);
          }
          & + .itemCont{
            margin-top: rem(4);
          }
        }
        .itemCont{
          font-size: rem(18);
          color: #fff;
        }
      }
    }
  }
</style>
