<template>
  <div class="loader">
    <img ref="stages" class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_天空.png" />
    <img class="bigclick" v-show="!nobigclick" style="opacity: 0" @click="clickcontinue" src="http://pic.deaso40.com/ljhy/3基础教程/1/背景.png" />
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_地图.png" />
    <div v-for="item, index in extraList">
      <img class="stagesback" :src="item.src" />
    </div>
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_山脉.png" />
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_小山.png" />
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_房子.png" />
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_树枝.png" />
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_小树.png" />
    <img class="back" @click="goTitle()" src="http://pic.deaso40.com/ljhy/4地图/返回.png" />
    <img class="star" src="http://pic.deaso40.com/ljhy/4地图/星星.png" />
    <div class="star-num">{{stars}}</div>
    <div v-for="item, index in stageList">
      <img :style="getitemstyle(index)" @click="showmodal(index)" :src="item.src" />
    </div>
    <div v-for="item, index in finishList">
      <img :style="getfinishstyle(index)" :src="item.src" />
    </div>
    <transition name="fade">
      <div v-show="modalshowed" @click="modalshowed = false" class="modal-back">
      </div>
    </transition>
    <transition name="flyin1">
      <div v-show="modalshowed" class="modal-window">
        <img class="modal-text" :src="gamesList[selectedStage] ? gamesList[selectedStage].stages_modal_title : ''"/>
        <img class="modal-start" @click="enter(selectedStage)" src="http://pic.deaso40.com/ljhy/5立春/开始游戏.png" />
      </div>
    </transition>
    <img class="stage_girl" v-show="gamesState[0] != 2 && gamesState[0] != 2" src="http://pic.deaso40.com/ljhy/关卡背景补充/人物.png" />
    <transition name="fade">
      <img v-show="dialogShowed" class="stage_dialog" :src="dialogUrl" />
    </transition>
  </div>
</template>
<script>
import {mapState} from 'vuex';
import * as ActionsTypes from '../store/actions-types';
import mapxys from '../stages/mapxys.json'

export default {
  data: function () {
    return {
      stageList: [],
      extraList: [],
      finishList: [],
      preStage: 0,
      modalshowed: false,
      selectedStage: 0,
      stars: 0,
      dialogUrl: 'http://pic.deaso40.com/ljhy/4地图/对话1.png',
      dialogShowed: false,
      nobigclick: false,
    }
  },
  computed: {
    ...mapState(['gamesList', 'gamesState'])
  },
  async mounted(){
    await this.$store.dispatch(ActionsTypes.LOAD_GAMES);
    await this.$store.dispatch(ActionsTypes.LOAD_GAMES_STATE);
    this.getPreStage();
    this.addallstage();
    this.addallextra();
    window.scroll((this.preStage - 1) * 106,0);
    this.stars = 0;
    for(var index in this.gamesState){
      if(this.gamesState[index] === 2) this.stars += 3;
    }
    if(this.gamesState[0] != 2 && this.gamesState[0] != 2){
      const _this = this;
      _this.dialogShowed = true;
    }
  },
  methods:{
    clickcontinue(){
      console.log(this.pic_step);
      const _this = this;
      this.newDialog("http://pic.deaso40.com/ljhy/4地图/对话2.png");
      this.nobigclick = true;
    },
    newDialog(url){
      const _this = this;
      this.dialogShowed = false;
      setTimeout(function(){
        _this.dialogUrl = url;
        _this.dialogShowed = true;
      },1000);
    },
    gameStateId: function(gameId) {
      return this.gamesState[gameId.toString()];
    },
    goTitle(){
      this.$router.push('/title');
    },
    getPreStage(){
      this.preStage = 0;
      for(var index in this.gamesState){
        if(this.gamesState[index] === 2) this.preStage += 1;
        else break;
      }
    },
    showmodal(index) {
      // console.log(index);
      this.selectedStage = index;
      this.modalshowed = !this.modalshowed;
    },
    addallstage(){
      this.stageList = [];
      var addxy = {};
      for (var index in mapxys){
        addxy = mapxys[index];
        if(this.gamesState[index] === 2) addxy.src = mapxys[index].stages_finished_pic;
        else if(this.gamesState[index] === 1) addxy.src = mapxys[index].stages_finishing_pic;
        else addxy.src = mapxys[index].stages_not_finished_pic;
        this.addstage(addxy);
        if(this.gamesState[index] === 2){
          this.finishList.push({x: mapxys[index].x - 16, 
            y: (mapxys[index].y * document.getElementById('app').clientHeight / 568) + 50, 
            src: mapxys[index].finish_pic,
            width: 90});
        }
      }
      if(this.preStage >= 0 && this.preStage < this.stageList.length){
        console.log(this.stageList[this.preStage].y);
        this.finishList.push({x: this.stageList[this.preStage].x + 12, 
          y: (mapxys[this.preStage].y * document.getElementById('app').clientHeight / 568) - 20, 
          src: 'http://pic.deaso40.com/ljhy/4地图/24关按钮/地图_正在完成定位.png',
          width: 30});
      }
    },
    addstage(data){
      this.stageList.push({
        x: data.x,
        y: (data.y) * document.getElementById('app').clientHeight / 568,
        src: data.src,
        width: data.width ? data.width : 56
      });
    },
    addallextra(){
      this.extraList = [];
      for (var index in mapxys){
        if(mapxys[index].new_pic == "") continue;
        if(this.gamesState[index] === 2){
          this.extraList.push({
            x: 0,
            y: 0,
            src: mapxys[index].new_pic});
        }
      }
    },
    getextrastyle(index){
      const item = this.extraList[index];
      var style = [];
      style.push({position: 'absolute'});
      style.push({width: '800vw'});
      style.push({height: '100vh'});
      style.push({left: item.x + 'px'});
      style.push({top: item.y + 'px'});
      return style;
    },
    getitemstyle(index){
      const item = this.stageList[index];    
      var style = [];
      style.push({position: 'absolute'});
      style.push({width: item.width + 'px'});
      style.push({height: 'auto'});
      style.push({left: item.x + 'px'});
      style.push({top: item.y + 'px'});
      return style;
    },
    getfinishstyle(index){
      const item = this.finishList[index];    
      var style = [];
      style.push({position: 'absolute'});
      style.push({width: item.width + 'px'});
      style.push({height: 'auto'});
      style.push({left: item.x + 'px'});
      style.push({top: item.y + 'px'});
      return style;
    },
    enter(index){
      if(index == 4){
        this.$router.push('/teachgame2');
      }else{
        this.$router.push('/game/' + index);
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
.stagesback{
  width: 2560px;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -100;
}
.back{
  position: fixed;
  width: 48px;
  height: auto;
  top: 12px;
  left: 12px;
  z-index: 75;
}
.star{
  position: fixed;
  width: 102px;
  height: auto;
  top: 12px;
  right: 0px;
  &-num{
    position: fixed;
    font-size: 18px;
    top: 33px;
    right: 24px;
  }
}
.flyin1-enter, .flyin1-leave-to {
  transform: translateY(-400px);
}
.flyin1-enter-active, .flyin1-leave-active {
  transition: all .5s cubic-bezier(.17,.67,.4,1.33)
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease
}
.modal{
  &-window{
    position: fixed;
    margin-top: 242px;
    height: 148px;
    width: 100vw;
    border-radius: 10px;
    // background-color: #ffffff;
  }
  &-back{
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: #ffffff49;
  }
  &-text{
    // position: absolute;
    position: absolute;
    width: auto;
    height: 170px;
    top: 0px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  &-start{
    position: absolute;
    top: 108px;
    width: 216px;
    left: calc(50vw - 108px);
  }
}
.stage_girl{
  position: fixed;
  width: 128px;
  height: auto;
  bottom: 0px;
  left: 0px;
  z-index: 110;
}
.stage_dialog{
  position: fixed;
  width: 248px;
  height: auto;
  bottom: 56px;
  left: 92px;
  z-index: 105;
}
.bigclick{
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: #ffffff;
}
</style>