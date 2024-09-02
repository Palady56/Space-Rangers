import MenuScene from "../../MenuScene/menu.js";
import Player from "../assets/player.js";
import Stars from "../assets/Background/stars.js";
import Background from "../assets/Background/background.js";
import AsteroidLevel1 from "../assets/Asteroids/asteroid_lv1.js"
import AsteroidLevel2 from "../assets/Asteroids/asteroid_lv2.js"
import AsteroidLevel3 from "../assets/Asteroids/asteroid_lv3.js"
import AsteroidLevel4 from "../assets/Asteroids/asteroid_lv4.js"
import Explosion from "../assets/Explosions/explosion.js"
import Explosion2 from "../assets/Explosions/explosion2.js"
import Explosion3 from "../assets/Explosions/explosion3.js"
import Explosion4 from "../assets/Explosions/explosion4.js"

import EnemyL1 from "../assets/Enemies/enemy.js";

export default class LevelOne {
    constructor(game) {
        this.game = game;
        this.count = 0
        this.stars = []
        this.asteroids = []
        this.explosions = []
        this.Init();
    }

    Init() {
        this.game.score = 0
        this.background = new Background(this.game)
        this.player = new Player(this.game)
        for (let index = 0; index < 50; index++) {
            this.stars.push(new Stars(Math.random() * this.game.canvas.width, Math.random() * this.game.canvas.height))
        }
        // this.audio = new Audio('../sound/bg.ogg');
        this.audio = document.getElementById("music");
        this.playSound()
    }

    playSound() {
        this.audio.volume = 0.2;
        this.audio.loop = true
        this.audio.play();
    }

    pauseSound() {
        this.audio.pause();
        this.audio.currentTime = 0
    }

    update(dt) {
        this.player.update(dt);
        this.background.update(dt)
        this.stars.forEach((star, index) => {
            if (star.position.y > this.game.canvas.height) {
                setTimeout(() => {
                    this.stars.splice(index, 1, new Stars(Math.random() * this.game.canvas.width, -10))
                }, 0)
            }
            star.update(dt);
        })

        if (this.count > 1000) {
            this.asteroids.push(new EnemyL1(this.game))
            this.count = 0
        }

        this.asteroids.forEach((asteroid, indexAsteroid) => {
            if (asteroid.position.y > this.game.canvas.height) this.asteroids.splice(indexAsteroid, 1) 

            asteroid.update(dt);
            this.player.bullets.forEach((bullet, indexBullet) => {
                if (
                    asteroid.hitbox.x < bullet.hitbox.x + bullet.hitbox.w &&
                    asteroid.hitbox.x + asteroid.hitbox.w > bullet.hitbox.x &&
                    asteroid.hitbox.y < bullet.hitbox.y + bullet.hitbox.h &&
                    asteroid.hitbox.y + asteroid.hitbox.h > bullet.hitbox.y
                  ) {
                    // Collision detected!
                    asteroid.health = asteroid.health - bullet.power
                    this.game.score = this.game.score + bullet.power
                    if (asteroid.health < 1) {
                        this.explosions.push(
                            new Explosion(
                                asteroid.position.x + asteroid.frameCanvasSize / 2,
                                asteroid.position.y + asteroid.frameCanvasSize / 2,
                                asteroid.scale * 2
                            )
                        )
                        this.game.score = this.game.score + asteroid.health
                        this.player.bullets.splice(indexBullet, 1)
                        this.asteroids.splice(indexAsteroid, 1)
                    }else{
                        this.explosions.push(
                            new Explosion4(
                                bullet.position.x + bullet.image.width  / 2,
                                bullet.position.y + 25,
                                0.2
                            )
                        )
                        this.player.bullets.splice(indexBullet, 1)
                    }
                    asteroid.velocity.y = asteroid.velocity.y - 1
                }
            })

            if (this.player.live) {
                if (
                    asteroid.hitbox.x < this.player.hitbox1.x + this.player.hitbox1.w &&
                    asteroid.hitbox.x + asteroid.hitbox.w > this.player.hitbox1.x &&
                    asteroid.hitbox.y < this.player.hitbox1.y + this.player.hitbox1.h &&
                    asteroid.hitbox.y + asteroid.hitbox.h > this.player.hitbox1.y
                ) {
                    this.player.live = false
                    this.pauseSound()
                    this.explosions.push(
                        new Explosion2(
                            this.game,
                            this.player.position.x + this.player.width / 2,
                            this.player.position.y + this.player.height / 2,
                            4
                        )
                    )
                }

                if (
                    asteroid.hitbox.x < this.player.hitbox2.x + this.player.hitbox2.w &&
                    asteroid.hitbox.x + asteroid.hitbox.w > this.player.hitbox2.x &&
                    asteroid.hitbox.y < this.player.hitbox2.y + this.player.hitbox2.h &&
                    asteroid.hitbox.y + asteroid.hitbox.h > this.player.hitbox2.y
                ) {
                    this.player.live = false
                    this.pauseSound()
                    this.explosions.push(
                        new Explosion2(
                            this.game,
                            this.player.position.x + this.player.width / 2,
                            this.player.position.y + this.player.height / 2,
                            4
                        )
                    )
                }
            }
        })

        this.explosions.forEach((explosion, index) => {
            if (explosion.delete) {
                this.explosions.splice(index, 1)
            }
            explosion.update(dt)
        })

        this.count += dt

        if (this.player.live) {
            if (this.game.keys['Escape']) {
                this.pauseSound()
                this.game.setScene(MenuScene);
            } 
        }
        
    }
    
    render(dt, ctx, canvas) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.background.render(dt, ctx, canvas)
        for (var i in this.stars) {
            this.stars[i].render(dt, ctx, canvas)
        }

        if (this.asteroids.length > 0) {
            for (var i in this.asteroids) {
                this.asteroids[i].render(dt, ctx, canvas)
            }
        }

        if (this.player.live) this.player.render(dt, ctx, canvas);

        this.explosions.forEach((explosion) => {
            explosion.render(dt, ctx, canvas)
        })

        this.hud.render(dt, ctx, canvas)
        
    }
}