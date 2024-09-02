
export default class Parallax {
    constructor(game) {
        this.game = game
        this.velocity = {
            y: 1
        }
        this.image = document.getElementById("bg" );
        this.dy = this.image.height - game.canvas.height
        this.start = this.image.height - game.canvas.height
    }

    update(dt) {
        this.dy -= this.velocity.y
        if (this.dy + this.game.canvas.height <= 0 ) {
            this.dy = this.start
        }
    }

    render(dt, ctx, canvas) {
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, -this.dy, canvas.width, this.image.height)
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, -this.dy - this.image.height, canvas.width, this.image.height)
    }
}