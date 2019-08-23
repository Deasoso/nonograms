export default Object.freeze({
  CELL_EMPTY:     0,
  CELL_FILLED:    1,
  CELL_CANCELLED: 2,
  CELL_NOTICED:   3,

  GAME_IS_NEW: 0,
  GAME_IN_PROCESS: 1,
  GAME_IS_FINISHED: 2,

  GAME_STATES: {
    0: {'class': 'new', 'label': 'You have not played it yet'},
    1: {'class': 'inProcess', 'label': 'In Process'},
    2: {'class': 'finished', 'label': 'Finished!'},
  }
});