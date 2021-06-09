namespace L10_Blumenwiese {
    export class Bee extends Moveable {
        position: Vector;
        velocity: Vector;
        size: number;

        constructor(_size: number, _position?: Vector) {
            super(_position);
            
            if (_position) //kein Vektor angegeben
                this.position = _position;
            else
                this.position = new Vector(300, 400); // position wenn Vektor nicht angegeben ist
                
            this.velocity = new Vector(50, 0); //Startpunkt
            this.velocity.random(120, 20); //random. Pixelwerte (min und max)
        }
        draw(): void {
            crc2.save();
            //wings
            crc2.save();
            crc2.beginPath();
            crc2.arc(this.position.x - 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            crc2.strokeStyle = "black";
            crc2.fillStyle = "lightblue";
            crc2.fill();
            crc2.closePath();
            crc2.stroke();

            crc2.save();
            crc2.beginPath();
            crc2.arc(this.position.x + 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            crc2.strokeStyle = "black";
            crc2.fillStyle = "lightblue";
            crc2.fill();
            crc2.closePath();

            
            crc2.stroke();

            crc2.beginPath();
            //body
            crc2.ellipse(this.position.x, this.position.y, 10, 20, 300, 0, 2 * Math.PI);
            crc2.strokeStyle = "yellow";
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.closePath();
            
            //stripes
            crc2.beginPath();
            crc2.moveTo(this.position.x - 10, this.position.y + 9);
            crc2.lineTo(this.position.x - 10, this.position.y - 9);
            crc2.moveTo(this.position.x, this.position.y + 10);
            crc2.lineTo(this.position.x, this.position.y - 10);
            crc2.moveTo(this.position.x + 10, this.position.y + 9);
            crc2.lineTo(this.position.x + 10, this.position.y - 9);
            crc2.strokeStyle = "black";
            crc2.lineWidth = 5;
            crc2.stroke();
            crc2.closePath();
            crc2.restore();

            
            crc2.restore();
        }
    }
}
