import MenuScene from "../MenuScene/menu.js";

export default class ExitScene {
    constructor(game) {
        this.game = game;
        this.skipText = 'Press "Esc" to enter menu'
        this.gameOverText = 'Game Over'
        this.scoreText = 'Your score: '+ this.game.score + ' !'
        this.audio = document.getElementById("game-over");
        this.image = document.getElementById("over");
        this.playSound()
    }

    playSound() {
        this.audio.volume = 0.4;
        this.audio.loop = false
        this.audio.play();
    }

    pauseSound() {
        this.audio.pause();
        this.audio.currentTime = 0
    }
  
    update(dt) {
        if (this.game.keys['Escape']) {
            this.pauseSound()
            this.game.setScene(MenuScene);
        }
    }
    render(dt, ctx, canvas) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            0,
            0,
            canvas.width,
            canvas.height
        )

        ctx.font = '20px Goldman';
        ctx.fillStyle = '#fff';
        ctx.textAlign="right";
        ctx.fillText(this.game.authorText, canvas.width - 60, canvas.height - 60);

        // display "game over" text

        ctx.textBaseline = 'top';
        ctx.font = '100px Orbitron';
        ctx.fillStyle = '#ee4024';
        ctx.textAlign="left";
        ctx.fillText(this.gameOverText, (canvas.width - ctx.measureText(this.gameOverText).width) / 2, canvas.height / 2 - 50);

        ctx.font = '30px Goldman';
        ctx.fillStyle = '#fff';
        ctx.fillText(this.skipText, (canvas.width - ctx.measureText(this.skipText).width) / 2, canvas.height / 2 + 100);

        ctx.font = '60px Goldman';
        ctx.fillStyle = '#fff';
        ctx.fillText(this.scoreText, (canvas.width - ctx.measureText(this.scoreText).width) / 2, canvas.height / 2 - 300);
    }
}