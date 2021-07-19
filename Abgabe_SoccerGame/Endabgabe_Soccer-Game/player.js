"use strict";
var L;
(function (L) {
    class Player extends L.Movable {
        constructor(_position, _shotPower, _precision, _speed, _color, _team, _trikotNumer, _actionRadius) {
            super(new L.Vector(_position.X, _position.Y));
            this.speed = 80;
            this.origin = new L.Vector(0, 0);
            this.highlighted = true;
            this.speedLevel = 2;
            this.shotPower = _shotPower;
            this.precision = _precision;
            this.speed = _speed;
            this.color = _color;
            this.team = _team;
            this.active = true;
            this.tricotNumber = _trikotNumer;
            this.actionRadius = _actionRadius * L.scale;
            this.origin = new L.Vector(_position.X, _position.Y);
        }
        draw() {
            L.crc2.save();
            L.crc2.beginPath();
            L.crc2.arc(this.position.X, this.position.Y, this.highlighted ? this.radius * 1.5 : this.radius, 0, 2 * Math.PI, false);
            L.crc2.fillStyle = this.color;
            L.crc2.fill();
            L.crc2.lineWidth = this.highlighted ? 2 : 1;
            L.crc2.strokeStyle = "black";
            L.crc2.stroke();
            L.crc2.textAlign = "center";
            L.crc2.textBaseline = "middle";
            L.crc2.fillStyle = "white";
            L.crc2.fillText(this.tricotNumber.toString(), this.position.X, this.position.Y);
            L.crc2.restore();
        }
        // Wenn Player geklickt wurde:
        isClicked(_clickPosition) {
            let difference = new L.Vector(_clickPosition.X - this.position.X, _clickPosition.Y - this.position.Y);
            return (difference.length < this.radius);
        }
    }
    L.Player = Player;
})(L || (L = {}));
//# sourceMappingURL=player.js.map