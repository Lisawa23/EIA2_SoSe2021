namespace L {
    
    export class Player extends Movable {
        public actionRadius: number;
        public speed: number = 80; 
        public tricotNumber: number;
        public team: string; 
        public color: string;
        public precision: number;
        public shotPower: number;
        public origin: Vector = new Vector(0, 0);  
        public highlighted: boolean = true;
        public active: boolean;
        protected speedLevel: number = 2;
  
          
  
        constructor(_position: Vector, _shotPower: number, _precision: number, _speed: number, _color: string, _team: string, _trikotNumer: number, _actionRadius: number) {
            super(new Vector(_position.X, _position.Y));
            this.shotPower = _shotPower;
            this.precision = _precision;
            this.speed = _speed;
            this.color = _color;
            this.team = _team;
            this.active = true;
            this.tricotNumber = _trikotNumer;
            this.actionRadius = _actionRadius * scale;
            this.origin = new Vector(_position.X, _position.Y);
        }


        public draw(): void {
            crc2.save();

            crc2.beginPath();
            crc2.arc(this.position.X, this.position.Y, this.highlighted ? this.radius * 1.5 : this.radius, 0, 2 * Math.PI, false);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.lineWidth = this.highlighted ? 2 : 1;
            crc2.strokeStyle = "black";
            crc2.stroke(); 
            crc2.textAlign = "center";
            crc2.textBaseline = "middle";
            crc2.fillStyle = "white";  
            crc2.fillText(this.tricotNumber.toString(), this.position.X, this.position.Y);

            crc2.restore();
        }

        // Wenn Player geklickt wurde:
        public isClicked(_clickPosition: Vector): Boolean {
            let difference: Vector = new Vector(_clickPosition.X - this.position.X, _clickPosition.Y - this.position.Y);
            return (difference.length < this.radius);
        }

    }
}
