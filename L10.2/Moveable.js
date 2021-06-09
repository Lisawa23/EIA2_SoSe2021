"use strict";
var L10_Blumenwiese;
(function (L10_Blumenwiese) {
    class Moveable {
        constructor(_position) {
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L10_Blumenwiese.Vector(0, 0);
            this.velocity = new L10_Blumenwiese.Vector(0, 0);
        }
        move(_timeslice) {
            // console.log("Moveable move");
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L10_Blumenwiese.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L10_Blumenwiese.crc2.canvas.height;
            if (this.position.x > L10_Blumenwiese.crc2.canvas.width)
                this.position.x -= L10_Blumenwiese.crc2.canvas.width;
            if (this.position.y > L10_Blumenwiese.crc2.canvas.height)
                this.position.y -= L10_Blumenwiese.crc2.canvas.height;
        }
        draw() {
            // console.log("Moveable move");
        }
    }
    L10_Blumenwiese.Moveable = Moveable;
})(L10_Blumenwiese || (L10_Blumenwiese = {}));
//# sourceMappingURL=Moveable.js.map