
import Bullet from "./bullet.js";

export default class Player {
    constructor(app) {
        this.app = app
        this.live = true
        this.width = 192
        this.height = 192

        this.flameFrameWidth = 100
        this.flameFrameHeight = 200
        this.XindexFlame = 0
        this.YindexFlame = 1

        this.position = {
            x: app.canvas.width / 2 - this.width / 2,
            y: app.canvas.height - (this.height + 100)
        }

        this.velocity = {
            x: 17,
            y: 13
        }

        this.bullets = []
        this.intervalShoot = 150
        this.countTime = 1000

        this.image = document.getElementById("player");
        this.imageFlame = document.getElementById("flame");
        this.hitbox1 = {
            x: this.position.x + 75,
            y: this.position.y + 25,
            w: this.width - 150,
            h: this.height - 60
        }
        this.hitbox2 = {
            x: this.position.x + 30,
            y: this.position.y + 110,
            w: this.width - 60,
            h: this.height - 130
        }
        this.frameWidth = 512
        this.frameHeight = 512
        this.Xindex = 12

    }

    update(dt) {
        if (this.app.keys['KeyW'] ||  this.app.keys['ArrowUp']) {
            if (this.position.y > 50) {
                this.position.y -= this.velocity.y / (this.app.fcf / dt); // W
                this.hitbox1.y -= this.velocity.y / (this.app.fcf / dt);
                this.hitbox2.y -= this.velocity.y / (this.app.fcf / dt);
            }
            this.YindexFlame = 0
        }else{
            if (this.YindexFlame === 0) this.YindexFlame = 1
        }
        if (this.app.keys['KeyS'] ||  this.app.keys['ArrowDown']) {
            if (this.position.y + this.height + 30 < this.app.canvas.height) {
                this.position.y += this.velocity.y / (this.app.fcf / dt); // S
                this.hitbox1.y += this.velocity.y / (this.app.fcf / dt);
                this.hitbox2.y += this.velocity.y / (this.app.fcf / dt);
            }
            this.YindexFlame = 2
        }else{
            if (this.YindexFlame === 2) this.YindexFlame = 1
        }

        if (this.app.keys['KeyA'] ||  this.app.keys['ArrowLeft']) {
            if (this.position.x > 0) {
                this.position.x -= this.velocity.x / (this.app.fcf / dt); // A 
                this.hitbox1.x -= this.velocity.x / (this.app.fcf / dt);
                this.hitbox2.x -= this.velocity.x / (this.app.fcf / dt);
                this.Xindex -= 1
                if (this.Xindex < 0) this.Xindex = 0
            }
        }else{
            if (this.Xindex !== 12 && this.Xindex < 12){
                this.Xindex += 1
            }
        }
        if (this.app.keys['KeyD'] ||  this.app.keys['ArrowRight']) {
            if (this.position.x + this.width < this.app.canvas.width) {
                this.position.x += this.velocity.x / (this.app.fcf / dt); // D
                this.hitbox1.x += this.velocity.x / (this.app.fcf / dt);
                this.hitbox2.x += this.velocity.x / (this.app.fcf / dt);
                this.Xindex += 1
                if (this.Xindex > 24) this.Xindex = 24
            }
        }else{
            if (this.Xindex !== 12 && this.Xindex > 12){
                this.Xindex -= 1
            }
        }
        if (this.app.keys['Space']) {
            if (this.countTime > this.intervalShoot * (this.app.fcf / dt)) {
                this.bullets.push(new Bullet(this.position.x + this.width / 2, this.position.y, this.app.fcf))
                this.countTime = 0
            }
            this.countTime += dt 
        }else{
            this.countTime = 1000
        }

        this.bullets.forEach((bullet, index) => {
            if (bullet.position.y + bullet.height < 0) {
                setTimeout(() => {
                    this.bullets.splice(index, 1)
                }, 0)
            }
            bullet.update(dt)
        })

        this.XindexFlame += 1
        if (this.XindexFlame > 24) this.XindexFlame = 0 
    }


    render(dt, ctx, canvas) {
        this.bullets.forEach((bulet) => {
            bulet.render(dt, ctx, canvas)
        })
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.hitbox1.x, this.hitbox1.y, this.hitbox1.w, this.hitbox1.h)
        // ctx.fillRect(this.hitbox2.x, this.hitbox2.y, this.hitbox2.w, this.hitbox2.h)
        ctx.drawImage(
            this.image,
            this.frameWidth * this.Xindex,
            0,
            this.frameWidth,
            this.frameHeight,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        // ctx.globalAlpha = 0.7
        ctx.drawImage(
            this.imageFlame,
            this.flameFrameWidth * this.XindexFlame,
            this.flameFrameHeight * this.YindexFlame,
            this.flameFrameWidth,
            this.flameFrameHeight,
            this.position.x + this.width / 2 - this.flameFrameWidth / 4,
            this.position.y + this.height - 10, this.flameFrameWidth / 2,
            this.flameFrameHeight / 2
        )
        // ctx.globalAlpha = 1
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.translate(this.posX, this.posY);
        // ctx.rotate(this.angle * Math.PI / 180);
        // ctx.translate(-rectSize / 2, -rectSize / 2);
        // ctx.fillStyle = '#0d0';
        // ctx.fillRect(0, 0, rectSize, rectSize);
    }
}