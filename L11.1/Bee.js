"use strict";
var L11_1_Blumenwiese;
(function (L11_1_Blumenwiese) {
    class Bee extends L11_1_Blumenwiese.Moveable {
        constructor(_size, _position) {
            super(_position);
            if (_position) //kein Vektor angegeben
                this.position = _position;
            else
                this.position = new L11_1_Blumenwiese.Vector(300, 400); // position wenn Vektor nicht angegeben ist
            this.velocity = new L11_1_Blumenwiese.Vector(50, 0); //Startpunkt
            this.velocity.random(120, 20); //random. Pixelwerte (min und max)
        }
        draw() {
            L11_1_Blumenwiese.crc2.save();
            //wings
            L11_1_Blumenwiese.crc2.save();
            L11_1_Blumenwiese.crc2.beginPath();
            L11_1_Blumenwiese.crc2.arc(this.position.x - 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            L11_1_Blumenwiese.crc2.strokeStyle = "black";
            L11_1_Blumenwiese.crc2.fillStyle = "lightblue";
            L11_1_Blumenwiese.crc2.fill();
            L11_1_Blumenwiese.crc2.closePath();
            L11_1_Blumenwiese.crc2.stroke();
            L11_1_Blumenwiese.crc2.save();
            L11_1_Blumenwiese.crc2.beginPath();
            L11_1_Blumenwiese.crc2.arc(this.position.x + 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            L11_1_Blumenwiese.crc2.strokeStyle = "black";
            L11_1_Blumenwiese.crc2.fillStyle = "lightblue";
            L11_1_Blumenwiese.crc2.fill();
            L11_1_Blumenwiese.crc2.closePath();
            L11_1_Blumenwiese.crc2.stroke();
            L11_1_Blumenwiese.crc2.beginPath();
            //body
            L11_1_Blumenwiese.crc2.ellipse(this.position.x, this.position.y, 10, 20, 300, 0, 2 * Math.PI);
            L11_1_Blumenwiese.crc2.strokeStyle = "yellow";
            L11_1_Blumenwiese.crc2.fillStyle = "yellow";
            L11_1_Blumenwiese.crc2.fill();
            L11_1_Blumenwiese.crc2.closePath();
            //stripes
            L11_1_Blumenwiese.crc2.beginPath();
            L11_1_Blumenwiese.crc2.moveTo(this.position.x - 10, this.position.y + 9);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y - 9);
            L11_1_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 10);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x, this.position.y - 10);
            L11_1_Blumenwiese.crc2.moveTo(this.position.x + 10, this.position.y + 9);
            L11_1_Blumenwiese.crc2.lineTo(this.position.x + 10, this.position.y - 9);
            L11_1_Blumenwiese.crc2.strokeStyle = "black";
            L11_1_Blumenwiese.crc2.lineWidth = 5;
            L11_1_Blumenwiese.crc2.stroke();
            L11_1_Blumenwiese.crc2.closePath();
            L11_1_Blumenwiese.crc2.restore();
            L11_1_Blumenwiese.crc2.restore();
        }
    }
    L11_1_Blumenwiese.Bee = Bee;
})(L11_1_Blumenwiese || (L11_1_Blumenwiese = {}));
//# sourceMappingURL=Bee.js.map