namespace L {
    export class SoccerField {
        public padding: number = 15 * scale;
        public width: number = 105 * scale;
        public height: number = 80 * scale;

        public ballOut(_ball: Ball): boolean {
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

        public draw(): void {
            // default stuff
            crc2.save();
            crc2.fillStyle = "green";
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

            // draw outline
            crc2.beginPath();
            crc2.moveTo(this.padding, this.padding);
            crc2.lineTo(this.padding + this.width, this.padding);
            crc2.lineTo(this.padding + this.width, this.padding + this.height);
            crc2.lineTo(this.padding, this.padding + this.height);
            crc2.lineTo(this.padding, this.padding);

            // mid line
            crc2.moveTo(this.padding + (this.width / 2), this.padding);
            crc2.lineTo(this.padding + (this.width / 2), this.padding + this.height);
            crc2.lineWidth = 2;
            crc2.strokeStyle = "#ffffff";
            crc2.stroke();


            // goal area left
            crc2.beginPath();
            crc2.rect(
                this.padding,
                (this.padding + (this.height / 2)) - 50, 30, 100);
            crc2.strokeStyle = "white";
            crc2.stroke();


            // goal area right
            crc2.beginPath();
            crc2.rect(
                this.padding + this.width - 30,
                (this.padding + (this.height / 2)) - 50, 30, 100);
            crc2.strokeStyle = "white";
            crc2.stroke();

            // left goal
            crc2.moveTo(this.padding, this.padding + (this.height / 2) - 20);
            crc2.lineTo(this.padding - (5 * scale), this.padding + (this.height / 2) - 20);
            crc2.lineTo(this.padding - (5 * scale), this.padding + (this.height / 2) + 20);
            crc2.lineTo(this.padding, this.padding + (this.height / 2) + (40 / 2));
            crc2.stroke();

            // right goal
            crc2.moveTo(this.padding + this.width, this.padding + (this.height / 2) - 20);
            crc2.lineTo(this.padding + this.width + (5 * scale), this.padding + (this.height / 2) - 20);
            crc2.lineTo(this.padding + this.width + (5 * scale), this.padding + (this.height / 2) + 20);
            crc2.lineTo(this.padding + this.width, this.padding + (this.height / 2) + 20);
            crc2.stroke();

            // middle circle
            crc2.beginPath();
            crc2.arc(this.padding + (this.width / 2), this.padding + (this.height / 2), 50, 0, 2 * Math.PI, false);
            crc2.lineWidth = 2;
            crc2.strokeStyle = "white";
            crc2.stroke();

            //dot
            crc2.beginPath();
            crc2.arc(this.padding + (this.width / 2), this.padding + (this.height / 2), 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "white";
            crc2.fill();


            crc2.restore();

        }

            public homeGoal(_ball: Ball): boolean {
                if (_ball.position.X < this.padding &&
                    _ball.position.Y > this.padding + (this.height / 2) - 20 &&
                    _ball.position.Y < this.padding + (this.height / 2) + 20) {
                    return true;
                }
                return false;
            }
    
            public awayGoal(_ball: Ball): boolean {
                if (_ball.position.X > this.padding + this.width &&
                    _ball.position.Y > this.padding + (this.height / 2) - 20 &&
                    _ball.position.Y < this.padding + (this.height / 2) + 20) {
                    return true;
                }
                return false;
            }
    

    }
}