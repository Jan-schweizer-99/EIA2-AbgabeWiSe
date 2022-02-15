namespace Doenertrainer {
    export class Worker {

        position: Vector;
        spawnpoint: Vector;
        emotion: Number;
        activity: number;
        worker: number;

        timer: number = 0;
        overload: number = 0;

        timeafterwork: number; //

        //walkpaths
        warehousewalkpath: Number[] = [274, 741, 668, 336, 166, 476];
        warehousewalkpathback: Number[] = [336, 668, 741, 274, 686];
        warehousewalkpathDone: Boolean[] = [false, false, false, false, false, false, false];

        //cookpahs
        cookwalkpath: Number[] = [56, 745, 79, 821, 98, 884, 138, 874, 823, 765, 686];
        cookwalkpathDone: Boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false];

        cashboxwalkpath: Number[] = [139, 765, 686];
        cashboxpathDone: Boolean[] = [false, false, false, false];

        walkstep: number = 0;

        constructor(_x: number, _y: number, _worker: number ) {
            this.worker = _worker;
            this.emotion = 0;
            this.position = new Vector(_x, _y);
            this.spawnpoint = new Vector(_x, _y);


            this.setPosition(_x, _y);
            this.setSpawnpoint(_x, _y);
            this.setActivity(0);
        }
        public setActivity(_activity: number): void {
            this.activity = _activity; //set activity //0 = nothing // 1 go warehouse //2 cook // 3gocashbox
        }
        setSpawnpoint(_x: number, _y: number): void {
            this.spawnpoint.x = _x;
            this.spawnpoint.y = _y;
            this.warehousewalkpathback[5] = this.spawnpoint.x;
            this.cookwalkpath[11] = this.spawnpoint.x;
            this.cashboxwalkpath[3] = this.spawnpoint.x;
        }
        doActivity(): void {
            this.timer++;
            //console.log(this.timer);
            if (this.activity == 0) {
                if (this.timer == sleep) {
                this.emotion = 1;
                }
                this.overload = 0;
            }
                
            if (this.activity == 1) {
                this.doEmotion();
                // walk to warehouse
                this.walkthere("right", 0, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                this.walkthere("backward", 1, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                this.walkthere("right", 2, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                this.walkthere("forward", 3, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                this.walkthere("left", 4, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                this.walkthere("backward", 5, 8, this.walkstep, this.warehousewalkpath, this.warehousewalkpathDone);
                // walk back from warehouse
                this.walkback("forward", 0, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                this.walkback("right", 1, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                this.walkback("backward", 2, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                this.walkback("left", 3, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                this.walkback("forward", 4, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                this.walkback("left", 5, 8, this.walkstep, this.warehousewalkpathback, this.warehousewalkpathDone);
                // reset walksteps
                if (this.walkstep == 6) {

                    this.walkstep = 0;
                }

                //}
            }
            if (this.activity == 2) { 
                this.doEmotion();
                this.walkthere("left", 0, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                this.walkthere("backward", 1, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                this.walkthere("right", 2, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                this.walkthere("backward", 3, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                this.walkthere("right", 4, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                this.walkthere("backward", 5, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                this.walkthere("right", 6, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                this.walkthere("forward", 7, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                // red sauce
                this.walkthere("forward", 8, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                //white sauce

                this.walkthere("forward", 9, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                this.walkthere("forward", 10, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                this.walkthere("left", 11, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                
                

                //this.walkthere("left", 13, 8, this.walkstep, this.cookwalkpath, this.cookwalkpathDone);
                if (this.walkstep == 12) {
                    this.walkstep = 0;
                    for (let i: number = 0; i < this.cookwalkpathDone.length; i++) {
                        this.cookwalkpathDone[i] = false;
                    }
                    this.setActivity(0);
                }
            }
            if (this.activity == 3) { 
                this.doEmotion();
                this.walkthere("right", 0, 8, this.walkstep, this.cashboxwalkpath, this.cashboxpathDone);
                this.walkthere("backward", 1, 8, this.walkstep, this.cashboxwalkpath, this.cashboxpathDone);
                this.walkthere("forward", 2, 8, this.walkstep, this.cashboxwalkpath, this.cashboxpathDone);
                this.walkthere("left", 3, 8, this.walkstep, this.cashboxwalkpath, this.cashboxpathDone);
                if (this.walkstep == 4) {
                    this.walkstep = 0;
                    for (let i: number = 0; i < this.cashboxpathDone.length; i++) {
                        this.cashboxpathDone[i] = false;
                    }
                    this.setActivity(0);
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
        doEmotion(): void {
            this.timer = 0;
            this.overload++;
            if (this.overload <= overload) {
                this.emotion = 2;
            }
            else {
            this.emotion = 0;
            }
        }
        draw(): void {
            ctx.translate(this.position.x, this.position.y);
            if (this.worker == 0) {
                drawBoss();
            }
            if (this.worker == 1) {
                drawWorker();
            }
            if (this.worker == 2) {
                drawWorker();
            }
            ctx.translate(this.position.x, this.position.y);
            if (this.emotion == 0) {                                            //emotion
                drawEmotionHappy();
            }
            if (this.emotion == 1) {
                drawEmotionSleep();
            }
            if (this.emotion == 2) {
                drawEmotionStressed();
            }

        }
    }
    
    
}
