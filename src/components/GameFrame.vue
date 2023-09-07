<script setup lang="ts">
import type GameSettings from './GameSettings'
import GameHeader from './GameHeader.vue'
import type Gameplay from './Gameplay';
import GameCell from './GameCell.vue'
import { ref } from 'vue';

interface Props {
  game: Gameplay
  settings: GameSettings
}

defineProps<Props>()

const faceShocked = ref(false)

</script>

<template>
  <div class="container">
    <!-- wrapper header line -->
    <div
      :style="{ width: settings.getFullWidth() + 'px', height: settings.borderThickness + 'px' }"
    >
      <div
        class="border-top-left-corner"
        :style="{
          width: settings.borderThickness + 'px',
          height: settings.borderThickness + 'px'
        }"
      ></div>
      <div
        class="border-horizontal"
        :style="{
          width: settings.getInnerWidth() + 'px',
          height: settings.borderThickness + 'px'
        }"
      ></div>
      <div
        class="border-top-right-corner"
        :style="{
          width: settings.borderThickness + 'px',
          height: settings.borderThickness + 'px'
        }"
      ></div>
    </div>

    <!-- header area -->
    <div :style="{ width: settings.getFullWidth() + 'px', height: settings.cellSize * 2 + 'px' }">
      <div
        class="border-vertical"
        :style="{ width: settings.borderThickness + 'px', height: settings.cellSize * 2 + 'px' }"
      ></div>
      <div
        class="top-area"
        :style="{ width: settings.getInnerWidth() + 'px', height: settings.cellSize * 2 + 'px' }"
      >
        <GameHeader
          :state="game.gameState"
          :flags="game.flags"
          :settings="settings"
          :faceShocked="faceShocked"
          @onClickResetGame="game.resetGame()"
        />
      </div>
      <div
        class="border-vertical"
        :style="{ width: settings.borderThickness + 'px', height: settings.cellSize * 2 + 'px' }"
      ></div>
    </div>

    <!-- wrapper header underline -->
    <div
      :style="{ width: settings.getFullWidth() + 'px', height: settings.borderThickness + 'px' }"
    >
      <div
        class="border-top-left"
        :style="{
          width: settings.borderThickness + 'px',
          height: settings.borderThickness + 'px'
        }"
      ></div>
      <div
        class="border-horizontal"
        :style="{
          width: settings.getInnerWidth() + 'px',
          height: settings.borderThickness + 'px'
        }"
      ></div>
      <div
        class="border-top-right"
        :style="{
          width: settings.borderThickness + 'px',
          height: settings.borderThickness + 'px'
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
          width: settings.borderThickness + 'px',
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
        <div v-for="y in settings.fieldConfig.height" :key="y" class="clear">
          <GameCell
            v-for="x in settings.fieldConfig.width"
            :key="x"
            :x="x - 1"
            :y="y - 1"
            :cell="game.matrix[y - 1][x - 1]"
            :settings="settings"
            @setFaceShoked="(shocked) => (faceShocked = shocked)"
            @onClickCell="game.onClickCell(x - 1, y - 1)"
            @onRightClickCell="game.onRightClickCell(x - 1, y - 1)"
          />
        </div>
      </div>
      <div
        class="border-vertical"
        :style="{
          width: settings.borderThickness + 'px',
          height: settings.getInnerHeight() + 'px'
        }"
      ></div>
    </div>

    <!-- wrapper bottom underline -->
    <div
      :style="{ width: settings.getFullWidth() + 'px', height: settings.borderThickness + 'px' }"
    >
      <div
        class="border-bottom-left-corner"
        :style="{
          width: settings.borderThickness + 'px',
          height: settings.borderThickness + 'px'
        }"
      ></div>
      <div
        class="border-horizontal"
        :style="{
          width: settings.getInnerWidth() + 'px',
          height: settings.borderThickness + 'px'
        }"
      ></div>
      <div
        class="border-bottom-right-corner"
        :style="{
          width: settings.borderThickness + 'px',
          height: settings.borderThickness + 'px'
        }"
      ></div>
    </div>
  </div>
</template>

<style>
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