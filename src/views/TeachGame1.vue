<template>
  <div id="game" :class="{'hasKeyboard': gameMode === variables.GAME_MODE_KEYBOARD}">
    <img class="game_background" src="http://pic.deaso40.com/ljhy/3基础教程/1/背景.png" />
    <img class="modal-back" v-show="!nobigclick" style="opacity: 0" @click="clickcontinue" src="http://pic.deaso40.com/ljhy/3基础教程/1/背景.png" />
    <img class="game_goback" @click="goTitle" src="http://pic.deaso40.com/ljhy/4地图/返回.png" />
    <img class="game_skip" @click="goStage" src="http://pic.deaso40.com/ljhy/3基础教程/1/跳过.png" />
    <transition name="fade">
      <div v-show="pic_step < 10 && pic_step > 5">
        <img class="finishing-back" src="http://pic.deaso40.com/ljhy/3基础教程/1/示例图2.png" />
      </div>
    </transition>
    <transition name="fade">
      <div v-show="pic_step < 15 && pic_step > 5">
        <img class="finishing-pic" src="http://pic.deaso40.com/ljhy/3基础教程/1/示例图2部件1复制.png" />
      </div>
    </transition>
    <transition name="fade">
      <div v-show="pic_step < 35 && pic_step > 15">
        <img class="finished-pic1" src="http://pic.deaso40.com/ljhy/3基础教程/1/示例图2部件1复制.png" />
        <img class="finished-pic2" src="http://pic.deaso40.com/ljhy/3基础教程/1/示例图2部件1复制.png" />
      </div>
    </transition>
    <transition name="fade">
      <div v-show="pic_step < 35 && pic_step > 20">
        <img class="finished-back" src="http://pic.deaso40.com/ljhy/3基础教程/1/示例图3.png" />
      </div>
    </transition>
    <!-- <transition name="fade"> -->
      <div v-show="pic_step <= 44 && pic_step > 40">
        <img class="finishing-yellow1" src="http://pic.deaso40.com/ljhy/3基础教程/2/格子复制 2.png" />
      </div>
      <div v-show="pic_step < 44 && pic_step > 40">
        <img class="finishing-hand1" src="http://pic.deaso40.com/ljhy/3基础教程/2/提示手势.png" />
      </div>
      <div v-show="pic_step <= 49 && pic_step > 45">
        <img class="finishing-yellow2" src="http://pic.deaso40.com/ljhy/3基础教程/2/格子复制 5.png" />
      </div>
      <div v-show="pic_step <= 54 && pic_step > 50">
        <img class="finishing-yellow3" src="http://pic.deaso40.com/ljhy/3基础教程/2/格子复制 5.png" />
      </div>
      <div v-show="pic_step <= 64 && pic_step > 60">
        <img class="finishing-yellow41" src="http://pic.deaso40.com/ljhy/3基础教程/2/格子复制 10.png" />
        <img class="finishing-yellow42" src="http://pic.deaso40.com/ljhy/3基础教程/2/格子复制 11.png" />
      </div>
      <div v-show="pic_step <= 79 && pic_step > 75">
        <img class="finishing-yellow5" src="http://pic.deaso40.com/ljhy/3基础教程/2/格子复制 15.png" />
      </div>
    <!-- </transition> -->
    <transition name="fade">
      <div v-show="dialogShowed">
        <img class="finish_dialog" :src="dialogSrc()"></img>
      </div>
    </transition>
    <div v-show="pic_step > 35" class="gameField">
      <GameField
        v-if="gameData"
        ref="gameField"
        :gameData="gameData"
        :gameProcess="gameProcess"
        :controlledByKeyboard="gameMode === variables.GAME_MODE_KEYBOARD"
        :picStep="pic_step"
        @nextpic = "nextpic"
      />
    </div>
    <img class="game_title" src="http://pic.deaso40.com/ljhy/3基础教程/2/玩法介绍.png" />
    <img class="game_girl" src="http://pic.deaso40.com/ljhy/关卡背景补充/人物.png" />
    <!-- <img v-show="dialogShowed" class="finish_dialog" :src="dialogSrc()" /> -->
    <transition name="fade">
      <div v-show="backShowed" @click="backShowed=false" class="modal-back">
      </div>
    </transition>
    <transition name="flyin1">
      <div v-show="backShowed" class="modal-window">
        <img class="modal-text" src="http://pic.deaso40.com/ljhy/返回弹窗补充/设置-弹窗背景.png"/>
        <div v-if="gameData">  
          <img class="modal-title" :src="gameData.game_modal_title" />
        </div>
        <img @click="backShowed=false" class="modal-continue" src="http://pic.deaso40.com/ljhy/5立春/设置-弹窗继续游戏.png" />
        <img @click="goStage()" class="modal-goback" src="http://pic.deaso40.com/ljhy/5立春/设置-弹窗返回主页.png" />
        <img @click="clickRestart()" class="modal-restart" src="http://pic.deaso40.com/ljhy/5立春/设置-弹窗重新开始.png" />
        <img class="modal-bgm" src="http://pic.deaso40.com/ljhy/5立春/设置-弹窗音乐.png" />
        <img class="modal-se" src="http://pic.deaso40.com/ljhy/5立春/设置-弹窗音效.png" />
        <div>
          <img v-if="bgmOpen" @click="bgmOpen=!bgmOpen" class="modal-bgmbutton" src="http://pic.deaso40.com/ljhy/5立春/设置-弹窗关.png" />
          <img v-else @click="bgmOpen=!bgmOpen" class="modal-bgmbutton" src="http://pic.deaso40.com/ljhy/5立春/设置-弹窗开.png" />
        </div>
        <div>
          <img v-if="seOpen" @click="seOpen=!seOpen" class="modal-sebutton" src="http://pic.deaso40.com/ljhy/5立春/设置-弹窗关.png" />
          <img v-else @click="seOpen=!seOpen" class="modal-sebutton" src="http://pic.deaso40.com/ljhy/5立春/设置-弹窗开.png" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import GameField from '@/components/TeachGameField1';
import GameKeyboard from '@/components/GameKeyboard';
import Loader from "@/components/Loader";
import {mapState} from 'vuex';
import variables from "../variables";
import * as ActionsTypes from '../store/actions-types';

export default {
  components: {GameField, GameKeyboard, Loader},
  data: function () {
    return {
      loadingError: false,
      gameId: null,
      gameMode: variables.GAME_MODE_MOUSE,
      gameProcess: null,
      showDonePopup: false,
      timer: "",
      seconds: 0,
      minutes: 0,
      timetext: "00:00",
      backShowed: false,
      bgmOpen: true,
      seOpen: true,
      dialogShowed: false,
      variables: variables,
      pic_step: 0,
      dialog_step: 0,
      nobigclick: false
    };
  },
  computed: {
    ...mapState(['gameData', 'gamesState', 'setFinishTime']),
    gameState: function () {
      return this.$store.getters.gameState(this.gameId);
    }
  },
  watch: {
    // gameState: function (newVal, oldVal) {
    //   if (oldVal && newVal !== oldVal && newVal === variables.GAME_IS_FINISHED) {
    //     const _this = this;
    //     setTimeout(function(){
    //       _this.goFinish()
    //     },1000);
    //     this.showDonePopup = true;
    //   }
    // },
    gameMode: function () {
      this.$refs.gameField.adjustFieldToScreen();
    }
  },
  methods: {
    clickcontinue(){
      console.log(this.pic_step);
      const _this = this;
      if(this.pic_step == 1){ this.pic_step += 3; this.nextpic();}
      else if(this.pic_step == 6){ this.pic_step += 3; this.nextpic(); setTimeout(function(){ _this.nextpic()},1000)}
      else if(this.pic_step == 11){ this.pic_step += 3; this.nextpic(); setTimeout(function(){ _this.nextpic()},1000)}
      else if(this.pic_step == 16){ this.pic_step += 3; this.nextpic(); setTimeout(function(){ _this.nextpic()},1000)}
      else if(this.pic_step == 21){ this.pic_step += 3; this.nextpic();}
      else if(this.pic_step == 26){ this.pic_step += 3; this.nextpic();}
      else if(this.pic_step == 31){ this.pic_step += 3; this.nextpic();}
      else if(this.pic_step == 36){ this.pic_step += 3; this.nextpic();}
      else if(this.pic_step == 41){ this.pic_step += 2; this.nextpic();}
      else if(this.pic_step == 46){ this.pic_step += 2; this.nextpic();}
      else if(this.pic_step == 51){ this.pic_step += 2; this.nextpic();}
      else if(this.pic_step == 56){ this.pic_step += 2; this.nextpic();}
      else if(this.pic_step == 61){ this.pic_step += 2; this.nextpic();}
      else if(this.pic_step == 66){ this.pic_step += 3; this.nextpic();}
      else if(this.pic_step == 71){ this.pic_step += 3; this.nextpic();}
      else if(this.pic_step == 76){ this.pic_step += 3; this.nextpic();}
    },
    nextpic(){
      const _this = this;
      this.nobigclick = false;
      this.pic_step += 1;
      this.dialog_step += 1;
      // console.log('% ' + this.pic_step)
      if(this.pic_step == 1){ this.dialogShowed = true;}
      else if(this.pic_step == 5){this.dialogShowed = false;}
      else if(this.pic_step == 6){this.dialogShowed = true;}
      else if(this.pic_step == 25){this.dialogShowed = false;}
      else if(this.pic_step == 26){this.dialogShowed = true;}
      else if(this.pic_step == 30){this.dialogShowed = false;}
      else if(this.pic_step == 31){this.dialogShowed = true;}
      else if(this.pic_step == 35){this.dialogShowed = false;}
      else if(this.pic_step == 36){this.dialogShowed = true;}
      else if(this.pic_step == 40){this.dialogShowed = false;}
      else if(this.pic_step == 41){this.dialogShowed = true;}
      if(this.pic_step == 44){this.nobigclick = true; return;}
      else if(this.pic_step == 45){this.dialogShowed = false;}
      else if(this.pic_step == 46){this.dialogShowed = true;}
      if(this.pic_step == 49){this.nobigclick = true; return;}
      else if(this.pic_step == 50){this.dialogShowed = false;}
      else if(this.pic_step == 51){this.dialogShowed = true;}
      if(this.pic_step == 54){this.nobigclick = true; return;}
      else if(this.pic_step == 55){this.dialogShowed = false;}
      else if(this.pic_step == 56){this.pic_step += 5; this.dialogShowed = true;}
      else if(this.pic_step == 60){this.dialogShowed = false;}
      else if(this.pic_step == 61){this.dialogShowed = true;}
      if(this.pic_step == 64){this.nobigclick = true; return;}
      else if(this.pic_step == 65){this.dialogShowed = false;}
      else if(this.pic_step == 66){this.dialogShowed = true;}
      else if(this.pic_step == 70){this.dialogShowed = false;}
      else if(this.pic_step == 71){this.dialogShowed = true;}
      else if(this.pic_step == 75){this.dialogShowed = false;}
      else if(this.pic_step == 76){this.dialogShowed = true;}
      if(this.pic_step == 79){this.nobigclick = true; return;}
      else if(this.pic_step == 80){
        this.dialogShowed = false;
        const _this = this;
        setTimeout(function(){
          _this.goFinish()
        },1000);
        this.showDonePopup = true;
        return;
      }
      // if(this.pic_step == 0){  }
      // else if(this.pic_step == 1){ setTimeout(function(){ _this.nextpic()},1000); }
      if(this.dialogShowed == false) setTimeout(function(){ _this.nextpic()},1000);
    },
    dialogSrc(){
      // console.log(this.pic_step);
      if(this.pic_step > 0 && this.pic_step <= 5){ return "http://pic.deaso40.com/ljhy/3基础教程/1/对话1.png"; }
      else if(this.pic_step > 5 && this.pic_step <= 25){ return "http://pic.deaso40.com/ljhy/3基础教程/1/对话2.png"; }
      else if(this.pic_step > 25 && this.pic_step <= 30){ return "http://pic.deaso40.com/ljhy/3基础教程/1/对话3.png"; }
      else if(this.pic_step > 30 && this.pic_step <= 35){ return "http://pic.deaso40.com/ljhy/3基础教程/1/对话4.png"; }
      else if(this.pic_step > 35 && this.pic_step <= 40){ return "http://pic.deaso40.com/ljhy/3基础教程/2/对话5.png"; }
      else if(this.pic_step > 40 && this.pic_step <= 45){ return "http://pic.deaso40.com/ljhy/3基础教程/2/对话6.png"; }
      else if(this.pic_step > 45 && this.pic_step <= 50){ return "http://pic.deaso40.com/ljhy/3基础教程/2/对话7.png"; }
      else if(this.pic_step > 50 && this.pic_step <= 55){ return "http://pic.deaso40.com/ljhy/3基础教程/2/对话8.png"; }
      else if(this.pic_step > 55 && this.pic_step <= 60){ return "http://pic.deaso40.com/ljhy/3基础教程/2/对话9.png"; }
      else if(this.pic_step > 60 && this.pic_step <= 65){ return "http://pic.deaso40.com/ljhy/3基础教程/2/对话9.png"; }
      else if(this.pic_step > 65 && this.pic_step <= 70){ return "http://pic.deaso40.com/ljhy/3基础教程/2/对话10.png"; }
      else if(this.pic_step > 70 && this.pic_step <= 75){ return "http://pic.deaso40.com/ljhy/3基础教程/2/对话11.png"; }
      else if(this.pic_step > 75 && this.pic_step <= 80){ return "http://pic.deaso40.com/ljhy/3基础教程/2/对话12.png"; }
      else if(this.pic_step > 80 && this.pic_step <= 85){ return "http://pic.deaso40.com/ljhy/3基础教程/2/对话13.png"; }
    },
    startTimer () {
    if (this.seconds >= 59) {
      if (this.minutes >= 59) {
        // 溢出
      }else{
        this.seconds = 0;
        this.minutes = this.minutes + 1;
      }
    }else{
      this.seconds += 1;
    }
    this.timetext = (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds);
    },
    goTitle(){
      this.$router.push('/title');
    },
    goStage(){
      this.$router.push('/stages');
    },
    goFinish(){
      var allstars = 0;
      for(var index in this.gamesState){
        if(this.gamesState[index] === 2) allstars += 3;
      }
      this.$store.commit('setFinishTime', this.timetext);
      this.$store.commit('setGameStars', allstars);
      this.$router.push('/teachfinish1');
    },
    moveActiveCell: function(direction) {
      this.$refs.gameField.moveActiveCell(direction);
    },

    selectActiveCell: function(state) {
      this.$refs.gameField.setCellState(state);
    },

    loadGame: async function (gameId) {
      this.gameId = gameId;
      this.loadingError = false;

      try {
        await this.$store.dispatch(ActionsTypes.LOAD_GAME_DATA, gameId);
        await this.$store.dispatch(ActionsTypes.LOAD_GAME_PROCESS, gameId);

        this.$refs.gameField.adjustFieldToScreen();
        // Avoiding use store's state to prevent update the field on each action.
        this.gameProcess = this.$store.state.gameProcess;
      }
      catch (e) {
        console.error(e);
        this.loadingError = true;
      }
    },
    restart: async function () {
      await this.$store.dispatch(ActionsTypes.SAVE_GAME_PROCESS, {id: this.gameId, cells: []});
      await this.$store.dispatch(ActionsTypes.LOAD_GAME_PROCESS, this.gameId);
      this.$refs.gameField.clean();
    },
    async clickRestart(){
      await this.restart();
      this.backShowed = false;
    }
  },
  async mounted() {
    await this.loadGame(24);
    this.timer = setInterval(this.startTimer, 1000);
    this.nextpic();
  },
  destroyed(){
    clearInterval(this.timer);
  }
}
</script>
<style lang="scss" scoped>
.game_background{
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -100;
}
.game_goback{
  position: absolute;
  width: 50px;
  height: auto;
  top: 18px;
  left: 8px;
}
.game_skip{
  position: absolute;
  width: 50px;
  height: auto;
  top: 18px;
  right: 8px;
}
.game_title{
  position: absolute;
  width: 150px;
  height: auto;
  left: calc(50vw - 75px);
  top: 16px;
}
.game_cells{
  position: absolute;
  width: 70px;
  height: auto;
  left: calc(50vw - 35px);
  top: 80px;
}
.game_time{
  position: absolute;
  width: 68px;
  height: auto;
  right: 12px;
  top: 80px;
}
.game_timetext{
  position: absolute;
  width: 44px;
  height: auto;
  right: 22px;
  top: 88px;
  font-size: 12px;
  color: #ffffff;
  text-align:right;
}
.game_item{
  position: absolute;
  width: 56px;
  height: auto;
  bottom: 12px;
  right: 12px;
}
.game_girl{
  position: absolute;
  width: 128px;
  height: auto;
  bottom: 6px;
  left: 0px;
  z-index: 110;
}
.finish{
  &-back{
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: #ffffff;
    z-index: 200;
  }
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}
.flyin1-enter, .flyin1-leave-to {
  transform: translateY(-500px);
}
.flyin1-enter-active, .flyin1-leave-active {
  transition: all .5s cubic-bezier(.17,.67,.4,1.33)
}
.modal{
  &-window{
    position: fixed;
    margin-top: 0px;
    height: 148px;
    width: 100vw;
    border-radius: 10px;
    z-index: 120;
    // background-color: #ffffff;
  }
  &-back{
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: #ffffff49;
    z-index: 105;
  }
  &-text{
    position: absolute;
    width: auto;
    height: 300px;
    top: -16px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 110;
  }
  &-title{
    position: absolute;
    top: 12px;
    width: 78px;
    left: calc(50vw - 39px);
    z-index: 125;
  }
  &-continue{
    position: absolute;
    top: 70px;
    width: 128px;
    left: calc(50vw - 64px);
    z-index: 125;
  }
  &-goback{
    position: absolute;
    top: 112px;
    width: 128px;
    left: calc(50vw - 64px);
    z-index: 125;
  }
  &-restart{
    position: absolute;
    top: 156px;
    width: 128px;
    left: calc(50vw - 64px);
    z-index: 125;
  }
  &-bgm{
    position: absolute;
    top: 204px;
    width: 44px;
    left: calc(50vw - 104px);
    z-index: 125;
  }
  &-bgmbutton{
    position: absolute;
    top: 201px;
    width: 70px;
    left: calc(50vw - 68px);
    z-index: 125;
  }
  &-se{
    position: absolute;
    top: 204px;
    width: 44px;
    left: calc(50vw + 4px);
    z-index: 125;
  }
  &-sebutton{
    position: absolute;
    top: 201px;
    width: 70px;
    left: calc(50vw + 40px);
    z-index: 125;
  }
}
.finished{
  &-back{
    position: absolute;
    width: 376px;
    height: auto;
    top: 80px;
    left: calc(50vw - 188px);
  }
  &-pic1{
    position: absolute;
    width: auto;
    height: 130px;
    top: 120px;
    left: 172px;
  }
  &-pic2{
    position: absolute;
    width: auto;
    height: 130px;
    top: 120px;
    left: 75px;
    transform: scaleX(-1);
  }
}
.finishing{
  &-back{
    position: absolute;
    width: 375px;
    height: auto;
    top: 109px;
    left: calc(50vw - 187.5px);
  }
  &-pic{
    position: absolute;
    width: 290px;
    height: auto;
    top: 185px;
    left: 73px;
  }
  &-yellow1{
    position: fixed;
    width: 320px;
    height: auto;
    top: 170px;
    left: 60px;
    pointer-events: none;
    z-index: 120;
  }
  &-hand1{
    position: fixed;
    width: 100px;
    height: auto;
    top: 192px;
    left: 86px;
    z-index: 130;
  }
  &-yellow2{
    position: fixed;
    width: 320px;
    height: auto;
    top: 225px;
    left: 34px;
    pointer-events: none;
    z-index: 120;
  }
  &-yellow3{
    position: fixed;
    width: 320px;
    height: auto;
    top: 280px;
    left: 86px;
    pointer-events: none;
    z-index: 120;
  }
  &-yellow41{
    position: fixed;
    width: 70px;
    height: auto;
    top: 335px;
    left: 76px;
    pointer-events: none;
    z-index: 120;
  }
  &-yellow42{
    position: fixed;
    width: 200px;
    height: auto;
    top: 335px;
    left: 174px;
    pointer-events: none;
    z-index: 120;
  }
  &-yellow5{
    position: absolute;
    width: 84px;
    height: auto;
    top: 166px;
    left: 178px;
    pointer-events: none;
    z-index: 120;
  }
}
.finish_dialog{
  position: fixed;
  width: 248px;
  height: auto;
  bottom: 40px;
  left: 90px;
  z-index: 105;
}
</style>