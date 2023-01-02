let lastRenderTime = 0
const updateSpeed = 16
const gameBoard = document.querySelector('#game-board')
const scoreHeader = document.querySelector('#score-header')
const gridSize = 51
const snake = new Snake()
const planetList = ["media/planet-1.png",
    "media/planet-2.png",
    "media/planet-3.png",
    "media/planet-4.png",
    "media/planet-5.png",
    "media/planet-6.png"]

let currentPlanet = randomizePlanetFood()
let food = null
let score = 0


document.querySelector('#start-game-button').onclick = startGame;

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
    
    currentPlanet = randomizePlanetFood()
    food = getRandomFoodPosition()
    inputDirection = {x: 0, y: 0}
    lastInputDirection = {x: 0, y: 0}
    score = 0

    window.requestAnimationFrame(gameLoop);
}

//Moves the game to the game over screen; generates a button that can restart the game
function gameOver() {
    //Stores high score in local storage
    checkAndStoreHighScore(score)

    scoreHeader.innerHTML = ""
    gameBoard.innerHTML =  `<h1>Game Over</h1>
                            <h2>High Score: ${localStorage.getItem("aqs2862-highScore")}</h2>
                            <h3>Score: ${score}</h3>
                            <button id="game-over-button">Play Again?</button>`
    
    document.querySelector('#game-over-button').onclick = startGame;
}

function gameLoop(currentTime) {
    //Checks for if the snake has died before continuing the loop
    if (snake.checkDeath()) {
        gameOver()
        return
    }

    //Loops itself, and does not run update/draw unless the time since last update
    //has been longer than 1 / update speed.
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    window.requestAnimationFrame(gameLoop)
    if (secondsSinceLastRender < 1 / updateSpeed) return

    lastRenderTime = currentTime

    update()
    draw()
}


function update() {

    //Update Snake
    snake.updateSnake()

    //Update Food
    if (snake.onSnake(food)) {
        snake.expandSnake()
        currentPlanet = randomizePlanetFood()
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
    foodElement.style.backgroundImage = `url(${planetList[currentPlanet]})`
    gameBoard.appendChild(foodElement)
}

//Generates a random position along the grid for the food to appear on
//This position will never appear on the snake itself
function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || snake.onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}

//Picks a random planet image from the list of images stored
function randomizePlanetFood() {
    return Math.floor(Math.random() * planetList.length)
}