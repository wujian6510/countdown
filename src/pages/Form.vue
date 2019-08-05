<template>
  <div :class="$style.wrap">
    <PageHeader title="重庆新一代BSS3.0割接上线" />
    <div :class="$style.panel1">
      <div :class="$style.row">
        <span :class="$style.label">开始割接时间:</span>
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="data.cuttime"
        />
        <span :class="$style.tips">第一阶段倒计时，从当日到割接前</span>
      </div>
      <div :class="$style.row">
        <span :class="$style.label">开始验证时间:</span>
        <el-date-picker
          type="datetime"
          placeholder="选择日期"
          v-model="data.checktime"
        />
        <span :class="$style.tips">第二阶段倒计时，从割接到验证完成</span>
        <div :class="$style.btn">
          <el-button
            type="primary"
            @click="saveData"
          >提交</el-button>
        </div>
      </div>
    </div>
    <div :class="$style.panel2">
      <div :class="$style.row">
        <span :class="$style.blabel">割接数据录入</span>
      </div>
      <div :class="$style.row">
        <div :class="$style.rowWarp">
          <div :class="$style.item" />
          <div :class="$style.item">当前割接量</div>
          <div :class="$style.item">割接总量</div>
          <div :class="$style.item">当前通过验证</div>
          <div :class="$style.item">待验证总量</div>
        </div>
        <div
          :class="$style.rowWarp"
          v-for="center in data.centers"
          :key="center.id"
        >
          <div :class="$style.item">{{center.title}}</div>
          <div :class="$style.item">
            <el-input
              placeholder="请输入"
              v-model="center.hascust"
            ></el-input>
          </div>
          <div :class="$style.item">
            <el-input
              placeholder="请输入"
              v-model="center.totalcust"
            ></el-input>
          </div>
          <div :class="$style.item">
            <el-input
              placeholder="请输入"
              v-model="center.hascheck"
            ></el-input>
          </div>
          <div :class="$style.item">
            <el-input
              placeholder="请输入"
              v-model="center.tatalcheck"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../data/data.json";
import api from "../services";

export default {
  data() {
    return { data };
  },
  mounted() {},
  methods: {
    saveData: function() {
      //console.log(this.data);
      api.writeFile(this.data).then(res => {
        console.log(res);
      });
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
  color: $brandStrong;
  .panel1 {
    height: rem(200);
    padding: rem(20) rem(30);
    border: 1px solid $borderColor;
    //background-color: $fontColorBase;
    .row {
      margin-top: rem(20);
      .blabel {
        font-size: rem(26);
      }
      .label {
        font-size: $fontSize;
        margin-right: rem(20);
      }
      .tips {
        margin-left: rem(20);
      }
      .btn {
        position: relative;
        float: right;
      }
    }
  }
  .panel2 {
    flex: 1;
    margin-top: rem(20);
    padding: rem(20);
    border: 1px solid $borderColor;
    // background-color: $fontColorBase;
    .row {
      margin-top: rem(10);
      .blabel {
        font-size: rem(30);
      }
      .label {
        font-size: $fontSize;
        margin-right: rem(20);
      }
      .rowWarp {
        display: flex;
        justify-content: center;
        width: 100%;
        .item {
          flex: 1;
          font-size: rem(26);
          padding: rem(10);
        }
      }
    }
  }
}
</style>


