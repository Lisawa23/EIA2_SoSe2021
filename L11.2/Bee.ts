namespace L11_2_Blumenwiese {

    enum TASK {
        TOFLOWER,
        DRINK,
        GOHOME,
        VOMIT
    }

    export class Bee extends Moveable {
        target: SubFlower;
        nectarAmount: number = 0;
        task: TASK = TASK.TOFLOWER;
        needsDestination: boolean = true;
        public position: Vector;
        public velocity: Vector;
        protected size: number;
        protected direction: boolean;
        private xTarget: number;
        private yTarget: number;


        constructor(_size: number, _position?: Vector) {
            super(_position);
            
            if (_position) //kein Vektor angegeben
                this.position = _position;
            else
                this.position = new Vector(300, 400); // position wenn Vektor nicht angegeben ist

            this.velocity = new Vector(50, 0); //Startpunkt
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
        public draw(): void {
            //Biene fliegt rückwerts

            let xPos: number = this.position.x;
            crc2.save();

            if (this.direction == true) {
                crc2.scale(-1, 1);
                xPos = - this.position.x;
            }
            else {
                crc2.scale(1, 1);
            }

            //wings
            crc2.beginPath();
            crc2.arc(xPos - 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            crc2.strokeStyle = "black";
            crc2.fillStyle = "lightblue";
            crc2.fill();
            crc2.closePath();
            crc2.stroke();

            crc2.save();
            crc2.beginPath();
            crc2.arc(xPos + 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            crc2.strokeStyle = "black";
            crc2.fillStyle = "lightblue";
            crc2.fill();
            crc2.closePath();

            
            crc2.stroke();

            crc2.beginPath();
            //body
            crc2.ellipse(xPos, this.position.y, 10, 20, 300, 0, 2 * Math.PI);
            crc2.strokeStyle = "yellow";
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.closePath();
            
            //stripes
            crc2.beginPath();
            crc2.moveTo(xPos - 10, this.position.y + 9);
            crc2.lineTo(xPos - 10, this.position.y - 9);
            crc2.moveTo(xPos, this.position.y + 10);
            crc2.lineTo(xPos, this.position.y - 10);
            crc2.moveTo(xPos + 10, this.position.y + 9);
            crc2.lineTo(xPos + 10, this.position.y - 9);
            crc2.strokeStyle = "black";
            crc2.lineWidth = 5;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();

            //Eye
            crc2.save();
            crc2.beginPath();
            crc2.arc(xPos + 15, this.position.y, 2, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();


            
            crc2.restore();
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

        public setStartPosition(): void {

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

        private setRandomFlowerPosition(): void {
            let i: number = Math.round(Math.random() * (flowers.length - 1));
            this.xTarget = flowers[i].x;
            this.yTarget = flowers[i].y;
            this.position = new Vector(this.xTarget, this.yTarget);
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
}
