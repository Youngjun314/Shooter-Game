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

function generateRandomValue(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min)) + min
    return randomNumber
}

let bulletList = []

let bullet_speed = 10

function Bullet() {
    this.x = 0
    this.y = 0
    this.init = function() {
        this.x = player_x
        this.y = player_y - 45
        bulletList.push(this)
    }

    this.update = function() {
        this.y -= bullet_speed
    }
}

function createBullet() {
    let b = new Bullet()
    b.init()
 }

let enemyList = []

 function Enemy() {
    this.x = 0
    this.y = 0
    this.init = function() {
        this.x = generateRandomValue(0, canvas.width - 48)
        this.y = 0
        enemyList.push(this)
    }
 }

 function createEnemy() {
    const interval = setInterval(function() {
        let e = new Enemy
        e.init()
    }, 1000)
 }

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
    for(let i = 0; i < bulletList.length; i++) {
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y)
    }
    for(let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)
    }
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
    })
    document.addEventListener("keyup", function(event) {
        delete keysDown[event.keyCode]
        if(event.keyCode == 32) {
            createBullet()
        }
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

    for(let i = 0; i < bulletList.length; i++) {
        bulletList[i].update()
    }
}

loadImage()
setupKeyboardListener()
createEnemy()
main()
