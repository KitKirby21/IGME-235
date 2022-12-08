let lastRenderTime = 0
const updateSpeed = 12
const gameBoard = document.getElementById('game-board')
const scoreHeader = document.getElementById('score-header')
const gridSize = 51
const snake = new Snake()

let food = null
let score = null


document.getElementById("start-game-button").onclick = startGame;

function startGame() {
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

    //Sets snake body to center
    snake.resetSnake()
    

    //Resetting everything
    
    food = getRandomFoodPosition()
    inputDirection = {x: 0, y: 0}
    lastInputDirection = {x: 0, y: 0}
    score = 0

    window.requestAnimationFrame(gameLoop);
}

function gameOver() {
    scoreHeader.innerHTML = ""
    gameBoard.innerHTML =  `<h1>Game Over</h1>
                            <h2>Score: ${score}</h2>
                            <button id="game-over-button">Play Again?</button>`
    
    document.getElementById("game-over-button").onclick = startGame;
}

function gameLoop(currentTime) {
    if (snake.checkDeath()) {
        gameOver()
        return
    }
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    window.requestAnimationFrame(gameLoop)
    if (secondsSinceLastRender < 1 / updateSpeed) return

    lastRenderTime = currentTime

    update()
    draw()
}

//window.requestAnimationFrame(gameLoop);

function update() {

    //Update Snake
    snake.updateSnake()

    //Update Food
    if (snake.onSnake(food)) {
        snake.expandSnake()
        food = getRandomFoodPosition()
    }

    score = snake.body.length - 1;
    scoreHeader.innerHTML = `<h1>Score: ${score}</h1>`
}

function draw() {
    gameBoard.innerHTML = ''

    //Draw Snake
    snake.drawSnake(gameBoard)

    //Draw Food
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || snake.onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}