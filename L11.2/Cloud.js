"use strict";
var L11_2_Blumenwiese;
(function (L11_2_Blumenwiese) {
    class Cloud extends L11_2_Blumenwiese.Moveable {
        constructor(_size, _position) {
            super(_position);
            this.particlePositions = [];
            if (_position)
                this.position = _position;
            else
                this.position = new L11_2_Blumenwiese.Vector(50, 100);
            this.velocity = new L11_2_Blumenwiese.Vector(30, 0);
            if (_size)
                this.size = _size;
            else
                this.size = new L11_2_Blumenwiese.Vector(270, 75);
            for (let drawn = 0; drawn < 50; drawn++) {
                let x = (Math.random() - 0.5) * this.size.x;
                let y = -(Math.random() * this.size.y);
                let position = new L11_2_Blumenwiese.Vector(x, y);
                this.particlePositions.push(position);
            }
        }
        draw() {
            let radiusParticle = 50;
            let particle = new Path2D();
            let gradient = L11_2_Blumenwiese.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            L11_2_Blumenwiese.crc2.save();
            L11_2_Blumenwiese.crc2.translate(this.position.x, this.position.y);
            L11_2_Blumenwiese.crc2.fillStyle = gradient;
            for (let drawn of this.particlePositions) {
                L11_2_Blumenwiese.crc2.save();
                L11_2_Blumenwiese.crc2.translate(drawn.x, drawn.y);
                L11_2_Blumenwiese.crc2.fill(particle);
                L11_2_Blumenwiese.crc2.restore();
            }
            L11_2_Blumenwiese.crc2.restore();
        }
    }
    L11_2_Blumenwiese.Cloud = Cloud;
})(L11_2_Blumenwiese || (L11_2_Blumenwiese = {}));
//# sourceMappingURL=Cloud.js.map