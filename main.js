let canvas
let ctx

canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")

canvas.width = 400
canvas.height = 700

document.body.appendChild(canvas)

let backgroundImage, playerImage, bulletImage, enemyImage, gameOverImage, criticalBulletImage
let player_x = canvas.width/2 - 32
let player_y = canvas.height - 64

function generateRandomValue(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min)) + min
    return randomNumber
}

let gameOver = false

let critical_chance = 0.2

let critical_modify = 2

let movement_speed = 5

let bullet_speed = 15

let enemy_speed = 5

let enemy_spawn_speed = 700

let score = 0

let bulletList = []

let criticalBulletList = []

let enemyList = []

function Bullet() {
    this.x = 0
    this.y = 0
    this.alive = true
    this.init = function() {
        this.x = player_x
        this.y = player_y - 45
        bulletList.push(this)
    }

    this.update = function() {
        this.y -= bullet_speed
    }

    this.checkHit = function() {
        for(let i = 0; i < enemyList.length; i++) {
            if(
                this.y <= enemyList[i].y && 
                this.y >= enemyList[i].y - 50 && 
                this.x >= enemyList[i].x - 40 &&
                this.x <= enemyList[i].x + 40    
            ) {
                this.alive = false
                enemyList.splice(i, 1)
                score += 1
            }
        }
    }
}

function Critical_Bullet() {
    this.x = 0
    this.y = 0
    this.alive = true
    this.init = function() {
        this.x = player_x
        this.y = player_y - 45
        criticalBulletList.push(this)
    }

    this.update = function() {
        this.y -= bullet_speed * critical_modify
    }

    this.checkHit = function() {
        for(let i = 0; i < enemyList.length; i++) {
            if(
                this.y <= enemyList[i].y && 
                this.y >= enemyList[i].y - 50 && 
                this.x >= enemyList[i].x - 40 * critical_modify &&
                this.x <= enemyList[i].x + 40 * critical_modify  
            ) {
                enemyList.splice(i, 1)
                score += 1 * critical_modify
            }
        }
    }
}

function createBullet() {
    if(generateRandomValue(1, 10) <= critical_chance * 10) {
        let c = new Critical_Bullet()
        c.init()
    } else {
        let b = new Bullet()
        b.init()
    }
 }

 function Enemy() {
    this.x = 0
    this.y = 0
    this.init = function() {
        this.x = generateRandomValue(0, canvas.width - 65)
        this.y = 0
        enemyList.push(this)
    }

    this.update = function() {
        this.y += enemy_speed
        if(this.y > canvas.height - 65) {
            gameOver = true
        }
    }
 }

 function createEnemy() {
    const interval = setInterval(function() {
        let e = new Enemy
        e.init()
    }, enemy_spawn_speed)
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
    gameOverImage = new Image()
    gameOverImage.src = "images/GameOver.png"
    criticalBulletImage = new Image()
    criticalBulletImage.src = "images/Critical_Bullet.png"

}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(playerImage, player_x, player_y)

    ctx.fillText(`Score : ${score}`, 20, 20)
    ctx.fillStyle = "red"
    ctx.font = "20px Arial"

    for(let i = 0; i < bulletList.length; i++) {
        if(bulletList[i].alive == true) {
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y)
        }
    }
    for(let i = 0; i < criticalBulletList.length; i++) {
        if(criticalBulletList[i].alive == true) {
            ctx.drawImage(criticalBulletImage, criticalBulletList[i].x, criticalBulletList[i].y)
        }
    }
    for(let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y)
    }
}

function main() {
    if(gameOver == false) {
        update()
        render()
        requestAnimationFrame(main)
    } else {
        ctx.drawImage(gameOverImage, 0, 200, 400, 235)
    }
    
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
        if(bulletList[i].alive == true) {
            bulletList[i].update()
            bulletList[i].checkHit()
        }
    }
    for(let i = 0; i < criticalBulletList.length; i++) {
        if(criticalBulletList[i].alive == true) {
            criticalBulletList[i].update()
            criticalBulletList[i].checkHit()
        }
    }

    for(let i = 0; i < enemyList.length; i++) {
        enemyList[i].update()
    }
}

loadImage()
setupKeyboardListener()
createEnemy()
main()
