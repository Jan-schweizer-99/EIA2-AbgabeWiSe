"use strict";
var Doenertrainer;
(function (Doenertrainer) {
    //let sky: Sky = new Sky(2);
    window.addEventListener("load", hndLoad);
    Doenertrainer.queue = 0;
    let workerValue = 2;
    let warehouseCapacity;
    let customerPerMinute;
    Doenertrainer.overload = 40;
    Doenertrainer.sleep = 180;
    let worker = [];
    let customer = [];
    let deliveryman;
    let selectedWorker = 0;
    Doenertrainer.timer = 0;
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
        let workerone = document.querySelector("input#workerone");
        let workertwo = document.querySelector("input#workertwo");
        let workerthree = document.querySelector("input#workerthree");
        let fillupwarehouseButton = document.querySelector("button#fillupwarehous");
        let cookButton = document.querySelector("button#cook");
        let getingredientsButton = document.querySelector("button#getingredients");
        let getorderButton = document.querySelector("button#getorder");
        Doenertrainer.ctx = canvas.getContext("2d");
        workerValue.addEventListener("input", updateStartevalues);
        warehouseCapacity.addEventListener("input", updateStartevalues);
        customerPerMinute.addEventListener("input", updateStartevalues);
        overload.addEventListener("input", updateStartevalues);
        sleep.addEventListener("input", updateStartevalues);
        start.addEventListener("click", startGame);
        task.addEventListener("input", updatetaskmenu);
        workerone.addEventListener("click", updateUI);
        workertwo.addEventListener("click", updateUI);
        workerthree.addEventListener("click", updateUI);
        fillupwarehouseButton.addEventListener("click", calldeliveryman);
        cookButton.addEventListener("click", cookfood);
        getingredientsButton.addEventListener("click", getingredientsfromwarehouse);
        getorderButton.addEventListener("click", getorder);
    }
    function startGame(_event) {
        let starScreen = document.querySelector("Div#starSettings");
        let canvas = document.querySelector("canvas");
        canvas.hidden = false;
        starScreen.hidden = true;
        //spawn workers
        if (workerValue == 3) {
            worker[0] = new Doenertrainer.Worker(58, 686, 0);
            worker[1] = new Doenertrainer.Worker(98, 686, 1);
            worker[2] = new Doenertrainer.Worker(137, 686, 2);
        }
        if (workerValue == 2) {
            worker[0] = new Doenertrainer.Worker(58, 686, 0);
            worker[1] = new Doenertrainer.Worker(98, 686, 1);
        }
        if (workerValue == 1) {
            worker[0] = new Doenertrainer.Worker(58, 686, 0);
        }
        // spawn Deliveryman
        deliveryman = new Doenertrainer.Deliveryman(405, 1109);
        customer[0] = new Doenertrainer.Customer(912, 1051);
        customer[1] = new Doenertrainer.Customer(912, 1051);
        setInterval(update, 50);
    }
    function update() {
        Doenertrainer.timer++;
        console.log(Doenertrainer.sleep);
        Doenertrainer.ctx.drawImage(Doenertrainer.background, 0, 0);
        if (workerValue == 3) {
            worker[0].draw();
            worker[1].draw();
            worker[2].draw();
        }
        if (workerValue == 2) {
            worker[0].draw();
            worker[1].draw();
        }
        if (workerValue == 1) {
            worker[0].draw();
        }
        for (let i = 0; i < worker.length; i++) {
            worker[i].doActivity();
            worker[i].draw();
        }
        deliveryman.doActivity();
        deliveryman.draw();
        customer[0].doActivity();
        customer[0].draw();
        customer[1].doActivity();
        customer[1].draw();
    }
    function updateUI(_event) {
        if (_event.target.value == "workerone") {
            selectedWorker = 0;
            console.log("Arbeiter" + selectedWorker);
        }
        if (_event.target.value == "workertwo") {
            selectedWorker = 1;
            console.log("Arbeiter" + selectedWorker);
        }
        if (_event.target.value == "workerthree") {
            selectedWorker = 2;
            console.log("Arbeiter" + selectedWorker);
        }
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
        //menus
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
    function calldeliveryman(_event) {
        console.log("call deliveryman");
        deliveryman.setActivity(1);
    }
    function cookfood(_event) {
        console.log("coockfood");
        if (worker[selectedWorker].activity == 0) {
            worker[selectedWorker].setActivity(2);
        }
    }
    function getingredientsfromwarehouse(_event) {
        console.log("warehouse");
        if (worker[selectedWorker].activity == 0) {
            worker[selectedWorker].setActivity(1);
        }
    }
    function getorder(_event) {
        console.log("go cashbox");
        if (worker[selectedWorker].activity == 0) {
            worker[selectedWorker].setActivity(3);
        }
    }
    function serveFood(_event) {
        console.log("f");
        if (worker[selectedWorker].activity == 0) {
            deliveryman.setActivity(4);
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
            Doenertrainer.overload = Number(_event.target.value) * 20;
            document.getElementById("labeloverload").innerHTML = "Überforderung cooldown ( " + Doenertrainer.overload / 20 + "Sekunden)";
            console.log(Doenertrainer.overload);
        }
        if (_event.target.id == "sleep") {
            Doenertrainer.sleep = Number(_event.target.value) * 20;
            document.getElementById("labelsleep").innerHTML = "einschlafen cooldown ( " + Doenertrainer.sleep / 20 + " Sekunden)";
            console.log(Doenertrainer.sleep);
        }
    }
})(Doenertrainer || (Doenertrainer = {}));
var Doenertrainer;
(function (Doenertrainer) {
    class Customer {
        position;
        spawnpoint;
        emotion;
        activity;
        worker;
        //walkpaths
        walkqueuepath = [340, -27];
        walkqueuepathDone = [false, false];
        walkqueue3 = [999];
        walkqueue3Done = [false];
        walkqueue2 = [947];
        walkqueue2Done = [false];
        walkqueue1 = [896];
        walkqueue1Done = [false];
        walkqueueback = [1051, -27];
        walkqueuebackDone = [false, false];
        walkstep = 0;
        constructor(_x, _y) {
            this.emotion = 0;
            this.position = new Doenertrainer.Vector(_x, _y);
            this.spawnpoint = new Doenertrainer.Vector(_x, _y);
            this.setPosition(_x, _y);
            this.setSpawnpoint(_x, _y);
            this.setActivity(0);
        }
        setActivity(_activity) {
            this.activity = _activity; //set activity 0 = walk queue  02 = wait in queue and update  03 = walk out  
        }
        setSpawnpoint(_x, _y) {
            this.spawnpoint.x = _x;
            this.spawnpoint.y = _y;
        }
        doActivity() {
            if (this.activity == 0) {
                // walk queue & decide 
                this.walkthere("left", 0, 8, this.walkstep, this.walkqueuepath, this.walkqueuepathDone);
                if (this.walkstep == 1 && Doenertrainer.queue <= 3) {
                    Doenertrainer.queue++;
                    this.walkstep = 0;
                    this.activity = 1;
                }
                //}
            }
            // wait for queue place 3
            if (this.activity == 1 && Doenertrainer.queue <= 2) {
                this.walkthere("forward", 0, 8, this.walkstep, this.walkqueue3, this.walkqueue3Done);
                if (this.walkstep == 1) {
                    Doenertrainer.queue++;
                    this.walkstep = 0;
                    this.activity = 2;
                }
            }
            if (this.activity == 2 && Doenertrainer.queue <= 1) {
                console.log("help");
                this.walkthere("forward", 0, 8, this.walkstep, this.walkqueue2, this.walkqueue2Done);
                if (this.walkstep == 1) {
                    Doenertrainer.queue++;
                    this.walkstep = 0;
                    this.activity = 3;
                }
            }
            if (this.activity == 3 && Doenertrainer.queue <= 0) {
                this.walkthere("forward", 0, 8, this.walkstep, this.walkqueue1, this.walkqueue1Done);
                if (this.walkstep == 1) {
                    Doenertrainer.queue++;
                    this.walkstep = 0;
                    this.activity = 2;
                }
            }
        }
        walkthere(walkdirection, activwalkstep, walkspeed, walkstep, walkpath, walkpathdone) {
            if (walkpathdone[this.walkstep] == false && this.walkstep == activwalkstep) {
                for (let i = 0; i < walkspeed; i++) {
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
        walkback(walkdirection, activwalkstep, walkspeed, walkstep, walkpath, walkpathdone) {
            if (walkpathdone[this.walkstep] == true && this.walkstep == activwalkstep) {
                for (let i = 0; i < walkspeed; i++) {
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
        setPosition(_x, _y) {
            this.position.x = _x;
            this.position.y = _y;
        }
        draw() {
            Doenertrainer.ctx.translate(this.position.x, this.position.y);
            Doenertrainer.drawCustomer();
            Doenertrainer.ctx.translate(this.position.x, this.position.y);
            if (this.emotion == 0) { //emotion
                Doenertrainer.drawEmotionHappy();
            }
            if (this.emotion == 1) {
                Doenertrainer.drawEmotionSad();
            }
        }
    }
    Doenertrainer.Customer = Customer;
})(Doenertrainer || (Doenertrainer = {}));
var Doenertrainer;
(function (Doenertrainer) {
    class Deliveryman {
        position;
        spawnpoint;
        emotion;
        activity; //0 = do nothing 1 = go to warehouse
        warehousewalkpath = [805, 340, 741, 668, 336, 166, 476];
        warehousewalkpathback = [336, 668, 741, 340, 805, 405, 1109];
        //                             0     1    2   3     4    5    6
        warehousewalkpathDone = [false, false, false, false, false, false, false];
        walkstep = 0;
        constructor(_x, _y) {
            this.emotion = 0;
            this.position = new Doenertrainer.Vector(_x, _y);
            this.spawnpoint = new Doenertrainer.Vector(_x, _y);
            this.activity = 0;
            this.emotion = 0;
            this.setPosition(_x, _y);
            this.setActivity(0);
            this.setSpawnpoint(_x, _y);
        }
        setSpawnpoint(_x, _y) {
            this.spawnpoint.x = _x;
            this.spawnpoint.y = _y;
        }
        setPosition(_x, _y) {
            this.position.x = _x;
            this.position.y = _y;
        }
        setActivity(_activity) {
            this.activity = _activity; //set activity //0 = nothing // 1 go warehouse
        }
        doActivity() {
            if (this.activity == 1) {
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
        walkthere(walkdirection, activwalkstep, walkspeed, walkstep, walkpath, walkpathdone) {
            if (walkpathdone[this.walkstep] == false && this.walkstep == activwalkstep) {
                for (let i = 0; i < walkspeed; i++) {
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
        walkback(walkdirection, activwalkstep, walkspeed, walkstep, walkpath, walkpathdone) {
            if (walkpathdone[this.walkstep] == true && this.walkstep == activwalkstep) {
                for (let i = 0; i < walkspeed; i++) {
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
        draw() {
            Doenertrainer.ctx.translate(this.position.x, this.position.y);
            Doenertrainer.drawDeliveryman();
            Doenertrainer.ctx.translate(this.position.x, this.position.y);
            Doenertrainer.drawEmotionHappy();
        }
    }
    Doenertrainer.Deliveryman = Deliveryman;
})(Doenertrainer || (Doenertrainer = {}));
var Doenertrainer;
(function (Doenertrainer) {
    class Food {
        bread;
        sauce;
        ingredients = [];
        ordername;
        saucename;
        extraName;
        position;
        // constructor(_bread: number, _salad: boolean, _herb: boolean, _onion: boolean, _tomato: boolean, _cheese: boolean, _mincedMeat: boolean, _donerMeat: boolean) {
        //     this.bread = _bread;
        //     this.ingredients[0] = _salad;
        //     this.ingredients[1] = _herb;
        //     this.ingredients[2] = _onion;
        //     this.ingredients[3] = _tomato;
        //     this.ingredients[4] = _cheese;
        //     this.ingredients[5] = _mincedMeat;
        //     this.ingredients[5] = _donerMeat;
        // } 
        constructor(_recept) {
            if (_recept == 0) { //lamacun
                this.bread = 0;
                this.ingredients[0] = 0; //salad
                this.ingredients[1] = 0; //herb
                this.ingredients[2] = 1; //onion
                this.ingredients[3] = 1; //tomato
                this.ingredients[4] = 1; //cheese
                this.ingredients[5] = 1; //minced meet
                this.ingredients[6] = 0; //doner meat
                this.sauce = 0;
            }
            if (_recept == 1) { //doner
                this.bread = 1;
                this.ingredients[0] = 1; //salad
                this.ingredients[1] = 1; //herb
                this.ingredients[2] = 1; //onion
                this.ingredients[3] = 1; //tomato
                this.ingredients[4] = 1; //cheese
                this.ingredients[5] = 0; //minced meet
                this.ingredients[6] = 1; //doner meat
                this.sauce = 0;
            }
            if (_recept == 2) { //yufka
                this.bread = 2;
                this.ingredients[0] = 1; //salad
                this.ingredients[1] = 1; //herb
                this.ingredients[2] = 1; //onion
                this.ingredients[3] = 1; //tomato
                this.ingredients[4] = 0; //cheese
                this.ingredients[5] = 0; //minced meet
                this.ingredients[6] = 1; //doner meat
                this.sauce = 0;
            }
        }
        getnameoforder() {
            if (this.bread == 0) {
                this.ordername = "Lamacun";
            }
            if (this.bread == 1) {
                this.ordername = "Döner";
            }
            if (this.bread == 2) {
                this.ordername = "Yufka";
            }
        }
        setExtraingredient(_ingredient) {
            if (this.ingredients[_ingredient] == 0) {
                this.ingredients[_ingredient]++;
                if (_ingredient == 0) {
                    this.extraName = "mit Salat";
                }
                if (_ingredient == 1) {
                    this.extraName = "mit Kraut";
                }
                if (_ingredient == 2) {
                    this.extraName = "mit Zwiebel";
                }
                if (_ingredient == 3) {
                    this.extraName = "mit Tomate";
                }
                if (_ingredient == 4) {
                    this.extraName = "mit Käse";
                }
                if (_ingredient == 5) {
                    this.extraName = "mit Hackfleisch";
                }
                if (_ingredient == 6) {
                    this.extraName = "mit Dönerfleisch";
                }
            }
        }
        setsauce(_sauce) {
            if (_sauce == 0) { //no sauce
                this.sauce = 0;
                this.saucename = "(keine Soße)";
            }
            if (_sauce == 1) { //white sauce
                this.sauce = 1;
                this.saucename = "(Weisse Soße)";
            }
            if (_sauce == 2) { //red sauce
                this.sauce = 2;
                this.saucename = "(Rote Soße)";
            }
        }
        setbread(_bread) {
            this.bread = _bread;
        }
        //get values
        getingredient(_ingredient) {
            return this.ingredients[_ingredient];
        }
        getbread(_ingredient) {
            return this.bread;
        }
        draw(_x, _y) {
            Doenertrainer.ctx.translate(_x, _y);
            if (this.bread == 0) {
                Doenertrainer.drawLamacun();
            }
            if (this.bread == 1) {
                Doenertrainer.drawDoner();
            }
            if (this.bread == 3) {
                Doenertrainer.drawYufka();
            }
        }
    }
    Doenertrainer.Food = Food;
})(Doenertrainer || (Doenertrainer = {}));
var Doenertrainer;
(function (Doenertrainer) {
    class Moveable {
        expendable;
        position;
        spawnpoint;
        walkstep;
        activity;
        move() {
            //
        }
        setActivity(_activity) {
            //
        }
        draw() {
            //
        }
        walkthere(walkdirection, activwalkstep, walkspeed, walkstep, walkpath, walkpathdone) {
            if (walkpathdone[this.walkstep] == false && this.walkstep == activwalkstep) {
                for (let i = 0; i < walkspeed; i++) {
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
        walkback(walkdirection, activwalkstep, walkspeed, walkstep, walkpath, walkpathdone) {
            if (walkpathdone[this.walkstep] == true && this.walkstep == activwalkstep) {
                for (let i = 0; i < walkspeed; i++) {
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
    Doenertrainer.Moveable = Moveable;
})(Doenertrainer || (Doenertrainer = {}));
var Doenertrainer;
(function (Doenertrainer) {
    class Vector {
        x;
        y;
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        copy() {
            let copy = new Vector(this.x, this.y);
            return (copy);
        }
    }
    Doenertrainer.Vector = Vector;
})(Doenertrainer || (Doenertrainer = {}));
var Doenertrainer;
(function (Doenertrainer) {
    class Worker {
        position;
        spawnpoint;
        emotion;
        activity;
        worker;
        timer = 0;
        overload = 0;
        timeafterwork; //
        //walkpaths
        warehousewalkpath = [274, 741, 668, 336, 166, 476];
        warehousewalkpathback = [336, 668, 741, 274, 686];
        warehousewalkpathDone = [false, false, false, false, false, false, false];
        //cookpahs
        cookwalkpath = [56, 745, 79, 821, 98, 884, 138, 874, 823, 765, 686];
        cookwalkpathDone = [false, false, false, false, false, false, false, false, false, false, false, false];
        cashboxwalkpath = [139, 765, 686];
        cashboxpathDone = [false, false, false, false];
        walkstep = 0;
        constructor(_x, _y, _worker) {
            this.worker = _worker;
            this.emotion = 0;
            this.position = new Doenertrainer.Vector(_x, _y);
            this.spawnpoint = new Doenertrainer.Vector(_x, _y);
            this.setPosition(_x, _y);
            this.setSpawnpoint(_x, _y);
            this.setActivity(0);
        }
        setActivity(_activity) {
            this.activity = _activity; //set activity //0 = nothing // 1 go warehouse //2 cook // 3gocashbox
        }
        setSpawnpoint(_x, _y) {
            this.spawnpoint.x = _x;
            this.spawnpoint.y = _y;
            this.warehousewalkpathback[5] = this.spawnpoint.x;
            this.cookwalkpath[11] = this.spawnpoint.x;
            this.cashboxwalkpath[3] = this.spawnpoint.x;
        }
        doActivity() {
            this.timer++;
            //console.log(this.timer);
            if (this.activity == 0) {
                if (this.timer == Doenertrainer.sleep) {
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
                    for (let i = 0; i < this.cookwalkpathDone.length; i++) {
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
                    for (let i = 0; i < this.cashboxpathDone.length; i++) {
                        this.cashboxpathDone[i] = false;
                    }
                    this.setActivity(0);
                }
            }
        }
        walkthere(walkdirection, activwalkstep, walkspeed, walkstep, walkpath, walkpathdone) {
            if (walkpathdone[this.walkstep] == false && this.walkstep == activwalkstep) {
                for (let i = 0; i < walkspeed; i++) {
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
        walkback(walkdirection, activwalkstep, walkspeed, walkstep, walkpath, walkpathdone) {
            if (walkpathdone[this.walkstep] == true && this.walkstep == activwalkstep) {
                for (let i = 0; i < walkspeed; i++) {
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
        setPosition(_x, _y) {
            this.position.x = _x;
            this.position.y = _y;
        }
        doEmotion() {
            this.timer = 0;
            this.overload++;
            if (this.overload <= Doenertrainer.overload) {
                this.emotion = 2;
            }
            else {
                this.emotion = 0;
            }
        }
        draw() {
            Doenertrainer.ctx.translate(this.position.x, this.position.y);
            if (this.worker == 0) {
                Doenertrainer.drawBoss();
            }
            if (this.worker == 1) {
                Doenertrainer.drawWorker();
            }
            if (this.worker == 2) {
                Doenertrainer.drawWorker();
            }
            Doenertrainer.ctx.translate(this.position.x, this.position.y);
            if (this.emotion == 0) { //emotion
                Doenertrainer.drawEmotionHappy();
            }
            if (this.emotion == 1) {
                Doenertrainer.drawEmotionSleep();
            }
            if (this.emotion == 2) {
                Doenertrainer.drawEmotionStressed();
            }
        }
    }
    Doenertrainer.Worker = Worker;
})(Doenertrainer || (Doenertrainer = {}));
var Doenertrainer;
(function (Doenertrainer) {
    function drawBoss() {
        Doenertrainer.ctx.scale(3.5, 3.5);
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(0, 0, 255)";
        Doenertrainer.ctx.strokeStyle = "rgb(0, 0, 255)";
        Doenertrainer.ctx.lineWidth = 0.217250;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(0.000005, 4.586449);
        Doenertrainer.ctx.bezierCurveTo(2.550019, 4.586449, 4.602449, 2.541134, 4.602449, 0.000000);
        Doenertrainer.ctx.bezierCurveTo(4.602449, -2.541134, 2.550039, -4.586449, 0.000005, -4.586449);
        Doenertrainer.ctx.bezierCurveTo(-2.518908, -4.586449, -4.602449, -2.541124, -4.602449, 0.000000);
        Doenertrainer.ctx.bezierCurveTo(-4.602449, 2.541144, -2.518888, 4.586449, 0.000005, 4.586449);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        // #path631
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 0)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.moveTo(1.053842, -5.968909);
        Doenertrainer.ctx.lineTo(1.053842, -5.968909);
        Doenertrainer.ctx.bezierCurveTo(1.099399, -6.021510, 1.104277, -6.090835, 1.080301, -6.148293);
        Doenertrainer.ctx.bezierCurveTo(1.056464, -6.205419, 0.975134, -6.238544, 0.901458, -6.174545);
        Doenertrainer.ctx.bezierCurveTo(0.843963, -6.150553, 0.810666, -6.069586, 0.874999, -5.995161);
        Doenertrainer.ctx.bezierCurveTo(0.874999, -5.995161, 0.886933, -5.966551, 0.927538, -5.950012);
        Doenertrainer.ctx.bezierCurveTo(0.381082, -4.513387, -0.309876, -4.393305, -1.052123, -5.930112);
        Doenertrainer.ctx.bezierCurveTo(-1.035360, -5.970698, -1.035360, -5.970698, -1.006566, -5.982713);
        Doenertrainer.ctx.bezierCurveTo(-0.989803, -6.023299, -0.984924, -6.092624, -1.037694, -6.138067);
        Doenertrainer.ctx.bezierCurveTo(-1.061532, -6.195193, -1.171655, -6.216302, -1.228356, -6.192642);
        Doenertrainer.ctx.bezierCurveTo(-1.302706, -6.128026, -1.335493, -6.047054, -1.271160, -5.972683);
        Doenertrainer.ctx.lineTo(-1.271160, -5.972683);
        Doenertrainer.ctx.bezierCurveTo(-1.259222, -5.944074, -1.218621, -5.927534, -1.206606, -5.898741);
        Doenertrainer.ctx.lineTo(-1.206606, -5.898741);
        Doenertrainer.ctx.bezierCurveTo(-1.194593, -5.467594, -1.242086, -2.995976, -3.463789, -5.493821);
        Doenertrainer.ctx.bezierCurveTo(-3.447026, -5.534407, -3.430132, -5.574939, -3.442148, -5.603732);
        Doenertrainer.ctx.bezierCurveTo(-3.437288, -5.672835, -3.449298, -5.701628, -3.473276, -5.759087);
        Doenertrainer.ctx.bezierCurveTo(-3.549649, -5.861352, -3.699930, -5.899913, -3.804245, -5.823075);
        Doenertrainer.ctx.bezierCurveTo(-3.918875, -5.775241, -3.957080, -5.625174, -3.880332, -5.522165);
        Doenertrainer.ctx.bezierCurveTo(-3.856495, -5.465039, -3.803959, -5.419899, -3.763484, -5.403924);
        Doenertrainer.ctx.bezierCurveTo(-3.722845, -5.387292, -3.665257, -5.411324, -3.625025, -5.394624);
        Doenertrainer.ctx.bezierCurveTo(-2.307377, -2.317735, -4.589994, -3.346614, -4.967652, -3.524854);
        Doenertrainer.ctx.bezierCurveTo(-4.979586, -3.553464, -4.991490, -3.581980, -5.003505, -3.610773);
        Doenertrainer.ctx.lineTo(-5.003505, -3.610773);
        Doenertrainer.ctx.bezierCurveTo(-5.039358, -3.696692, -5.149623, -3.718143, -5.194167, -3.665347);
        Doenertrainer.ctx.bezierCurveTo(-5.280455, -3.629340, -5.301304, -3.519759, -5.248968, -3.474135);
        Doenertrainer.ctx.bezierCurveTo(-5.225130, -3.417009, -5.184414, -3.400193, -5.115007, -3.395900);
        Doenertrainer.ctx.lineTo(-5.086305, -3.407873);
        Doenertrainer.ctx.bezierCurveTo(-3.982523, -2.055197, -4.384929, -1.484286, -5.921911, -1.615184);
        Doenertrainer.ctx.bezierCurveTo(-5.933845, -1.643794, -5.945749, -1.672310, -5.957764, -1.701103);
        Doenertrainer.ctx.bezierCurveTo(-5.981602, -1.758229, -6.062931, -1.791354, -6.136607, -1.727355);
        Doenertrainer.ctx.bezierCurveTo(-6.194102, -1.703363, -6.199058, -1.634222, -6.175224, -1.577105);
        Doenertrainer.ctx.bezierCurveTo(-6.151386, -1.519979, -6.070057, -1.486854, -6.012931, -1.510692);
        Doenertrainer.ctx.lineTo(-5.984229, -1.522665);
        Doenertrainer.ctx.bezierCurveTo(-5.776629, -1.508413, -5.300395, -0.934532, -5.300395, -0.934532);
        Doenertrainer.ctx.lineTo(1.258239, -5.081705);
        Doenertrainer.ctx.lineTo(1.258239, -5.081705);
        Doenertrainer.ctx.bezierCurveTo(1.258239, -5.081705, 0.971714, -5.768342, 1.055411, -5.970127);
        Doenertrainer.ctx.lineTo(1.055411, -5.970127);
        Doenertrainer.ctx.lineTo(1.055411, -5.970127);
        Doenertrainer.ctx.lineTo(1.055411, -5.970127);
        Doenertrainer.ctx.bezierCurveTo(1.055411, -5.970127, 1.055411, -5.970127, 1.055393, -5.970065);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.resetTransform();
    }
    Doenertrainer.drawBoss = drawBoss;
    function drawWorker() {
        Doenertrainer.ctx.scale(3.5, 3.5);
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(0, 0, 255)";
        Doenertrainer.ctx.strokeStyle = "rgb(0, 0, 255)";
        Doenertrainer.ctx.lineWidth = 0.217250;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(0.000005, 4.586449);
        Doenertrainer.ctx.bezierCurveTo(2.550019, 4.586449, 4.602449, 2.541134, 4.602449, 0.000000);
        Doenertrainer.ctx.bezierCurveTo(4.602449, -2.541134, 2.550039, -4.586449, 0.000005, -4.586449);
        Doenertrainer.ctx.bezierCurveTo(-2.518908, -4.586449, -4.602449, -2.541124, -4.602449, 0.000000);
        Doenertrainer.ctx.bezierCurveTo(-4.602449, 2.541144, -2.518888, 4.586449, 0.000005, 4.586449);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        Doenertrainer.ctx.resetTransform();
    }
    Doenertrainer.drawWorker = drawWorker;
    function drawCustomer() {
        Doenertrainer.ctx.scale(3.5, 3.5);
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 0, 0)";
        Doenertrainer.ctx.strokeStyle = "rgb(255, 0, 0)";
        Doenertrainer.ctx.lineWidth = 0.217250;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(0.000005, 4.586449);
        Doenertrainer.ctx.bezierCurveTo(2.550019, 4.586449, 4.602449, 2.541134, 4.602449, 0.000000);
        Doenertrainer.ctx.bezierCurveTo(4.602449, -2.541134, 2.550039, -4.586449, 0.000005, -4.586449);
        Doenertrainer.ctx.bezierCurveTo(-2.518908, -4.586449, -4.602449, -2.541124, -4.602449, 0.000000);
        Doenertrainer.ctx.bezierCurveTo(-4.602449, 2.541144, -2.518888, 4.586449, 0.000005, 4.586449);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        Doenertrainer.ctx.resetTransform();
    }
    Doenertrainer.drawCustomer = drawCustomer;
    function drawDeliveryman() {
        Doenertrainer.ctx.scale(3.5, 3.5);
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(0, 255, 0)";
        Doenertrainer.ctx.strokeStyle = "rgb(0, 255, 0)";
        Doenertrainer.ctx.lineWidth = 0.217250;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(0.000005, 4.586449);
        Doenertrainer.ctx.bezierCurveTo(2.550019, 4.586449, 4.602449, 2.541134, 4.602449, 0.000000);
        Doenertrainer.ctx.bezierCurveTo(4.602449, -2.541134, 2.550039, -4.586449, 0.000005, -4.586449);
        Doenertrainer.ctx.bezierCurveTo(-2.518908, -4.586449, -4.602449, -2.541124, -4.602449, 0.000000);
        Doenertrainer.ctx.bezierCurveTo(-4.602449, 2.541144, -2.518888, 4.586449, 0.000005, 4.586449);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        Doenertrainer.ctx.resetTransform();
    }
    Doenertrainer.drawDeliveryman = drawDeliveryman;
    function drawEmotionHappy() {
        Doenertrainer.ctx.scale(3.5, 3.5);
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(-1.429290, -1.116605);
        Doenertrainer.ctx.bezierCurveTo(-1.180880, -1.116605, -0.962590, -1.333865, -0.962590, -1.582435);
        Doenertrainer.ctx.bezierCurveTo(-0.962590, -1.830845, -1.179840, -2.048255, -1.429290, -2.048255);
        Doenertrainer.ctx.bezierCurveTo(-1.677700, -2.048255, -1.895990, -1.831005, -1.895990, -1.582435);
        Doenertrainer.ctx.bezierCurveTo(-1.895990, -1.334025, -1.678730, -1.116605, -1.429290, -1.116605);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        // #path635
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(1.400530, -1.178585);
        Doenertrainer.ctx.bezierCurveTo(1.648930, -1.178585, 1.867230, -1.395835, 1.867230, -1.644415);
        Doenertrainer.ctx.bezierCurveTo(1.867230, -1.892815, 1.649970, -2.110235, 1.400530, -2.110235);
        Doenertrainer.ctx.bezierCurveTo(1.152120, -2.110235, 0.933830, -1.892985, 0.933830, -1.644415);
        Doenertrainer.ctx.bezierCurveTo(0.933830, -1.396005, 1.151080, -1.178585, 1.400530, -1.178585);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        // #path637
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.664082;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(-1.771360, 1.083665);
        Doenertrainer.ctx.bezierCurveTo(-1.771360, 1.083665, 0.094430, 3.438875, 1.649340, 1.083665);
        Doenertrainer.ctx.stroke();
        Doenertrainer.ctx.resetTransform();
    }
    Doenertrainer.drawEmotionHappy = drawEmotionHappy;
    function drawEmotionSad() {
        Doenertrainer.ctx.scale(3.5, 3.5);
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(-1.398430, -1.113572);
        Doenertrainer.ctx.bezierCurveTo(-1.150020, -1.113572, -0.931730, -1.330832, -0.931730, -1.579402);
        Doenertrainer.ctx.bezierCurveTo(-0.931730, -1.827812, -1.148980, -2.045222, -1.398430, -2.045222);
        Doenertrainer.ctx.bezierCurveTo(-1.646830, -2.045222, -1.865120, -1.827972, -1.865120, -1.579402);
        Doenertrainer.ctx.bezierCurveTo(-1.865120, -1.330992, -1.647870, -1.113572, -1.398430, -1.113572);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        // #path641
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(1.431400, -1.175552);
        Doenertrainer.ctx.bezierCurveTo(1.679800, -1.175552, 1.898090, -1.392802, 1.898090, -1.641382);
        Doenertrainer.ctx.bezierCurveTo(1.898090, -1.889782, 1.680840, -2.107202, 1.431400, -2.107202);
        Doenertrainer.ctx.bezierCurveTo(1.182990, -2.107202, 0.964700, -1.889952, 0.964700, -1.641382);
        Doenertrainer.ctx.bezierCurveTo(0.964700, -1.392972, 1.181950, -1.175552, 1.431400, -1.175552);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        // #path643
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.664082;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(-1.740500, 2.140378);
        Doenertrainer.ctx.bezierCurveTo(-1.740500, 2.140378, 0.125300, -0.214842, 1.680210, 2.140378);
        Doenertrainer.ctx.stroke();
        Doenertrainer.ctx.resetTransform();
    }
    Doenertrainer.drawEmotionSad = drawEmotionSad;
    function drawEmotionSleep() {
        Doenertrainer.ctx.scale(3.5, 3.5);
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.moveTo(3.390300, -3.447331);
        Doenertrainer.ctx.lineTo(3.390300, -3.695741);
        Doenertrainer.ctx.lineTo(4.447820, -4.997011);
        Doenertrainer.ctx.bezierCurveTo(4.510120, -5.090111, 4.602760, -5.152371, 4.665070, -5.245421);
        Doenertrainer.ctx.lineTo(3.514420, -5.245421);
        Doenertrainer.ctx.lineTo(3.514420, -5.462671);
        Doenertrainer.ctx.lineTo(4.975950, -5.462671);
        Doenertrainer.ctx.lineTo(4.975950, -5.245421);
        Doenertrainer.ctx.lineTo(3.825340, -3.819901);
        Doenertrainer.ctx.lineTo(3.701140, -3.664551);
        Doenertrainer.ctx.lineTo(5.007150, -3.664551);
        Doenertrainer.ctx.lineTo(5.007150, -3.447291);
        Doenertrainer.ctx.fill();
        // #path651
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.moveTo(3.825650, -0.224391);
        Doenertrainer.ctx.lineTo(3.856750, -0.472801);
        Doenertrainer.ctx.lineTo(5.162760, -1.527361);
        Doenertrainer.ctx.bezierCurveTo(5.256260, -1.620361, 5.348850, -1.682721, 5.411160, -1.744611);
        Doenertrainer.ctx.lineTo(4.291550, -1.961871);
        Doenertrainer.ctx.lineTo(4.353850, -2.210271);
        Doenertrainer.ctx.lineTo(5.784390, -1.901221);
        Doenertrainer.ctx.lineTo(5.722090, -1.683971);
        Doenertrainer.ctx.lineTo(4.322740, -0.506491);
        Doenertrainer.ctx.lineTo(4.167800, -0.413391);
        Doenertrainer.ctx.lineTo(5.442530, -0.133831);
        Doenertrainer.ctx.lineTo(5.380230, 0.083429);
        Doenertrainer.ctx.fill();
        // #path653
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.moveTo(0.125120, -4.439001);
        Doenertrainer.ctx.lineTo(0.187420, -4.687411);
        Doenertrainer.ctx.lineTo(1.462110, -5.741971);
        Doenertrainer.ctx.bezierCurveTo(1.555610, -5.803871, 1.648200, -5.865761, 1.742910, -5.928491);
        Doenertrainer.ctx.lineTo(0.623300, -6.176891);
        Doenertrainer.ctx.lineTo(0.654400, -6.394141);
        Doenertrainer.ctx.lineTo(2.084940, -6.114581);
        Doenertrainer.ctx.lineTo(2.053840, -5.866181);
        Doenertrainer.ctx.lineTo(0.623300, -4.719771);
        Doenertrainer.ctx.lineTo(0.468360, -4.595981);
        Doenertrainer.ctx.lineTo(1.743090, -4.347571);
        Doenertrainer.ctx.lineTo(1.711990, -4.099171);
        Doenertrainer.ctx.fill();
        // #path655
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(-1.398620, -1.340031);
        Doenertrainer.ctx.bezierCurveTo(-1.150220, -1.340031, -0.962910, -1.371031, -0.962910, -1.433131);
        Doenertrainer.ctx.bezierCurveTo(-0.962910, -1.464131, -1.149010, -1.495031, -1.398620, -1.495031);
        Doenertrainer.ctx.bezierCurveTo(-1.647030, -1.495031, -1.865320, -1.464031, -1.865320, -1.433131);
        Doenertrainer.ctx.bezierCurveTo(-1.865320, -1.371231, -1.648070, -1.340031, -1.398620, -1.340031);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        // #path657
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.664082;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(-1.740690, 1.820939);
        Doenertrainer.ctx.bezierCurveTo(-1.740690, 1.820939, 1.555640, 1.851939, 1.680010, 1.820939);
        Doenertrainer.ctx.stroke();
        // #path659
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(1.306800, -1.433001);
        Doenertrainer.ctx.bezierCurveTo(1.555210, -1.433001, 1.773500, -1.464001, 1.773500, -1.494901);
        Doenertrainer.ctx.bezierCurveTo(1.773500, -1.525901, 1.556240, -1.556801, 1.306800, -1.556801);
        Doenertrainer.ctx.bezierCurveTo(1.058390, -1.556801, 0.840100, -1.525801, 0.840100, -1.494901);
        Doenertrainer.ctx.bezierCurveTo(0.840100, -1.463901, 1.057350, -1.433001, 1.306800, -1.433001);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        Doenertrainer.ctx.resetTransform();
    }
    Doenertrainer.drawEmotionSleep = drawEmotionSleep;
    function drawEmotionStressed() {
        Doenertrainer.ctx.scale(3.5, 3.5);
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.moveTo(4.079877, -0.748096);
        Doenertrainer.ctx.lineTo(4.608626, -2.142586);
        Doenertrainer.ctx.lineTo(4.857036, -2.700255);
        Doenertrainer.ctx.lineTo(5.261636, -2.544895);
        Doenertrainer.ctx.lineTo(4.980827, -1.956155);
        Doenertrainer.ctx.lineTo(4.296917, -0.654596);
        Doenertrainer.ctx.moveTo(3.706437, -0.128286);
        Doenertrainer.ctx.lineTo(3.892527, -0.499656);
        Doenertrainer.ctx.lineTo(4.235227, -0.344296);
        Doenertrainer.ctx.lineTo(4.080287, 0.027074);
        Doenertrainer.ctx.fill();
        // #path673
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.moveTo(3.395757, -3.878065);
        Doenertrainer.ctx.lineTo(3.955537, -5.210695);
        Doenertrainer.ctx.lineTo(4.235106, -5.768365);
        Doenertrainer.ctx.lineTo(4.608546, -5.581846);
        Doenertrainer.ctx.lineTo(4.327736, -5.024185);
        Doenertrainer.ctx.lineTo(3.581766, -3.784596);
        Doenertrainer.ctx.moveTo(3.022317, -3.320396);
        Doenertrainer.ctx.lineTo(3.177256, -3.660605);
        Doenertrainer.ctx.lineTo(3.519957, -3.505246);
        Doenertrainer.ctx.lineTo(3.365017, -3.165036);
        Doenertrainer.ctx.fill();
        // #path675
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.moveTo(0.721417, -4.095006);
        Doenertrainer.ctx.lineTo(0.316827, -5.551465);
        Doenertrainer.ctx.lineTo(0.192617, -6.140206);
        Doenertrainer.ctx.lineTo(0.597217, -6.233306);
        Doenertrainer.ctx.lineTo(0.721417, -5.613486);
        Doenertrainer.ctx.lineTo(0.938667, -4.157026);
        Doenertrainer.ctx.moveTo(0.752517, -3.382055);
        Doenertrainer.ctx.lineTo(0.690217, -3.784575);
        Doenertrainer.ctx.lineTo(1.063667, -3.846475);
        Doenertrainer.ctx.lineTo(1.157166, -3.475105);
        Doenertrainer.ctx.fill();
        // #path677
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(-1.424263, -1.119976);
        Doenertrainer.ctx.bezierCurveTo(-1.144703, -1.119976, -0.957563, -1.337236, -0.957563, -1.585805);
        Doenertrainer.ctx.bezierCurveTo(-0.957563, -1.834215, -1.143663, -2.051626, -1.424263, -2.051626);
        Doenertrainer.ctx.bezierCurveTo(-1.672673, -2.051626, -1.859973, -1.834376, -1.859973, -1.585806);
        Doenertrainer.ctx.bezierCurveTo(-1.859973, -1.337396, -1.673874, -1.119976, -1.424263, -1.119976);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        // #path679
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(1.405557, -1.181955);
        Doenertrainer.ctx.bezierCurveTo(1.686367, -1.181955, 1.872257, -1.399205, 1.872257, -1.647785);
        Doenertrainer.ctx.bezierCurveTo(1.872257, -1.896185, 1.686157, -2.113605, 1.405557, -2.113605);
        Doenertrainer.ctx.bezierCurveTo(1.157147, -2.113605, 0.969847, -1.896355, 0.969847, -1.647785);
        Doenertrainer.ctx.bezierCurveTo(0.969847, -1.399375, 1.155947, -1.181955, 1.405557, -1.181955);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        // #path683
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.strokeStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.lineWidth = 0.664082;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(-1.704133, 1.824064);
        Doenertrainer.ctx.bezierCurveTo(-1.704133, 1.824064, 1.560997, 1.855064, 1.716567, 1.824064);
        Doenertrainer.ctx.stroke();
        Doenertrainer.ctx.resetTransform();
    }
    Doenertrainer.drawEmotionStressed = drawEmotionStressed;
    function drawLamacun() {
        Doenertrainer.ctx.scale(3.5, 3.5);
        Doenertrainer.ctx.save();
        Doenertrainer.ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -371.310000, -196.260000);
        // #path717
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(255, 255, 255)";
        Doenertrainer.ctx.strokeStyle = "rgb(0, 0, 0)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(367.516250, 199.637920);
        Doenertrainer.ctx.lineTo(375.072800, 199.637920);
        Doenertrainer.ctx.lineTo(375.072800, 192.107370);
        Doenertrainer.ctx.lineTo(367.516250, 192.107370);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        // #path719
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(170, 68, 0)";
        Doenertrainer.ctx.strokeStyle = "rgb(0, 0, 0)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(371.310080, 196.260020);
        Doenertrainer.ctx.bezierCurveTo(371.838840, 196.260020, 372.305540, 196.011620, 372.305540, 195.671280);
        Doenertrainer.ctx.bezierCurveTo(372.305540, 195.362230, 371.838840, 195.082540, 371.310080, 195.082540);
        Doenertrainer.ctx.bezierCurveTo(370.750290, 195.082540, 370.283600, 195.362110, 370.283600, 195.671280);
        Doenertrainer.ctx.bezierCurveTo(370.283600, 196.011490, 370.750290, 196.260020, 371.310080, 196.260020);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        // #path721
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(170, 68, 0)";
        Doenertrainer.ctx.strokeStyle = "rgb(0, 0, 0)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(370.283880, 197.065760);
        Doenertrainer.ctx.bezierCurveTo(370.843670, 197.065760, 371.310360, 196.786190, 371.310360, 196.477020);
        Doenertrainer.ctx.bezierCurveTo(371.310360, 196.136810, 370.843670, 195.888270, 370.283880, 195.888270);
        Doenertrainer.ctx.bezierCurveTo(369.755120, 195.888270, 369.288420, 196.136680, 369.288420, 196.477020);
        Doenertrainer.ctx.bezierCurveTo(369.288420, 196.786070, 369.755120, 197.065760, 370.283880, 197.065760);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        // #path723
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(170, 68, 0)";
        Doenertrainer.ctx.strokeStyle = "rgb(0, 0, 0)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(372.087490, 197.375650);
        Doenertrainer.ctx.bezierCurveTo(372.647280, 197.375650, 373.113980, 197.127240, 373.113980, 196.786910);
        Doenertrainer.ctx.bezierCurveTo(373.113980, 196.477850, 372.647280, 196.198170, 372.087490, 196.198170);
        Doenertrainer.ctx.bezierCurveTo(371.558730, 196.198170, 371.092040, 196.477730, 371.092040, 196.786910);
        Doenertrainer.ctx.bezierCurveTo(371.092040, 197.127120, 371.558730, 197.375650, 372.087490, 197.375650);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        Doenertrainer.ctx.restore();
        Doenertrainer.ctx.resetTransform();
    }
    Doenertrainer.drawLamacun = drawLamacun;
    function drawYufka() {
        Doenertrainer.ctx.scale(3.5, 3.5);
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(128, 128, 128)";
        Doenertrainer.ctx.strokeStyle = "rgb(0, 0, 0)";
        Doenertrainer.ctx.lineWidth = 0.217241;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(-3.453430, 0.346598);
        Doenertrainer.ctx.lineTo(2.734970, -2.132365);
        Doenertrainer.ctx.bezierCurveTo(3.170692, -2.318859, 3.668427, -2.101368, 3.823541, -1.666573);
        Doenertrainer.ctx.lineTo(3.917041, -1.480080);
        Doenertrainer.ctx.bezierCurveTo(4.103136, -1.045366, 3.885941, -0.520050, 3.450327, -0.364792);
        Doenertrainer.ctx.lineTo(-2.707021, 2.145069);
        Doenertrainer.ctx.bezierCurveTo(-3.142744, 2.300415, -3.671479, 2.083174, -3.826674, 1.649540);
        Doenertrainer.ctx.lineTo(-3.919774, 1.463045);
        Doenertrainer.ctx.bezierCurveTo(-4.105869, 1.029622, -3.888674, 0.534093, -3.453060, 0.347758);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        Doenertrainer.ctx.resetTransform();
    }
    Doenertrainer.drawYufka = drawYufka;
    function drawDoner() {
        Doenertrainer.ctx.scale(3.5, 3.5);
        Doenertrainer.ctx.beginPath();
        Doenertrainer.ctx.fillStyle = "rgb(153, 153, 153)";
        Doenertrainer.ctx.strokeStyle = "rgb(0, 0, 0)";
        Doenertrainer.ctx.lineWidth = 0.217247;
        Doenertrainer.ctx.lineCap = "butt";
        Doenertrainer.ctx.lineJoin = "miter";
        Doenertrainer.ctx.miterLimit = 4;
        Doenertrainer.ctx.moveTo(3.356448, -0.679305);
        Doenertrainer.ctx.bezierCurveTo(2.982985, 1.179919, 1.179590, 2.388516, -0.686439, 2.016670);
        Doenertrainer.ctx.bezierCurveTo(-2.552348, 1.645336, -3.734104, -0.183358, -3.360969, -2.011853);
        Doenertrainer.ctx.fill();
        Doenertrainer.ctx.stroke();
        Doenertrainer.ctx.resetTransform();
    }
    Doenertrainer.drawDoner = drawDoner;
})(Doenertrainer || (Doenertrainer = {}));
//# sourceMappingURL=Build.js.map