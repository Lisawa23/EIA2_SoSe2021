namespace L11_2_Blumenwiese {
    export class FlowerBlue extends SubFlower {
        public position: Vector;
        public fillLevel: number;
        protected velocity: Vector;

        constructor(_x: number, _y: number, _fillLevel?: number, _position?: Vector) {
            super(_x, _y);
            
            if (_position)
            this.position = _position;
        else
            this.position = new Vector(0, 0);
            let randomFill: number = Math.floor(Math.random() * 50);
           
            if (_fillLevel)
                this.fillLevel = _fillLevel;
            else
                this.fillLevel = randomFill;
            
            this.velocity = new Vector(0, 0);
        }

        public draw(): void {
            // Blumenstiel
            crc2.beginPath();
            crc2.strokeStyle = "green";
            crc2.fillStyle = "green";
            crc2.fillRect(this.x, this.y, 4, 50);
            //Blätter
            crc2.moveTo(this.x, this.y + 50);
            crc2.lineTo(this.x + 10, this.y + 10);
            crc2.moveTo(this.x, this.y + 40);
            crc2.lineTo(this.x - 10, this.y + 20);

            crc2.stroke();
            crc2.fill();

            //Blütenblätter
            crc2.beginPath();
            moveTo(this.x + 10, this.y + 20);
            crc2.arc(this.x, this.y, 9, 0, 1 * Math.PI);

            crc2.fillStyle = "blue";
            crc2.strokeStyle = "blue";
            crc2.fill();
            crc2.stroke();
            moveTo(this.x, this.y + 20);
            crc2.lineTo(this.x - 10, this.y - 10);
            crc2.lineTo(this.x - 3, this.y + 2);
            crc2.lineTo(this.x + 1, this.y - 10);
            crc2.lineTo(this.x + 4, this.y + 2);
            crc2.lineTo(this.x + 9, this.y - 10);
            crc2.lineTo(this.x + 9, this.y + 3);
            crc2.closePath();
            crc2.fillStyle = "blue";
            crc2.fill();
            crc2.stroke();

            //Füllstand

          
        }

        public fill(_timeslice: number): void {
            for (let i: number = 0; i < 10; i++) {
                crc2.beginPath();
                crc2.fillRect(this.x + 15, this.y - 5, 4, this.fillLevel);
                crc2.closePath();
                crc2.fillStyle = "#1411b8";
                crc2.strokeStyle = "#1411b8";
                crc2.fill();
                crc2.stroke();
                }
            let offset: Vector = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
    
            if (this.fillLevel < 50)
                    this.fillLevel += 0.03;
            // if (this.fillLevel > 50)
            //         this.fillLevel -= this.fillLevel;
        }


    }
}