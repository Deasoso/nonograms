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
    <img class="game_goback" @click="goStage" src="http://pic.deaso40.com/ljhy/4地图/返回.png" />
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
      <div v-show="showDonePopup" class="modal-back">
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
</style>