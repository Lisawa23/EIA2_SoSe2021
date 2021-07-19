"use strict";
var L;
(function (L) {
    class SoccerField {
        constructor() {
            this.padding = 15 * L.scale;
            this.width = 105 * L.scale;
            this.height = 80 * L.scale;
        }
        ballOut(_ball) {
            if (_ball.position.X < this.padding) {
                return true;
            }
            if (_ball.position.X > this.padding + this.width) {
                return true;
            }
            if (_ball.position.Y < this.padding) {
                return true;
            }
            if (_ball.position.Y > this.padding + this.height) {
                return true;
            }
            return false;
        }
        draw() {
            // default stuff
            L.crc2.save();
            L.crc2.fillStyle = "green";
            L.crc2.fillRect(0, 0, L.crc2.canvas.width, L.crc2.canvas.height);
            // draw outline
            L.crc2.beginPath();
            L.crc2.moveTo(this.padding, this.padding);
            L.crc2.lineTo(this.padding + this.width, this.padding);
            L.crc2.lineTo(this.padding + this.width, this.padding + this.height);
            L.crc2.lineTo(this.padding, this.padding + this.height);
            L.crc2.lineTo(this.padding, this.padding);
            // mid line
            L.crc2.moveTo(this.padding + (this.width / 2), this.padding);
            L.crc2.lineTo(this.padding + (this.width / 2), this.padding + this.height);
            L.crc2.lineWidth = 2;
            L.crc2.strokeStyle = "#ffffff";
            L.crc2.stroke();
            // goal area left
            L.crc2.beginPath();
            L.crc2.rect(this.padding, (this.padding + (this.height / 2)) - 50, 30, 100);
            L.crc2.strokeStyle = "white";
            L.crc2.stroke();
            // goal area right
            L.crc2.beginPath();
            L.crc2.rect(this.padding + this.width - 30, (this.padding + (this.height / 2)) - 50, 30, 100);
            L.crc2.strokeStyle = "white";
            L.crc2.stroke();
            // left goal
            L.crc2.moveTo(this.padding, this.padding + (this.height / 2) - 20);
            L.crc2.lineTo(this.padding - (5 * L.scale), this.padding + (this.height / 2) - 20);
            L.crc2.lineTo(this.padding - (5 * L.scale), this.padding + (this.height / 2) + 20);
            L.crc2.lineTo(this.padding, this.padding + (this.height / 2) + (40 / 2));
            L.crc2.stroke();
            // right goal
            L.crc2.moveTo(this.padding + this.width, this.padding + (this.height / 2) - 20);
            L.crc2.lineTo(this.padding + this.width + (5 * L.scale), this.padding + (this.height / 2) - 20);
            L.crc2.lineTo(this.padding + this.width + (5 * L.scale), this.padding + (this.height / 2) + 20);
            L.crc2.lineTo(this.padding + this.width, this.padding + (this.height / 2) + 20);
            L.crc2.stroke();
            // middle circle
            L.crc2.beginPath();
            L.crc2.arc(this.padding + (this.width / 2), this.padding + (this.height / 2), 50, 0, 2 * Math.PI, false);
            L.crc2.lineWidth = 2;
            L.crc2.strokeStyle = "white";
            L.crc2.stroke();
            //dot
            L.crc2.beginPath();
            L.crc2.arc(this.padding + (this.width / 2), this.padding + (this.height / 2), 2, 0, 2 * Math.PI, false);
            L.crc2.fillStyle = "white";
            L.crc2.fill();
            L.crc2.restore();
        }
        homeGoal(_ball) {
            if (_ball.position.X < this.padding &&
                _ball.position.Y > this.padding + (this.height / 2) - 20 &&
                _ball.position.Y < this.padding + (this.height / 2) + 20) {
                return true;
            }
            return false;
        }
        awayGoal(_ball) {
            if (_ball.position.X > this.padding + this.width &&
                _ball.position.Y > this.padding + (this.height / 2) - 20 &&
                _ball.position.Y < this.padding + (this.height / 2) + 20) {
                return true;
            }
            return false;
        }
    }
    L.SoccerField = SoccerField;
})(L || (L = {}));
//# sourceMappingURL=field.js.map