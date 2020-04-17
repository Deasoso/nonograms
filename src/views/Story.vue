<template>
  <div class="all">
    <transition name="fade">
      <div class="picpos" v-show="pic1" @click="nextpic(false)"><img class="fullpic" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事1-背景.png" /></div>
    </transition>
    <transition name="fade">
      <div class="textpos" v-show="text1"><img class="fulltext" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事1-文字.png" /></div>
    </transition>
    <transition name="fade">
      <div class="picpos" v-show="pic2" @click="nextpic(false)"><img class="fullpic" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事2-背景.png" /></div>
    </transition>
    <transition name="fade">
      <div class="textpos" v-show="text2"><img class="fulltext" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事2-文字.png" /></div>
    </transition>
    <transition name="fade">
      <div class="picpos" v-show="pic3" @click="nextpic(false)"><img class="fullpic" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事3 4-背景.png" /></div>
    </transition>
    <transition name="fade">
      <div class="textpos" v-show="text3"><img class="fulltext" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事3-文字.png" /></div>
    </transition>
    <transition name="fade">
      <div class="textpos" v-show="text4"><img class="fulltext" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事4-文字.png" /></div>
    </transition>
    <transition name="fade">
      <div class="picpos" v-show="pic5" @click="nextpic(false)"><img class="fullpic" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事5-背景.png" /></div>
    </transition>
    <transition name="fade">
      <div class="textpos" v-show="text5"><img class="fulltext" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事5-文字.png" /></div>
    </transition>
    <transition name="fade">
      <div class="picpos" v-show="pic6" @click="nextpic(false)"><img class="fullpic" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事6-背景.png" /></div>
    </transition>
    <transition name="fade">
      <div class="textpos" v-show="text6"><img class="fulltext" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事6-文字.png" /></div>
    </transition>
    <transition name="fade">
      <div class="picpos" v-show="pic7" @click="nextpic(false)"><img class="fullpic" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事7-背景.png" /></div>
    </transition>
    <transition name="fade">
      <div class="textpos" v-show="text7"><img class="fulltext" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事7-文字.png" /></div>
    </transition>
    <transition name="fade">
      <div class="picpos" v-show="pic8" @click="nextpic(false)"><img class="fullpic" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事8-背景.png" /></div>
    </transition>
    <transition name="fade">
      <div class="textpos" v-show="text8"><img class="fulltext" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事8-文字.png" /></div>
    </transition>
    <transition name="fade">
      <div class="picpos" v-show="pic9" @click="nextpic(false)"><img class="fullpic" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事9-背景.png" /></div>
    </transition>
    <transition name="fade">
      <div class="textpos" v-show="text9"><img class="fulltext" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事9-文字.png" /></div>
    </transition>
    <transition name="fade">
      <div class="picpos" v-show="pic10" @click="nextpic(false)"><img class="fullpic" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事10-背景.png" /></div>
    </transition>
    <transition name="fade">
      <div class="textpos" v-show="text10"><img class="fulltext" src="http://pic.deaso40.com/ljhy/1入门故事/入门小故事10-文字.png" /></div>
    </transition>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      step: 0,
      canclick: false,
      pic1: false,
      text1: false,
      pic2: false,
      text2: false,
      pic3: false,
      text3: false,
      pic4: false,
      text4: false,
      pic5: false,
      text5: false,
      pic6: false,
      text6: false,
      pic7: false,
      text7: false,
      pic8: false,
      text8: false,
      pic9: false,
      text9: false,
      pic10: false,
      text10: false,
    }
  },
  mounted(){
    localStorage.clear();
    this.nextpic(true);
  },
  methods:{
    nextpic(force){
      const _this = this;
      if(!force && !this.canclick) return;
      if(this.step == 0){
        this.step += 1;
        this.pic1 = true;
        this.canclick = false;
        setTimeout(function(){
          _this.nextpic(true)
        },1000);
        return;
      }
      if(this.step == 1){
        this.step += 1;
        this.text1 = true;
        this.canclick = true;
        return;
      }
      if(this.step == 2){
        this.step += 1;
        this.pic2 = true;
        this.canclick = false;
        setTimeout(function(){
          _this.nextpic(true)
        },1000);
        return;
      }
      if(this.step == 3){
        this.step += 1;
        this.text2 = true;
        this.canclick = true;
        return;
      }
      if(this.step == 4){
        this.step += 1;
        this.pic3 = true;
        this.canclick = false;
        setTimeout(function(){
          _this.nextpic(true)
        },1000);
        return;
      }
      if(this.step == 5){
        this.step += 1;
        this.text3 = true;
        this.canclick = true;
        return;
      }
      if(this.step == 6){
        this.step += 1;
        this.text3 = false;
        this.canclick = false;
        setTimeout(function(){
          _this.nextpic(true)
        },1000);
        return;
      }
      if(this.step == 7){
        this.step += 1;
        this.text4 = true;
        this.canclick = true;
        return;
      }
      if(this.step == 8){
        this.step += 1;
        this.pic5 = true;
        this.canclick = false;
        setTimeout(function(){
          _this.nextpic(true)
        },1000);
        return;
      }
      if(this.step == 9){
        this.step += 1;
        this.text5 = true;
        this.canclick = true;
        return;
      }
      if(this.step == 10){
        this.step += 1;
        this.pic6 = true;
        this.canclick = false;
        setTimeout(function(){
          _this.nextpic(true)
        },1000);
        return;
      }
      if(this.step == 11){
        this.step += 1;
        this.text6 = true;
        this.canclick = true;
        return;
      }
      if(this.step == 12){
        this.step += 1;
        this.pic7 = true;
        this.canclick = false;
        setTimeout(function(){
          _this.nextpic(true)
        },1000);
        return;
      }
      if(this.step == 13){
        this.step += 1;
        this.text7 = true;
        this.canclick = true;
        return;
      }
      if(this.step == 14){
        this.step += 1;
        this.pic8 = true;
        this.canclick = false;
        setTimeout(function(){
          _this.nextpic(true)
        },1000);
        return;
      }
      if(this.step == 15){
        this.step += 1;
        this.text8 = true;
        this.canclick = true;
        return;
      }
      if(this.step == 16){
        this.step += 1;
        this.pic9 = true;
        this.canclick = false;
        setTimeout(function(){
          _this.nextpic(true)
        },1000);
        return;
      }
      if(this.step == 17){
        this.step += 1;
        this.text9 = true;
        this.canclick = true;
        return;
      }
      if(this.step == 18){
        this.step += 1;
        this.pic10 = true;
        this.canclick = false;
        setTimeout(function(){
          _this.nextpic(true)
        },1000);
        return;
      }
      if(this.step == 19){
        this.step += 1;
        this.text10 = true;
        this.canclick = true;
        return;
      }
      if(this.step == 20){
        this.step += 1;
        this.text10 = false;
        this.canclick = false;
        setTimeout(function(){
          _this.nextpic(true)
        },1000);
        return;
      }
      if(this.step == 21){
        this.$router.push('/title');
        return;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.all{
  position: relative;
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fullpic{
  width: 100vw;
  height: 100vh;
}
.picpos{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // z-index: -100;
}
.fulltext{
  width: 100vw;
  height: auto;
}
.textpos{
  position: absolute;
  left: 0;
  right: 0;
  top: 40vh;
  // z-index: -50;
}
</style>