"use strict";
var L11_2_Blumenwiese;
(function (L11_2_Blumenwiese) {
    class FlowerRed extends L11_2_Blumenwiese.SubFlower {
        constructor(_x, _y, _fillLevel, _position) {
            super(_x, _y);
            let randomFill = Math.floor(Math.random() * 50);
            if (_position)
                this.position = _position;
            else
                this.position = new L11_2_Blumenwiese.Vector(0, 0);
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
            L11_2_Blumenwiese.crc2.fillRect(this.x, this.y, 4, 50); //PositionX, PositionY, Stielbreite, Stiellänge
            //Blätter
            L11_2_Blumenwiese.crc2.moveTo(this.x, this.y + 50);
            L11_2_Blumenwiese.crc2.lineTo(this.x + 10, this.y + 10);
            L11_2_Blumenwiese.crc2.moveTo(this.x, this.y + 40);
            L11_2_Blumenwiese.crc2.lineTo(this.x - 10, this.y + 20);
            L11_2_Blumenwiese.crc2.stroke();
            L11_2_Blumenwiese.crc2.fill();
            L11_2_Blumenwiese.crc2.save();
            //Blütenblätter
            L11_2_Blumenwiese.crc2.translate(this.x, this.y);
            for (let i = 0; i < 5; i++) {
                L11_2_Blumenwiese.crc2.rotate(Math.PI * 2 / 5);
                L11_2_Blumenwiese.crc2.beginPath();
                L11_2_Blumenwiese.crc2.moveTo(10, 10);
                L11_2_Blumenwiese.crc2.lineTo(-7, -10);
                L11_2_Blumenwiese.crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
                L11_2_Blumenwiese.crc2.closePath();
                L11_2_Blumenwiese.crc2.fillStyle = "red";
                L11_2_Blumenwiese.crc2.fill();
            }
            L11_2_Blumenwiese.crc2.restore();
            //Blüte
            L11_2_Blumenwiese.crc2.save();
            L11_2_Blumenwiese.crc2.translate(this.x, this.y);
            L11_2_Blumenwiese.crc2.beginPath();
            L11_2_Blumenwiese.crc2.arc(0, 0, 7, 0, 2 * Math.PI);
            L11_2_Blumenwiese.crc2.closePath();
            L11_2_Blumenwiese.crc2.fillStyle = "yellow";
            L11_2_Blumenwiese.crc2.fill();
            L11_2_Blumenwiese.crc2.restore();
        }
        fill(_timeslice) {
            for (let i = 0; i < 10; i++) {
                L11_2_Blumenwiese.crc2.beginPath();
                L11_2_Blumenwiese.crc2.fillRect(this.x + 25, this.y - 10, 4, this.fillLevel);
                L11_2_Blumenwiese.crc2.closePath();
                L11_2_Blumenwiese.crc2.fillStyle = "orange";
                L11_2_Blumenwiese.crc2.strokeStyle = "orange";
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
    L11_2_Blumenwiese.FlowerRed = FlowerRed;
})(L11_2_Blumenwiese || (L11_2_Blumenwiese = {}));
//# sourceMappingURL=FlowerRed.js.map