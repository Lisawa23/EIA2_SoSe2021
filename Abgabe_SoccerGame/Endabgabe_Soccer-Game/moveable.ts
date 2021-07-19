namespace L {
    /**
     * super class to handle movable objects
     */
    export abstract class Movable {
        public position: Vector;
        public target: Vector;
        public radius: number;
        public speed: number; 
        public color: string;
        protected slowDown: boolean;
        protected speedLevel: number;
        
        constructor(_position: Vector) {
            this.position = _position;
            this.speed = 1;
            this.speedLevel = 1;
            this.slowDown = false;
            this.radius = 2 * scale;
        }
        public abstract draw(): void;

        public move(_target: Vector): void {
            let diffVector: Vector = new Vector(_target.X - this.position.X, _target.Y - this.position.Y);

            let vectorLength: number = Math.sqrt(Math.pow(diffVector.X, 2) + Math.pow(diffVector.Y, 2));
            if (vectorLength === 0) { 
                return; 
            }
            let speedLevel: number = this.speedLevel * (this.speed / 100);
            let speed: number = this.slowDown ? speedLevel * (vectorLength / 100) : speedLevel;
            let scaleFactor: number = speed / vectorLength;
            diffVector.scale(scaleFactor);
            this.position.add(diffVector);
        }

    }

}