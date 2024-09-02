
export default class Track {
    constructor(x, y) {
        this.stroke = Math.random() * 2 + 0.5;
        this.width = Math.random() * 100 + 50;
        this.position = {
            x: x,
            y: y,
        }
        this.velocity = {
            x: Math.random() + 0.5
        }
        this.color = {
            rg: Math.random() * 150 + 100,
   
            b: 255,
            a: Math.random() * 0.8 + 0.4,
        }
    }

    update(dt) {
        this.position.x -= dt * this.velocity.x
    }

    render(dt, ctx, canvas) {
        // ctx.fillStyle = `rgba(${this.color.rg}, ${this.color.rg}, ${this.color.b}, ${this.color.a})`
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.width)
        ctx.lineWidth = this.stroke;
        ctx.strokeStyle = `rgba(${this.color.rg}, ${this.color.rg}, ${this.color.b}, ${this.color.a})`;
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + this.width, this.position.y);
        ctx.stroke();
    }
}