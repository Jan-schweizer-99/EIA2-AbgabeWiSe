namespace Doenertrainer {

    export let crc2: CanvasRenderingContext2D;

    //let sky: Sky = new Sky(2);
    window.addEventListener("load", hndLoad);

    let workerValue: number;
    let warehouseCapacity: number;
    let customerPerMinute: number;
    let overload: number;
    let sleep: number;

    export let background: HTMLImageElement = new Image();
    background.src = "pictures/background.png";



    function hndLoad(_event: Event): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        let workerValue: HTMLInputElement = <HTMLInputElement>document.querySelector("input#workervalue");
        let warehouseCapacity: HTMLInputElement = <HTMLInputElement>document.querySelector("input#warehousecapacity");
        let customerPerMinute: HTMLInputElement = <HTMLInputElement>document.querySelector("input#customerperminute");
        let overload: HTMLInputElement = <HTMLInputElement>document.querySelector("input#overload");
        let sleep: HTMLInputElement = <HTMLInputElement>document.querySelector("input#sleep");
        let start: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#startgame");
        let task: HTMLButtonElement = <HTMLButtonElement>document.querySelector("select#tasks");



        crc2 = canvas.getContext("2d")!;
        workerValue.addEventListener("input", updateStartevalues);
        warehouseCapacity.addEventListener("input", updateStartevalues);
        customerPerMinute.addEventListener("input", updateStartevalues);
        overload.addEventListener("input", updateStartevalues);
        sleep.addEventListener("input", updateStartevalues);
        start.addEventListener("click", startGame);
        task.addEventListener("input", updatetaskmenu);


    }
    function startGame(_event: Event): void {
        let starScreen: HTMLDivElement = <HTMLDivElement>document.querySelector("Div#starSettings");
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        canvas.hidden = false;
        starScreen.hidden = true;
        setInterval(update, 50);

    }
    function update(): void {
        crc2.drawImage(background, 0, 0);
        console.log("peter");
    }
    function updatetaskmenu(_event: Event): void {
        
        let orderMenu: HTMLDivElement = <HTMLDivElement>document.querySelector("Div#ordermenu");
        let cookMenu: HTMLDivElement = <HTMLDivElement>document.querySelector("Div#cookmenu");
        let serveMenu: HTMLDivElement = <HTMLDivElement>document.querySelector("Div#servemenu");
        let goWarehouseMenu: HTMLDivElement = <HTMLDivElement>document.querySelector("Div#gowarehousemenu");
        let deliverwarehousemenu: HTMLDivElement = <HTMLDivElement>document.querySelector("Div#deliverwarehousemenu");

        orderMenu.hidden = true;
        cookMenu.hidden = true;
        serveMenu.hidden = true;
        serveMenu.hidden = true;
        goWarehouseMenu.hidden = true;
        deliverwarehousemenu.hidden = true;

        if ((<HTMLInputElement>_event.target).value == "0") {
            orderMenu.hidden = false;
        }
        if ((<HTMLInputElement>_event.target).value == "1") {
            cookMenu.hidden = false;
        }
        if ((<HTMLInputElement>_event.target).value == "2") {
            serveMenu.hidden = false;
        }
        if ((<HTMLInputElement>_event.target).value == "3") {
            goWarehouseMenu.hidden = false;
        }
        if ((<HTMLInputElement>_event.target).value == "4") {
            deliverwarehousemenu.hidden = false;
        }

        
    }




    function updateStartevalues(_event: Event): void {

        if ((<HTMLInputElement>_event.target as Element).id == "workervalue") {
            workerValue = Number((<HTMLInputElement>_event.target).value);
            document.getElementById("labelworkervalue").innerHTML = "Arbeiterzahl: " + workerValue;
            let workerone: HTMLInputElement = <HTMLInputElement>document.querySelector("input#workerone");
            let workertwo: HTMLInputElement = <HTMLInputElement>document.querySelector("input#workertwo");
            let workerthree: HTMLInputElement = <HTMLInputElement>document.querySelector("input#workerthree");
            let workeronelabel: HTMLLabelElement = <HTMLLabelElement>document.querySelector("label#workeronelabel");
            let workertwolabel: HTMLLabelElement = <HTMLLabelElement>document.querySelector("label#workertwolabel");
            let workerthreelabel: HTMLLabelElement = <HTMLLabelElement>document.querySelector("label#workerthreelabel");
            
            workerone.hidden = true;
            workertwo.hidden = true;
            workerthree.hidden = true;

            workeronelabel.hidden = false;
            workertwolabel.hidden = false;
            workerthreelabel.hidden = false;

            workerone.checked = false;
            workertwo.checked = false;
            workerthree.checked = false;

            if (workerValue == 1) {
                workerone.hidden = false;
                workerone.checked = true;

                workertwolabel.hidden = true;
                workerthreelabel.hidden = true;

            }
            if (workerValue == 2) {
                workerone.hidden = false;
                workertwo.hidden = false;
                workerone.checked = true;


                workerthreelabel.hidden = true;

            }
            if (workerValue == 3) {
                workerone.hidden = false;
                workertwo.hidden = false;
                workerthree.hidden = false;
                workerone.checked = true;
            }



            console.log(workerValue);

        }
        if ((<HTMLInputElement>_event.target as Element).id == "warehousecapacity") {
            warehouseCapacity = Number((<HTMLInputElement>_event.target).value);
            document.getElementById("labelwarehousecapacity").innerHTML = "Wahrenhauskapazität: " + warehouseCapacity;
            console.log(warehouseCapacity);
        }
        if ((<HTMLInputElement>_event.target as Element).id == "customerperminute") {
            customerPerMinute = Number((<HTMLInputElement>_event.target).value);
            document.getElementById("labelcustomerperminute").innerHTML = "Besucher pro Minute: " + customerPerMinute;
            console.log(customerPerMinute);
        }
        if ((<HTMLInputElement>_event.target as Element).id == "overload") {
            overload = Number((<HTMLInputElement>_event.target).value);
            document.getElementById("labeloverload").innerHTML = "Überforderung cooldown ( " + overload + "Sekunden)";
            console.log(overload);
        }
        if ((<HTMLInputElement>_event.target as Element).id == "sleep") {
            sleep = Number((<HTMLInputElement>_event.target).value);
            document.getElementById("labelsleep").innerHTML = "einschlafen cooldown ( " + sleep + " Sekunden)";
            console.log(sleep);
        }
    }
}