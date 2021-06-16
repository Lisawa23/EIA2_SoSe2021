namespace L11_1_Blumenwiese {
    export class Cloud extends Moveable {
        public position: Vector;
        public velocity: Vector;
        protected size: Vector;

        private particlePositions: Vector[] = [];

        constructor(_size?: Vector, _position?: Vector) {
            super(_position);

           
            if (_position)
                this.position = _position;
            else
                this.position = new Vector(50, 100);

            this.velocity = new Vector(30, 0);

            if (_size)
                this.size = _size;
            else
                this.size = new Vector(270, 75); 

            for (let drawn: number = 0; drawn < 50; drawn++) {
                let x: number = (Math.random() - 0.5) * this.size.x;
                let y: number = - (Math.random() * this.size.y);
                let position: Vector = new Vector(x, y);
                this.particlePositions.push(position);
            }
        }

        public draw(): void {

            let radiusParticle: number = 50;
            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.fillStyle = gradient;

            for (let drawn of this.particlePositions) {
                crc2.save();
                crc2.translate(drawn.x, drawn.y);
                crc2.fill(particle);
                crc2.restore();
            }
            crc2.restore();

        }
    }
}