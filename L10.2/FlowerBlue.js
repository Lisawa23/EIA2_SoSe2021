"use strict";
var L10_Blumenwiese;
(function (L10_Blumenwiese) {
    class FlowerBlue extends L10_Blumenwiese.Moveable {
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
            L10_Blumenwiese.crc2.beginPath();
            moveTo(this.position.x + 10, this.position.y + 20);
            L10_Blumenwiese.crc2.arc(this.position.x, this.position.y, 9, 0, 1 * Math.PI);
            L10_Blumenwiese.crc2.fillStyle = "blue";
            L10_Blumenwiese.crc2.strokeStyle = "blue";
            L10_Blumenwiese.crc2.fill();
            L10_Blumenwiese.crc2.stroke();
            moveTo(this.position.x, this.position.y + 20);
            L10_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y - 10);
            L10_Blumenwiese.crc2.lineTo(this.position.x - 3, this.position.y + 2);
            L10_Blumenwiese.crc2.lineTo(this.position.x + 1, this.position.y - 10);
            L10_Blumenwiese.crc2.lineTo(this.position.x + 4, this.position.y + 2);
            L10_Blumenwiese.crc2.lineTo(this.position.x + 9, this.position.y - 10);
            L10_Blumenwiese.crc2.lineTo(this.position.x + 9, this.position.y + 3);
            L10_Blumenwiese.crc2.closePath();
            L10_Blumenwiese.crc2.fillStyle = "blue";
            L10_Blumenwiese.crc2.fill();
            L10_Blumenwiese.crc2.stroke();
        }
    }
    L10_Blumenwiese.FlowerBlue = FlowerBlue;
})(L10_Blumenwiese || (L10_Blumenwiese = {}));
//# sourceMappingURL=FlowerBlue.js.map