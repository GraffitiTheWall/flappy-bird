var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#93dbda',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
let score = 0;
var game = new Phaser.Game(config)
function preload() {
    this.load.image('car', 'assets/bird.png')
    this.load.image('pipe', 'assets/pipe.png')
    this.load.image('ground', 'assets/platform.png')
    this.load.image('star','assets/star.png')
}
function create() {

    function add_score(car,star) {
        score += 1
        scoreText.setText(`Score: ${score}`)
        star.disableBody(true,true)
    }
    car = this.physics.add.sprite(50,100,'car')
    car.setScale(0.15)
    ground = this.physics.add.sprite(0,600-20,'ground')
    ground.setCollideWorldBounds(true)
    ground.setScale(2)
    car.body.setGravityY(200)
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    pipes = this.physics.add.group()
    stars = this.physics.add.group()
    this.physics.add.overlap(pipes,car,end_game,null,this)
    this.physics.add.overlap(ground,car,end_game,null,this)
    this.physics.add.overlap(car, stars, add_score, null,this)
    this.physics.add.collider(pipes,car)
    this.physics.add.collider(pipes,ground)
    this.physics.add.collider(pipes,pipes)
    id = setInterval(add_pipe,2500)
    let scoreText = this.add.text(16,16,'Score: ' + score, {fontSize: '32px', fill: '#000'})
}

function update() {
    if (space.isDown && car.body.touching) {
        car.setVelocityY(-200)
    }
}

function end_game() {
    this.physics.pause()
}

function add_pipe() {
    num = Math.floor(Math. random()*6) + 3
    for (let i = 1; i < 10; i++) { 
        if (i != num && i != num - 1) {
            pipes.create(800, 515 - (53 * i), 'pipe')
        } else if (i == num) {
            stars.create(800, 515 - ((53 * i)) + 25, 'star')
        }
    }
    pipes.create(800, 515, 'pipe')
    pipes.children.iterate(function (pipe) {
        pipe.setVelocityX(-200)
        pipe.body.setGravityY(-300)
    })
    stars.children.iterate(function (star) {
        star.setVelocityX(-200)
        star.body.setGravityY(-300)
        star.setScale(0.15)
    })
}



