class Snake {
    constructor() {
        this.body = [{x: Math.ceil(gridSize/2), y: Math.ceil(gridSize/2)}]
        this.expansionRate = 1
        this.newSegment= null
    }

    updateSnake() {
        this.addSegments()
        lastInputDirection = inputDirection
        for (let i = this.body.length - 2; i >= 0; i--) {
            this.body[i+1] = { ...this.body[i]}
        }
        this.body[0].x += inputDirection.x
        this.body[0].y += inputDirection.y
    }

    drawSnake(gameBoard) {
        this.body.forEach(segment => {
            const snakeElement = document.createElement('div')
            snakeElement.style.gridRowStart = segment.y
            snakeElement.style.gridColumnStart = segment.x
            snakeElement.classList.add('snake')
            gameBoard.appendChild(snakeElement)
        })
    }

    expandSnake() {
        this.newSegment += this.expansionRate
    }
    
    onSnake(position, {ignoreHead = false} = {}) {
        return this.body.some((segment, index) => {
            if (ignoreHead && index === 0) return false
            return equalPositions(segment, position)
        })
    }
    
    getSnakeHead() {
        return this.body[0]
    }
    
    snakeIntersection() {
        return this.onSnake(this.body[0], {ignoreHead: true})
    }
    
    addSegments() {
        for (let i = 0; i < this.newSegment; i++) {
            this.body.push({...this.body[this.body.length - 1]})
        }
    
        this.newSegment = 0
    }
    
    checkDeath() {
        return outsideGrid(this.getSnakeHead()) || this.snakeIntersection()
    }

    resetSnake() {
        while(this.body.length > 1) {
            this.body.pop()
        }
        this.body[0] = {x: Math.ceil(gridSize/2), y: Math.ceil(gridSize/2)}
        snake.newSegment = 0
    }
}