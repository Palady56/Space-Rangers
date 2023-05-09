import IntroScene from "../IntroScene/intro.js";
import GameScene from "../GameScene/game.js";
import ExitScene from "../ScoreScene/exit.js";
import BackgroundMenu from "./background/backgroundMenu.js";

export default class MenuScene {
    constructor(game) {
        this.game = game;
        this.mute = false;
        this.opacityDirection = 500;
        this.menuActiveOpacity = 0;
        this.menuIndex = 0;
        this.menuTitle = 'Game Menu';
        this.menuItems = [
            'Start game',
            'Intro scene',
            'Scores'
        ];
        this.background = new BackgroundMenu(this.game)
        this.audio = document.getElementById("menu-music");
        // this.audio = new Audio('../../sound/menu.mp3');
        this.audioSelect = new Audio('../../sound/select.mp3');
   
        this.playSound()
        // GameScene.pauseSound()
    }
    playSound() {
      this.audio.volume = 0.4;
      this.audio.loop = false
      this.audio.play();
    }

    playSoundSelect() {
      this.audioSelect.volume = 0.8;
      this.audioSelect.loop = false
      this.audioSelect.play();
    }

    pauseSoundSelect() {
      this.audioSelect.pause();
      this.audioSelect.currentTime = 0
  }

    pauseSound() {
        this.audio.pause();
        this.audio.currentTime = 0
    }
    update(dt) {
        // calculate active menu item opacity
        let opacityValue = this.menuActiveOpacity + dt / this.opacityDirection;
        if (opacityValue > 1 || opacityValue < 0) this.opacityDirection *= -1;
        this.menuActiveOpacity += dt / this.opacityDirection;

        // menu navigation
        if (this.game.checkKeyPress('ArrowDown')) { // DOWN arrow
            this.menuIndex++;
            this.pauseSoundSelect()
            this.playSoundSelect()
            this.menuIndex %= this.menuItems.length;
        } else if (this.game.checkKeyPress('ArrowUp')) { // UP arrow
            this.menuIndex--;
            this.pauseSoundSelect()
            this.playSoundSelect()
            if (this.menuIndex < 0) this.menuIndex = this.menuItems.length -1;
        }

        // menu item selected
        if (this.game.checkKeyPress('Enter')) {
            switch (this.menuIndex) {
            case 0: this.game.setScene(GameScene); this.pauseSound(); break;
            case 1: this.game.setScene(IntroScene); this.pauseSound(); break;
            case 2: this.game.setScene(ExitScene); this.pauseSound(); break;
            }
        }

        this.background.update(dt)

        if (this.game.checkKeyPress('KeyM')) {
            if (this.mute === false) {
                this.pauseSound()
                this.mute = true
            }else{
                this.playSound()
                this.mute = false
            }
        }
    }
    render(dt, ctx, canvas) {
      // fill menu background
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.background.render(dt, ctx, canvas)

        ctx.font = '25px Goldman';
        ctx.fillStyle = '#fff';
        ctx.textAlign="right";
        ctx.fillText('press "M" to music on/off', canvas.width - 60, 60);

        ctx.font = '20px Goldman';
        ctx.fillStyle = '#fff';
        ctx.fillText(this.game.authorText, canvas.width - 60, canvas.height - 60);
        ctx.textAlign="left";

      // draw menu title
      ctx.font = '60px Goldman';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#fff';
      ctx.fillText(this.menuTitle, (canvas.width - ctx.measureText(this.menuTitle).width) / 2, 20);

      // draw menu items
      const itemHeight = 50, fontSize = 30;
      ctx.font = fontSize + 'px Orbitron';
      for (const [index, item] of this.menuItems.entries()) {
        if (index === this.menuIndex) {
          ctx.globalAlpha = this.menuActiveOpacity;
          ctx.fillStyle = '#8a08d3';
          ctx.fillRect(0, canvas.height / 2 + index * itemHeight, canvas.width, itemHeight);
        }

        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff';
        ctx.fillText(item, (canvas.width - ctx.measureText(item).width) / 2, canvas.height / 2 + index * itemHeight + (itemHeight - fontSize) / 2);
      }
    }
  }