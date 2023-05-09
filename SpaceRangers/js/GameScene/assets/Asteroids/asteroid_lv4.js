
export default class AsteroidL4 {
    constructor(game) {
        this.game = game
        this.health = 40

        this.velocity = {
            x: 1 - (Math.random() * 2),
            y: Math.random() * 4 + 4
        }
        this.scale = Math.random() * 0.5 + 0.8
        this.position = {
            x: Math.random() * (game.canvas.width - 40) + 10,
            y: -90
        }
        this.spriteXIndex = 0
        this.spriteYIndex = 0
        this.frameOriginSize = 320
        this.frameCanvasSize = 128 * this.scale
        this.image = document.getElementById("asteroid_4");
        this.count = 0
        this.hitbox = {
            x: this.position.x + ((this.frameCanvasSize / 2) - (100 * this.scale / 2)),
            y: this.position.y + ((this.frameCanvasSize / 2) - (100 * this.scale / 2)),
            w: 100 * this.scale,
            h: 100 * this.scale
        }
        this.rotateSpeed = Math.random() * 20 + 10
    }

    update(dt) {
        if (this.count > this.rotateSpeed) {
            this.spriteXIndex ++
            if (this.spriteXIndex > 4) {
                this.spriteYIndex ++
                if (this.spriteYIndex > 4 ) {
                    this.spriteYIndex = 0
                }
                this.spriteXIndex = 0
            }
            this.count = 0
        }
        this.count += dt
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.hitbox.y += this.velocity.y
        this.hitbox.x += this.velocity.x
    }

    render(dt, ctx, canvas) {
        ctx.drawImage(
            this.image,
            this.frameOriginSize * this.spriteXIndex,
            this.frameOriginSize * this.spriteYIndex,
            this.frameOriginSize,
            this.frameOriginSize,
            this.position.x,
            this.position.y,
            this.frameCanvasSize,
            this.frameCanvasSize
        )
        // Hitbox visible
        // ctx.strokeStyle="rgba(255,0,0,1)";
        // ctx.strokeRect(this.hitbox.x,this.hitbox.y,this.hitbox.w,this.hitbox.h);
    }
}