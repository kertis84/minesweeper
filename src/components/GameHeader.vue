<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { GameState } from './Gameplay'
import type GameSettings from './GameSettings'

interface Props {
  state: GameState
  flags: number
  settings: GameSettings
  face_shocked: boolean
}

const props = defineProps<Props>()

let intervalId: number

const emit = defineEmits<{ (e: 'onClickResetGame'): void }>()

const pressed = ref(false)
const timer = ref(0)
const isStarted = computed(() => {
  return props.state === GameState.run
})

const startTimer = function () {
  timer.value = 0
  intervalId = setInterval(() => {
    timer.value++
  }, 1000)
}

const stopTimer = function () {
  clearInterval(intervalId)
}

watch(isStarted, () => {
  if (isStarted.value) startTimer()
  else stopTimer()
})

const rightNums = computed(() =>
  (timer.value > 999 ? 999 : timer.value).toString().split('').reverse()
)

const leftNums = computed(() => {
  return (props.flags > 999 ? 999 : props.flags).toString().split('').reverse()
})

const onClickResetGame = () => {
  timer.value = 0
  emit('onClickResetGame')
}
</script>

<template>
  <div
    class="nums-background-left"
    :style="{
      width: props.settings.cell_size * 1.625 * 1.625 + 'px',
      height: props.settings.cell_size * 1.625 + 'px',
      marginLeft: props.settings.cell_size * 0.2 + 'px'
    }"
  >
    <div
      class="digit"
      :class="`d${leftNums[0]}`"
      :style="{
        width: props.settings.cell_size * 0.75 + 'px',
        height: props.settings.cell_size * 1.35 + 'px',
        marginRight: props.settings.cell_size * 0.12 + 'px'
      }"
    ></div>
    <div
      class="digit"
      :class="leftNums[1] && `d${leftNums[1]}`"
      :style="{
        width: props.settings.cell_size * 0.75 + 'px',
        height: props.settings.cell_size * 1.35 + 'px',
        marginRight: props.settings.cell_size * 0.075 + 'px'
      }"
    ></div>
    <div
      class="digit"
      :class="leftNums[2] && `d${leftNums[2]}`"
      :style="{
        width: props.settings.cell_size * 0.75 + 'px',
        height: props.settings.cell_size * 1.35 + 'px',
        marginRight: props.settings.cell_size * 0.075 + 'px'
      }"
    ></div>
  </div>
  <div
    class="nums-background-right"
    :style="{
      width: props.settings.cell_size * 1.625 * 1.625 + 'px',
      height: props.settings.cell_size * 1.625 + 'px',
      marginRight: props.settings.cell_size * 0.2 + 'px'
    }"
  >
    <div
      class="digit"
      :class="`d${rightNums[0]}`"
      :style="{
        width: props.settings.cell_size * 0.75 + 'px',
        height: props.settings.cell_size * 1.35 + 'px',
        marginRight: props.settings.cell_size * 0.12 + 'px'
      }"
    ></div>
    <div
      class="digit"
      :class="rightNums[1] && `d${rightNums[1]}`"
      :style="{
        width: props.settings.cell_size * 0.75 + 'px',
        height: props.settings.cell_size * 1.35 + 'px',
        marginRight: props.settings.cell_size * 0.075 + 'px'
      }"
    ></div>
    <div
      class="digit"
      :class="rightNums[2] && `d${rightNums[2]}`"
      :style="{
        width: props.settings.cell_size * 0.75 + 'px',
        height: props.settings.cell_size * 1.35 + 'px',
        marginRight: props.settings.cell_size * 0.075 + 'px'
      }"
    ></div>
  </div>
  <div
    @mousedown="pressed = true"
    @mouseup="pressed = false"
    @click.prevent="onClickResetGame"
    :style="{
      width: props.settings.cell_size * 1.625 + 'px',
      height: props.settings.cell_size * 1.625 + 'px'
    }"
    class="center"
    :class="{
      face_pressed: pressed,
      face_shocked: face_shocked && (state === GameState.run || state === GameState.ready),
      face_unpressed: !pressed && !face_shocked && (state === GameState.ready || state === GameState.run),
      face_lose: !pressed && state === GameState.lose,
      face_win: !pressed && state === GameState.win
    }"
  ></div>
</template>

<style scoped>
.center {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.face_shocked {
  background-image: url(/resources/face_shocked.svg);
  background-size: 100% 100%;
}
.face_unpressed {
  background-image: url(/resources/face_unpressed.svg);
  background-size: 100% 100%;
}
.face_pressed {
  background-image: url(/resources/face_pressed.svg);
  background-size: 100% 100%;
}
.face_win {
  background-image: url(/resources/face_win.svg);
  background-size: 100% 100%;
}
.face_lose {
  background-image: url(/resources/face_lose.svg);
  background-size: 100% 100%;
}
.nums-background-left {
  float: left;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background-image: url(/resources/nums_background.svg);
  background-size: 100% 100%;
}
.nums-background-right {
  position: relative;
  float: right;
  top: 50%;
  transform: translateY(-50%);
  background-image: url(/resources/nums_background.svg);
  background-size: 100% 100%;
}
.digit {
  position: relative;
  float: right;
  top: 50%;
  transform: translateY(-50%);
  background-size: 100% 100%;
}
.d0 {
  background-image: url(/resources/d0.svg);
}
.d1 {
  background-image: url(/resources/d1.svg);
}
.d2 {
  background-image: url(/resources/d2.svg);
}
.d3 {
  background-image: url(/resources/d3.svg);
}
.d4 {
  background-image: url(/resources/d4.svg);
}
.d5 {
  background-image: url(/resources/d5.svg);
}
.d6 {
  background-image: url(/resources/d6.svg);
}
.d7 {
  background-image: url(/resources/d7.svg);
}
.d8 {
  background-image: url(/resources/d8.svg);
}
.d9 {
  background-image: url(/resources/d9.svg);
}
</style>
