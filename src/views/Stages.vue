<template>
  <div class="loader">
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_天空.png" />
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_地图.png" />
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_山脉.png" />
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_小山.png" />
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_房子.png" />
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_树枝.png" />
    <img class="stagesback" src="http://pic.deaso40.com/ljhy/4地图/地图_小树.png" />
    <img class="back" src="http://pic.deaso40.com/ljhy/4地图/返回.png" />
    <img class="star" src="http://pic.deaso40.com/ljhy/4地图/星星.png" />
    <div class="star-num">0</div>
    <div v-for="item, index in stageList">
      <img :style="getitemstyle(index)" @click="showmodal(index)" :src="item.src" />
    </div>
    <transition name="fade">
      <div v-show="modalshowed" @click="modalshowed = false" class="modal-back">
      </div>
    </transition>
    <transition name="flyin1">
      <div v-show="modalshowed" class="modal-window">
        <img class="modal-text" :src="gamesList[selectedStage].stages_modal_title" />
        <img class="modal-start" @click="enter(selectedStage)" src="http://pic.deaso40.com/ljhy/5立春/开始游戏.png" />
      </div>
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
      preStage: 0,
      modalshowed: false,
      selectedStage: 0
    }
  },
  computed: {
    ...mapState(['gamesList', 'gamesState'])
  },
  async beforeMount(){
    await this.$store.dispatch(ActionsTypes.LOAD_GAMES);
    await this.$store.dispatch(ActionsTypes.LOAD_GAMES_STATE);
    this.getPreStage();
    this.addallstage();
  },
  async mounted(){
    
  },
  methods:{
    gameStateId: function(gameId) {
      return this.gamesState[gameId.toString()];
    },
    start(){
      
    },
    getPreStage(){
      this.preStage = 0;
      for(var index in this.gamesState){
        if(this.gamesState[index] === 2) this.preStage += 1;
        else break;
      }
    },
    showmodal(index) {
      this.selectedStage = index;
      this.modalshowed = !this.modalshowed;
    },
    addallstage(){
      var addxy = {};
      for (var index in mapxys){
        addxy = mapxys[index];
        if(this.gamesState[index] === 2) addxy.src = mapxys[index].stages_finished_pic;
        else if(this.gamesState[index] === 1) addxy.src = mapxys[index].stages_finishing_pic;
        else addxy.src = mapxys[index].stages_not_finished_pic;
        this.addstage(addxy);
      }
      if(this.preStage < this.stageList.length){
        this.addstage({x: this.stageList[this.preStage].x + 10, 
          y: this.stageList[this.preStage].y - 24, 
          src: 'http://pic.deaso40.com/ljhy/4地图/24关按钮/地图_正在完成定位.png',
          width: 30});
      }
    },
    addstage(data){
      this.stageList.push({
        x: data.x,
        y: data.y,
        src: data.src,
        width: data.width ? data.width : 50
      });
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
    enter(index){
      this.$router.push('/game/' + index);
    }
  }
}
</script>
<style lang="scss" scoped>
.stagesback{
  width: 800vw;
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
  width: 50px;
  height: auto;
  top: 8px;
  left: 8px;
}
.star{
  position: fixed;
  width: 100px;
  height: auto;
  top: 6px;
  right: 0px;
  &-num{
    position: fixed;
    font-size: 16px;
    top: 28px;
    right: 28px;
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
    margin-top: 210px;
    left: 48px;
    right: 48px;
    height: 148px;
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
    width: 100%;
    height: 100%;
  }
  &-start{
    position: absolute;
    top: 86px;
    width: 180px;
    left: calc(50vw - 90px - 48px);
  }
}
</style>