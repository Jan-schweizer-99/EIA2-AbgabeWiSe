namespace Doenertrainer {
    export class Worker {

        position: Vector;
        emotion: Number;
        activ: Boolean;
        worker: number;

        constructor(_x: number, _y: number, _worker: number ) {
            this.worker = _worker;
            this.emotion = 0;
            this.position = new Vector(_x, _y);
            this.setPosition(_x, _y);

        }

        setPosition(_x: number, _y: number): void {
            this.position.x = _x;
            this.position.y = _y;
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