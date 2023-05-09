export default class Explosion {
    constructor(x, y, scale = 1) {
        this.scale = scale
        this.Xindex = 0
        this.Yindex = 0
        this.frameSize = 128
        this.frameCanvasSize = this.frameSize * scale
        this.image = document.getElementById("exp");
        this.position = {
            x: x - this.frameCanvasSize / 2,
            y: y - this.frameCanvasSize / 2,
        }
        
        this.delete = false
        this.delay = 0
        this.audio = new Audio('../sound/explosion2.wav');
        this.playSound()
    }

    playSound() {
        this.audio.volume = 0.4;
        this.audio.play();
    }

    update(dt) {
        if (this.delay > 10) {
            this.Xindex ++
            if (this.Xindex > 3) {
                this.Yindex ++
                if (this.Yindex > 3) {
                    this.delete = true
                }
                this.Xindex = 0
            }
            this.delay = 0
        }
        this.delay += dt
    }

    render(dt, ctx, canvas) {
        ctx.drawImage(this.image, this.frameSize * this.Xindex, this.frameSize * this.Yindex, this.frameSize, this.frameSize, this.position.x, this.position.y, this.frameCanvasSize, this.frameCanvasSize)
    }
}