namespace L10_Blumenwiese {
    export class FlowerBlue extends Moveable {
        position: Vector;

        constructor(_position?: Vector) {
            super(_position);

            let horizon: number = crc2.canvas.height * golden;
            let randomX: number = Math.floor(Math.random() * crc2.canvas.width);
            let randomY: number = horizon + Math.floor(Math.random() * 250);
            if (_position)
                this.position = _position;
            else
                this.position = new Vector(randomX, randomY);

        }

        draw(): void {
            // Blumenstiel
            crc2.beginPath();
            crc2.strokeStyle = "green";
            crc2.fillStyle = "green";
            crc2.fillRect(this.position.x, this.position.y, 4, 50);
            //Blätter
            crc2.moveTo(this.position.x, this.position.y + 50);
            crc2.lineTo(this.position.x + 10, this.position.y + 10);
            crc2.moveTo(this.position.x, this.position.y + 40);
            crc2.lineTo(this.position.x - 10, this.position.y + 20);

            crc2.stroke();
            crc2.fill();

            //Blütenblätter
            crc2.beginPath();
            moveTo(this.position.x + 10, this.position.y + 20);
            crc2.arc(this.position.x, this.position.y, 9, 0, 1 * Math.PI);

            crc2.fillStyle = "blue";
            crc2.strokeStyle = "blue";
            crc2.fill();
            crc2.stroke();
            moveTo(this.position.x, this.position.y + 20);
            crc2.lineTo(this.position.x - 10, this.position.y - 10);
            crc2.lineTo(this.position.x - 3, this.position.y + 2);
            crc2.lineTo(this.position.x + 1, this.position.y - 10);
            crc2.lineTo(this.position.x + 4, this.position.y + 2);
            crc2.lineTo(this.position.x + 9, this.position.y - 10);
            crc2.lineTo(this.position.x + 9, this.position.y + 3);
            crc2.closePath();
            crc2.fillStyle = "blue";
            crc2.fill();
            crc2.stroke();
        }

    }
}