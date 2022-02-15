declare namespace Doenertrainer {
    let ctx: CanvasRenderingContext2D;
    let queue: number;
    let overload: number;
    let sleep: number;
    let timer: number;
    let background: HTMLImageElement;
}
declare namespace Doenertrainer {
    class Customer {
        position: Vector;
        spawnpoint: Vector;
        emotion: Number;
        activity: number;
        worker: number;
        walkqueuepath: Number[];
        walkqueuepathDone: Boolean[];
        walkqueue3: number[];
        walkqueue3Done: Boolean[];
        walkqueue2: number[];
        walkqueue2Done: Boolean[];
        walkqueue1: number[];
        walkqueue1Done: Boolean[];
        walkqueueback: number[];
        walkqueuebackDone: Boolean[];
        walkstep: number;
        constructor(_x: number, _y: number);
        setActivity(_activity: number): void;
        setSpawnpoint(_x: number, _y: number): void;
        doActivity(): void;
        walkthere(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void;
        walkback(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void;
        setPosition(_x: number, _y: number): void;
        draw(): void;
    }
}
declare namespace Doenertrainer {
    class Deliveryman {
        position: Vector;
        spawnpoint: Vector;
        emotion: Number;
        activity: number;
        warehousewalkpath: Number[];
        warehousewalkpathback: Number[];
        warehousewalkpathDone: Boolean[];
        walkstep: number;
        constructor(_x: number, _y: number);
        setSpawnpoint(_x: number, _y: number): void;
        setPosition(_x: number, _y: number): void;
        setActivity(_activity: number): void;
        doActivity(): void;
        walkthere(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void;
        walkback(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void;
        draw(): void;
    }
}
declare namespace Doenertrainer {
    class Food {
        bread: number;
        sauce: number;
        ingredients: number[];
        ordername: string;
        saucename: string;
        extraName: string;
        position: Vector;
        constructor(_recept: number);
        getnameoforder(): void;
        setExtraingredient(_ingredient: number): void;
        setsauce(_sauce: number): void;
        setbread(_bread: number): void;
        getingredient(_ingredient: number): number;
        getbread(_ingredient: number): number;
        draw(_x: number, _y: number): void;
    }
}
declare namespace Doenertrainer {
    abstract class Moveable {
        expendable: boolean;
        position: Vector;
        spawnpoint: Vector;
        walkstep: number;
        activity: number;
        move(): void;
        setActivity(_activity: number): void;
        draw(): void;
        walkthere(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void;
        walkback(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void;
    }
}
declare namespace Doenertrainer {
    class Vector {
        x: number;
        y: number;
        constructor(_x: number, _y: number);
        set(_x: number, _y: number): void;
        scale(_factor: number): void;
        add(_addend: Vector): void;
        copy(): Vector;
    }
}
declare namespace Doenertrainer {
    class Worker {
        position: Vector;
        spawnpoint: Vector;
        emotion: Number;
        activity: number;
        worker: number;
        timer: number;
        overload: number;
        timeafterwork: number;
        warehousewalkpath: Number[];
        warehousewalkpathback: Number[];
        warehousewalkpathDone: Boolean[];
        cookwalkpath: Number[];
        cookwalkpathDone: Boolean[];
        cashboxwalkpath: Number[];
        cashboxpathDone: Boolean[];
        walkstep: number;
        constructor(_x: number, _y: number, _worker: number);
        setActivity(_activity: number): void;
        setSpawnpoint(_x: number, _y: number): void;
        doActivity(): void;
        walkthere(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void;
        walkback(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void;
        setPosition(_x: number, _y: number): void;
        doEmotion(): void;
        draw(): void;
    }
}
declare namespace Doenertrainer {
    function drawBoss(): void;
    function drawWorker(): void;
    function drawCustomer(): void;
    function drawDeliveryman(): void;
    function drawEmotionHappy(): void;
    function drawEmotionSad(): void;
    function drawEmotionSleep(): void;
    function drawEmotionStressed(): void;
    function drawLamacun(): void;
    function drawYufka(): void;
    function drawDoner(): void;
}
