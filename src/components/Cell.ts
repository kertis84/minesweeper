export default class Cell {
    value = '0'
    flagged = false
    opened = false

    setMine(){
        this.value = 'mine'
    }

    setRedMine(){
        this.value = 'mine-red'
    }

    setWrongMine(){
        this.value = 'mine-wrong'
    }

    isMine(){
        return this.value === 'mine'
    }

    isEmpty(){
        return this.value === '0'
    }

    increment(){
        if (!this.isMine()){
            const val = this.value.charCodeAt(0)
            this.value = String.fromCharCode(val + 1)
        }
    }
    
}
