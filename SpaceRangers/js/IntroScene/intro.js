import MenuScene from "../MenuScene/menu.js";

export default class IntroScene {
    constructor(game) {
        this.logoDuration = 2000;

        this.logoRevealTime = 500;
        this.textTypingTime = 2000;
        this.sceneDisplayTime = 14500;
        this.elapsedTime = 0;
        this.bigText = 'Space Rangers';
        this.infoText = 
        'This is intro scene example - This is intro scene example - This is intro scene example - This is intro scene example - This is intro scene example ... '
        
        this.arrayWords = this.infoText.split(' ')

        this.skipText = 'Press "Esc" to skip this intro'
        this.game = game;
    }

    update(dt) {
        this.elapsedTime += dt;

        if (this.elapsedTime >= this.sceneDisplayTime || this.game.checkKeyPress('Escape')) {
            this.game.setScene(MenuScene);
        }
    }

    render(dt, ctx, canvas) {

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '30px Orbitron';
        ctx.fillStyle = '#fff';
        ctx.textAlign="right";
        ctx.fillText(this.skipText, canvas.width - 60, canvas.height - 40);

        if (this.elapsedTime < this.logoDuration) {
            ctx.globalAlpha = Math.min(1, this.elapsedTime / this.logoRevealTime);
            ctx.font = '80px Zen Dots';
            ctx.fillStyle = '#fff';
            ctx.textAlign="left";
            ctx.fillText(this.bigText, (canvas.width - ctx.measureText(this.bigText).width) / 2, 300);
            ctx.fillRect(canvas.width / 2 - 200, 400, 400, 400);
        }

        
        if (this.elapsedTime > this.logoDuration) {
            // let textProgress = Math.min(1, (this.elapsedTime - this.logoRevealTime) / this.textTypingTime);
            // ctx.font = '20px Helvetica';
            ctx.globalAlpha = 1;
            ctx.font = '20px Orbitron';
            ctx.textAlign="left";
            ctx.fillStyle = '#bbb';
            ctx.textBaseline = 'top';
            // ctx.fillText(this.infoText.substr(0, Math.floor(this.infoText.length * textProgress)), (canvas.width - ctx.measureText(this.infoText).width) / 2, canvas.height / 2 + 80);
            this.wrapText(ctx, this.infoText, (canvas.width - ctx.measureText(this.infoText).width) / 2, canvas.height / 2 + 80, 1000, 30);

            // let wrappedText = this.wrapText(ctx, this.infoText, (canvas.width - ctx.measureText(this.infoText).width) / 2, canvas.height / 2 + 80, 600, 30);
            // wrappedText.forEach(function(lineText) {
            //     ctx.fillText(lineText[0], lineText[1], lineText[2]); 
            // })
        }
    }

    wrapText(ctx, text, x, y, maxWidth, lineHeight) {

        let testLine = ''
        let line = ''
        let oldY = y
        let hgt = lineHeight

        for(var n = 0; n < this.arrayWords.length; n++) {
            testLine += `${this.arrayWords[n]} `
            let metrics = ctx.measureText(testLine)
            if (metrics.width > maxWidth || n === this.arrayWords.length - 1) {
                y += lineHeight
                hgt += lineHeight
                line = `${this.arrayWords[n]} `
                testLine = `${this.arrayWords[n]} `
            }else{
                line += `${this.arrayWords[n]} `
            }
            ctx.fillText(line, x,  y); 
        }

        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "red";
        ctx.rect(x - 20, oldY - 40, maxWidth + 20, hgt + 40);
        ctx.stroke();

        // let textProgress = Math.min(1, (this.elapsedTime - this.logoRevealTime) / this.textTypingTime);
        // let testLine = text.substr(0, Math.floor(text.length * textProgress))

        // if (ctx.measureText(testLine).width > maxWidth) {
        //     testLine = text.substr(0, Math.floor(text.length * textProgress))
        //     y += lineHeight
        // }

        

        // let line = ''
        // let testLine = ''
        // // let lineArray = []
        
        // for(var n = 0; n < arrayWords.length; n++) {

        //     testLine += `${arrayWords[n]} `
        //     let metrics = ctx.measureText(testLine)

        //     if (metrics.width > maxWidth || n === arrayWords.length - 1) {
        //         ctx.fillText(line.substr(0, Math.floor(this.infoText.length * textProgress)), x,  y); 
        //         // lineArray.push([line, x, y])
        //         y += lineHeight
        //         line = `${arrayWords[n]} `
        //         testLine = `${arrayWords[n]} `
        //     }else{
        //         line += `${arrayWords[n]} `
        //     }

        //     // if(n === arrayWords.length - 1) {
        //     //     lineArray.push([line, x, y]);
        //     // }
        // }
        // Return the line array
        // return lineArray;
    }
  }