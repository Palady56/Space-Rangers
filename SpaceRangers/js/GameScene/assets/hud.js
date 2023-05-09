
export default class Hud {
    constructor(game) {
        this.game = game
        this.energy = 100
        this.scale = game.canvas.width > 1024 ? game.canvas.width > 2000 ? game.canvas.width > 3200 ? 1 : 0.7 : 0.5 : 0.3
        this.position = {
            x: 100 * this.scale,
            y: 100 * this.scale
        }
        this.frameSize = 170
        this.angle = 0
        this.speedRotate = 16
        this.gradient = this.game.ctx.createLinearGradient(this.position.x + 105 * this.scale, this.position.y - 20 * this.scale, this.position.x + 105 * this.scale + 380 * this.scale, this.position.y - 20 * this.scale)
        this.gradient.addColorStop(0, 'red');
        this.gradient.addColorStop(0.5, 'yellow');
        this.gradient.addColorStop(1, 'green');
        this.image = document.getElementById("hud");

    }

    update(dt) {
        this.angle = this.angle + dt / this.speedRotate;
        if (this.angle > 360) this.angle = 0;
    }

    render(dt, ctx, canvas) {
        ctx.font = (30 * this.scale) + 'px Orbitron';
        ctx.textBaseline = "top";
        ctx.fillStyle = '#fff';
        ctx.textAlign="left";
        ctx.letterSpacing = "7px";
        ctx.fillText('SCORES', canvas.width - 360 * this.scale, this.position.y - 30 * this.scale);
        ctx.drawImage(this.image, 0, 340, 482, this.frameSize,
            canvas.width - 482 * this.scale - 20,
            this.position.y - 70 * this.scale,
            482 * this.scale,
            this.frameSize * this.scale
        );
        ctx.textAlign="right";
        ctx.textBaseline = "middle";
        ctx.font = (40 * this.scale) + 'px Orbitron';
        ctx.fillText(this.game.score,
            canvas.width - 72 * this.scale - 20,
            this.position.y + 46 * this.scale
        );
        ctx.drawImage(this.image, 0, 510, 306, 67,
            canvas.width - 362 * this.scale - 20,
            this.position.y + 10 * this.scale,
            306 * this.scale,
            67 * this.scale
        );
        ctx.font = (30 * this.scale) + 'px Orbitron';
        ctx.textBaseline = "top";
        ctx.textAlign="left";
        ctx.fillText('ENERGY', this.position.x + 105 * this.scale, this.position.y + 36 * this.scale);
        // Установка стиля заливки и отрисовка прямоугольника градиента
        ctx.fillStyle = this.gradient;
        ctx.fillRect(this.position.x + 105 * this.scale, this.position.y - 20 * this.scale, 380 * this.scale, 40 * this.scale);
        ctx.drawImage(this.image, 170, 170, 493, this.frameSize,
            this.position.x + 20 * this.scale,
            this.position.y - 60 * this.scale,
            493 * this.scale,
            this.frameSize * this.scale
        );
        ctx.drawImage(this.image, 340, 0, this.frameSize, this.frameSize,
            this.position.x - this.frameSize * this.scale / 2,
            this.position.y - this.frameSize * this.scale / 2,
            this.frameSize * this.scale,
            this.frameSize * this.scale
        );
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        // Outer ring
        ctx.drawImage(this.image, 0, 0, this.frameSize, this.frameSize,
            -this.frameSize * this.scale / 2,
            -this.frameSize * this.scale / 2,
            this.frameSize * this.scale,
            this.frameSize * this.scale
        );
        ctx.rotate((this.angle * Math.PI) / 180);
        // Transparent ring
        ctx.drawImage(this.image, 510, 0, this.frameSize, this.frameSize,
            -this.frameSize * this.scale / 2,
            -this.frameSize * this.scale / 2,
            this.frameSize * this.scale,
            this.frameSize * this.scale
        );
        ctx.restore();
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate((-this.angle * Math.PI) / 180 / 2);
        ctx.drawImage(this.image, 170, 0, this.frameSize, this.frameSize,
            -this.frameSize * this.scale / 2,
            -this.frameSize * this.scale / 2,
            this.frameSize * this.scale,
            this.frameSize * this.scale
        );
        ctx.restore();
        ctx.font = (30 * this.scale) + 'px Orbitron';
        ctx.textAlign = "center";
        ctx.letterSpacing = "1px";
        ctx.textBaseline = "middle";
        ctx.fillStyle = '#ff2266';
        ctx.fillText( this.energy + '%', this.position.x, this.position.y);
        ctx.drawImage(
            this.image, 0, 170, this.frameSize, this.frameSize,
            this.position.x - this.frameSize * this.scale / 2,
            this.position.y - this.frameSize * this.scale / 2,
            this.frameSize * this.scale,
            this.frameSize * this.scale
        );
    }
}