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
    <div v-for="item, index in stageList" :key="index">
      <img :style="getitemstyle(index)" @click="showmodal(index)" :src="item.src" />
    </div>
    <transition name="fade">
      <div v-show="modalshowed" @click="showmodal" class="modal-back">
      </div>
    </transition>
    <transition name="flyin1">
      <div v-show="modalshowed" class="modal-window">
        图标呢？？
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      stageList: [],
      prestage: 0,
      modalshowed: false
    }
  },
  beforeMount(){
    this.addallstage();
  },
  methods:{
    start(){
      
    },
    showmodal(index) {
      this.modalshowed = !this.modalshowed;
    },
    addallstage(){
      this.addstage({x: 36, y: 400, src: '1_立春-正在完成.png'})
      this.addstage({x: 136, y: 384, src: '2_雨水-未完成.png'})
      this.addstage({x: 236, y: 370, src: '3_惊蛰-未完成.png'})
      this.addstage({x: this.stageList[this.prestage].x + 10, 
        y: this.stageList[this.prestage].y - 24, 
        src: '地图_正在完成定位.png',
        width: 30});
    },
    addstage(data){
      this.stageList.push({
        x: data.x,
        y: data.y,
        src: 'http://pic.deaso40.com/ljhy/4地图/24关按钮/' + data.src,
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
    margin-top: 220px;
    left: 60px;
    right: 60px;
    height: 132px;
    border-radius: 10px;
    background-color: #ffffff;
  }
  &-back{
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: #ffffff49
  }
}
</style>