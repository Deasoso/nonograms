<template>
  <div id="gameFieldWrapper" ref="fieldLayout" :style="cssVariables">
    <div id="field" ref="gameField">
      <!-- <div class="hNumbers">
        <div
          v-for="column in fieldWidth"
          :key="column"
          :class="{'delimiter': !(column % 5 ||  column === fieldWidth), 'hovered': column === activeColumn}"
        >
          <img :style="widthPicStyle(column)" src="http://pic.deaso40.com/ljhy/5立春/竖格子未完成 空.png" />
          <span
            v-for="(val, index) in gameData['columns'][column-1]"
            :key="'cel-' + column + '-' + index"
            :class="{'filled': colFilledChunks[column - 1] && colFilledChunks[column - 1][index]}"
          >
            {{ val }}
          </span>
        </div>
      </div>

      <div class="wNumbers">
        <div
          v-for="row in fieldHeight"
          :key="row"
          :class="{'delimiter': !(row % 5 ||  row === fieldHeight), 'hovered': row === activeRow}"
        >
          <img :style="heightPicStyle(row)" src="http://pic.deaso40.com/ljhy/5立春/横格子未完成 空.png" />
          <span
            v-for="(val, index) in gameData['rows'][row-1]"
            :key="'row-'+row+'-'+index"
            :class="{'filled': rowFilledChunks[row - 1] && rowFilledChunks[row - 1][index]}"
          >
            {{ val }}
          </span>
        </div>
      </div> -->
      
      <div class="game" @mouseleave="isMouseDragging = false" @mouseup="isMouseDragging = false">
        <template v-for="y in fieldHeight">
          <div
            :key="y"
            :class="{'hovered': (y === activeRow)}"
          >
            <template v-for="x in fieldWidth">
              <span
                :class="cellsClasses[x + '-' + y]"
                :key="x"
                @mousedown.prevent="onCellClick(x, y)"
                class="cell"
              ></span>
            </template>
          </div>
        </template>
      </div>
      <!-- 以上一段opacity为0，仅仅用于计算点击 -->
      <img :style="backStyle()" :src="gameData.game_back" />
      <img class="game_smallback" src="http://pic.deaso40.com/ljhy/关卡背景补充/预览窗口.png" />
      <div class="selectedcell">
        <div v-for="y in fieldHeight">
          <div v-for="x in fieldWidth">
            <transition name="fade">
              <img v-show="selectedShow(x, y)" :style='selectedSmallStyle(x, y)' src="http://pic.deaso40.com/ljhy/5立春/关卡-针线5x5.png">
            </transition>
            <transition name="fade">
              <img v-show="selectedShow(x, y)" :style='selectedStyle(x, y)' src="http://pic.deaso40.com/ljhy/5立春/关卡-针线5x5.png">
            </transition>
          </div>
        </div>
      </div>
      <div v-for="column in fieldWidth">
        <img :style="widthPicStyle(column)" :src="getWidthPic(column)" />
        <div v-for="(val, index) in gameData['columns'][column-1]" :style="widthTextStyle(column, index)">
          {{val}}
        </div>
      </div>
      <div v-for="row in fieldHeight">
        <img :style="heightPicStyle(row)" :src="getHeightPic(row)" />
        <div v-for="(val, index) in gameData['rows'][row-1]" :style="heightTextStyle(row, index)">
          {{val}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * The component uses compiled styles for `.game .cell` elements to avoid problems with performance. There are
 * WIDTH x HEIGHT cells and each must be updated in case of use code like `:class="h === activeColumn ? 'hovered': ''"`
 * (it leads to at least 900 calls for 30x30 field size).
 *
 * To fix this issue was added variable `cellsClasses` that contains list of classes names for each cell. The key
 * of this list is `%column_number%-%row_number%`.
 */
import variables from '@/variables';
import * as ActionsTypes from '../store/actions-types';

export default {
  props: {
    gameData: {
      type: Object,
      required: true,
      default: function () { return {'id': -1, 'rows': [], 'columns': []} }
    },
    gameProcess: {
      type: Array,
      default: function () { return []; }
    },
    controlledByKeyboard: {
      type: Boolean,
      default: function () { return false; }
    }
  },

  data: function () {
    return {
      isMouseDragging: false,
      filledCells: [],
      activeRow: null,
      activeColumn: null,
      rowFilledChunks: [],
      colFilledChunks: [],
      cellSize: 40,
      cellsClasses: [],
      variables
    };
  },

  watch: {
    gameData: {
      immediate: true,
      /**
       * Resets game fields' CSS classes on load a new game.
       */
      handler () {
        this.clean();
      }
    },

    gameProcess: function (val) {
      this.filledCells = val;

      // Update CSS classes for filled cells
      for (let x = 1; x <= this.fieldWidth; ++x) {
        for (let y = 1; y <= this.fieldHeight; ++y) {
          let cellState = this.gameProcess[x] ? this.gameProcess[x][y] : null;
          if (cellState) {
            this.updateCellStyle(x, y, cellState);
          }
        }
      }

      for (let i = 1; i <= this.fieldHeight; ++i) {
        this.updateFilledState(1, i, false);
      }

      for (let i = 1; i <= this.fieldWidth; ++i) {
        this.updateFilledState(i, 1, false);
      }
    },

    controlledByKeyboard: function (val) {
      if ( val && !this.activeColumn && !this.activeRow) {
        this.onCellHover(1, 1);
      }

      if (!val) {
        this.cellsClasses[`${this.activeColumn}-${this.activeRow}`]
          = this.cellsClasses[`${this.activeColumn}-${this.activeRow}`].filter(className => className !== 'active');
      }
      else {
        this.cellsClasses[`${this.activeColumn}-${this.activeRow}`].push('active');
      }
    }
  },

  computed: {
    fieldHeight: function () {
      return this.gameData['rows'].length;
    },
    fieldWidth: function () {
      return this.gameData['columns'].length;
    },
    isFinished: function () {
      return this.rowFilledChunks.every(row => row.every(chunk => chunk === true))
        && this.colFilledChunks.every(column => column.every(chunk => chunk === true));
    },
    /** Responsive design through CSS variables */
    cssVariables: function () {
      return {
        '--cell-height': `${this.cellSize}px`,
        '--cell-width': `${this.cellSize}px`,
        '--cell-font-size': `${Math.floor(this.cellSize * .6)}px`
      };
    }
  },

  mounted() {
    this.adjustFieldToScreen();
    this.$nextTick(() => {
      window.addEventListener('resize', this.nextAdjustFieldToScreen);
    });
  },

  destroyed() {
    window.removeEventListener('resize', this.nextAdjustFieldToScreen);
  },

  methods: {
    getWidthPic(x){
      if(this.colFilledChunks[x - 1] && this.colFilledChunks[x - 1].every(chunk => chunk === true)){
        return "http://pic.deaso40.com/ljhy/横格竖格合集/竖格子（已完成）-5x5.png"
      }else{
        return "http://pic.deaso40.com/ljhy/横格竖格合集/竖格子（未完成）-5x5.png"
      }
    },
    getHeightPic(y){
      if(this.rowFilledChunks[y - 1] && this.rowFilledChunks[y - 1].every(row => row === true)){
        return "http://pic.deaso40.com/ljhy/横格竖格合集/横格子（已完成）-5x5.png"
      }else{
        return "http://pic.deaso40.com/ljhy/横格竖格合集/横格子（未完成）-5x5.png"
      }
    },
    selectedStyle(x, y){
      const bigbili = 1.35;
      return {
        position: 'absolute',
        width: (this.cellSize * bigbili) + 'px',
        height: (this.cellSize * bigbili) + 'px',
        left: (this.cellSize * (x - (bigbili / 2) - 0.5)) + 'px',
        top: (this.cellSize * (y - (bigbili / 2) - 0.5)) + 'px'
      }
    },
    selectedSmallStyle(x, y){
      const smallWidth = 56 / this.fieldWidth;
      const smallHeight = 56 / this.fieldHeight;
      return {
        position: 'absolute',
        width: (smallWidth * 1.4) + 'px',
        height: (smallHeight * 1.4) + 'px',
        left: (smallWidth * (x - 1.2)) - 64 + 'px',
        top: (smallHeight * (y - 1.2)) - 65 + 'px'
      }
    },
    selectedShow(x, y){
      return this.cellState(x, y) === variables.CELL_FILLED;
    },
    widthPicStyle(x){
      return {
        position: 'fixed',
        left: (88 + ((x - 1) * this.cellSize)) + 'px',
        top: '106px',
        width: (this.cellSize - 2) + 'px',
        height: '70px',
      }
    },
    heightPicStyle(y){ 
      return{
        position: 'fixed',
        left: '15px',
        top: (179 + ((y - 1) * this.cellSize)) + 'px',
        width: '70px',
        height: (this.cellSize - 2) + 'px',
      }
    },
    widthTextStyle(x ,y){
      const color = (this.colFilledChunks[x - 1] && this.colFilledChunks[x - 1][y]) ? '#8C9ECE' : '#ffffff';
      return {
        position: 'fixed',
        left: (88 + ((x - 1) * this.cellSize)) + 'px',
        top: (98 + ((5 - this.gameData['columns'][x-1].length + y) * 15)) + 'px',
        height: '15px',
        width: (this.cellSize - 2) + 'px',
        'text-align': 'center',
        'font-size': '12px',
        'color': color,
      }
    },
    heightTextStyle(y, x){
      const color = (this.rowFilledChunks[y - 1] && this.rowFilledChunks[y - 1][x]) ? '#8C9ECE' : '#ffffff';
      return{
        position: 'fixed',
        left: (8 + ((5 - this.gameData['rows'][y-1].length + x) * 15)) + 'px',
        top: (172 + ((y - 0.5) * this.cellSize)) + 'px',
        width: '15px',
        height: '16px',
        'vertical-align': 'middle',
        'font-size': '12px',
        color: color,
      }
    },
    backStyle(){
      return{
        position: 'absolute',
        width: ((this.cellSize * this.fieldWidth) + 4) + 'px',
        height: 'auto',
        top: '176px',
        left: '85px',
        'z-index': '50'
      }
    },
    /**
     * Cleans game's field.
     * Removes all cell's states, filled chunks and adds delimiters.
     */
    clean() {
      this.cellsClasses = [];
      this.filledCells = [];
      this.rowFilledChunks = [];
      this.colFilledChunks = [];

      for (let y = 1; y <= this.fieldHeight; ++y) {
        for (let x = 1; x <= this.fieldWidth; ++x) {
          this.cellsClasses[`${x}-${y}`] = [];

          // Add delimiter for each 5 cell
          if (!(x % 5 ||  x === this.fieldWidth)) {
            this.cellsClasses[`${x}-${y}`].push('delimiter');
          }

          if (x === this.activeColumn) {
            this.cellsClasses[`${x}-${y}`].push('hovered');
          }
        }
      }
    },

    /**
     * Adjusts the game fields' size depending on the screen size.
     */
    nextAdjustFieldToScreen() {
      this.$nextTick(() => {
        this.adjustFieldToScreen;
      })
    },
    adjustFieldToScreen() {
      // We must wait until keyboard will be added to or removed from layout.
      // this.$nextTick(() => {
        let
          layoutWidth = this.$refs.fieldLayout.clientWidth,
          layoutHeight = this.$refs.fieldLayout.clientHeight;

        let
          gameVisibleHeight = document.getElementById('app').clientHeight,
          gameFullHeight = document.getElementById('app').scrollHeight;

        // Global layout has vertical scroll
        if (gameFullHeight > gameVisibleHeight) {
          layoutHeight -= gameFullHeight - gameVisibleHeight;
        }

        let
          gameVisibleWidth = document.getElementById('app').clientWidth,
          gameFullWidth = document.getElementById('app').scrollWidth;

        // Global layout has horizontal scroll
        if (gameFullWidth > gameVisibleWidth) {
          layoutWidth -= gameFullWidth - gameVisibleWidth;
        }

        const
          gameFieldWidth = this.$refs.gameField.scrollWidth,
          gameFieldHeight = this.$refs.gameField.scrollHeight,

          widthRatio = layoutWidth / gameFieldWidth,
          heightRatio = layoutHeight / gameFieldHeight,

          ratio = Math.min(widthRatio, heightRatio);
        if(gameFullWidth < 400) this.cellSize = Math.floor((gameFullWidth - 100) / this.fieldWidth);
        else this.cellSize = Math.floor(240 / this.fieldWidth);
        // this.cellSize = Math.floor(this.cellSize * ratio);
      // });
    },

    /**
     * Handles click on a game field's cell.
     * @param {number} x
     * @param {number} y
     */
    onCellClick(x, y) {
      this.toggleCellState(x, y);
      this.isMouseDragging = true
    },

    /**
     * Handles mouse hover on a game field's cell.
     * @param {number} x
     * @param {number} y
     */
    onCellHover(x, y) {
      let
        previousHoveredRow = this.activeRow,
        previousHoveredColumn = this.activeColumn;

      this.activeColumn = x;
      this.activeRow = y;

      if (this.isMouseDragging && this.cellState(x, y) === variables.CELL_EMPTY) {
        this.toggleCellState(x, y);
      }

      // Change active column CSS classes
      if (previousHoveredColumn !== this.activeColumn) {
        for (let row = 1; row <= this.fieldHeight; ++row) {
          if (previousHoveredColumn) {
            // Remove previous hovered classes
            this.cellsClasses[`${previousHoveredColumn}-${row}`]
              = this.cellsClasses[`${previousHoveredColumn}-${row}`].filter(className => className !== 'hovered');
          }

          // Add hovered classes for current column
          this.cellsClasses[`${this.activeColumn}-${row}`].push('hovered');
        }
      }

      if (this.controlledByKeyboard) {
        this.cellsClasses[`${previousHoveredColumn}-${previousHoveredRow}`]
          = (this.cellsClasses[`${previousHoveredColumn}-${previousHoveredRow}`] || []).filter(className => className !== 'active');
        this.cellsClasses[`${this.activeColumn}-${this.activeRow}`].push('active');
      }
    },

    /**
     * Returns list of filled subsequences (that has `variables.CELL_FILLED` value) length.
     *
     * Example:
     * [0, 1, 0, 1, 1, 1] => [1, 3]
     *
     * @param {[number]} line
     * @return {[number]}
     */
    getFilledSubsequences(line) {
      let
        checkedLine = [...line],
        subsequences = [],
        acc = 0;

      do {
        let n = checkedLine.shift();

        if (n === variables.CELL_FILLED) ++acc;
        else if (acc > 0) {
          subsequences.push(acc);
          acc = 0;
        }
      }
      while (checkedLine.length);

      if (acc) subsequences.push(acc);

      return subsequences;
    },

    /**
     * Returns which subsequences are filled.
     *
     * Example:
     * ([1, 2, 3, 1], [1, 2, 3]) => [true, true, true, false]
     *
     * @param {[number]} line
     * @param {[number]} selected
     * @return {[boolean]}
     */
    checkFilledSubsequences(line, selected) {
      if (!selected.length || selected.length > line.length) {
        return line.map(() => false);
      }

      let
        searchStack = line.filter(n => selected.includes(n)),
        selectedStack = selected.filter(n => searchStack.includes(n));

      return line.map(n => {
        if (!selectedStack.length) return false;

        let next = selectedStack.indexOf(n);

        if (next === -1) return false;

        selectedStack = selectedStack.slice(next + 1);
        return true;
      });
    },

    /**
     * Updates filled subsequences for row and column.
     * When `fillCellsOnDone` is true, sets all not filled cells as cancelled when current line is done.
     * @param {number} x
     * @param {number} y
     * @param {boolean} fillCellsOnDone
     */
    updateFilledState(x, y, fillCellsOnDone = true) {
      let
        row = this.gameData['rows'][y - 1],
        column = this.gameData['columns'][x - 1],
        columnFilled = this.getFilledSubsequences(this.filledCells[x] || []),
        rowFilled = this.getFilledSubsequences(this.filledCells.map(cell => cell[y] || variables.CELL_EMPTY));
      
      this.$set(this.rowFilledChunks, y - 1, this.checkFilledSubsequences(row, rowFilled));
      this.$set(this.colFilledChunks, x - 1, this.checkFilledSubsequences(column, columnFilled));

      // if (fillCellsOnDone) {
      //   // Row is done!
      //   if (this.checkFilledSubsequences(row, rowFilled).every(n => n)) {
      //     for (let i = 1; i <= this.fieldWidth; ++i) {
      //       if (!this.filledCells[i] || this.filledCells[i][y] !== variables.CELL_FILLED) {
      //         this.setCellState(variables.CELL_FILLED, i, y);
      //       }
      //     }
      //   }

      //   // Column is done!
      //   if (this.checkFilledSubsequences(column, columnFilled).every(n => n)) {
      //     let cells = this.filledCells[x];
      //     for (let i = 1; i <= this.fieldHeight; ++i) {
      //       if (cells[i] !== variables.CELL_FILLED) {
      //         cells[i] = variables.CELL_CELL_FILLED;
      //         this.setCellState(variables.CELL_CELL_FILLED, x, i);
      //       }
      //     }

      //     this.$set(this.filledCells, x, cells);
      //   }
      // }
    },

    /**
     * Moves active cell to `direction`. Works when user uses keyboard (`controlledByKeyboard` is true).
     * @param {String} direction
     */
    moveActiveCell(direction) {
      let
        activeRow = this.activeRow,
        activeColumn = this.activeColumn;

      switch (direction) {
        case 'down':
          activeRow = activeRow >= this.fieldHeight ? 1 : activeRow + 1;
          break;
        case 'up':
          activeRow = activeRow <= 1 ? this.fieldHeight : activeRow - 1;
          break;
        case 'left':
          activeColumn = activeColumn <= 1 ? this.fieldWidth : activeColumn - 1;
          break;
        case 'right':
          activeColumn = activeColumn >= this.fieldWidth ? 1 : activeColumn + 1;
          break;
      }

      this.onCellHover(activeColumn, activeRow);
    },

    /**
     * Changes cell state depends on its current state.
     * Examples:
     * - empty -> filled
     * - filled -> empty
     * @param {number} x
     * @param {number} y
     */
    toggleCellState(x, y) {
      const currentState = this.cellState(x, y);
      let newState = variables.CELL_EMPTY;

      if (currentState === variables.CELL_EMPTY) {
        newState = variables.CELL_FILLED;
      }else{
        newState = variables.CELL_EMPTY;
      }

      this.setCellState(newState, x, y);
    },

    /**
     * Updates cell CSS class name depending on current and previous cell's states.
     * @param {number} x
     * @param {number} y
     * @param {number} newState
     * @param {number | null} oldState
     */
    updateCellStyle(x, y, newState, oldState = null) {
      if (oldState) {
        let oldClassName = this.cellClassName(oldState);
        this.cellsClasses[`${x}-${y}`] = this.cellsClasses[`${x}-${y}`].filter(className => className !== oldClassName);
      }
      this.cellsClasses[`${x}-${y}`].push(this.cellClassName(newState));
    },

    /**
     * Sets state for cell.
     * @param {number} newState
     * @param {number} [x]
     * @param {number} [y]
     */
    setCellState(newState, x, y) {
      if (!x) x = this.activeColumn;
      if (!y) y = this.activeRow;

      let
        cells = this.filledCells[x] || [],
        oldState = cells[y];

      cells[y] = newState;

      // Change CSS class for cell
      this.updateCellStyle(x, y, newState, oldState);

      this.$set(this.filledCells, x, cells);
      if (newState === variables.CELL_FILLED || oldState === variables.CELL_FILLED) {
        this.updateFilledState(x, y);
      }

      this.$store.dispatch(ActionsTypes.SET_GAME_STATE, {
        id: this.$props.gameData['id'],
        state: this.isFinished ? variables.GAME_IS_FINISHED : variables.GAME_IN_PROCESS
      });

      this.$store.dispatch(ActionsTypes.SAVE_GAME_PROCESS, {
        id: this.$props.gameData['id'],
        cells: this.filledCells
      });
    },

    /**
     * Toggles cancelled state for cell. Works when user click right mouse button on a cell.
     * @param {number} x
     * @param {number} y
     */
    toggleCancelled(x, y) {
      const currentState = this.cellState(x, y);
      let newState = currentState === variables.CELL_CANCELLED ? variables.CELL_EMPTY : variables.CELL_CANCELLED;

      this.setCellState(newState, x, y);
    },

    /**
     * Returns cell state.
     * @param {number} x
     * @param {number} y
     * @return {number}
     */
    cellState: function (x, y) {
      if (!this.filledCells[x] || !this.filledCells[x][y]) return variables.CELL_EMPTY;
      return this.filledCells[x][y];
    },

    /**
     * Returns CSS class name for state.
     * @param {number} cellState
     * @return {string}
     */
    cellClassName: function (cellState) {
      switch (cellState) {
        case variables.CELL_FILLED:
          return 'filled';
        case variables.CELL_CANCELLED:
          return 'cancelled';
      }

      return 'empty';
    },
  }
}
</script>
<style lang="scss" scoped>
.selectedcell{
  position: relative;
  margin-left: 87px;
  margin-top: 178px;
  display: unset;
  pointer-events: none;
  z-index: 100;
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s ease
}
.game_smallback{
  position: absolute;
  width: 62px;
  height: auto;
  top: 110px;
  left: 20px;
}
</style>