namespace Doenertrainer {
     export abstract class Moveable {
        expendable: boolean;
        position: Vector;
        spawnpoint: Vector;
        walkstep: number;
        activity: number;

        public move(): void { 
//
         }
        public setActivity(_activity: number): void {
//
         }
        public draw(): void {
            //
         }

        walkthere(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void {
            if (walkpathdone[this.walkstep] == false && this.walkstep == activwalkstep) {
                for (let i: number = 0; i < walkspeed; i++) {
                    if (walkdirection == "backward") {
                        this.position.y++;
                    }
                    if (walkdirection == "forward") {
                        this.position.y--;
                    }
                    if (walkdirection == "left") {
                        this.position.x--;
                    }
                    if (walkdirection == "right") {
                        this.position.x++;
                    }
                    if (this.position.y == walkpath[walkstep]) {
                        walkpathdone[this.walkstep] = true;
                        this.walkstep++;
                        //}
                        break;
                    }
                    if (this.position.x == walkpath[this.walkstep]) {
                        walkpathdone[this.walkstep] = true;
                        this.walkstep++;
                        //}
                        break;
                    }
                }
            }

        }
        walkback(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void {
            if (walkpathdone[this.walkstep] == true && this.walkstep == activwalkstep) {
                for (let i: number = 0; i < walkspeed; i++) {
                    if (walkdirection == "backward") {
                        this.position.y++;
                    }
                    if (walkdirection == "forward") {
                        this.position.y--;
                    }
                    if (walkdirection == "left") {
                        this.position.x--;
                    }
                    if (walkdirection == "right") {
                        this.position.x++;
                    }
                    if (this.position.y == walkpath[walkstep]) {
                        walkpathdone[this.walkstep] = false;
                        this.walkstep++;
                        if (walkstep == walkpathdone.length) {
                            this.setActivity(1);
                        }
                        if (this.position.x == this.spawnpoint.x && this.position.y == this.spawnpoint.y) {
                            console.log(this.position);
                            console.log(this.spawnpoint);
                            this.setActivity(1);
                        }

                        break;
                    }
                    if (this.position.x == walkpath[this.walkstep]) {
                        walkpathdone[this.walkstep] = false;
                        this.walkstep++;
                        if (walkstep == walkpathdone.length) {
                            this.setActivity(1);
                        }
                        if (this.position.x == this.spawnpoint.x && this.position.y == this.spawnpoint.y) {
                            console.log(this.position);
                            console.log(this.spawnpoint);
                            this.setActivity(1);
                        }

                        break;
                    }
                }
            }

        }
    }
}