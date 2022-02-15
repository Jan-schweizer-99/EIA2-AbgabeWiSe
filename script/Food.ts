namespace Doenertrainer {
export class Food {

    bread: number;
    sauce: number;
    ingredients: number[] = [];
    ordername: string;
    saucename: string;
    extraName: string;
    position: Vector;
    

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
    constructor(_recept: number) {
        if (_recept == 0) {                        //lamacun
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
        if (_recept == 1) {                        //doner
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
        if (_recept == 2) {                       //yufka
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
    getnameoforder(): void {
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

    setExtraingredient(_ingredient: number): void {          //for random recept

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

    setsauce(_sauce: number): void {
        if (_sauce == 0) {          //no sauce
            this.sauce = 0;
            this.saucename = "(keine Soße)";
        }
        if (_sauce == 1) {          //white sauce
            this.sauce = 1;
            this.saucename = "(Weisse Soße)";
        }
        if (_sauce == 2) {          //red sauce
            this.sauce = 2;
            this.saucename = "(Rote Soße)";
        }
    }
    setbread(_bread: number): void {
        this.bread = _bread;
    }

    //get values
    getingredient(_ingredient: number): number {
        return this.ingredients[_ingredient];
    }
    getbread(_ingredient: number): number {
        return this.bread;
    }

    draw(_x: number , _y: number): void {
        ctx.translate(_x, _y);
        
        if (this.bread == 0) {
            drawLamacun();
        }
        if (this.bread == 1) {
            drawDoner();
        }
        if (this.bread == 3) {
            drawYufka();
        }
    }

}
}