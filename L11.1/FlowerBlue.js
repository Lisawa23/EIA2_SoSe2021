"use strict";
var L11_1_Blumenwiese;
(function (L11_1_Blumenwiese) {
    class FlowerBlue extends L11_1_Blumenwiese.SubFlower {
        constructor(_position) {
            super(_position);
            let horizon = L11_1_Blumenwiese.crc2.canvas.height * L11_1_Blumenwiese.golden;
            let randomX = Math.floor(Math.random() * L11_1_Blumenwiese.crc2.canvas.width);
            let randomY = horizon + Math.floor(Math.random() * 250);
            if (_position)
                this.position = _position;
            else
                this.position = new L11_1_Blumenwiese.Vector(randomX, randomY);
        }
        draw() {
            // Blumenstiel
            L11_1_Blumenwiese.crc2.beginPath();
            L11_1_Blumenwiese.crc2.strokeStyle = "green";
            L11_1_Blumenwiese.crc2.fillStyle = "green";
            L11_1_Blumenwiese.crc2.fillRect(this.position.x, this.position.y, 4, 50);
            //Blätter
            L11_1_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 50);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x + 10, this.position.y + 10);
            L11_1_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 40);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y + 20);
            L11_1_Blumenwiese.crc2.stroke();
            L11_1_Blumenwiese.crc2.fill();
            //Blütenblätter
            L11_1_Blumenwiese.crc2.beginPath();
            moveTo(this.position.x + 10, this.position.y + 20);
            L11_1_Blumenwiese.crc2.arc(this.position.x, this.position.y, 9, 0, 1 * Math.PI);
            L11_1_Blumenwiese.crc2.fillStyle = "blue";
            L11_1_Blumenwiese.crc2.strokeStyle = "blue";
            L11_1_Blumenwiese.crc2.fill();
            L11_1_Blumenwiese.crc2.stroke();
            moveTo(this.position.x, this.position.y + 20);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y - 10);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x - 3, this.position.y + 2);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x + 1, this.position.y - 10);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x + 4, this.position.y + 2);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x + 9, this.position.y - 10);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x + 9, this.position.y + 3);
            L11_1_Blumenwiese.crc2.closePath();
            L11_1_Blumenwiese.crc2.fillStyle = "blue";
            L11_1_Blumenwiese.crc2.fill();
            L11_1_Blumenwiese.crc2.stroke();
            //Füllstand
        }
    }
    L11_1_Blumenwiese.FlowerBlue = FlowerBlue;
})(L11_1_Blumenwiese || (L11_1_Blumenwiese = {}));
//# sourceMappingURL=FlowerBlue.js.map