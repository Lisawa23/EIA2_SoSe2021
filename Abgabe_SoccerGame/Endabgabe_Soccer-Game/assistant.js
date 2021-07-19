"use strict";
var L;
(function (L) {
    class Assistant extends L.Movable {
        constructor(_position) {
            super(new L.Vector(_position.X, _position.Y));
            this.target = new L.Vector(_position.X, _position.Y);
            this.radius = 1.5 * L.scale;
        }
        draw() {
            L.crc2.save();
            L.crc2.beginPath();
            L.crc2.arc(this.position.X, this.position.Y, this.radius, 0, 2 * Math.PI, false);
            L.crc2.fillStyle = this.color;
            L.crc2.fill();
            L.crc2.lineWidth = 1;
            L.crc2.strokeStyle = "black";
            L.crc2.stroke();
            L.crc2.restore();
        }
    }
    L.Assistant = Assistant;
})(L || (L = {}));
//# sourceMappingURL=assistant.js.map