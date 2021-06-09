"use strict";
var L10_Blumenwiese;
(function (L10_Blumenwiese) {
    class FlowerPink extends L10_Blumenwiese.Moveable {
        constructor(_position) {
            super(_position);
            let horizon = L10_Blumenwiese.crc2.canvas.height * L10_Blumenwiese.golden;
            let randomX = Math.floor(Math.random() * L10_Blumenwiese.crc2.canvas.width);
            let randomY = horizon + Math.floor(Math.random() * 250);
            if (_position)
                this.position = _position;
            else
                this.position = new L10_Blumenwiese.Vector(randomX, randomY);
        }
        draw() {
            // Blumenstiel
            L10_Blumenwiese.crc2.beginPath();
            L10_Blumenwiese.crc2.strokeStyle = "green";
            L10_Blumenwiese.crc2.fillStyle = "green";
            L10_Blumenwiese.crc2.fillRect(this.position.x, this.position.y, 4, 50);
            //Blätter
            L10_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 50);
            L10_Blumenwiese.crc2.lineTo(this.position.x + 10, this.position.y + 10);
            L10_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 40);
            L10_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y + 20);
            L10_Blumenwiese.crc2.stroke();
            L10_Blumenwiese.crc2.fill();
            //Blütenblätter
            L10_Blumenwiese.crc2.save();
            L10_Blumenwiese.crc2.translate(this.position.x, this.position.y);
            for (let i = 80; i > 8; i -= 8) {
                L10_Blumenwiese.crc2.rotate(45 * Math.PI / 20);
                L10_Blumenwiese.crc2.beginPath();
                L10_Blumenwiese.crc2.moveTo(10, 20);
                L10_Blumenwiese.crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
                L10_Blumenwiese.crc2.fillStyle = "pink";
                L10_Blumenwiese.crc2.strokeStyle = "pink";
                L10_Blumenwiese.crc2.fill();
                L10_Blumenwiese.crc2.stroke();
            }
            L10_Blumenwiese.crc2.restore();
            //Blüte
            L10_Blumenwiese.crc2.save();
            L10_Blumenwiese.crc2.beginPath();
            moveTo(this.position.x + 10, this.position.y + 20);
            L10_Blumenwiese.crc2.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
            L10_Blumenwiese.crc2.fillStyle = "yellow";
            L10_Blumenwiese.crc2.strokeStyle = "yellow";
            L10_Blumenwiese.crc2.fill();
            L10_Blumenwiese.crc2.stroke();
            L10_Blumenwiese.crc2.restore();
        }
    }
    L10_Blumenwiese.FlowerPink = FlowerPink;
})(L10_Blumenwiese || (L10_Blumenwiese = {}));
//# sourceMappingURL=FlowerPink.js.map