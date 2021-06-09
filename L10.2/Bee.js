"use strict";
var L10_Blumenwiese;
(function (L10_Blumenwiese) {
    class Bee extends L10_Blumenwiese.Moveable {
        constructor(_size, _position) {
            super(_position);
            if (_position) //kein Vektor angegeben
                this.position = _position;
            else
                this.position = new L10_Blumenwiese.Vector(300, 400); // position wenn Vektor nicht angegeben ist
            this.velocity = new L10_Blumenwiese.Vector(50, 0); //Startpunkt
            this.velocity.random(120, 20); //random. Pixelwerte (min und max)
        }
        draw() {
            L10_Blumenwiese.crc2.save();
            //wings
            L10_Blumenwiese.crc2.save();
            L10_Blumenwiese.crc2.beginPath();
            L10_Blumenwiese.crc2.arc(this.position.x - 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            L10_Blumenwiese.crc2.strokeStyle = "black";
            L10_Blumenwiese.crc2.fillStyle = "lightblue";
            L10_Blumenwiese.crc2.fill();
            L10_Blumenwiese.crc2.closePath();
            L10_Blumenwiese.crc2.stroke();
            L10_Blumenwiese.crc2.save();
            L10_Blumenwiese.crc2.beginPath();
            L10_Blumenwiese.crc2.arc(this.position.x + 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            L10_Blumenwiese.crc2.strokeStyle = "black";
            L10_Blumenwiese.crc2.fillStyle = "lightblue";
            L10_Blumenwiese.crc2.fill();
            L10_Blumenwiese.crc2.closePath();
            L10_Blumenwiese.crc2.stroke();
            L10_Blumenwiese.crc2.beginPath();
            //body
            L10_Blumenwiese.crc2.ellipse(this.position.x, this.position.y, 10, 20, 300, 0, 2 * Math.PI);
            L10_Blumenwiese.crc2.strokeStyle = "yellow";
            L10_Blumenwiese.crc2.fillStyle = "yellow";
            L10_Blumenwiese.crc2.fill();
            L10_Blumenwiese.crc2.closePath();
            //stripes
            L10_Blumenwiese.crc2.beginPath();
            L10_Blumenwiese.crc2.moveTo(this.position.x - 10, this.position.y + 9);
            L10_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y - 9);
            L10_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 10);
            L10_Blumenwiese.crc2.lineTo(this.position.x, this.position.y - 10);
            L10_Blumenwiese.crc2.moveTo(this.position.x + 10, this.position.y + 9);
            L10_Blumenwiese.crc2.lineTo(this.position.x + 10, this.position.y - 9);
            L10_Blumenwiese.crc2.strokeStyle = "black";
            L10_Blumenwiese.crc2.lineWidth = 5;
            L10_Blumenwiese.crc2.stroke();
            L10_Blumenwiese.crc2.closePath();
            L10_Blumenwiese.crc2.restore();
            L10_Blumenwiese.crc2.restore();
        }
    }
    L10_Blumenwiese.Bee = Bee;
})(L10_Blumenwiese || (L10_Blumenwiese = {}));
//# sourceMappingURL=Bee.js.map