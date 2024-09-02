import BulletEnemyL1 from "./bulletEnemy.js"

export default class EnemyL1 {
    constructor(game) {
        this.game = game
        this.health = 20
        this.velocity = {
            x: 1,
            y: 5
        }
        this.scale = 1
        this.position = {
            x: Math.random() * (game.canvas.width - 50) + 50,
            y: -70
        }
        this.spriteXIndex = 0
        this.spriteYIndex = 0
        this.frameOriginSize = 64
        this.frameCanvasSize = 64
        this.image = document.getElementById("enemy_1");
        this.count = 0
        this.hitbox = {
            x: this.position.x,
            y: this.position.y,
            w: this.frameCanvasSize,
            h: this.frameCanvasSize
        }
        this.bullets = []
        this.time = 0
        this.angle = 0
    }

    update(dt) {
        if (this.count > 300) {
            this.bullets.push(new BulletEnemyL1(this.game.activeScene.player, this.position.x, this.position.y))
            this.count = 0
        }
        this.position.x += Math.sin((Math.PI / 180) * this.angle) * 10
        this.angle += 5

        if (this.angle > 360) this.angle = 0

        this.position.y += this.velocity.y
        this.hitbox.y = this.position.y
        this.hitbox.x = this.position.x

        this.bullets.forEach((bullet) => {
            bullet.update(dt)
        })

        this.count += dt
        this.time += dt
    }

    render(dt, ctx, canvas) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.frameOriginSize, this.frameOriginSize)
        this.bullets.forEach((bullet) => {
            bullet.render(dt, ctx, canvas)
        })


        // ctx.drawImage(
        //     this.image,
        //     this.frameOriginSize * this.spriteXIndex,
        //     this.frameOriginSize * this.spriteYIndex,
        //     this.frameOriginSize,
        //     this.frameOriginSize,
        //     this.position.x,
        //     this.position.y,
        //     this.frameCanvasSize,
        //     this.frameCanvasSize
        // )
        // Hitbox visible
        // ctx.strokeStyle="rgba(255,0,0,1)";
        // ctx.strokeRect(this.hitbox.x,this.hitbox.y,this.hitbox.w,this.hitbox.h);
    }
}