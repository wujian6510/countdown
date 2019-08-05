<template>
    <div>
        <el-container v-for="(item,index) in commanddata"
                    :key="index">
            <el-main>{{item.appname}}
                <div v-for="(itemstep,stepindex) in item.steps"
                        :key="stepindex">
                        指令分组：{{itemstep.stepname}}
                    <el-row :class="$style.commandrow" v-for="(cmd,cmdindex) in itemstep.commands"
                        :key="cmdindex">
                        <el-col :span="10">指令：{{cmd.id}} {{cmd.name}} </el-col>

                        <el-col :span="14">
                        开始时间：
                        <input type="text" v-model="cmd.begin">
                        结束时间：
                        <input type="text" v-model="cmd.end">
                        <el-button size="small" v-on:click="buttonsetbegin(cmd)">设置现在开始</el-button>
                        <el-button size="small" v-on:click="buttonsetend(cmd)">设置现在结束</el-button>
                        <el-button size="small" v-on:click="buttonsave(index)">保存</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
        </el-container>
    </div>
</template>


<script>
import api from "../services";
import moment from "moment";

export default {
  name: "managerPanel",
  props: {
    title: String,
    className: String,
  },
  methods:{
    buttonsave(i){
        //将当前数据直接序列化后推出去
        //由KOA后端进行stringify并写入文件
        let appkey = this.appkey[i];
        if(appkey){
            api.setCommandState({appkey:appkey,data:this.commanddata[i]});
        }
    },
    buttonsetbegin(cmd){
        cmd.begin = moment().format('YYYY-MM-DD HH:mm:ss');
    },
    buttonsetend(cmd){
        cmd.end = moment().format('YYYY-MM-DD HH:mm:ss');
    }
  },
  data() {
     return {
         commanddata:[]
     };
  },
  mounted(){
      let key = ["bss3","charge","market","wechat","Portal","Integral","EDA","message","netBusiness","Complain","resources","ServiceOpen","ODS"];
      this.appkey = key;
      api.getControlData(key).then((reply)=>{
          this.commanddata = reply;
      });
  }
}
</script>

<style lang="scss" module>
.commandrow{
    margin-bottom:rem(10);
}
.commandrow:hover{
    background-color: #F00;
}
</style>