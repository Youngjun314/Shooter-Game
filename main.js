let canvas
let ctx

canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")

canvas.width = 400
canvas.height = 700

document.body.appendChild(canvas)

let backgroundImage, playerImage, bulletImage, enemyImage, gameoverImage
let player_x = canvas.width/2 - 32
let player_y = canvas.height - 64

function loadImage() {
    backgroundImage = new Image()
    backgroundImage.src = "images/Background.jpg"
    playerImage = new Image()
    playerImage.src = "images/Player.png"
    bulletImage = new Image()
    bulletImage.src = "images/Bullet.png"
    enemyImage = new Image()
    enemyImage.src = "images/Enemy.png"
    gameoverImage = new Image()
    gameoverImage.src = "images/GameOver.png"
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(playerImage, player_x, player_y)
}

function main() {
    update()
    render()
    requestAnimationFrame(main)
}

let keysDown = {}
function setupKeyboardListener() {
    document.addEventListener("keydown", function(event) {
        keysDown[event.keyCode] = true
        console.log("누른 키", event.key, event.keyCode)
    })
    document.addEventListener("keyup", function(event) {
        delete keysDown[event.keyCode]
        console.log("뗀 키", event.key, event.keyCode)
    })
}

let movement_speed = 5
function update() {
    if (39 in keysDown) {
        player_x += movement_speed
    }
    if (37 in keysDown) {
        player_x -= movement_speed
    }
    if (68 in keysDown) {
        player_x += movement_speed
    }
    if (65 in keysDown) {
        player_x -= movement_speed
    }
    if (player_x > canvas.width - 64) {
        player_x = canvas.width - 64
    }
    if (player_x < 0){
        player_x = 0
    }

}

loadImage()
setupKeyboardListener()
main()

