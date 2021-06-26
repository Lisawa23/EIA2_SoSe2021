"use strict";
var L11_2_Blumenwiese;
(function (L11_2_Blumenwiese) {
    let TASK;
    (function (TASK) {
        TASK[TASK["TOFLOWER"] = 0] = "TOFLOWER";
        TASK[TASK["DRINK"] = 1] = "DRINK";
        TASK[TASK["GOHOME"] = 2] = "GOHOME";
        TASK[TASK["VOMIT"] = 3] = "VOMIT";
    })(TASK || (TASK = {}));
    class Bee extends L11_2_Blumenwiese.Moveable {
        constructor(_size, _position) {
            super(_position);
            this.nectarAmount = 0;
            this.task = TASK.TOFLOWER;
            this.needsDestination = true;
            if (_position) //kein Vektor angegeben
                this.position = _position;
            else
                this.position = new L11_2_Blumenwiese.Vector(300, 400); // position wenn Vektor nicht angegeben ist
            this.velocity = new L11_2_Blumenwiese.Vector(50, 0); //Startpunkt
            this.velocity.random(120, 20); //random. Pixelwerte (min und max)
            this.setRandomFlowerPosition();
            this.setStartPosition();
            // if (this.position.x < 300) {
            //     this.direction = true;
            // } else {
            //     this.direction = false;
            // }
            // console.log(this.direction);
        }
        draw() {
            //Biene fliegt rückwerts
            let xPos = this.position.x;
            L11_2_Blumenwiese.crc2.save();
            if (this.direction == true) {
                L11_2_Blumenwiese.crc2.scale(-1, 1);
                xPos = -this.position.x;
            }
            else {
                L11_2_Blumenwiese.crc2.scale(1, 1);
            }
            //wings
            L11_2_Blumenwiese.crc2.beginPath();
            L11_2_Blumenwiese.crc2.arc(xPos - 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            L11_2_Blumenwiese.crc2.strokeStyle = "black";
            L11_2_Blumenwiese.crc2.fillStyle = "lightblue";
            L11_2_Blumenwiese.crc2.fill();
            L11_2_Blumenwiese.crc2.closePath();
            L11_2_Blumenwiese.crc2.stroke();
            L11_2_Blumenwiese.crc2.save();
            L11_2_Blumenwiese.crc2.beginPath();
            L11_2_Blumenwiese.crc2.arc(xPos + 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            L11_2_Blumenwiese.crc2.strokeStyle = "black";
            L11_2_Blumenwiese.crc2.fillStyle = "lightblue";
            L11_2_Blumenwiese.crc2.fill();
            L11_2_Blumenwiese.crc2.closePath();
            L11_2_Blumenwiese.crc2.stroke();
            L11_2_Blumenwiese.crc2.beginPath();
            //body
            L11_2_Blumenwiese.crc2.ellipse(xPos, this.position.y, 10, 20, 300, 0, 2 * Math.PI);
            L11_2_Blumenwiese.crc2.strokeStyle = "yellow";
            L11_2_Blumenwiese.crc2.fillStyle = "yellow";
            L11_2_Blumenwiese.crc2.fill();
            L11_2_Blumenwiese.crc2.closePath();
            //stripes
            L11_2_Blumenwiese.crc2.beginPath();
            L11_2_Blumenwiese.crc2.moveTo(xPos - 10, this.position.y + 9);
            L11_2_Blumenwiese.crc2.lineTo(xPos - 10, this.position.y - 9);
            L11_2_Blumenwiese.crc2.moveTo(xPos, this.position.y + 10);
            L11_2_Blumenwiese.crc2.lineTo(xPos, this.position.y - 10);
            L11_2_Blumenwiese.crc2.moveTo(xPos + 10, this.position.y + 9);
            L11_2_Blumenwiese.crc2.lineTo(xPos + 10, this.position.y - 9);
            L11_2_Blumenwiese.crc2.strokeStyle = "black";
            L11_2_Blumenwiese.crc2.lineWidth = 5;
            L11_2_Blumenwiese.crc2.stroke();
            L11_2_Blumenwiese.crc2.closePath();
            L11_2_Blumenwiese.crc2.restore();
            //Eye
            L11_2_Blumenwiese.crc2.save();
            L11_2_Blumenwiese.crc2.beginPath();
            L11_2_Blumenwiese.crc2.arc(xPos + 15, this.position.y, 2, 0, 2 * Math.PI);
            L11_2_Blumenwiese.crc2.fillStyle = "black";
            L11_2_Blumenwiese.crc2.fill();
            L11_2_Blumenwiese.crc2.closePath();
            L11_2_Blumenwiese.crc2.restore();
        }
        // public fly(): void {
        //     let xDiff: number = Math.floor(this.xTarget - this.position.x + 5); // Blumenmitte
        //     let yDiff: number = Math.floor(this.yTarget - this.position.y);
        //     console.log(xDiff, yDiff);
        //     if (Math.abs(xDiff) < 1 && Math.abs(yDiff) < 1)
        //         this.setRandomFlowerPosition();
        //     else {
        //         this.position.x += xDiff * 0.005;
        //         this.position.y += yDiff * 0.005;
        //     }
        //     this.draw();
        // }
        // public move(): void {
        //     switch (this.task) {
        //         case TASK.TOFLOWER:
        //             this.setRandomFlowerPosition();
        //             break;
        //         case TASK.DRINK:
        //             this.drinkNectar();
        //             break;
        //         case TASK.GOHOME:
        //             this.goHome();
        //             break;
        //         case TASK.VOMIT:
        //             this.vomitNectar();
        //             break;
        //         default:
        //             this.fly();
        //             break;
        //     }
        // }
        setStartPosition() {
            this.position.x = 300; // Ausgang des Bienenstocks
            this.position.y = 400;
        }
        // private fly(): void { // default: regular flying
        //     if (this.position.x < 0)
        //         this.position.x += crc2.canvas.width;
        //     if (this.position.y < 0)
        //         this.position.y += crc2.canvas.height;
        //     if (this.position.x > crc2.canvas.width)
        //         this.position.x -= crc2.canvas.width;
        //     if (this.position.y > crc2.canvas.height)
        //         this.position.y -= crc2.canvas.height;
        //     this.position.x += this.velocity.x;
        //     this.position.y += this.velocity.y;
        //     this.draw();
        // }
        setRandomFlowerPosition() {
            let i = Math.round(Math.random() * (L11_2_Blumenwiese.flowers.length - 1));
            this.xTarget = L11_2_Blumenwiese.flowers[i].x;
            this.yTarget = L11_2_Blumenwiese.flowers[i].y;
            this.position = new L11_2_Blumenwiese.Vector(this.xTarget, this.yTarget);
            // this.task = TASK.DRINK;
            // when bee reaches flower - start drinking nectar
            //     this.task = TASK.DRINK;
            //     if (this.needsDestination) {
            //         let i: number = Math.round(Math.random() * (flowers.length - 1));
            //         if (flowers[i].occupied == false || flowers[i].fillLevel > 10) { // avoid more than 1 bee per flower & empty flowers
            //             this.target = flowers[i];
            //             flowers[i].occupied = true;
            //         }
            //         else
            //             this.setRandomFlowerPosition();
            //         this.needsDestination = false;
            //     }
            //     let direction: Vector = new Vector(this.target.position.x - this.position.x, (this.target.position.y - 40) - this.position.y);
            //     direction.scale(1 / 100);
            //     this.position.add(direction);
            //     this.draw();
            //     // when bee reaches flower - start drinking nectar
            //     if (Math.abs(this.position.x - this.target.position.x) < 1 && (Math.abs(this.position.y - (this.target.position.y - 40)) < 1)) {
            //         this.task = TASK.DRINK;
            //     }
            // }
            // private drinkNectar(): void {
            //     // bee is thirsty 
            //     if (this.nectarAmount < 50) {
            //         this.nectarAmount += 0.1;
            //         if (this.target.fillLevel >= 0)
            //             this.target.fillLevel -= 0.1;
            //         else { // bee isn't full but flower is empty -> next flower
            //             this.needsDestination = true;
            //             this.task = TASK.TOFLOWER;
            //         }
            //     }
            //     this.draw();
            //     // bee is full
            //     if (this.nectarAmount >= 50)
            //         this.task = TASK.GOHOME;
            // }
            // private goHome(): void { // bee flies back to beehive
            //     this.target.occupied = false; // flower can welcome bees again
            //     // fly back to beehive
            //     let home: Vector = new Vector(300, 400);
            //     home.scale(1 / 100);
            //     this.position.add(home);
            //     this.draw();
            //     // bee arrives at the beehive and starts vomiting nectar
            //     if (Math.abs(this.position.x - (crc2.canvas.width / 2)) < 5 && Math.abs(this.position.y - (crc2.canvas.height * 0.95)) < 5) {
            //         this.task = TASK.VOMIT;
            //     }
            // }
            // private vomitNectar(): void {
            //     // bee vomits 
            //     if (this.nectarAmount > 0.1) {
            //         this.nectarAmount -= 0.1;
            //         this.draw();
            //     }
            //     else { // bee has vomited all nectar and is ready to fly again
            //         this.nectarAmount = 0;
            //         this.task = TASK.TOFLOWER;
            //     }
            // }
        }
    }
    L11_2_Blumenwiese.Bee = Bee;
})(L11_2_Blumenwiese || (L11_2_Blumenwiese = {}));
//# sourceMappingURL=Bee.js.map