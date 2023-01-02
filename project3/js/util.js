let inputDirection = null
let lastInputDirection = null

//Chooses a random position along the grid of the game
function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * gridSize) + 1, 
        y: Math.floor(Math.random() * gridSize) + 1
    }
}

//Checks if a given position is outside of the grid
function outsideGrid(position) {
    return (
        position.x < 1 || 
        position.x > gridSize || 
        position.y < 1 || 
        position.y > gridSize
    )
}

//Checks if the two given positions are in the same location
function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

//Stores the given score in local storage if it is higher than the one found or
//if local storage is null
function checkAndStoreHighScore(newScore) {
    storedHighScore = localStorage.getItem("aqs2862-highScore")

    if (storedHighScore === null || (storedHighScore !== null && storedHighScore < newScore)) {
        localStorage.setItem("aqs2862-highScore", newScore)
    }
}