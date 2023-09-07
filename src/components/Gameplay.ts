import Cell from "./Cell"
import type GameSettings from "./GameSettings"

export enum GameState { 'ready', 'run', 'win', 'lose' }

export default class Gameplay {
    flags = 0
    matrix = [] as Cell[][]
    gameState = GameState.ready

    settings: GameSettings

    constructor(settings: GameSettings) {
        this.settings = settings
        this.resetGame()
    }

    resetGame() {
        this.gameState = GameState.ready
        this.flags = this.settings.fieldConfig.mines
        this.matrix = Array.from({ length: this.settings.fieldConfig.height }, () =>
            Array.from({ length: this.settings.fieldConfig.width }, () => new Cell()))
        this.addMines(this.settings.fieldConfig.mines)
    }

    onClickCell(x: number, y: number) {
        if (this.gameState === GameState.win || this.gameState === GameState.lose)
            return
        if (this.gameState !== GameState.run)
            this.gameState = GameState.run
        if (!this.matrix[y][x].flagged && !this.matrix[y][x].opened) {
            this.openEmptyArea(x, y)
            if (this.matrix[y][x].isMine()) {
                this.matrix[y][x].setRedMine()
                this.gameIsLost()
            }
            else if (this.countClosedCells() === this.settings.fieldConfig.mines) {
                this.gameIsWon()
            }
        }
    }

    gameIsLost() {
        this.gameState = GameState.lose
        this.matrix.forEach((row) => {
            row.forEach((cell) => {
                if (cell.isMine() && !cell.flagged) {
                    cell.opened = true
                } else if (!cell.isMine() && cell.flagged) {
                    cell.setWrongMine()
                    cell.opened = true
                    cell.flagged = false
                }
            })
        })
    }

    gameIsWon() {
        this.gameState = GameState.win
        this.flags = 0
        this.matrix.forEach((row) => {
            row.forEach((cell) => cell.isMine() && (cell.flagged = true))
        })
    }

    onRightClickCell(x: number, y: number) {
        if (this.gameState === GameState.win || this.gameState === GameState.lose)
            return
        if (this.matrix[y][x].flagged) {
            this.matrix[y][x].flagged = false
            this.flags++
        }
        else if (!this.matrix[y][x].flagged && this.flags > 0) {
            this.matrix[y][x].flagged = true
            this.flags--
        }
    }

    countClosedCells() {
        let res = 0;
        for (let i = 0; i < this.settings.fieldConfig.height; i++)
            for (let j = 0; j < this.settings.fieldConfig.width; j++)
                !this.matrix[i][j].opened && res++
        return res
    }

    openEmptyArea(x: number, y: number) {
        this.matrix[y][x].opened = true
        if (this.matrix[y][x].flagged) {
            this.matrix[y][x].flagged = false
            this.flags++
        }

        if (this.matrix[y][x].isEmpty()) {
            this.walkAroundCell(x, y, (x0, y0) => !this.matrix[y0][x0].opened && this.openEmptyArea(x0, y0))
        }
    }

    walkAroundCell(x: number, y: number, callback: (x0: number, y0: number) => void) {
        for (let i = x - 1; i <= x + 1; i++)
            for (let j = y - 1; j <= y + 1; j++)
                if (i >= 0 && i < this.settings.fieldConfig.width && j >= 0 && j < this.settings.fieldConfig.height && (i != x || j != y))
                    callback(i, j)
    }

    addMines(count: number) {
        while (count) {
            const x = Math.floor(Math.random() * this.settings.fieldConfig.width)
            const y = Math.floor(Math.random() * this.settings.fieldConfig.height)

            if (!this.matrix[y][x].isMine()) {
                this.matrix[y][x].setMine()
                this.walkAroundCell(x, y, (x0, y0) => this.matrix[y0][x0].increment())
                count--
            }
        }
    }
}