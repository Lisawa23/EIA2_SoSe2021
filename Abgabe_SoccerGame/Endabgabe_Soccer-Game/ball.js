"use strict";
var L;
(function (L) {
    class Ball extends L.Movable {
        constructor(_origin) {
            super(_origin);
            this.speed = 0;
            this.speedLevel = 10;
            this.slowDown = true;
            this.radius = 1.5 * L.scale;
        }
        draw() {
            L.crc2.save();
            L.crc2.beginPath();
            L.crc2.arc(this.position.X, this.position.Y, this.radius, 0, 2 * Math.PI, false);
            L.crc2.fillStyle = "white";
            L.crc2.fill();
            L.crc2.lineWidth = 1;
            L.crc2.strokeStyle = "black";
            L.crc2.stroke();
            L.crc2.restore();
        }
    }
    L.Ball = Ball;
})(L || (L = {}));
//# sourceMappingURL=ball.js.map