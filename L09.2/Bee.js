"use strict";
var L09_Blumenwiese;
(function (L09_Blumenwiese) {
    class Bee {
        constructor(_size, _position) {
            if (_position) //kein Vektor angegeben
                this.position = _position;
            else
                this.position = new L09_Blumenwiese.Vector(300, 400); // position wenn Vektor nicht angegeben ist
            this.velocity = new L09_Blumenwiese.Vector(50, 0); //Startpunkt
            this.velocity.random(120, 20); //random. Pixelwerte (min und max)
        }
        move(_timeslice) {
            let offset = new L09_Blumenwiese.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L09_Blumenwiese.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L09_Blumenwiese.crc2.canvas.height;
            if (this.position.x > L09_Blumenwiese.crc2.canvas.width)
                this.position.x -= L09_Blumenwiese.crc2.canvas.width;
            if (this.position.y > L09_Blumenwiese.crc2.canvas.height)
                this.position.y -= L09_Blumenwiese.crc2.canvas.height;
        }
        draw() {
            L09_Blumenwiese.crc2.save();
            //wings
            L09_Blumenwiese.crc2.save();
            L09_Blumenwiese.crc2.beginPath();
            L09_Blumenwiese.crc2.arc(this.position.x - 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            L09_Blumenwiese.crc2.strokeStyle = "black";
            L09_Blumenwiese.crc2.fillStyle = "lightblue";
            L09_Blumenwiese.crc2.fill();
            L09_Blumenwiese.crc2.closePath();
            L09_Blumenwiese.crc2.stroke();
            L09_Blumenwiese.crc2.save();
            L09_Blumenwiese.crc2.beginPath();
            L09_Blumenwiese.crc2.arc(this.position.x + 4, this.position.y - 11, 10, 0, 2 * Math.PI);
            L09_Blumenwiese.crc2.strokeStyle = "black";
            L09_Blumenwiese.crc2.fillStyle = "lightblue";
            L09_Blumenwiese.crc2.fill();
            L09_Blumenwiese.crc2.closePath();
            L09_Blumenwiese.crc2.stroke();
            L09_Blumenwiese.crc2.beginPath();
            //body
            L09_Blumenwiese.crc2.ellipse(this.position.x, this.position.y, 10, 20, 300, 0, 2 * Math.PI);
            L09_Blumenwiese.crc2.strokeStyle = "yellow";
            L09_Blumenwiese.crc2.fillStyle = "yellow";
            L09_Blumenwiese.crc2.fill();
            L09_Blumenwiese.crc2.closePath();
            //stripes
            L09_Blumenwiese.crc2.beginPath();
            L09_Blumenwiese.crc2.moveTo(this.position.x - 10, this.position.y + 9);
            L09_Blumenwiese.crc2.lineTo(this.position.x - 10, this.position.y - 9);
            L09_Blumenwiese.crc2.moveTo(this.position.x, this.position.y + 10);
            L09_Blumenwiese.crc2.lineTo(this.position.x, this.position.y - 10);
            L09_Blumenwiese.crc2.moveTo(this.position.x + 10, this.position.y + 9);
            L09_Blumenwiese.crc2.lineTo(this.position.x + 10, this.position.y - 9);
            L09_Blumenwiese.crc2.strokeStyle = "black";
            L09_Blumenwiese.crc2.lineWidth = 5;
            L09_Blumenwiese.crc2.stroke();
            L09_Blumenwiese.crc2.closePath();
            L09_Blumenwiese.crc2.restore();
            L09_Blumenwiese.crc2.restore();
        }
    }
    L09_Blumenwiese.Bee = Bee;
})(L09_Blumenwiese || (L09_Blumenwiese = {}));
//# sourceMappingURL=Bee.js.map