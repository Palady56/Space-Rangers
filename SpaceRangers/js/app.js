import IntroScene from "./IntroScene/intro.js";

class App {
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initInput();
        this.setScene(IntroScene);
        this.start();
        this.score = 0
        this.authorText = 'Design by Palady'
        this.fcf = 1000 / 60  // frame carrier frequency
    }

    initInput() {
        // объект хранит состояния клавиш
        this.keys = {};
        document.addEventListener('keydown', e => {this.keys[e.code] = true; });
        document.addEventListener('keyup', e => { this.keys[e.code] = false; });
    }

    checkKeyPress(keyCode) {
        let isKeyPressed = this.keys[keyCode] || false;
        this.lastKeyState = this.lastKeyState || {};

        if (typeof this.lastKeyState[keyCode] === 'undefined') {
            this.lastKeyState[keyCode] = isKeyPressed;
            return false;
        }

        if (this.lastKeyState[keyCode] !== isKeyPressed) {
            this.lastKeyState[keyCode] = isKeyPressed;
            return isKeyPressed;
        }

        return false;
    }

    setScene(Scene) {
        this.activeScene = new Scene(this);
    }

    update(dt) {
        this.activeScene.update(dt);
    }

    render(dt) {
        this.activeScene.render(dt, this.ctx, this.canvas);
    }
    start() {
        let fps = 60,
            dt = 0;

        let frame = (timestamp) => {
            requestAnimationFrame(frame);
            dt = timestamp - dt
            this.update(dt);
            this.render(dt);

            dt = timestamp
        }
        
        requestAnimationFrame(frame);
    }
}

new App();