let inputDirection = null
let lastInputDirection = null


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

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}