
export default class AsteroidL2 {
    constructor(game) {
        this.game = game
        this.health = 20
        this.velocity = {
            x: 0,
            y: Math.random() * 8 + 2
        }
        this.scale = Math.random() * 0.6 + 0.8
        this.position = {
            x: Math.random() * (game.canvas.width - 30),
            y: -70
        }
        this.spriteXIndex = 0
        this.spriteYIndex = 0
        this.frameOriginSize = 64
        this.frameCanvasSize = this.frameOriginSize * this.scale
        this.image = document.getElementById("asteroid_2");
        this.count = 0
        this.hitbox = {
            x: this.position.x,
            y: this.position.y,
            w: this.frameCanvasSize,
            h: this.frameCanvasSize
        }
        this.rotateSpeed = Math.random() * 20 + 10
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
        
        this.hitbox.y = this.position.y
        this.hitbox.x = this.position.x
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