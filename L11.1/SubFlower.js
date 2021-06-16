"use strict";
var L11_1_Blumenwiese;
(function (L11_1_Blumenwiese) {
    class SubFlower {
        constructor(_position) {
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L11_1_Blumenwiese.Vector(0, 0);
        }
        draw() {
            // console.log("Moveable move");
        }
    }
    L11_1_Blumenwiese.SubFlower = SubFlower;
})(L11_1_Blumenwiese || (L11_1_Blumenwiese = {}));
//# sourceMappingURL=SubFlower.js.map