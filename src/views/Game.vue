<template>
  <div id="game" :class="{'hasKeyboard': gameMode === variables.GAME_MODE_KEYBOARD}">
    <img class="game_background" src="http://pic.deaso40.com/ljhy/关卡背景补充/背景.png" />
    <!-- <div class="done" v-if="showDonePopup">
      <p>{{ $t('game.game_is_finished') }}</p>
      <div class="buttons">
        <button @click="showDonePopup = false">{{ $t('game.continue_game') }}</button>
        <router-link :to="{name: 'home', params: {lang: this.$i18n.locale}}"><button>{{ $t('game.go_to_games_list') }}</button></router-link>
      </div>
    </div>
    <div
      class="doneBackground"
      v-if="showDonePopup"
      @click="showDonePopup = false"
    ></div> -->

    <div v-if="loadingError" class="errorMessage">{{ $t('game.loading_error') }}</div>

    <Loader v-if="!gameData && !loadingError" />

    <div class="gameField">
      <GameField
        v-if="gameData"
        ref="gameField"
        :gameData="gameData"
        :gameProcess="gameProcess"
        :controlledByKeyboard="gameMode === variables.GAME_MODE_KEYBOARD"
      />
    </div>
    <img class="game_goback" @click="backShowed=!backShowed" src="http://pic.deaso40.com/ljhy/4地图/返回.png" />
    <div v-if="gameData">
      <img class="game_title" :src="gameData.game_title" />
      <img class="game_cells" :src="gameData.game_cells" />
    </div>
    <img class="game_time" src="http://pic.deaso40.com/ljhy/5立春/关卡-时间.png" />
    <img class="game_girl" src="http://pic.deaso40.com/ljhy/关卡背景补充/人物.png" />
    <img class="game_item" src="http://pic.deaso40.com/ljhy/5立春/关卡-锦囊.png" />
    <div class="game_timetext">
      {{timetext}}
    </div>
    <transition name="fade">
      <div v-show="showDonePopup" class="finish-back">
      </div>
    </transition>
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
import GameField from '@/components/GameField';
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
      variables: variables
    };
  },
  computed: {
    ...mapState(['gameData', 'gamesState', 'setFinishTime']),
    gameState: function () {
      return this.$store.getters.gameState(this.gameId);
    }
  },
  watch: {
    gameState: function (newVal, oldVal) {
      if (oldVal && newVal !== oldVal && newVal === variables.GAME_IS_FINISHED) {
        const _this = this;
        setTimeout(function(){
          _this.goFinish()
        },1000);
        this.showDonePopup = true;
      }
    },
    gameMode: function () {
      this.$refs.gameField.adjustFieldToScreen();
    }
  },
  methods: {
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
      this.$router.push('/finish/' + this.gameId);
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
    await this.loadGame(this.$route.params.id);
    if(!this.gamestate || this.gameState == 0)
    this.$store.dispatch(ActionsTypes.SET_GAME_STATE, {
      id: this.$route.params.id,
      state: variables.GAME_IN_PROCESS
    });
    this.timer = setInterval(this.startTimer, 1000);
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
  width: 112px;
  height: auto;
  bottom: 0px;
  left: 0px;
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
  transition: opacity 1s ease
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
</style>