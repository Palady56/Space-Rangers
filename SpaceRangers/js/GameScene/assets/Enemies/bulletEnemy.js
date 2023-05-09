
export default class BulletEnemyL1 {
    constructor(player, x, y) {

        this.player = {
            dx: (player.position.x + player.width / 2) - x,
            dy: (player.position.y + player.height / 2) - y,
        }

        this.d = Math.sqrt(this.player.dx*this.player.dx + this.player.dy*this.player.dy)

        this.velocity = {
            x: 10,
            y: 10
        }
        this.power = 10
        this.image = document.getElementById("bullet");
        this.position = {
            x: x,
            y: y,
        }
        this.hitbox = {
            x: x,
            y: y,
            w: 10,
            h: 10
        }
        this.audio = new Audio('../sound/bullet.ogg');
        this.playSound()
    }
    playSound() {
        this.audio.volume = 0.6;
        this.audio.play();
    }
    update(dt) {

        // if (this.position.x != this.player.x || this.position.y != this.player.y) {
        //     var dx = this.player.x - this.position.x;
        //     var dy = this.player.y - this.position.y;
        //     var d = Math.sqrt(dx*dx + dy*dy);
        //     if (d <= 5) {
        //         this.position.x = this.player.x;
        //         this.position.y = this.player.y;
        //     } else {
        //         this.position.x += 5 * dx / d;
        //         this.position.y += 5 * dy / d;
        //     }
        // }

        this.position.x += this.velocity.x * this.player.dx / this.d;
        this.position.y += this.velocity.y * this.player.dy / this.d;

        // this.position.y -= this.velocity.y + dt / this.velocity.y
        // this.hitbox.y = this.position.y + 15
    }
    render(dt, ctx, canvas) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.position.x, this.position.y, 20, 20)
        // ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.position.x, this.position.y, this.image.width, this.image.height)
    }
}