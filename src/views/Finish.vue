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
    <div v-if="gameData">
      <img class="finish_title" :src="gameData.finish_title" />
      <img class="finish_pic" :src="gameData.finish_pic" />
    </div>
    <img class="finish_girl" src="http://pic.deaso40.com/ljhy/关卡背景补充/人物.png" />
    <img class="finish_dialog" src="http://pic.deaso40.com/ljhy/5立春/关卡-对话6.png" />
    <img class="finish_next" @click="goStage" src="http://pic.deaso40.com/ljhy/3基础教程/2/下一步.png" />
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
      gameId: 0
    };
  },
  mounted(){
    this.showDonePopup = false;
    this.gameId = this.$route.params.id;
  },
  computed: {
    ...mapState(['gameData']),
  },
  methods: {
    goStage(){
      this.$router.push('/stages');
    },
    starStyle(index){
      var styledata = {
        position: 'absolute',
        width: '54px',
        height: 'auto',
      };
      var x, y;
      if(this.successStar == 3){
        if(index == 0){ styledata.left = '90px'; styledata.top = '44px'; }
        else if(index == 1){ styledata.left= 'calc(50vw - 25px)'; styledata.top = '32px'; }
        else { styledata.right = '90px'; styledata.top = '44px'; }
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
.finish_board{
  position: absolute;
  width: 310px;
  height: auto;
  top: 96px;
  left: calc(50vw - 155px);
}
.finish_title{
  position: absolute;
  width: 100px;
  height: auto;
  top: 144px;
  left: calc(50vw - 50px);
}
.finish_pic{
  position: absolute;
  width: auto;
  height: 160px;
  top: 184px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.finish_girl{
  position: absolute;
  width: 116px;
  height: auto;
  bottom: 56px;
  left: 20px;
}
.finish_dialog{
  position: absolute;
  width: 206px;
  height: auto;
  bottom: 104px;
  right: 30px;
}
.finish_next{
  position: absolute;
  width: 184px;
  height: auto;
  top: 496px;
  left: calc(50vw - 92px);
}
</style>