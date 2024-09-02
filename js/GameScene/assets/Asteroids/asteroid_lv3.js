
export default class AsteroidL3 {
    constructor(game) {
        this.game = game
        this.health = 30
        this.velocity = {
            x: 2 - (Math.random() * 4),
            y: Math.random() * 10 + 2
        }
        this.scale = Math.random() * 0.6 + 0.8
        this.position = {
            x: Math.random() * (game.canvas.width - 30),
            y: -70
        }
        this.spriteXIndex = 0
        this.spriteYIndex = 0
        this.frameOriginSize = 128
        this.frameCanvasSize = this.frameOriginSize * this.scale
        this.image = document.getElementById("asteroid_3");
        this.count = 0
        this.hitbox = {
            x: this.position.x + ((this.frameCanvasSize / 2) - (64 * this.scale / 2)),
            y: this.position.y + ((this.frameCanvasSize / 2) - (64 * this.scale / 2)),
            w: 64 * this.scale,
            h: 64 * this.scale
        }
        this.rotateSpeed = Math.random() * 15 + 15
    }

    update(dt) {
        if (this.count > this.rotateSpeed) {
            this.spriteXIndex ++
            if (this.spriteXIndex > 5) {
                this.spriteYIndex ++
                if (this.spriteYIndex > 5 ) {
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