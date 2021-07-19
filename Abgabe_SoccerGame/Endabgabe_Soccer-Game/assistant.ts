namespace L {
    export class Assistant extends Movable {

        constructor(_position: Vector) {
            super(
                new Vector(_position.X, _position.Y)
            );
            this.target = new Vector(_position.X, _position.Y);
            this.radius = 1.5 * scale;


        }

        public draw(): void {
            crc2.save();
            crc2.beginPath();
            crc2.arc(this.position.X, this.position.Y, this.radius , 0, 2 * Math.PI, false);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.restore();
        }
    }
}
