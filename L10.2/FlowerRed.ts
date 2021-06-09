namespace L10_Blumenwiese {
    export class FlowerRed extends Moveable {
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
    crc2.fillRect(this.position.x, this.position.y, 4, 50); //PositionX, PositionY, Stielbreite, Stiellänge
    //Blätter
    crc2.moveTo(this.position.x, this.position.y + 50);
    crc2.lineTo(this.position.x + 10, this.position.y + 10);
    crc2.moveTo(this.position.x, this.position.y + 40);
    crc2.lineTo(this.position.x - 10, this.position.y + 20);

    crc2.stroke();
    crc2.fill();
    crc2.save();

    //Blütenblätter
    crc2.translate(this.position.x, this.position.y);
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
    crc2.translate(this.position.x, this.position.y);
    crc2.beginPath();
    crc2.arc(0, 0, 7, 0, 2 * Math.PI);
    crc2.closePath();
    crc2.fillStyle = "yellow";
    crc2.fill();

    crc2.restore();
}

   

    }
}