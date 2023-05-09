export default class Explosion3 {
    constructor(x, y, scale = 1) {
        this.scale = scale
        this.Xindex = 0
        this.Yindex = 0
        this.frameSizeX = 230
        this.frameSizeY = 223
        this.frameCanvasSizeX = this.frameSizeX * scale
        this.frameCanvasSizeY = this.frameSizeY * scale
        this.image = document.getElementById("exp3");
        this.position = {
            x: x - this.frameCanvasSizeX / 2,
            y: y - this.frameCanvasSizeY / 2,
        }
        
        this.delete = false
        this.delay = 0
        this.audio = new Audio('../sound/explosion.wav');
        this.playSound()
    }

    playSound() {
        this.audio.volume = 0.4;
        this.audio.play();
    }

    update(dt) {
        if (this.delay > 5) {
            this.Xindex ++
            if (this.Xindex > 3) {
                this.Yindex ++
                if (this.Yindex > 2) {
                    this.delete = true
                }
                this.Xindex = 0
            }
            this.delay = 0
        }
        this.delay += dt
    }

    render(dt, ctx, canvas) {
        ctx.drawImage(this.image, this.frameSizeX * this.Xindex, this.frameSizeY * this.Yindex, this.frameSizeX, this.frameSizeY, this.position.x, this.position.y, this.frameCanvasSizeX, this.frameCanvasSizeY)
    }
}