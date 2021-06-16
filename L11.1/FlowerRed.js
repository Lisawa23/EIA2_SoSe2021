"use strict";
var L11_1_Blumenwiese;
(function (L11_1_Blumenwiese) {
    class FlowerRed extends L11_1_Blumenwiese.SubFlower {
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
            L11_1_Blumenwiese.crc2.fillRect(this.position.x, this.position.y, 4, 50); //PositionX, PositionY, Stielbreite, Stiellänge
            //Blätter
            L11_1_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 50);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x + 10, this.position.y + 10);
            L11_1_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 40);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y + 20);
            L11_1_Blumenwiese.crc2.stroke();
            L11_1_Blumenwiese.crc2.fill();
            L11_1_Blumenwiese.crc2.save();
            //Blütenblätter
            L11_1_Blumenwiese.crc2.translate(this.position.x, this.position.y);
            for (let i = 0; i < 5; i++) {
                L11_1_Blumenwiese.crc2.rotate(Math.PI * 2 / 5);
                L11_1_Blumenwiese.crc2.beginPath();
                L11_1_Blumenwiese.crc2.moveTo(10, 10);
                L11_1_Blumenwiese.crc2.lineTo(-7, -10);
                L11_1_Blumenwiese.crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
                L11_1_Blumenwiese.crc2.closePath();
                L11_1_Blumenwiese.crc2.fillStyle = "red";
                L11_1_Blumenwiese.crc2.fill();
            }
            L11_1_Blumenwiese.crc2.restore();
            //Blüte
            L11_1_Blumenwiese.crc2.save();
            L11_1_Blumenwiese.crc2.translate(this.position.x, this.position.y);
            L11_1_Blumenwiese.crc2.beginPath();
            L11_1_Blumenwiese.crc2.arc(0, 0, 7, 0, 2 * Math.PI);
            L11_1_Blumenwiese.crc2.closePath();
            L11_1_Blumenwiese.crc2.fillStyle = "yellow";
            L11_1_Blumenwiese.crc2.fill();
            L11_1_Blumenwiese.crc2.restore();
        }
    }
    L11_1_Blumenwiese.FlowerRed = FlowerRed;
})(L11_1_Blumenwiese || (L11_1_Blumenwiese = {}));
//# sourceMappingURL=FlowerRed.js.map