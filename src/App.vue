<script setup lang="ts">
import GameSettings from './components/GameSettings'
import GameHeader from './components/GameHeader.vue'
import GameCell from './components/GameCell.vue'
import { ref, watch } from 'vue'
import Gameplay, { GameState } from './components/Gameplay'

interface CustomSettings {
  height: number
  width: number
  mines: number
}
const settings = ref(new GameSettings())
const game = ref(new Gameplay(settings.value))
const is_custom = ref(false)
const face_shocked = ref(false)
const customSettings = ref({} as CustomSettings)

const startBeginnerGame = () => {
  is_custom.value = false
  settings.value.height = 9
  settings.value.width = 9
  settings.value.mines = 10
  game.value.resetGame()
}

const startAdvancedGame = () => {
  is_custom.value = false
  settings.value.height = 16
  settings.value.width = 16
  settings.value.mines = 40
  game.value.resetGame()
}
const startProfessionalGame = () => {
  is_custom.value = false
  settings.value.height = 16
  settings.value.width = 30
  settings.value.mines = 99
  game.value.resetGame()
}
const onClickCustomSettings = () => {
  is_custom.value = true
  customSettings.value.height = customSettings.value.height
    ? customSettings.value.height
    : settings.value.height
  customSettings.value.width = customSettings.value.width
    ? customSettings.value.width
    : settings.value.width
  customSettings.value.mines = customSettings.value.mines
    ? customSettings.value.mines
    : settings.value.mines
  startCustomSettingsGame()
}
const startCustomSettingsGame = () => {
  settings.value.height = customSettings.value.height
  settings.value.width = customSettings.value.width
  settings.value.mines = customSettings.value.mines
  game.value.resetGame()
}
const onChangeCustomSettings = (e: Event) => {
  const target = e.target as HTMLInputElement
  // normalize custom settings to [7 <= height, width <= 70] and [5 <= mines <= 1/2 game area]
  const minValue = target.id === 'mines' ? 5 : 7
  const maxValue =
    target.id === 'mines'
      ? Math.floor((customSettings.value.height * customSettings.value.width) / 2)
      : 70
  let value = Number(target.value) < minValue ? minValue : Number(target.value)
  value = value > maxValue ? maxValue : value
  customSettings.value = { ...customSettings.value, [target.id]: value }
  target.value = value.toString()
}

// вскрыть поле в конце игры
watch(game.value, () => {
  if (game.value.gameState === GameState.lose) {
    game.value.matrix.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value === 10 && !cell.flagged){
          cell.opened = true
          cell.flagged = false
        }
        else if (cell.value !== 10 && cell.flagged){
          cell.value = 11
          cell.opened = true
          cell.flagged = false
        }
      })
    })
  }
  else if (game.value.gameState === GameState.win) {
    game.value.flags = 0
    game.value.matrix.forEach((row) => {
      row.forEach((cell) => (cell.value === 10 && (cell.flagged = true)))
    })
  }
})
</script>

<template>
  <div class="my-3 mx-auto">
    <span class="mx-2 menu" @click="startBeginnerGame">Новичок</span>
    <span class="mx-2 menu" @click="startAdvancedGame">Любитель</span>
    <span class="mx-2 menu" @click="startProfessionalGame">Профессионал</span>
    <span class="mx-2 menu" @click="onClickCustomSettings">Настроить</span>
  </div>
  <div v-if="is_custom" class="mb-3 mx-auto">
    <label for="height">Высота</label>
    <input
      id="height"
      type="number"
      class="mx-2 settings-input"
      @change="onChangeCustomSettings"
      @keyup.enter="startCustomSettingsGame"
      :value="customSettings.height"
    />
    <label for="width" class="ml-2">Ширина</label>
    <input
      id="width"
      type="number"
      class="mx-2 settings-input"
      @change="onChangeCustomSettings"
      @keyup.enter="startCustomSettingsGame"
      :value="customSettings.width"
    />
    <label for="mines" class="ml-2">Мины</label>
    <input
      id="mines"
      type="number"
      class="mx-2 settings-input"
      @change="onChangeCustomSettings"
      @keyup.enter="startCustomSettingsGame"
      :value="customSettings.mines"
    />
    <button class="btn ml-2" @click="startCustomSettingsGame">Применить</button>
  </div>
  <div class="container">
    <!-- wrapper header line -->
    <div
      :style="{ width: settings.getFullWidth() + 'px', height: settings.border_thickness + 'px' }"
    >
      <div
        class="border-top-left-corner"
        :style="{
          width: settings.border_thickness + 'px',
          height: settings.border_thickness + 'px'
        }"
      ></div>
      <div
        class="border-horizontal"
        :style="{
          width: settings.getInnerWidth() + 'px',
          height: settings.border_thickness + 'px'
        }"
      ></div>
      <div
        class="border-top-right-corner"
        :style="{
          width: settings.border_thickness + 'px',
          height: settings.border_thickness + 'px'
        }"
      ></div>
    </div>

    <!-- header area -->
    <div :style="{ width: settings.getFullWidth() + 'px', height: settings.cell_size * 2 + 'px' }">
      <div
        class="border-vertical"
        :style="{ width: settings.border_thickness + 'px', height: settings.cell_size * 2 + 'px' }"
      ></div>
      <div
        class="top-area"
        :style="{ width: settings.getInnerWidth() + 'px', height: settings.cell_size * 2 + 'px' }"
      >
        <GameHeader
          :state="game.gameState"
          :flags="game.flags"
          :settings="settings"
          :face_shocked="face_shocked"
          @onClickResetGame="game.resetGame()"
        />
      </div>
      <div
        class="border-vertical"
        :style="{ width: settings.border_thickness + 'px', height: settings.cell_size * 2 + 'px' }"
      ></div>
    </div>

    <!-- wrapper header underline -->
    <div
      :style="{ width: settings.getFullWidth() + 'px', height: settings.border_thickness + 'px' }"
    >
      <div
        class="border-top-left"
        :style="{
          width: settings.border_thickness + 'px',
          height: settings.border_thickness + 'px'
        }"
      ></div>
      <div
        class="border-horizontal"
        :style="{
          width: settings.getInnerWidth() + 'px',
          height: settings.border_thickness + 'px'
        }"
      ></div>
      <div
        class="border-top-right"
        :style="{
          width: settings.border_thickness + 'px',
          height: settings.border_thickness + 'px'
        }"
      ></div>
    </div>

    <!-- game area -->
    <div
      :style="{ width: settings.getFullWidth() + 'px', height: settings.getInnerHeight() + 'px' }"
    >
      <div
        class="border-vertical"
        :style="{
          width: settings.border_thickness + 'px',
          height: settings.getInnerHeight() + 'px'
        }"
      ></div>
      <div
        class="game-area"
        :style="{
          width: settings.getInnerWidth() + 'px',
          height: settings.getInnerHeight() + 'px'
        }"
      >
        <div v-for="y in settings.height" :key="y" class="clear">
          <GameCell
            v-for="x in settings.width"
            :key="x"
            :x="x - 1"
            :y="y - 1"
            :cell="game.matrix[y - 1][x - 1]"
            :settings="settings"
            @setFaceShoked="(shocked) => (face_shocked = shocked)"
            @onClickCell="game.onClickCell(x - 1, y - 1)"
            @onRightClickCell="game.onRightClickCell(x - 1, y - 1)"
          />
        </div>
      </div>
      <div
        class="border-vertical"
        :style="{
          width: settings.border_thickness + 'px',
          height: settings.getInnerHeight() + 'px'
        }"
      ></div>
    </div>

    <!-- wrapper bottom underline -->
    <div
      :style="{ width: settings.getFullWidth() + 'px', height: settings.border_thickness + 'px' }"
    >
      <div
        class="border-bottom-left-corner"
        :style="{
          width: settings.border_thickness + 'px',
          height: settings.border_thickness + 'px'
        }"
      ></div>
      <div
        class="border-horizontal"
        :style="{
          width: settings.getInnerWidth() + 'px',
          height: settings.border_thickness + 'px'
        }"
      ></div>
      <div
        class="border-bottom-right-corner"
        :style="{
          width: settings.border_thickness + 'px',
          height: settings.border_thickness + 'px'
        }"
      ></div>
    </div>
  </div>
  <div class="copyright">
    <a href="https://github.com/kertis84/minesweeper/blob/main/LICENSE" title="MIT License"
      >Copyright &copy; 2023 kertis84</a
    >
  </div>
</template>

<style scoped>
.settings-input {
  width: calc(2.25rem + 4px);
  height: calc(1.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
.menu {
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  text-decoration: underline;
}
.btn {
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  border-radius: 8px;
  padding: 8px 18px;
  border: 1px solid #222222;
  transition:
    box-shadow 0.2s ease 0s,
    -ms-transform 0.1s ease 0s,
    -webkit-transform 0.1s ease 0s,
    transform 0.1s ease 0s;
  background: #fff;
  color: #222222;
  :hover {
    border-color: #000000;
    background: #f7f7f7;
  }
}
.my-3 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.mb-3 {
  margin-bottom: 1.5rem;
}
.mx-2 {
  margin-left: 1rem;
  margin-right: 1rem;
}
.ml-2 {
  margin-left: 1rem;
}
.mr-2 {
  margin-right: 1rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.copyright {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 0;
}
.container {
  margin: 0 auto;
  z-index: 1;
}
.border-top-left-corner {
  float: left;
  background-image: url(/resources/corner_up_left.png);
  background-size: 100% 100%;
}

.border-top-right-corner {
  float: left;
  background-image: url(/resources/corner_up_right.png);
  background-size: 100% 100%;
}

.border-bottom-left-corner {
  float: left;
  background-image: url(/resources/corner_bottom_left.png);
  background-size: 100% 100%;
}

.border-bottom-right-corner {
  float: left;
  background-image: url(/resources/corner_bottom_right.png);
  background-size: 100% 100%;
}

.border-top-left {
  float: left;
  background-image: url(/resources/t_left.png);
  background-size: 100% 100%;
}
.border-top-right {
  float: left;
  background-image: url(/resources/t_right.png);
  background-size: 100% 100%;
}
.border-horizontal {
  float: left;
  background-image: url(/resources/border_horizontal.png);
  background-size: 100% 100%;
}

.border-vertical {
  float: left;
  background-image: url(/resources/border_vertical.png);
  background-size: 100% 100%;
}

.top-area {
  float: left;
  background: silver;
}

.game-area {
  float: left;
  background: silver;
}
.clear {
  clear: both;
}
</style>
