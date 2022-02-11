"use strict";
var Doenertrainer;
(function (Doenertrainer) {
    //let sky: Sky = new Sky(2);
    window.addEventListener("load", hndLoad);
    let workerValue;
    let warehouseCapacity;
    let customerPerMinute;
    let overload;
    let sleep;
    Doenertrainer.background = new Image();
    Doenertrainer.background.src = "pictures/background.png";
    function hndLoad(_event) {
        let canvas = document.querySelector("#canvas");
        let workerValue = document.querySelector("input#workervalue");
        let warehouseCapacity = document.querySelector("input#warehousecapacity");
        let customerPerMinute = document.querySelector("input#customerperminute");
        let overload = document.querySelector("input#overload");
        let sleep = document.querySelector("input#sleep");
        let start = document.querySelector("button#startgame");
        let task = document.querySelector("select#tasks");
        Doenertrainer.crc2 = canvas.getContext("2d");
        workerValue.addEventListener("input", updateStartevalues);
        warehouseCapacity.addEventListener("input", updateStartevalues);
        customerPerMinute.addEventListener("input", updateStartevalues);
        overload.addEventListener("input", updateStartevalues);
        sleep.addEventListener("input", updateStartevalues);
        start.addEventListener("click", startGame);
        task.addEventListener("input", updatetaskmenu);
    }
    function startGame(_event) {
        let starScreen = document.querySelector("Div#starSettings");
        let canvas = document.querySelector("canvas");
        canvas.hidden = false;
        starScreen.hidden = true;
        setInterval(update, 50);
    }
    function update() {
        Doenertrainer.crc2.drawImage(Doenertrainer.background, 0, 0);
        console.log("peter");
    }
    function updatetaskmenu(_event) {
        let orderMenu = document.querySelector("Div#ordermenu");
        let cookMenu = document.querySelector("Div#cookmenu");
        let serveMenu = document.querySelector("Div#servemenu");
        let goWarehouseMenu = document.querySelector("Div#gowarehousemenu");
        let deliverwarehousemenu = document.querySelector("Div#deliverwarehousemenu");
        orderMenu.hidden = true;
        cookMenu.hidden = true;
        serveMenu.hidden = true;
        serveMenu.hidden = true;
        goWarehouseMenu.hidden = true;
        deliverwarehousemenu.hidden = true;
        if (_event.target.value == "0") {
            orderMenu.hidden = false;
        }
        if (_event.target.value == "1") {
            cookMenu.hidden = false;
        }
        if (_event.target.value == "2") {
            serveMenu.hidden = false;
        }
        if (_event.target.value == "3") {
            goWarehouseMenu.hidden = false;
        }
        if (_event.target.value == "4") {
            deliverwarehousemenu.hidden = false;
        }
    }
    function updateStartevalues(_event) {
        if (_event.target.id == "workervalue") {
            workerValue = Number(_event.target.value);
            document.getElementById("labelworkervalue").innerHTML = "Arbeiterzahl: " + workerValue;
            let workerone = document.querySelector("input#workerone");
            let workertwo = document.querySelector("input#workertwo");
            let workerthree = document.querySelector("input#workerthree");
            let workeronelabel = document.querySelector("label#workeronelabel");
            let workertwolabel = document.querySelector("label#workertwolabel");
            let workerthreelabel = document.querySelector("label#workerthreelabel");
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
        if (_event.target.id == "warehousecapacity") {
            warehouseCapacity = Number(_event.target.value);
            document.getElementById("labelwarehousecapacity").innerHTML = "Wahrenhauskapazität: " + warehouseCapacity;
            console.log(warehouseCapacity);
        }
        if (_event.target.id == "customerperminute") {
            customerPerMinute = Number(_event.target.value);
            document.getElementById("labelcustomerperminute").innerHTML = "Besucher pro Minute: " + customerPerMinute;
            console.log(customerPerMinute);
        }
        if (_event.target.id == "overload") {
            overload = Number(_event.target.value);
            document.getElementById("labeloverload").innerHTML = "Überforderung cooldown ( " + overload + "Sekunden)";
            console.log(overload);
        }
        if (_event.target.id == "sleep") {
            sleep = Number(_event.target.value);
            document.getElementById("labelsleep").innerHTML = "einschlafen cooldown ( " + sleep + " Sekunden)";
            console.log(sleep);
        }
    }
})(Doenertrainer || (Doenertrainer = {}));
var Doenertrainer;
(function (Doenertrainer) {
    function drawbackground() {
        Doenertrainer.crc2.drawImage(Doenertrainer.background, 0, 0);
    }
    Doenertrainer.drawbackground = drawbackground;
})(Doenertrainer || (Doenertrainer = {}));
//# sourceMappingURL=Build.js.map