export default class GameSettings {
    width = 9
    height = 9
    mines = 10
    cell_size = 24
    border_thickness = 18

    getFullWidth() {
        return this.cell_size * this.width + 2 * this.border_thickness
    }

    getInnerWidth() {
        return this.cell_size * this.width
    }

    getInnerHeight() {
        return this.cell_size * this.height
    }

}