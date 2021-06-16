namespace L11_1_Blumenwiese {
    export abstract class SubFlower {
        protected position: Vector;

        constructor(_position?: Vector) {
            if (_position)
                this.position = _position.copy();
            else
                this.position = new Vector(0, 0);

        }

        public draw(): void {
            // console.log("Moveable move");
        }

    }
}

