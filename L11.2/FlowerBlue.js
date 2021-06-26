"use strict";
var L11_2_Blumenwiese;
(function (L11_2_Blumenwiese) {
    class FlowerBlue extends L11_2_Blumenwiese.SubFlower {
        constructor(_x, _y, _fillLevel, _position) {
            super(_x, _y);
            if (_position)
                this.position = _position;
            else
                this.position = new L11_2_Blumenwiese.Vector(0, 0);
            let randomFill = Math.floor(Math.random() * 50);
            if (_fillLevel)
                this.fillLevel = _fillLevel;
            else
                this.fillLevel = randomFill;
            this.velocity = new L11_2_Blumenwiese.Vector(0, 0);
        }
        draw() {
            // Blumenstiel
            L11_2_Blumenwiese.crc2.beginPath();
            L11_2_Blumenwiese.crc2.strokeStyle = "green";
            L11_2_Blumenwiese.crc2.fillStyle = "green";
            L11_2_Blumenwiese.crc2.fillRect(this.x, this.y, 4, 50);
            //Blätter
            L11_2_Blumenwiese.crc2.moveTo(this.x, this.y + 50);
            L11_2_Blumenwiese.crc2.lineTo(this.x + 10, this.y + 10);
            L11_2_Blumenwiese.crc2.moveTo(this.x, this.y + 40);
            L11_2_Blumenwiese.crc2.lineTo(this.x - 10, this.y + 20);
            L11_2_Blumenwiese.crc2.stroke();
            L11_2_Blumenwiese.crc2.fill();
            //Blütenblätter
            L11_2_Blumenwiese.crc2.beginPath();
            moveTo(this.x + 10, this.y + 20);
            L11_2_Blumenwiese.crc2.arc(this.x, this.y, 9, 0, 1 * Math.PI);
            L11_2_Blumenwiese.crc2.fillStyle = "blue";
            L11_2_Blumenwiese.crc2.strokeStyle = "blue";
            L11_2_Blumenwiese.crc2.fill();
            L11_2_Blumenwiese.crc2.stroke();
            moveTo(this.x, this.y + 20);
            L11_2_Blumenwiese.crc2.lineTo(this.x - 10, this.y - 10);
            L11_2_Blumenwiese.crc2.lineTo(this.x - 3, this.y + 2);
            L11_2_Blumenwiese.crc2.lineTo(this.x + 1, this.y - 10);
            L11_2_Blumenwiese.crc2.lineTo(this.x + 4, this.y + 2);
            L11_2_Blumenwiese.crc2.lineTo(this.x + 9, this.y - 10);
            L11_2_Blumenwiese.crc2.lineTo(this.x + 9, this.y + 3);
            L11_2_Blumenwiese.crc2.closePath();
            L11_2_Blumenwiese.crc2.fillStyle = "blue";
            L11_2_Blumenwiese.crc2.fill();
            L11_2_Blumenwiese.crc2.stroke();
            //Füllstand
        }
        fill(_timeslice) {
            for (let i = 0; i < 10; i++) {
                L11_2_Blumenwiese.crc2.beginPath();
                L11_2_Blumenwiese.crc2.fillRect(this.x + 15, this.y - 5, 4, this.fillLevel);
                L11_2_Blumenwiese.crc2.closePath();
                L11_2_Blumenwiese.crc2.fillStyle = "#1411b8";
                L11_2_Blumenwiese.crc2.strokeStyle = "#1411b8";
                L11_2_Blumenwiese.crc2.fill();
                L11_2_Blumenwiese.crc2.stroke();
            }
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.fillLevel < 50)
                this.fillLevel += 0.03;
            // if (this.fillLevel > 50)
            //         this.fillLevel -= this.fillLevel;
        }
    }
    L11_2_Blumenwiese.FlowerBlue = FlowerBlue;
})(L11_2_Blumenwiese || (L11_2_Blumenwiese = {}));
//# sourceMappingURL=FlowerBlue.js.map