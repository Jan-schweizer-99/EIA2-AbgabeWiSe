namespace Doenertrainer {
    export class Customer {

        position: Vector;
        spawnpoint: Vector;
        emotion: Number;
        activity: number;
        worker: number;
        //walkpaths
        walkqueuepath: Number[] = [340, -27];
        walkqueuepathDone: Boolean[] = [false, false];

        walkqueue3: number [] = [999];
        walkqueue3Done: Boolean[] = [false];

        walkqueue2: number [] = [947];
        walkqueue2Done: Boolean[] = [false];
        
        walkqueue1: number [] = [896];
        walkqueue1Done: Boolean[] = [false];

        walkqueueback: number [] = [1051, -27];
        walkqueuebackDone: Boolean[] = [false, false];


        walkstep: number = 0;

        constructor(_x: number, _y: number) {
            this.emotion = 0;
            this.position = new Vector(_x, _y);
            this.spawnpoint = new Vector(_x, _y);
            this.setPosition(_x, _y);
            this.setSpawnpoint(_x, _y);
            this.setActivity(0);
        }
        public setActivity(_activity: number): void {
            this.activity = _activity; //set activity 0 = walk queue  02 = wait in queue and update  03 = walk out  
        }
        setSpawnpoint(_x: number, _y: number): void {
            this.spawnpoint.x = _x;
            this.spawnpoint.y = _y;
        }
        doActivity(): void {
            if (this.activity == 0) {
                // walk queue & decide 
                this.walkthere("left", 0, 8, this.walkstep, this.walkqueuepath, this.walkqueuepathDone);

                if (this.walkstep == 1 && queue <= 3) {
                    queue++;
                    this.walkstep = 0;
                    this.activity = 1;
                }

                //}
            }
            // wait for queue place 3
            if (this.activity == 1 && queue <= 2) {
                
                this.walkthere("forward", 0, 8, this.walkstep, this.walkqueue3, this.walkqueue3Done);
                if (this.walkstep == 1 ) {
                    queue++;
                    this.walkstep = 0;
                    this.activity = 2;
                }
            }
            if (this.activity == 2 && queue <= 1) {
                console.log("help");
                this.walkthere("forward", 0, 8, this.walkstep, this.walkqueue2, this.walkqueue2Done);
                if (this.walkstep == 1 ) {
                    queue++;
                    this.walkstep = 0;
                    this.activity = 3;
                }
            }
            if (this.activity == 3 && queue <= 0) {
                this.walkthere("forward", 0, 8, this.walkstep, this.walkqueue1, this.walkqueue1Done);
                if (this.walkstep == 1 ) {
                    queue++;
                    this.walkstep = 0;
                    this.activity = 2;
                }
            }

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
                            this.setActivity(0);
                        }
                        if (this.position.x == this.spawnpoint.x && this.position.y == this.spawnpoint.y) {
                            console.log(this.position);
                            console.log(this.spawnpoint);
                            this.setActivity(0);
                        }

                        break;
                    }
                    if (this.position.x == walkpath[this.walkstep]) {
                        walkpathdone[this.walkstep] = false;
                        this.walkstep++;
                        if (walkstep == walkpathdone.length) {
                            this.setActivity(0);
                        }
                        if (this.position.x == this.spawnpoint.x && this.position.y == this.spawnpoint.y) {
                            console.log(this.position);
                            console.log(this.spawnpoint);
                            this.setActivity(0);
                        }

                        break;
                    }
                }
            }

        }
        setPosition(_x: number, _y: number): void {
            this.position.x = _x;
            this.position.y = _y;
        }
        draw(): void {
            ctx.translate(this.position.x, this.position.y);
            drawCustomer();

            ctx.translate(this.position.x, this.position.y);
            if (this.emotion == 0) {                                            //emotion
                drawEmotionHappy();
            }
            if (this.emotion == 1) {
                drawEmotionSad();
            }

        }
    }


}
