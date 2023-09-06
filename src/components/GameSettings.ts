export const scales = [12, 18, 24, 30, 36, 48, 60, 72]

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