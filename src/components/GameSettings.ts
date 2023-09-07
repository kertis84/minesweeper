export const scales = [12, 18, 24, 30, 36, 48, 60, 72]

export interface FieldSettings {
    height: number,
    width: number,
    mines: number,
}
  
export const Config = {
    beginner: {
        height: 9,
        width: 9,
        mines: 10,
    },
    intermediate: {
        height: 16,
        width: 16,
        mines: 40,
    },
    expert: {
        height: 16,
        width: 30,
        mines: 99,
    },
};

export default class GameSettings {
    fieldConfig = {...Config.beginner}
    cellSize = 24
    borderThickness = 18

    getFullWidth() {
        return this.cellSize * this.fieldConfig.width + 2 * this.borderThickness
    }

    getInnerWidth() {
        return this.cellSize * this.fieldConfig.width
    }

    getInnerHeight() {
        return this.cellSize * this.fieldConfig.height
    }

}