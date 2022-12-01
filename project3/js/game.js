let lastRenderTime = 0
const snakeSpeed = 8
const snakeBody = [{x: 26, y: 26}]
const gameBoard = document.getElementById('game-board')
const expansionRate = 4
const gridSize = 51

let newSegment = 0
let food = {x: 5, y: 10}
let inputDirection = {x: 0, y: 0}
let lastInputDirection = {x: 0, y: 0}
let gameOver = false

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break
            inputDirection = {x: 0, y: -1}
            break
        case 'ArrowDown':
            if (lastInputDirection.y !== 0) break
            inputDirection = {x: 0, y: 1}
            break
        case 'ArrowLeft':
            if (lastInputDirection.x !== 0) break
            inputDirection = {x: -1, y: 0}
            break
        case 'ArrowRight':
            if (lastInputDirection.x !== 0) break
            inputDirection = {x: 1, y: 0}
            break
    }
})

function main(currentTime) {
    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')) {
            window.location.reload()
        }
        return
    }

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    window.requestAnimationFrame(main)
    if (secondsSinceLastRender < 1 / snakeSpeed) return

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main);

function update() {

    //Update Snake
    addSegments()
    lastInputDirection = inputDirection
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i+1] = { ...snakeBody[i]}
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y

    //Update Food
    if (onSnake(food)) {
        expandSnake(expansionRate)
        food = getRandomFoodPosition()
    }

    //Check for death
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''

    //Draw Snake
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })

    //Draw Food
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function expandSnake(amount) {
    newSegment += amount
}

function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

function getSnakeHead() {
    return snakeBody[0]
}

function snakeIntersection() {
    return onSnake(snakeBody[0], {ignoreHead: true})
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for (let i = 0; i < newSegment; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }

    newSegment = 0
}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * gridSize) + 1, 
        y: Math.floor(Math.random() * gridSize) + 1
    }
}

function outsideGrid(position) {
    return (
        position.x < 1 || 
        position.x > gridSize || 
        position.y < 1 || 
        position.y > gridSize
    )
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}