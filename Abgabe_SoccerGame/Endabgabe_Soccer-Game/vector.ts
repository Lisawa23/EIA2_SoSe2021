namespace L {
    export class Vector {
        public X: number;
        public Y: number;

        constructor(_X: number, _Y: number) {
            this.X = _X;
            this.Y = _Y;
        }

        public static getDifference(_v0: Vector, _v1: Vector): Vector {
            return new Vector(_v0.X - _v1.X, _v0.Y - _v1.Y);
        }

        public get length(): number {
            return Math.hypot(this.X, this.Y);
        }

        public scale(_factor: number): void {
            this.X *= _factor;
            this.Y *= _factor;
        }

        public add(_added: Vector): void {
            this.X += _added.X;
            this.Y += _added.Y;
        }
    }

}