import Parallax from "./parallax.js";
import Stars from "./stars.js";

export default class Background {
    constructor(game) {
        this.game = game;
        this.stars = []
        this.Init();
    }

    Init() {
        this.parallax = new Parallax(this.game)
        for (let index = 0; index < 50; index++) {
            this.stars.push(new Stars(Math.random() * this.game.canvas.width, Math.random() * this.game.canvas.height))
        }
    }

    update(dt) {
        this.parallax.update(dt)
        this.stars.forEach((star, index) => {
            if (star.position.y > this.game.canvas.height) {
                setTimeout(() => {
                    this.stars.splice(index, 1, new Stars(Math.random() * this.game.canvas.width, -10))
                }, 0)
            }
            star.update(dt);
        })
    }

    render(dt, ctx, canvas) {
        this.parallax.render(dt, ctx, canvas)
        for (var i in this.stars) {
            this.stars[i].render(dt, ctx, canvas)
        }
    }
}