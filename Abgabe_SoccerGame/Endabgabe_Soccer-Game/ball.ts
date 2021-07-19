namespace L {
    export class Ball extends Movable {
        public speed: number = 0;
        protected speedLevel: number = 10;

        constructor(_origin: Vector) {
            super(_origin);
            this.slowDown = true;
            this.radius = 1.5 * scale;
        }
        public draw(): void {
            crc2.save();
            crc2.beginPath();
            crc2.arc(this.position.X, this.position.Y, this.radius, 0, 2 * Math.PI, false);
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();


            crc2.restore();
        }
    }
}