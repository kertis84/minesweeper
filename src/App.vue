<script setup lang="ts">
import GameSettings from './components/GameSettings'
import GameHeader from './components/GameHeader.vue'
import GameCell from './components/GameCell.vue'
import { ref } from 'vue';
import Gameplay from './components/Gameplay';

const settings = ref(new GameSettings())
const game = ref(new Gameplay(settings.value))

</script>

<template>
    <!-- wrapper header line -->
    <div :style="{width: settings.getFullWidth() + 'px', height: settings.border_thickness + 'px'}">
        <div class="border-top-left-corner" :style="{width: settings.border_thickness + 'px', height: settings.border_thickness + 'px'}"></div>
        <div class="border-horizontal" :style="{width: settings.getInnerWidth() + 'px', height: settings.border_thickness + 'px'}"></div>
        <div class="border-top-right-corner" :style="{width: settings.border_thickness + 'px', height: settings.border_thickness + 'px'}"></div>
    </div>

    <!-- header area -->
    <div :style="{width: settings.getFullWidth() + 'px', height: settings.cell_size * 2 + 'px'}">
        <div class="border-vertical" :style="{width: settings.border_thickness + 'px', height: settings.cell_size * 2 + 'px'}"></div>
        <div class="top-area" :style="{width: settings.getInnerWidth() + 'px', height: settings.cell_size * 2 + 'px'}">
            <GameHeader :state="game.gameState" :flags="game.flags" :settings="settings"
            @onClickResetGame="game.resetGame()"/>
        </div>
        <div class="border-vertical" :style="{width: settings.border_thickness + 'px', height: settings.cell_size * 2 + 'px'}"></div>
    </div>

    <!-- wrapper header underline -->
    <div :style="{width: settings.getFullWidth() + 'px', height: settings.border_thickness + 'px'}" >
        <div class="border-top-left" :style="{width: settings.border_thickness + 'px', height: settings.border_thickness + 'px'}"></div>
        <div class="border-horizontal" :style="{width: settings.getInnerWidth() + 'px', height: settings.border_thickness + 'px'}"></div>
        <div class="border-top-right" :style="{width: settings.border_thickness + 'px', height: settings.border_thickness + 'px'}"></div>
    </div>

    <!-- game area -->
    <div :style="{width: settings.getFullWidth() + 'px', height: settings.getInnerHeight() + 'px'}">
        <div class="border-vertical" :style="{width: settings.border_thickness + 'px', height: settings.getInnerHeight() + 'px'}"></div>
        <div class="game-area" :style="{width: settings.getInnerWidth() + 'px', height: settings.getInnerHeight() + 'px'}">
            <div v-for="y in settings.height" :key="y" class="clear">
                <GameCell v-for="x in settings.width" :key="x" :x="x-1" :y="y-1" :cell="game.matrix[y-1][x-1]"
                    :settings="settings"
                    @onClickCell="game.onClickCell(x-1, y-1)"
                    @onRightClickCell="game.onRightClickCell(x-1, y-1)"
                    />
            </div>
        </div>
        <div class="border-vertical" :style="{width: settings.border_thickness + 'px', height: settings.getInnerHeight() + 'px'}"></div>
    </div>

    <!-- wrapper bottom underline -->
    <div :style="{width: settings.getFullWidth() + 'px', height: settings.border_thickness + 'px'}">
        <div class="border-bottom-left-corner" :style="{width: settings.border_thickness + 'px', height: settings.border_thickness + 'px'}"></div>
        <div class="border-horizontal" :style="{width: settings.getInnerWidth() + 'px', height: settings.border_thickness + 'px'}"></div>
        <div class="border-bottom-right-corner" :style="{width: settings.border_thickness + 'px', height: settings.border_thickness + 'px'}"></div>
    </div>
</template>

<style scoped>
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
