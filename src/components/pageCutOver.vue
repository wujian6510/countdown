<template>
  <div :class="$style.wrap">
    <LineProgress
      :appData="appData"
      :className="$style.colProgress"
    />
    <div :class="$style.colChart">
      <div :class="$style.colChartMain">
        <div :class="$style.chartCont">
          <PieChart
            :ratio="totalProgress"
            :ratioSize="90"
            title="总体进度"
            color="#FFD300"
          />
        </div>
      </div>
      <PieChartGroup
        :data="stepData"
        :className="$style.colChartGroup"
      />
    </div>
    <OrderList
      :data="commandData"
      :class="$style.colOrder"
    />
  </div>
</template>

<script>
import LineProgress from "./lineProgress";
import OrderList from "./orderList";
import PieChart from "./pieChart";
import PieChartGroup from "./pieChartGroup";
import api from "../services";

export default {
  name: "pageCutOver",
  components: {
    LineProgress,
    OrderList,
    PieChart,
    PieChartGroup
  },
  data() {
    return {
      initAppCount : 0,
      commandData1: [],
      commandData: [],
      stepData: [  //4个环节数据
        {stepid: "GJQD",stepname: "割接启动",ratio:0, overno:0, totalno:0},
        {stepid: "SHGJ",stepname: "数据割接",ratio:0, overno:0, totalno:0},
        {stepid: "YYFB",stepname: "应用发布",ratio:0, overno:0, totalno:0},
        {stepid: "XTYZ",stepname: "系统验证",ratio:0, overno:0, totalno:0}
      ],
      appData: [
         { appkey: "gx_fixprice",  color: "#FFDC4F" },
         { appkey: "gx_account",  color: "#FF9F7B" },
         { appkey: "gx_strategy",  color: "#E25FAF" },
         { appkey: "gx_portal",  color: "#E88ED2" },
         { appkey: "gx_cpc",  color: "#E8BBF3" },
         { appkey: "gx_crm2",  color: "#9C93F8" },
         { appkey: "gx_oss",  color: "#2FA1DC" },
         { appkey: "gx_eda",  color: "#24C6EB" },
         { appkey: "gx_other",  color: "#61E0E4" },
      ],
      totalProgress: 0
    };
  },
  mounted() {
    this.getData();
    setInterval(this.getData, 5000);
  },
  watch:{
    initAppCount:function(value){
      if(value === this.appData.length){
        //1.已完成指令
        this.commandData = this.commandData1;
        this.commandData.sort(function(a, b) {
          return Date.parse(b.end.replace(/-/g,"/"))-Date.parse(a.end.replace(/-/g,"/"));
          });
        this.commandData = this.commandData.slice(0,23);

        //2.环节进度
        let pagetotalno = 0;
        let pageoverno = 0;
        this.stepData.map((step) =>{
          pagetotalno += step.totalno;
          pageoverno += step.overno;
          step.ratio = parseFloat((step.overno / step.totalno) * 100).toFixed(0);
        });

        //3.总进度
        this.totalProgress = parseFloat((pageoverno / pagetotalno) * 100).toFixed(0);

        //4.各中心进度
        this.appData = this.appData.filter(function (item) {
          return item.appname;
        })
      }
    }
  },
  methods: {
    getData() {
      this.initData();
      this.appData.map((app)=>{
        this.getAppInfo(app);
      });
    },
    initData(){
      this.initAppCount = 0;
      this.commandData1 = [];
      this.stepData = [
        {stepid: "GJQD",stepname: "割接启动",ratio:0, overno:0, totalno:0},
        {stepid: "SHGJ",stepname: "数据割接",ratio:0, overno:0, totalno:0},
        {stepid: "YYFB",stepname: "应用发布",ratio:0, overno:0, totalno:0},
        {stepid: "XTYZ",stepname: "系统验证",ratio:0, overno:0, totalno:0}
      ]
    },
    async getAppInfo(app) {
      let ts = this;
      return new Promise( async() => {
        const appJson = await api.getOtherAppData(app.appkey);
        let app_total_no = 0;
        let app_over_no = 0;
        appJson.steps.map((step,index)=>{
          const { commands } = step;
          let overno = 0;
          let totalno = commands.length;
          commands.map(command => {
            const { end } = command;
            if (this.compareT(end)) {
              this.commandData1.push(command);
              overno += 1;
            }
          });
          app_total_no += totalno;
          app_over_no += overno;
          ts.stepData[index]['overno'] += overno;
          ts.stepData[index]['totalno'] += totalno;
        });
        app.appname = appJson.appname;
        app.ratio = parseFloat((app_over_no / app_total_no) * 100).toFixed(0);
        this.initAppCount += 1;
      });
    },
    compareT(end) {
      if (end === "") {
        return false;
      }
      return new Date(end) < new Date();
    }
  }
};
</script>

<style lang="scss" module>
.wrap {
  flex: 1;
  display: flex;
  padding: 0 rem(40);
}
.colProgress{
  width: rem(420);
}
.colOrder{
  width: rem(520);
}
.colChart {
  margin: 0 rem(60);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .colChartMain {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: rem(560);
    height: rem(560);
    position: relative;
    .chartCont{
      width: rem(400);
      height: rem(400);
      background: url('../assets/images/pic/pic-bg.png') no-repeat center;
      background-size: cover;
      border-radius: rem(200);
      position: relative;
      z-index: 3;
    }
    &:before{
      content: '';
      background: url('../assets/images/pic/pic-line1.png') no-repeat;
      background-size: cover;
      display: block;
      width: rem(500);
      height: rem(500);
      margin: rem(-250) 0 0 rem(-250);
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      animation: rotateMove infinite linear 12s;
    }
    &:after{
      content: '';
      background: url('../assets/images/pic/pic-line2.png') no-repeat;
      background-size: cover;
      display: block;
      width: rem(560);
      height: rem(560);
      margin: rem(-280) 0 0 rem(-280);
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 2;
      animation: backRotateMove infinite linear 8s;
    }
    @keyframes rotateMove {
      0%{
          transform:rotate(0deg);
      }
      100%{
          transform:rotate(360deg);
      }
    }
    @keyframes backRotateMove {
      0%{
          transform:rotate(0deg);
      }
      100%{
          transform:rotate(-360deg);
      }
    }
  }
  .colChartGroup {
    padding-top: rem(60);
  }
  .colChartFooter{
    padding: rem(30);
    img{
      display: block;
      margin: 0 auto;
      height: rem(50);
    }
  }
}
</style>

