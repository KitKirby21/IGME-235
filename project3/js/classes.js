class Snake {
    constructor() {
        this.body = [{x: Math.ceil(gridSize/2), y: Math.ceil(gridSize/2)}]
        this.expansionRate = 1
        this.newSegment= null
    }

    //Moves snake along a given direction whenever it is run
    updateSnake() {
        this.addSegments()
        lastInputDirection = inputDirection
        for (let i = this.body.length - 2; i >= 0; i--) {
            this.body[i+1] = { ...this.body[i]}
        }
        this.body[0].x += inputDirection.x
        this.body[0].y += inputDirection.y
    }

    //Draws the snake according to the current position when run
    drawSnake(gameBoard) {
        this.body.forEach(segment => {
            const snakeElement = document.createElement('div')
            snakeElement.style.gridRowStart = segment.y
            snakeElement.style.gridColumnStart = segment.x
            snakeElement.classList.add('snake')
            gameBoard.appendChild(snakeElement)
        })
    }

    //Expands the snake by the current expansion rate when it is run
    expandSnake() {
        this.newSegment += this.expansionRate
    }
    
    //Checks if the given position overlaps with the snake
    //Has an option to ignore the head of the snake
    onSnake(position, {ignoreHead = false} = {}) {
        return this.body.some((segment, index) => {
            if (ignoreHead && index === 0) return false
            return equalPositions(segment, position)
        })
    }
    
    //Gets the position of the snake's head
    getSnakeHead() {
        return this.body[0]
    }
    
    //Checks if the snake is intersecting with its own body
    snakeIntersection() {
        return this.onSnake(this.body[0], {ignoreHead: true})
    }
    
    //Adds the required length of growth to the body array
    addSegments() {
        for (let i = 0; i < this.newSegment; i++) {
            this.body.push({...this.body[this.body.length - 1]})
        }
    
        this.newSegment = 0
    }
    
    //Checks if the snake should have died
    checkDeath() {
        return outsideGrid(this.getSnakeHead()) || this.snakeIntersection()
    }

    //Resets the snake to its initial state along with moving it to the center of the grid
    resetSnake() {
        while(this.body.length > 1) {
            this.body.pop()
        }
        this.body[0] = {x: Math.ceil(gridSize/2), y: Math.ceil(gridSize/2)}
        snake.newSegment = 0
    }
}