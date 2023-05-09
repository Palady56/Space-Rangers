import MenuScene from "../../MenuScene/menu.js";
import Player from "../assets/player.js";
import Stars from "../assets/Background/stars.js";
import Background from "../assets/Background/background.js";
import AsteroidLevel1 from "../assets/Asteroids/asteroid_lv1.js";
import AsteroidLevel2 from "../assets/Asteroids/asteroid_lv2.js";
import AsteroidLevel3 from "../assets/Asteroids/asteroid_lv3.js";
import AsteroidLevel4 from "../assets/Asteroids/asteroid_lv4.js";
import Explosion from "../assets/Explosions/explosion.js";
import Explosion2 from "../assets/Explosions/explosion2.js";
import Explosion3 from "../assets/Explosions/explosion3.js";
import Explosion4 from "../assets/Explosions/explosion4.js";

import EnemyL1 from "../assets/Enemies/enemy.js";

import ExitScene from "../../ScoreScene/exit.js"

export default class LevelOne {
    constructor(game) {
        this.game = game;
        this.globalTimer = 0;
        this.countAsteroids = 0;

        this.intervalAsteroids = 300;
        this.collisionObjects = [];
        this.notCollisionObjects = [];
        this.audio = document.getElementById("music");
        this.Init();
    }

    Init() {
        this.game.score = 0;
        this.background = new Background(this.game);
        this.player = new Player(this.game);
        this.playSound();
    }

    playSound() {
        this.audio.volume = 0.2;
        this.audio.loop = true;
        this.audio.play();
    }

    pauseSound() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    update(dt) {
        this.player.update(dt);
        this.background.update(dt);

        if (this.countAsteroids > this.intervalAsteroids && this.globalTimer > 1000 && this.globalTimer < 21000) {
            this.collisionObjects.push(new AsteroidLevel1(this.game));
            this.countAsteroids = 0;
        }

        if (this.countAsteroids > this.intervalAsteroids * 0.8 && this.globalTimer > 22000 && this.globalTimer < 42000) {
            this.collisionObjects.push(new AsteroidLevel2(this.game));
            this.countAsteroids = 0;
        }

        if (this.countAsteroids > this.intervalAsteroids * 0.7 && this.globalTimer > 44000 && this.globalTimer < 64000) {
            this.collisionObjects.push(new AsteroidLevel3(this.game));
            this.countAsteroids = 0;
        }

        if (this.countAsteroids > this.intervalAsteroids * 0.5 && this.globalTimer > 66000 && this.globalTimer < 86000) {
            this.collisionObjects.push(new AsteroidLevel4(this.game));
            this.countAsteroids = 0;
        }

        let i = 0;
        let destroy = false

        while (i < this.collisionObjects.length) {
            let object = this.collisionObjects[i];
            if (
                object.position.y > this.game.canvas.height + 100 ||
                object.position.y < -100 ||
                object.position.x < -100 ||
                object.position.x > this.game.canvas.width + 100
            ) {
                this.collisionObjects.splice(i, 1);
                destroy = true;
            } else {
                object.update(dt);

                let bulletIndex = 0;
                while (bulletIndex < this.player.bullets.length) {
                    let bullet = this.player.bullets[bulletIndex];
                    if (
                        object.hitbox.x < bullet.hitbox.x + bullet.hitbox.w &&
                        object.hitbox.x + object.hitbox.w > bullet.hitbox.x &&
                        object.hitbox.y < bullet.hitbox.y + bullet.hitbox.h &&
                        object.hitbox.y + object.hitbox.h > bullet.hitbox.y
                    ) {
                        // Collision detected!
                        object.health = object.health - bullet.power;
                        this.game.score = this.game.score + bullet.power;

                        if (object.health < 1) {
                            this.notCollisionObjects.push(
                                new Explosion(
                                    object.position.x + object.frameCanvasSize / 2,
                                    object.position.y + object.frameCanvasSize / 2,
                                    object.scale * 2
                                )
                            )
                            this.game.score = this.game.score + object.health;
                            this.player.bullets.splice(bulletIndex, 1);
                            this.collisionObjects.splice(i, 1);
                            destroy = true;
                        } else {
                            this.notCollisionObjects.push(
                                new Explosion4(
                                    bullet.position.x + bullet.image.width / 2,
                                    bullet.position.y + 25,
                                    0.2
                                )
                            )
                            this.player.bullets.splice(bulletIndex, 1);
                            object.velocity.y = object.velocity.y - 1;
                        }

                    }else{
                        ++bulletIndex;
                    }
                }

                if (this.player.live) {
                    if (
                        (object.hitbox.x < this.player.hitbox1.x + this.player.hitbox1.w &&
                        object.hitbox.x + object.hitbox.w > this.player.hitbox1.x &&
                        object.hitbox.y < this.player.hitbox1.y + this.player.hitbox1.h &&
                        object.hitbox.y + object.hitbox.h > this.player.hitbox1.y) ||
                        (object.hitbox.x < this.player.hitbox2.x + this.player.hitbox2.w &&
                        object.hitbox.x + object.hitbox.w > this.player.hitbox2.x &&
                        object.hitbox.y < this.player.hitbox2.y + this.player.hitbox2.h &&
                        object.hitbox.y + object.hitbox.h > this.player.hitbox2.y)
                    ) {
                        this.player.live = false;
                        this.pauseSound();
                        this.notCollisionObjects.push(
                            new Explosion2(
                                this.game,
                                this.player.position.x + this.player.width / 2,
                                this.player.position.y + this.player.height / 2,
                                4
                            )
                        )
                    }
                }

                if (this.player.live === false) setTimeout(()=>this.game.setScene(ExitScene), 2000)

                destroy ? destroy = false : ++i;
            }
        }

        // console.time('map');
        // this.collisionObjects.forEach((object, index) => {
        //     if (
        //         object.position.y > this.game.canvas.height + 100 ||
        //         object.position.y < -100 ||
        //         object.position.x < -100 ||
        //         object.position.x > this.game.canvas.width + 100
        //     ) {
        //         // let tmpIndex = index;
        //         setTimeout(() => { this.collisionObjects.splice(index, 1) }, 0)
        //         // this.collisionObjects.splice(index, 1)
        //     }
        //     object.update(dt);
        //     this.player.bullets.forEach((bullet, indexBullet) => {
        //         if (
        //             object.hitbox.x < bullet.hitbox.x + bullet.hitbox.w &&
        //             object.hitbox.x + object.hitbox.w > bullet.hitbox.x &&
        //             object.hitbox.y < bullet.hitbox.y + bullet.hitbox.h &&
        //             object.hitbox.y + object.hitbox.h > bullet.hitbox.y
        //         ) {
        //             // Collision detected!
        //             object.health = object.health - bullet.power
        //             this.game.score = this.game.score + bullet.power
        //             if (object.health < 1) {
        //                 this.notCollisionObjects.push(
        //                     new Explosion(
        //                         object.position.x + object.frameCanvasSize / 2,
        //                         object.position.y + object.frameCanvasSize / 2,
        //                         object.scale * 2
        //                     )
        //                 )
        //                 this.game.score = this.game.score + object.health
        //                 setTimeout(() => { this.player.bullets.splice(indexBullet, 1) }, 0)
        //                 setTimeout(() => { this.collisionObjects.splice(index, 1) }, 0)
        //                 // this.player.bullets.splice(indexBullet, 1)
        //                 // this.collisionObjects.splice(index, 1)
        //             } else {
        //                 this.notCollisionObjects.push(
        //                     new Explosion4(
        //                         bullet.position.x + bullet.image.width / 2,
        //                         bullet.position.y + 25,
        //                         0.2
        //                     )
        //                 )
        //                 setTimeout(() => { this.player.bullets.splice(indexBullet, 1) }, 0)
        //                 // this.player.bullets.splice(indexBullet, 1)
        //             }
        //             object.velocity.y = object.velocity.y - 1
        //         }
        //     })

        //     if (this.player.live) {
        //         if (
        //             object.hitbox.x < this.player.hitbox1.x + this.player.hitbox1.w &&
        //             object.hitbox.x + object.hitbox.w > this.player.hitbox1.x &&
        //             object.hitbox.y < this.player.hitbox1.y + this.player.hitbox1.h &&
        //             object.hitbox.y + object.hitbox.h > this.player.hitbox1.y
        //         ) {
        //             this.player.live = false
        //             this.pauseSound()
        //             this.notCollisionObjects.push(
        //                 new Explosion2(
        //                     this.game,
        //                     this.player.position.x + this.player.width / 2,
        //                     this.player.position.y + this.player.height / 2,
        //                     4
        //                 )
        //             )
        //         }
        //     }
        // })
        // console.timeEnd('map');


// console.time('map');
        // this.notCollisionObjects.forEach((object, index) => {
        //     if (object.delete) {
        //         setTimeout(() => {this.notCollisionObjects.splice(index, 1)}, 0)
        //     }else{
        //         object.update(dt)
        //     }

        // })
// console.timeEnd('map');

        i = 0;
        while (i < this.notCollisionObjects.length) {
            if (this.notCollisionObjects[i].delete) {
                this.notCollisionObjects.splice(i, 1)
            } else {
                this.notCollisionObjects[i].update(dt)
                ++i;
            }
        }

        this.globalTimer += dt;
        this.countAsteroids += dt;

        // Exit to menu
        if (this.player.live) {
            if (this.game.keys['Escape']) {
                this.pauseSound()
                this.game.setScene(MenuScene);
            }
        }
    }

    render(dt, ctx, canvas) {
        this.background.render(dt, ctx, canvas)
        this.collisionObjects.forEach((object) => {
            object.render(dt, ctx, canvas);
        })
        if (this.player.live) this.player.render(dt, ctx, canvas);
        this.notCollisionObjects.forEach((object) => {
            object.render(dt, ctx, canvas)
        })
    }
}