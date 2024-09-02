import Track from "./track.js"

export default class BackgroundMenu {
    constructor(game) {
        this.game = game
        this.direction = 1
        this.frameWidth = 512
        this.frameHeight = 512
        this.Xindex = 12
        this.width = 256
        this.height = 256
        this.position = {
            x: this.game.canvas.width * 0.2,
            y: this.game.canvas.height / 2
        }
        this.velocity = {
            x: 30,
            y: 5
        }
        this.count = 0
        this.frameTime = 30
        this.animationTime = 0
        this.image = document.getElementById("bg-menu-ship" );
        this.imageFlame = document.getElementById("flame-menu");
        this.imageBG = document.getElementById("bg-menu");
        this.imagePlanet = document.getElementById("bg-menu-planet");
        this.planetX = game.canvas.width,
        this.planetY = Math.random() * game.canvas.height - 200,
        this.flameFrameWidth = 241
        this.flameFrameHeight = 100
        this.XindexFlame = 0
        this.YindexFlame = 0
        this.tracks = []
        this.duration = Math.round(Math.random() * 6000) + 500
        this.dx = 0
        this.start = 0
        this.Init();
    }

    Init() {
        for (let index = 0; index < 20; index++) {
            this.tracks.push(new Track(Math.random() * this.game.canvas.width, Math.random() * this.game.canvas.height))
        }
    }

    update(dt) {

        this.dx -= dt / this.velocity.x
        if (this.dx + this.imageBG.width <= 0 ) {
            this.dx = this.start
        }

        this.planetX -= (dt / this.velocity.x) * 2
        if (this.planetX + this.imagePlanet.width < 0 ) {
            this.planetX = this.game.canvas.width + Math.random() * 2000
            this.planetY = Math.random() * (this.game.canvas.height - this.imagePlanet.height / 2) - 200
        }

        this.tracks.forEach((track, index) => {
            if (track.position.x < 0) {
                setTimeout(() => {
                    this.tracks.splice(index, 1, new Track(this.game.canvas.width, Math.random() * this.game.canvas.height))
                }, 0)
            }
            track.update(dt);
        })
        
        if (this.count > this.duration) {
            this.direction = this.direction * -1;
            this.duration = Math.round(Math.random() * 6000) + 500
            this.count = 0
        }else{
            this.position.y += dt / this.velocity.y * this.direction;
            
            if (this.animationTime >= this.frameTime) {
                this.Xindex += this.direction
                this.animationTime = 0
            }
            if (this.Xindex < 0) this.Xindex = 0
            if (this.Xindex > 24) this.Xindex = 24
            
            if (this.position.y > this.game.canvas.height * 0.7) {
                this.position.y = this.game.canvas.height * 0.7
                
            }

            if (this.position.y < this.game.canvas.height * 0.2) {
                this.position.y = this.game.canvas.height * 0.2
                
            }
        }

        // if (this.move) {
            
            
            


        // }else{
        //     if (this.Xindex !== 12){
        //         this.Xindex -= this.direction
        //     }
        // }

        this.YindexFlame += 1
        if (this.YindexFlame > 24) this.YindexFlame = 0 

        this.count += dt
        this.animationTime += dt
    }

    render(dt, ctx, canvas) {
        ctx.drawImage(this.imageBG, 0, 0, this.imageBG.width, this.imageBG.height, this.dx, 0, this.imageBG.width, canvas.height)
        ctx.drawImage(this.imageBG, 0, 0, this.imageBG.width, this.imageBG.height, this.dx + this.imageBG.width, 0, this.imageBG.width, canvas.height)
        
        ctx.drawImage(
            this.imagePlanet,
            0,
            0,
            this.imagePlanet.width,
            this.imagePlanet.height,
            this.planetX,
            this.planetY,
            this.imagePlanet.width,
            this.imagePlanet.height,
        )

        ctx.drawImage(
            this.imageFlame,
            0,
            this.flameFrameHeight * this.YindexFlame,
            this.flameFrameWidth,
            this.flameFrameHeight,
            this.position.x - this.flameFrameWidth / 2 + 30,
            this.position.y + this.height / 2 - 22,
            this.flameFrameWidth / 2,
            this.flameFrameHeight / 2
        )

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
        ctx.globalAlpha = 0.6
        for (var i in this.tracks) {
            this.tracks[i].render(dt, ctx, canvas)
        }
        ctx.globalAlpha = 1
    }
}