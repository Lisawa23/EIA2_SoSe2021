"use strict";
var L;
(function (L) {
    class Vector {
        constructor(_X, _Y) {
            this.X = _X;
            this.Y = _Y;
        }
        static getDifference(_v0, _v1) {
            return new Vector(_v0.X - _v1.X, _v0.Y - _v1.Y);
        }
        get length() {
            return Math.hypot(this.X, this.Y);
        }
        scale(_factor) {
            this.X *= _factor;
            this.Y *= _factor;
        }
        add(_added) {
            this.X += _added.X;
            this.Y += _added.Y;
        }
    }
    L.Vector = Vector;
})(L || (L = {}));
//# sourceMappingURL=vector.js.map