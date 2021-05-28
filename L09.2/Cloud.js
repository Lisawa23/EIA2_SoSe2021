"use strict";
var L09_Blumenwiese;
(function (L09_Blumenwiese) {
    class Cloud {
        constructor(_size, _position) {
            if (_position)
                this.position = _position;
            else
                this.position = new L09_Blumenwiese.Vector(50, 50);
            this.velocity = new L09_Blumenwiese.Vector(30, 0);
            if (_size)
                this.size = _size;
            else
                this.size = new L09_Blumenwiese.Vector(270, 75);
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
            let nParticles = 20;
            let radiusParticle = 50;
            let particle = new Path2D();
            let gradient = L09_Blumenwiese.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            L09_Blumenwiese.crc2.save();
            L09_Blumenwiese.crc2.translate(this.position.x, this.position.y);
            L09_Blumenwiese.crc2.fillStyle = gradient;
            for (let drawn = 0; drawn < nParticles; drawn++) {
                L09_Blumenwiese.crc2.save();
                L09_Blumenwiese.crc2.translate((Math.random() - 0.5) * this.size.x, -(Math.random() * this.size.y));
                L09_Blumenwiese.crc2.fill(particle);
                L09_Blumenwiese.crc2.restore();
            }
            L09_Blumenwiese.crc2.restore();
        }
    }
    L09_Blumenwiese.Cloud = Cloud;
})(L09_Blumenwiese || (L09_Blumenwiese = {}));
//# sourceMappingURL=Cloud.js.map