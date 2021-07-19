"use strict";
var L;
(function (L) {
    /**
     * super class to handle movable objects
     */
    class Movable {
        constructor(_position) {
            this.position = _position;
            this.speed = 1;
            this.speedLevel = 1;
            this.slowDown = false;
            this.radius = 2 * L.scale;
        }
        move(_target) {
            let diffVector = new L.Vector(_target.X - this.position.X, _target.Y - this.position.Y);
            let vectorLength = Math.sqrt(Math.pow(diffVector.X, 2) + Math.pow(diffVector.Y, 2));
            if (vectorLength === 0) {
                return;
            }
            let speedLevel = this.speedLevel * (this.speed / 100);
            let speed = this.slowDown ? speedLevel * (vectorLength / 100) : speedLevel;
            let scaleFactor = speed / vectorLength;
            diffVector.scale(scaleFactor);
            this.position.add(diffVector);
        }
    }
    L.Movable = Movable;
})(L || (L = {}));
//# sourceMappingURL=moveable.js.map