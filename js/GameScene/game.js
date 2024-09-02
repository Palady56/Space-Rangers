import Hud from "./assets/hud.js";
import LevelOne from "./level_1/main.js";

export default class GameScene {
    constructor(game) {
        this.game = game;
        this.game.score = 0
        this.Init();
    }

    Init() {
        this.hud = new Hud(this.game)
        this.setLevel(LevelOne);
    }

    setLevel(Level) {
        this.activeLevel = new Level(this.game);
    }

    update(dt) {
        this.activeLevel.update(dt);
        this.hud.update(dt);
    }
    
    render(dt, ctx, canvas) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.activeLevel.render(dt, ctx, canvas);
        this.hud.render(dt, ctx, canvas);
    }
}