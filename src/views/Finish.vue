<template>
  <div class="loader">
    <img class="finish_background" src="http://pic.deaso40.com/ljhy/3基础教程/2/背景-图案完成.png" />
    <transition name="fade">
      <div v-show="showDonePopup" class="modal-back">
      </div>
    </transition>
    <div v-for="item, index in starList.slice(0, successStar)" :key="index">
      <img :style="starStyle(index)" src="http://pic.deaso40.com/ljhy/3基础教程/2/星星-大.png" />
    </div>
    <img class="finish_board" src="http://pic.deaso40.com/ljhy/5立春/关卡-布底.png" />
    <img class="star" src="http://pic.deaso40.com/ljhy/4地图/星星.png" />
    <div class="star-num">{{stars}}</div>
    <div v-if="gameData">
      <img class="finish_title" :src="gameData.finish_title" />
      <img class="finish_pic" :src="gameData.finish_pic" />
    </div>
    <div class="finish_timetext">
      {{timetext}}
    </div>
    <img class="finish_girl" src="http://pic.deaso40.com/ljhy/关卡背景补充/人物.png" />
    <transition name="quickfade">
      <img v-show="dialogShowed" class="finish_dialog" :src="dialogSrc()" />
    </transition>
    <img class="finish_next" @click="goStage" src="http://pic.deaso40.com/ljhy/3基础教程/2/下一步.png" />
    <img class="finish_collect" @click="collect()" :src="collectedSrc()" />
  </div>
</template>
<script>
import {mapState} from 'vuex';

export default {
  data: function () {
    return {
      showDonePopup: true,
      successStar: 3,
      starList: [0,0,0],
      gameId: 0,
      collected: false,
      timetext: "00:00",
      stars: 0,
      dialogMode: 0,
      dialogShowed: true
    };
  },
  mounted(){
    this.showDonePopup = false;
    this.gameId = this.$route.params.id;
    this.timetext = this.$store.state.finishTime;
    this.stars = this.$store.state.gameStars;
    this.dialogShowed = true;
    this.dialogMode = 0;
  },
  computed: {
    ...mapState(['gameData']),
  },
  methods: {
    dialogSrc(){
      if(this.dialogMode == 0){
        return "http://pic.deaso40.com/ljhy/5立春/关卡-对话6.png";
      }else{
        return "http://pic.deaso40.com/ljhy/5立春/关卡-对话7.png"
      }
    },
    collect(){
      if(!this.dialogShowed) return;
      const _this = this;
      this.collected =! this.collected;
      this.dialogShowed = false;
      setTimeout(function(){
        if(_this.dialogMode == 1){
          _this.dialogMode = 0;
        }else{
          _this.dialogMode = 1;
        }
        _this.dialogShowed = true;
      },500);
    },
    collectedSrc(){
      if(this.collected){
        return "http://pic.deaso40.com/ljhy/5立春/关卡-收藏成功.png";
      }else{
        return "http://pic.deaso40.com/ljhy/5立春/关卡-收藏.png";
      }
    },
    goStage(){
      this.$router.push('/stages');
    },
    starStyle(index){
      var styledata = {
        position: 'absolute',
        width: '60px',
        height: 'auto',
      };
      var x, y;
      if(this.successStar == 3){
        if(index == 0){ styledata.left = 'calc(50vw - 80px)'; styledata.top = '64px'; }
        else if(index == 1){ styledata.left= 'calc(50vw - 30px)'; styledata.top = '52px'; }
        else { styledata.right = 'calc(50vw - 80px)'; styledata.top = '64px'; }
      }
      return styledata;
    }
  }
}
</script>
<style lang="scss" scoped>
.finish_background{
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -100;
}
.modal{
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
  transition: opacity 1s ease
}
.quickfade-enter, .quickfade-leave-to {
  opacity: 0
}
.quickfade-enter-active, .quickfade-leave-active {
  transition: opacity 0.5s ease
}
.finish_board{
  position: absolute;
  width: 360px;
  height: auto;
  top: 106px;
  left: calc(50vw - 180px);
}
.finish_title{
  position: absolute;
  width: 120px;
  height: auto;
  top: 160px;
  left: calc(50vw - 60px);
}
.finish_pic{
  position: absolute;
  width: auto;
  height: 172px;
  top: 206px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.finish_timetext{
  position: absolute;
  width: 44px;
  height: auto;
  left: 274px;
  top: 406px;
  font-size: 14px;
  color: #ffffff;
  text-align:right;
}
.finish_girl{
  position: absolute;
  width: 136px;
  height: auto;
  bottom: 56px;
  left: 20px;
  z-index: 110;
}
.finish_dialog{
  position: absolute;
  width: 240px;
  height: auto;
  bottom: 108px;
  left: 94px;
  z-index: 105;
}
.finish_next{
  position: absolute;
  width: 220px;
  height: auto;
  bottom: 38px;
  left: calc(50vw - 110px);
}
.finish_collect{
  position: absolute;
  width: 56px;
  height: auto;
  bottom: 36px;
  right: 12px;
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
    right: 28px;
  }
}
</style>