import Vue from 'vue';
import Vuex from 'vuex';
import * as ActionsTypes from './actions-types';
import * as MutationTypes from './mitations-types';
import variables from '../variables';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentLanguage: '',

    gameData: null,
    gameProcess: [],
    gamesList: [],
    gamesListLoadingStatus: '',
    gamesState: {}
  },
  mutations: {
    [MutationTypes.SET_GAMES_LIST_STATE]: function (state, gamesListState) {
      state.gamesState = gamesListState;
    },
    [MutationTypes.SET_GAME_STATE]: function (state, payload) {
      if (typeof payload !== 'object') throw new Error(`${MutationTypes.SET_GAME_STATE}: payload is not Object`);
      if (!payload.id) throw new Error(`${MutationTypes.SET_GAME_STATE}: game id is not defined`);
      if (!payload.state && payload.state !== 0) throw new Error(`${MutationTypes.SET_GAME_STATE}: game state is not defined`);

      // Nothing to change
      if (state.gamesState[payload.id] === payload.state) return;

      let gamesState = state.gamesState;

      if (gamesState[payload.id] === undefined) {
        Vue.set(state.gamesState, payload.id, payload.state);
      }
      else {
        gamesState[payload.id] = payload.state;
      }

      state.gamesState = gamesState;

      localStorage.gamesState = JSON.stringify(state.gamesState);
    },
    [MutationTypes.SET_GAME_PROCESS]: function (state, payload) {
      if (!Array.isArray(payload)) throw new Error(`${MutationTypes.SET_GAME_PROCESS}: payload is not Array`);

      state.gameProcess = payload;
    },
    [MutationTypes.SET_GAME_DATA]: function (state, gameData) {
      state.gameData = gameData;
    },
    [MutationTypes.SET_GAMES_LIST_LOADING_STATUS]: function (state, newStatus) {
      switch (newStatus) {
        case 'loading':
        case 'done':
        case 'error':
          break;
        default:
          console.error(`Invalid games list loading status: ${newStatus}`);
          newStatus = 'error';
      }

      state.gamesListLoadingStatus = newStatus;
    },

    [MutationTypes.SET_GAMES_LIST]: function (state, gamesList) {
      state.gamesList = gamesList;
    }
  },
  getters: {
    gameState: state => gameId => {
      if (!state.gamesState || !gameId ) return null;
      return state.gamesState[gameId.toString()];
    },
  },
  actions: {
    [ActionsTypes.LOAD_GAME_PROCESS]: async function ({commit}, gameId) {
      commit(MutationTypes.SET_GAME_PROCESS, []);

      let process = [];
      if (localStorage.gamesProcess) {
        let processObj = JSON.parse(localStorage.gamesProcess)[gameId.toString()];
        processObj = JSON.parse(processObj || "{}");
        Object.keys(processObj).forEach(col => {
          process[parseInt(col)] = processObj[col];
        });
      }

      commit(MutationTypes.SET_GAME_PROCESS, process);
    },

    [ActionsTypes.SAVE_GAME_PROCESS]: async function ({dispatch}, payload) {
      let process = {};

      if (localStorage.gamesProcess) {
        process = JSON.parse(localStorage.gamesProcess);
      }

      process[payload.id.toString()] = JSON.stringify(Object.assign({}, payload.cells));
      localStorage.gamesProcess = JSON.stringify(process);

      // Game field was restarted
      if (!payload.cells.length) {
        await dispatch(ActionsTypes.SET_GAME_STATE, {id: payload.id, state: variables.GAME_IS_NEW});
      }
    },

    [ActionsTypes.LOAD_GAMES_STATE]: async function ({commit}) {
      if (localStorage.gamesState) {
        commit(MutationTypes.SET_GAMES_LIST_STATE, JSON.parse(localStorage.gamesState));
      }
    },

    [ActionsTypes.SET_GAME_STATE]: async function ({commit, state, dispatch}, payload) {
      if (!Object.keys(state.gamesState).length) {
        await dispatch(ActionsTypes.LOAD_GAMES_STATE);
      }

      commit(MutationTypes.SET_GAME_STATE, payload);
    },

    [ActionsTypes.LOAD_GAME_DATA]: async function ({state, commit, dispatch}, payload) {
      commit(MutationTypes.SET_GAME_DATA, null);

      if (!state.gamesList.length) {
        await dispatch(ActionsTypes.LOAD_GAMES);
      }

      let gameData = state.gamesList.find(game => game.id == payload);

      if (gameData) {
        commit(MutationTypes.SET_GAME_DATA, gameData);
      }
      else {
        console.error(`Game ${payload} not found`);
      }
    },

    [ActionsTypes.LOAD_GAMES]: async function ({state, commit}) {
      // Games list has been loaded earlier.
      if (state.gamesList.length > 0) return;

      commit(MutationTypes.SET_GAMES_LIST, []);
      commit(MutationTypes.SET_GAMES_LIST_LOADING_STATUS, 'loading');

      // TODO: Add asynchronous loading games from backend
      commit(MutationTypes.SET_GAMES_LIST, [
        {
          'id': 1,
          'name': 'Easy',
          'rows': [
            [2],
            [3],
            [2],
            [2],
            [5]
          ],
          'columns': [
            [1],
            [1, 1],
            [5],
            [5],
            [1]
          ]
        },
        {
          'id': 2,
          'name': 'I love JS!',
          'rows': [
            [20],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 2, 4, 1],
            [1, 2, 6, 1],
            [1, 2, 2, 2, 1],
            [1, 2, 3, 1],
            [1, 2, 4, 1],
            [1, 2, 3, 1],
            [1, 2, 3, 1],
            [1, 2, 2, 2, 3, 1],
            [1, 6, 6, 1],
            [1, 4, 4, 1],
            [1, 1],
            [20]
          ],
          'columns': [
            [20],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 2, 1],
            [1, 3, 1],
            [1, 2, 1],
            [1, 2, 1],
            [1, 10, 1],
            [1, 9, 1],
            [1, 1],
            [1, 3, 2, 1],
            [1, 5, 3, 1],
            [1, 2, 2, 2, 1],
            [1, 2, 2, 2, 1],
            [1, 3, 6, 1],
            [1, 2, 4, 1],
            [1, 2, 1],
            [1, 1],
            [20]
          ]
        }
      ]);
      commit(MutationTypes.SET_GAMES_LIST_LOADING_STATUS, 'done');
    }
  }
})
