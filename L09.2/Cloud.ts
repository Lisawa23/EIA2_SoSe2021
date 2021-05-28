namespace L09_Blumenwiese {
    export class Cloud {
        position: Vector;
        velocity: Vector;
        size: Vector;

        constructor(_size?: Vector, _position?: Vector) {

            if (_position) 
                this.position = _position;
            else
                this.position = new Vector(50, 50); 
                
            this.velocity = new Vector(30, 0); 
            
            if (_size) 
            this.size = _size;
            else
            this.size = new Vector(270, 75);
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

            let nParticles: number = 20;
            let radiusParticle: number = 50;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
    
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
    
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = gradient;
    
            for (let drawn: number = 0; drawn < nParticles; drawn++) {
                crc2.save();
                crc2.translate((Math.random() - 0.5) * this.size.x, - (Math.random() * this.size.y));
                crc2.fill(particle);
                crc2.restore();
            }
            crc2.restore();   
        }
    } 
}