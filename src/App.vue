<script setup lang="ts">
import { ref } from 'vue'
import Gameplay from './components/Gameplay'
import GameFrame from './components/GameFrame.vue'
import GameSettings, { scales, type FieldSettings, Config } from './components/GameSettings'

const settings = ref(new GameSettings())
const game = ref(new Gameplay(settings.value))
const isCustom = ref(false)
const customSettings = ref({} as FieldSettings)

const startNewGame = (e: Event) => {
  isCustom.value = false
  const target = e.target as HTMLDivElement
  settings.value.fieldConfig = { ...Config[target.id as keyof typeof Config] }
  game.value.resetGame()
}

const onClickCustomSettings = () => {
  isCustom.value = !isCustom.value
  customSettings.value = settings.value.fieldConfig
}

const startNewCustomGame = () => {
  settings.value.fieldConfig = customSettings.value
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
</script>

<template>
  <div
    class="my-3 mx-auto"
    style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem"
  >
    <div class="mx-2 menu my-auto" id="beginner" @click="startNewGame">Новичок</div>
    <div class="mx-2 menu my-auto" id="intermediate" @click="startNewGame">Любитель</div>
    <div class="mx-2 menu my-auto" id="expert" @click="startNewGame">Профессионал</div>
    <div class="mx-2 menu my-auto" @click="onClickCustomSettings">Настроить</div>
    <div class="mx-2 my-auto">
      <select class="scale" v-model="settings.cellSize">
        <option v-for="scale in scales" :key="scale" :value="scale">{{ scale }} px</option>
      </select>
    </div>
  </div>
  <div v-if="isCustom" class="mb-3 mx-auto">
    <label for="height">Высота</label>
    <input
      id="height"
      type="number"
      class="mx-2 settings-input"
      @change="onChangeCustomSettings"
      @keyup.enter="startNewCustomGame"
      :value="customSettings.height"
    />
    <label for="width" class="ml-2">Ширина</label>
    <input
      id="width"
      type="number"
      class="mx-2 settings-input"
      @change="onChangeCustomSettings"
      @keyup.enter="startNewCustomGame"
      :value="customSettings.width"
    />
    <label for="mines" class="ml-2">Мины</label>
    <input
      id="mines"
      type="number"
      class="mx-2 settings-input"
      @change="onChangeCustomSettings"
      @keyup.enter="startNewCustomGame"
      :value="customSettings.mines"
    />
    <button class="btn ml-2" @click="startNewCustomGame">Применить</button>
  </div>

  <GameFrame :game="game" :settings="settings" />

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
.scale {
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  text-decoration: none;
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
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.my-auto {
  margin-top: auto;
  margin-bottom: auto;
}
.copyright {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 0;
}
</style>
