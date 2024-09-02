
export default class Stars {
    constructor(x, y) {
        this.width = Math.random() * 3 + 1;
        this.position = {
            x: x,
            y: y,
        }
        this.velocity = {
            y: Math.random() * 10 + 1
        }
        this.color = {
            rg: Math.random() * 150 + 100,
   
            b: 255,
            a: Math.random() * 0.8 + 0.4,
        }
    }

    update(dt) {
        this.position.y += this.velocity.y
    }

    render(dt, ctx, canvas) {
        ctx.fillStyle = `rgba(${this.color.rg}, ${this.color.rg}, ${this.color.b}, ${this.color.a})`
        ctx.fillRect(this.position.x, this.position.y, this.width, this.width)
    }
}