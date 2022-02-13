declare namespace Doenertrainer {
    let ctx: CanvasRenderingContext2D;
    let background: HTMLImageElement;
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
        move(): void;
        walkthere(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void;
        walkback(walkdirection: String, activwalkstep: number, walkspeed: Number, walkstep: number, walkpath: Number[], walkpathdone: Boolean[]): void;
        draw(): void;
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
        emotion: Number;
        activ: Boolean;
        worker: number;
        constructor(_x: number, _y: number, _worker: number);
        setPosition(_x: number, _y: number): void;
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
}
