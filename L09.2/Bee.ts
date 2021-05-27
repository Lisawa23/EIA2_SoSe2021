namespace L09_Blumenwiese {
    export class Bee {
        position: Vector;
        velocity: Vector;
        size: number;

        constructor(_size: number, _position?: Vector) {
            
            if (_position) //kein Vektor angegeben
                this.position = _position;
            else
                this.position = new Vector(300, 400); // position wenn Vektor nicht angegeben ist
                
            this.velocity = new Vector(50, 0); //Startpunkt
            this.velocity.random(120, 20); //random. Pixelwerte (min und max)
        }

        move(_timeslice: number): void { 
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;
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
