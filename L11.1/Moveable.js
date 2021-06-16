"use strict";
var L11_1_Blumenwiese;
(function (L11_1_Blumenwiese) {
    class Moveable {
        constructor(_position) {
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L11_1_Blumenwiese.Vector(0, 0);
            this.velocity = new L11_1_Blumenwiese.Vector(0, 0);
        }
        move(_timeslice) {
            // console.log("Moveable move");
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L11_1_Blumenwiese.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L11_1_Blumenwiese.crc2.canvas.height;
            if (this.position.x > L11_1_Blumenwiese.crc2.canvas.width)
                this.position.x -= L11_1_Blumenwiese.crc2.canvas.width;
            if (this.position.y > L11_1_Blumenwiese.crc2.canvas.height)
                this.position.y -= L11_1_Blumenwiese.crc2.canvas.height;
        }
        draw() {
            // console.log("Moveable move");
        }
    }
    L11_1_Blumenwiese.Moveable = Moveable;
})(L11_1_Blumenwiese || (L11_1_Blumenwiese = {}));
//# sourceMappingURL=Moveable.js.map