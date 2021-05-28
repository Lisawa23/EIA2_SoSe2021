"use strict";
var L09_Blumenwiese;
(function (L09_Blumenwiese) {
    class Flower {
        constructor(_position) {
            let horizon = L09_Blumenwiese.crc2.canvas.height * L09_Blumenwiese.golden;
            let randomX = Math.floor(Math.random() * L09_Blumenwiese.crc2.canvas.width);
            let randomY = horizon + Math.floor(Math.random() * 250);
            if (_position)
                this.position = _position;
            else
                this.position = new L09_Blumenwiese.Vector(randomX, randomY);
        }
        drawFlowerRed() {
            // Blumenstiel
            L09_Blumenwiese.crc2.beginPath();
            L09_Blumenwiese.crc2.strokeStyle = "green";
            L09_Blumenwiese.crc2.fillStyle = "green";
            L09_Blumenwiese.crc2.fillRect(this.position.x, this.position.y, 4, 50); //PositionX, PositionY, Stielbreite, Stiellänge
            //Blätter
            L09_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 50);
            L09_Blumenwiese.crc2.lineTo(this.position.x + 10, this.position.y + 10);
            L09_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 40);
            L09_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y + 20);
            L09_Blumenwiese.crc2.stroke();
            L09_Blumenwiese.crc2.fill();
            L09_Blumenwiese.crc2.save();
            //Blütenblätter
            L09_Blumenwiese.crc2.translate(this.position.x, this.position.y);
            for (let i = 0; i < 5; i++) {
                L09_Blumenwiese.crc2.rotate(Math.PI * 2 / 5);
                L09_Blumenwiese.crc2.beginPath();
                L09_Blumenwiese.crc2.moveTo(10, 10);
                L09_Blumenwiese.crc2.lineTo(-7, -10);
                L09_Blumenwiese.crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
                L09_Blumenwiese.crc2.closePath();
                L09_Blumenwiese.crc2.fillStyle = "red";
                L09_Blumenwiese.crc2.fill();
            }
            L09_Blumenwiese.crc2.restore();
            //Blüte
            L09_Blumenwiese.crc2.save();
            L09_Blumenwiese.crc2.translate(this.position.x, this.position.y);
            L09_Blumenwiese.crc2.beginPath();
            L09_Blumenwiese.crc2.arc(0, 0, 7, 0, 2 * Math.PI);
            L09_Blumenwiese.crc2.closePath();
            L09_Blumenwiese.crc2.fillStyle = "yellow";
            L09_Blumenwiese.crc2.fill();
            L09_Blumenwiese.crc2.restore();
        }
        drawFlowerBlue() {
            // Blumenstiel
            L09_Blumenwiese.crc2.beginPath();
            L09_Blumenwiese.crc2.strokeStyle = "green";
            L09_Blumenwiese.crc2.fillStyle = "green";
            L09_Blumenwiese.crc2.fillRect(this.position.x, this.position.y, 4, 50);
            //Blätter
            L09_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 50);
            L09_Blumenwiese.crc2.lineTo(this.position.x + 10, this.position.y + 10);
            L09_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 40);
            L09_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y + 20);
            L09_Blumenwiese.crc2.stroke();
            L09_Blumenwiese.crc2.fill();
            //Blütenblätter
            L09_Blumenwiese.crc2.beginPath();
            moveTo(this.position.x + 10, this.position.y + 20);
            L09_Blumenwiese.crc2.arc(this.position.x, this.position.y, 9, 0, 1 * Math.PI);
            L09_Blumenwiese.crc2.fillStyle = "blue";
            L09_Blumenwiese.crc2.strokeStyle = "blue";
            L09_Blumenwiese.crc2.fill();
            L09_Blumenwiese.crc2.stroke();
            moveTo(this.position.x, this.position.y + 20);
            L09_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y - 10);
            L09_Blumenwiese.crc2.lineTo(this.position.x - 3, this.position.y + 2);
            L09_Blumenwiese.crc2.lineTo(this.position.x + 1, this.position.y - 10);
            L09_Blumenwiese.crc2.lineTo(this.position.x + 4, this.position.y + 2);
            L09_Blumenwiese.crc2.lineTo(this.position.x + 9, this.position.y - 10);
            L09_Blumenwiese.crc2.lineTo(this.position.x + 9, this.position.y + 3);
            L09_Blumenwiese.crc2.closePath();
            L09_Blumenwiese.crc2.fillStyle = "blue";
            L09_Blumenwiese.crc2.fill();
            L09_Blumenwiese.crc2.stroke();
        }
        drawFlowerPink() {
            // Blumenstiel
            L09_Blumenwiese.crc2.beginPath();
            L09_Blumenwiese.crc2.strokeStyle = "green";
            L09_Blumenwiese.crc2.fillStyle = "green";
            L09_Blumenwiese.crc2.fillRect(this.position.x, this.position.y, 4, 50);
            //Blätter
            L09_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 50);
            L09_Blumenwiese.crc2.lineTo(this.position.x + 10, this.position.y + 10);
            L09_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 40);
            L09_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y + 20);
            L09_Blumenwiese.crc2.stroke();
            L09_Blumenwiese.crc2.fill();
            //Blütenblätter
            L09_Blumenwiese.crc2.save();
            L09_Blumenwiese.crc2.translate(this.position.x, this.position.y);
            for (let i = 80; i > 8; i -= 8) {
                L09_Blumenwiese.crc2.rotate(45 * Math.PI / 20);
                L09_Blumenwiese.crc2.beginPath();
                L09_Blumenwiese.crc2.moveTo(10, 20);
                L09_Blumenwiese.crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
                L09_Blumenwiese.crc2.fillStyle = "pink";
                L09_Blumenwiese.crc2.strokeStyle = "pink";
                L09_Blumenwiese.crc2.fill();
                L09_Blumenwiese.crc2.stroke();
            }
            L09_Blumenwiese.crc2.restore();
            //Blüte
            L09_Blumenwiese.crc2.save();
            L09_Blumenwiese.crc2.beginPath();
            moveTo(this.position.x + 10, this.position.y + 20);
            L09_Blumenwiese.crc2.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
            L09_Blumenwiese.crc2.fillStyle = "yellow";
            L09_Blumenwiese.crc2.strokeStyle = "yellow";
            L09_Blumenwiese.crc2.fill();
            L09_Blumenwiese.crc2.stroke();
            L09_Blumenwiese.crc2.restore();
        }
    }
    L09_Blumenwiese.Flower = Flower;
})(L09_Blumenwiese || (L09_Blumenwiese = {}));
//# sourceMappingURL=Flowers.js.map