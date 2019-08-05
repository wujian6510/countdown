<template>
  <div :class="$style.wrap">
    <div :class="$style.countDown">
      <div :class="$style.title">距离活动开始仅剩（10秒内有惊喜）</div>
      <div :class="$style.main">
        <div :class="$style.numberCell">{{countDown.d}}</div>
        <div :class="$style.numberSpan">天</div>
        <div :class="$style.numberCell">{{countDown.h}}</div>
        <div :class="$style.numberSpan">时</div>
        <div :class="$style.numberCell">{{countDown.m}}</div>
        <div :class="$style.numberSpan">分</div>
        <div :class="$style.numberCell">{{countDown.s}}</div>
        <div :class="$style.numberSpan">秒</div>
      </div>
    </div>
    <div :class="$style.list">
      <swiper :options="swiperOption" :class="$style.row">
        <swiper-slide
        :class="$style.col"
        v-for="(item,index) in groupStatus"
        :key="index"
        >
          <div :class="[$style.cell,item.state?$style.active:'']">
            <div :class="$style.cellTit">{{ item.name }}</div>
            <div :class="$style.cellCont">{{ item.state === 1 ?'准备就绪':'正在准备……' }}</div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination" :class="$style.swiperPage" slot="pagination"></div>
    </div>
    <!-- <div :class="$style.footer">
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
    </div> -->
    <PopupCountDown :show="showPopup" :number="number"/>
  </div>
</template>

<script>
//import api from "../services";
import moment from "moment";
import PopupCountDown from '../components/popupCountDown.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  components:{
    PopupCountDown,
    swiper,
    swiperSlide
  },
  data() {
    return {
      showPopup:false,
      number:0,
      curTime: new Date(),
      onLineTime: "",
      groupStatus: [],
      intervalId: "",
      swiperOption: {
        slidesPerColumnFill:'row',
        speed: 1000, //每次滚动的速度
        slidesPerView:4, //4列
        slidesPerColumn: 2, //2行
        slidesPerGroup: 8, //每次滚动4列
      }
    };
  },
  mounted() {
    this.getReadyStatus();
    this.intervalId1 = setInterval(this.updateCurTime, 1000);
  },
  computed: {
    countDown() {
      const curTimeStamp = Date.parse(this.curTime);
      const onLineTimeStamp = Date.parse(this.onLineTime);
      let [d, h, m, s] = ["00", "00", "00", "00"];
      const hasTime = onLineTimeStamp - curTimeStamp ;
      if(!isNaN(hasTime)){
        if (hasTime > 0) {
          let countDown = (onLineTimeStamp - curTimeStamp) / 1000;
          d = this.toDoubleNumber(parseInt(countDown / (3600 * 24)));
          countDown = countDown % (3600 * 24);
          h = this.toDoubleNumber(parseInt(countDown / 3600));
          countDown = countDown % 3600;
          m = this.toDoubleNumber(parseInt(countDown / 60));
          countDown = countDown % 60;
          s = this.toDoubleNumber(countDown);
          if(hasTime <=10000 && s <= 10){
            this.showPopup = true;
            this.number = s;
          }
        }else{
          clearInterval(this.intervalId1);
          this.number = 'start!';
        }
       }
      return this.toDoubleNumber({ d, h, m, s });
    }
  },
  methods: {
    getReadyStatus() {
      //const res = await api.getReadyStatus();
      //this.onLineTime = res.onLineTime;
      let day3 = new Date();
      day3.setTime(day3.getTime()+15*1000);
      this.onLineTime = moment(day3).format("YYYY-MM-DD HH:mm:ss");
      
    },
    updateCurTime() {
      this.curTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    },
    toDoubleNumber(num) {
      return num < 10 ? `0${num}` : num;
    },
  }
};
</script>

<style lang="scss" module>
.wrap {
  position: relative;
  min-height: 100%;
  display: flex;
  padding: rem(30);
  flex-direction: column;
}
.header{
  margin-bottom: rem(40);
  img{
    margin: 0 auto;
    display: block;
    height: rem(150);
  }
}
.countDown {
  padding-top: rem(60);
  padding-bottom: rem(120);
  .title {
    color: #FCE177;
    text-align: center;
    font-size: rem(60);
    & + .main {
      margin-top: rem(40);
    }
  }
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    .numberCell {
      display: block;
      min-width: rem(200);
      text-align: center;
      padding: rem(20) rem(30);
      font-size: rem(128);
      color: #FBD950;
      font-weight: bold;
      font-family: Impact;
      background: rgba(45,0,104, 0.5);
      border-radius: rem(8);
    }
    .numberSpan {
      margin: 0 rem(20);
      font-size: rem(48);
      color: $brandWarning;
    }
  }
}
.list {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .row {
    margin: 0 rem(-15);
    flex: 1;
  // height: 1px;
    overflow: hidden;
    :global(.swiper-wrapper){
      height: auto;
    }
  }
  .col {
    float: left;
    width: (100%/4);
    padding: 0 rem(15);
    margin-bottom: rem(30);
  }
  .cell {
    padding: rem(15) rem(20);
    background: rgba(45,0,104, 0.5);
    border-radius: rem(4);
    height: rem(100);
    .cellTit,
    .cellCont {
      line-height: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .cellTit {
      font-size: rem(32);
      color: #e6eaff;
      & + .cellCont {
        margin-top: rem(8);
      }
    }
    .cellCont {
      font-size: rem(24);
      color: rgba(230,234,255,.5);
    }
    &.active {
      background: linear-gradient(to right,#FA026E, #804AC3, #3D43CC);
      .cellTit,
      .cellCont {
        color: #FBD950;
      }
    }
  }
}
.swiperPage{
  position: relative;
  padding-top: rem(20);
  span{
    margin: 0 rem(5);
    width: rem(20);
    border-radius: 0;
    outline: none;
    border-radius: rem(4);
  }
}
.footer {
  margin-top: rem(40);
  text-align:center;
  .logo {
    margin: 0 auto;
    display: inline;
    height: rem(50);
  }
}
</style>

