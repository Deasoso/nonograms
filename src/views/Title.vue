<template>
  <div class="loader">
    <img class="titleback" src="http://pic.deaso40.com/ljhy/2首页/首页-背景.png" />
    <transition name="flyin1">
      <img v-show="flyin1" class="titletext-text1" src="http://pic.deaso40.com/ljhy/2首页/首页-逻.png" />
    </transition>
    <transition name="flyin2">
      <img v-show="flyin1" class="titletext-text2" src="http://pic.deaso40.com/ljhy/2首页/首页-辑.png" />
    </transition>
    <transition name="flyin3">
      <img v-show="flyin1" class="titletext-text3" src="http://pic.deaso40.com/ljhy/2首页/首页-花.png" />
    </transition>
    <transition name="flyin4">
      <img v-show="flyin1" class="titletext-text4" src="http://pic.deaso40.com/ljhy/2首页/首页-瑶.png" />
    </transition>
    <transition name="fade">
      <img v-show="flyin1" @click="start" class="titlebtn1" src="http://pic.deaso40.com/ljhy/2首页/首页-开始游戏.png" />
    </transition>
    <transition name="fade">
      <img v-show="flyin1" @click="start2" class="titlebtn2" src="http://pic.deaso40.com/ljhy/2首页/首页-谜题设计.png" />
    </transition>
    <transition name="fade">
      <img v-show="flyin1" class="option" src="http://pic.deaso40.com/ljhy/2首页/首页-设置.png" />
    </transition>
    <transition name="fade">
      <img v-show="flyin1" class="mine" src="http://pic.deaso40.com/ljhy/2首页/首页-我的作品.png" />
    </transition>
    <transition name="fade">
      <img v-show="flyin1" class="shop" src="http://pic.deaso40.com/ljhy/2首页/首页-周边商城.png" />
    </transition>
    <transition name="burstin1">
      <img v-show="flyin1" class="cha-cha1" src="http://pic.deaso40.com/ljhy/2首页/首页-装饰.png" />
    </transition>
    <transition name="burstin2">
      <img v-show="flyin1" class="cha-cha2" src="http://pic.deaso40.com/ljhy/2首页/首页-装饰.png" />
    </transition>
    <transition name="burstin3">
      <img v-show="flyin1" class="cha-cha3" src="http://pic.deaso40.com/ljhy/2首页/首页-装饰.png" />
    </transition>
    <transition name="burstin4">
      <img v-show="flyin1" class="cha-cha4" src="http://pic.deaso40.com/ljhy/2首页/首页-装饰.png" />
    </transition>
    <transition name="burstin5">
      <img v-show="flyin1" class="cha-cha5" src="http://pic.deaso40.com/ljhy/2首页/首页-装饰.png" />
    </transition>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  data: function () {
    return {
      flyin1: false
    }
  },
  computed: {
    ...mapState(['gamesState'])
  },
  mounted(){
    this.flyin1 = true;
    // localStorage.removeItem('gamesState')
    // localStorage.removeItem('gamesProcess')
  },
  methods:{
    start(){
      console.log(this.gamesState);
      // if(this.gamesState[0] == 1 || this.gamesState[0] == 2){
        this.$router.push('/teachgame1');
      // }else{
        // this.$router.push('/stages');
      // }
    },
    start2(){
      this.$router.push('/teachgame2');
    }
  }
}
</script>
<style lang="scss" scoped>
.titleback{
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -100;
}
.flyin1-enter, .flyin1-leave-to {
  transform: translateY(-236px);
}
.flyin1-enter-active, .flyin1-leave-active {
  transition: all .5s ease
}
.flyin2-enter, .flyin2-leave-to {
  transform: translateY(-236px);
}
.flyin2-enter-active, .flyin2-leave-active {
  transition: all .5s ease .5s
}
.flyin3-enter, .flyin3-leave-to {
  transform: translateY(-236px);
}
.flyin3-enter-active, .flyin3-leave-active {
  transition: all .5s ease .9s
}
.flyin4-enter, .flyin4-leave-to {
  transform: translateY(-236px);
}
.flyin4-enter-active, .flyin4-leave-active {
  transition: all .5s ease 1.2s
}
.burstin1-enter, .burstin1-leave-to {
  transform: scale(0,0);
}
.burstin1-enter-active, .burstin1-leave-active {
  transition: all .5s cubic-bezier(0,1.06,.36,1.98) 1.6s
}
.burstin2-enter, .burstin2-leave-to {
  transform: scale(0,0);
}
.burstin2-enter-active, .burstin2-leave-active {
  transition: all .5s cubic-bezier(0,1.06,.36,1.98) 2.0s
}
.burstin3-enter, .burstin3-leave-to {
  transform: scale(0,0);
}
.burstin3-enter-active, .burstin3-leave-active {
  transition: all .5s cubic-bezier(0,1.06,.36,1.98) 2.4s
}
.burstin4-enter, .burstin4-leave-to {
  transform: scale(0,0);
}
.burstin4-enter-active, .burstin4-leave-active {
  transition: all .5s cubic-bezier(0,1.06,.36,1.98) 2.6s
}
.burstin5-enter, .burstin5-leave-to {
  transform: scale(0,0);
}
.burstin5-enter-active, .burstin5-leave-active {
  transition: all .5s cubic-bezier(0,1.06,.36,1.98) 3.0s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease 3.4s
}
.titletext{
  &-text1{
    position: absolute;
    width: auto;
    height: 100px;
    top: 136px;
    left: 10px;
  }
  &-text2{
    position: absolute;
    width: auto;
    height: 100px;
    top: 120px;
    left: 95px;
  }
  &-text3{
    position: absolute;
    width: auto;
    height: 100px;
    top: 120px;
    right: 95px;
  }
  &-text4{
    position: absolute;
    width: auto;
    height: 100px;
    top: 136px;
    right: 10px;
  }
}
.titlebtn1{
  position: absolute;
  width: 200px;
  height: auto;
  top: 346px;
  left: calc(50vw - 100px);
}
.titlebtn2{
  position: absolute;
  width: 200px;
  height: auto;
  top: 418px;
  left: calc(50vw - 100px);
}
.option{
  position: absolute;
  width: 50px;
  height: auto;
  top: 16px;
  right: 16px;
}
.mine{
  position: absolute;
  width: 70px;
  height: auto;
  bottom: 6px;
  left: 16px;
}
.shop{
  position: absolute;
  width: 70px;
  height: auto;
  bottom: 6px;
  right: 16px;
}
.cha{
  &-cha1{
    position: absolute;
    width: 26px;
    height: auto;
    top: 162px;
    left: 20px;
  }
  &-cha2{
    position: absolute;
    width: 26px;
    height: auto;
    top: 136px;
    left: 144px;
  }
  &-cha3{
    position: absolute;
    width: 26px;
    height: auto;
    top: 134px;
    right: 144px;
  }
  &-cha4{
    position: absolute;
    width: 26px;
    height: auto;
    top: 134px;
    right: 118px;
  }
  &-cha5{
    position: absolute;
    width: 26px;
    height: auto;
    top: 156px;
    right: 20px;
  }
}
</style>