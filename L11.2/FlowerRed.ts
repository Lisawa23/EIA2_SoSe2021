namespace L11_2_Blumenwiese {
    export class FlowerRed extends SubFlower {
        public position: Vector;
        public fillLevel: number;
        protected velocity: Vector;

        constructor(_x: number, _y: number, _fillLevel?: number, _position?: Vector) {
            super(_x, _y);

            let randomFill: number = Math.floor(Math.random() * 50);

            if (_position)
            this.position = _position;
        else
            this.position = new Vector(0, 0);
           
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
            crc2.fillRect(this.x, this.y, 4, 50); //PositionX, PositionY, Stielbreite, Stiellänge
            //Blätter
            crc2.moveTo(this.x, this.y + 50);
            crc2.lineTo(this.x + 10, this.y + 10);
            crc2.moveTo(this.x, this.y + 40);
            crc2.lineTo(this.x - 10, this.y + 20);

            crc2.stroke();
            crc2.fill();
            crc2.save();

            //Blütenblätter
            crc2.translate(this.x, this.y);
            for (let i: number = 0; i < 5; i++) {
                crc2.rotate(Math.PI * 2 / 5);
                crc2.beginPath();
                crc2.moveTo(10, 10);
                crc2.lineTo(-7, -10);
                crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
                crc2.closePath();
                crc2.fillStyle = "red";
                crc2.fill();
            }
            crc2.restore();

            //Blüte
            crc2.save();
            crc2.translate(this.x, this.y);
            crc2.beginPath();
            crc2.arc(0, 0, 7, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "yellow";
            crc2.fill();

            crc2.restore();
        }

        public fill(_timeslice: number): void {
            for (let i: number = 0; i < 10; i++) {
                crc2.beginPath();
                crc2.fillRect(this.x + 25, this.y - 10, 4, this.fillLevel);
                crc2.closePath();
                crc2.fillStyle = "orange";
                crc2.strokeStyle = "orange";
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