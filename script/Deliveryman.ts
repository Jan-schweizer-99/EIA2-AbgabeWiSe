namespace Doenertrainer {
    export class Deliveryman {

        position: Vector;
        spawnpoint: Vector;
        emotion: Number;
        public activity: number;   //0 = do nothing 1 = go to warehouse
        warehousewalkpath: Number[] = [805, 340, 741, 668, 336, 166, 476];


        warehousewalkpathback: Number[] = [336, 668, 741, 340, 805, 405, 1109];

        //                             0     1    2   3     4    5    6
        warehousewalkpathDone: Boolean[] = [false, false, false, false, false, false, false];
        walkstep: number = 0;

        constructor(_x: number, _y: number) {
            this.emotion = 0;
            this.position = new Vector(_x, _y);
            this.spawnpoint = new Vector(_x, _y);
            this.activity = 0;
            this.emotion = 0;
            this.setPosition(_x, _y);
            this.setActivity(0);
            this.setSpawnpoint(_x, _y);
        }
        setSpawnpoint(_x: number, _y: number): void {
            this.spawnpoint.x = _x;
            this.spawnpoint.y = _y;
        }
        setPosition(_x: number, _y: number): void {
            this.position.x = _x;
            this.position.y = _y;
        }
        public setActivity(_activity: number): void {
            this.activity = _activity; //set activity //0 = nothing // 1 go warehouse
        }
        move(): void {
            if (this.activity == 0) { 
                // walk to warehouse
                this.walkthere("forward", 0, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                this.walkthere("left", 1, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                this.walkthere("forward", 2, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                this.walkthere("right", 3, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                this.walkthere("forward", 4, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                this.walkthere("left", 5, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                this.walkthere("backward", 6, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                // walk back from warehouse
                this.walkback("forward", 0, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                this.walkback("right", 1, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                this.walkback("backward", 2, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                this.walkback("left", 3, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                this.walkback("backward", 4, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                this.walkback("right", 5, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                this.walkback("backward", 6, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                // reset walksteps
                if (this.walkstep == 7) {
                    this.walkstep = 0;
                }

                //}
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
        draw(): void {
            if (this.activity == 0) {
                this.move();
            }
            ctx.translate(this.position.x, this.position.y);
            drawDeliveryman();
            ctx.translate(this.position.x, this.position.y);
            drawEmotionHappy();
        }
    }
}