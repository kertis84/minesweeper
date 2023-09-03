<script setup lang="ts">
import type Cell from './Cell';
import type GameSettings from './GameSettings';


interface Props {
    x: number,
    y: number,
    cell: Cell,
    settings: GameSettings,
}

const props = defineProps<Props>()

const emit = defineEmits<{ (e: 'onClickCell', x: number, y: number): void, (e: 'onRightClickCell', x: number, y: number): void, }>()

</script>

<template>
    <div @click.prevent="emit('onClickCell', x, y)" @contextmenu.prevent="emit('onRightClickCell', x, y)"
                    :class="cell.flagged ? 'cell-flag'
                        : cell.opened ? `cell-${cell.value}` : 'cell-closed'"
                    :style="{width: props.settings.cell_size + 'px', height: props.settings.cell_size + 'px'}" >
    </div>
</template>

<style scoped>
.cell-flag {
    float: left;
    background-image: url(/resources/flag.svg);
    background-size: 100% 100%;
}
.cell-closed {
    float: left;
    background-image: url(/resources/closed.svg);
    background-size: 100% 100%;
}
.cell-0 {
    float: left;
    background-image: url(/resources/type0.svg);
    background-size: 100% 100%;
}
.cell-1 {
    float: left;
    background-image: url(/resources/type1.svg);
    background-size: 100% 100%;
}
.cell-2 {
    float: left;
    background-image: url(/resources/type2.svg);
    background-size: 100% 100%;
}
.cell-3 {
    float: left;
    background-image: url(/resources/type3.svg);
    background-size: 100% 100%;
}
.cell-4 {
    float: left;
    background-image: url(/resources/type4.svg);
    background-size: 100% 100%;
}
.cell-5 {
    float: left;
    background-image: url(/resources/type5.svg);
    background-size: 100% 100%;
}
.cell-6 {
    float: left;
    background-image: url(/resources/type6.svg);
    background-size: 100% 100%;
}
.cell-7 {
    float: left;
    background-image: url(/resources/type7.svg);
    background-size: 100% 100%;
}
.cell-8 {
    float: left;
    background-image: url(/resources/type8.svg);
    background-size: 100% 100%;
}
.cell-10 {
    float: left;
    background-image: url(/resources/mine.svg);
    background-size: 100% 100%;
}
</style>