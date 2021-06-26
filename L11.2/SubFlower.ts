namespace L11_2_Blumenwiese {
    export abstract class SubFlower {
        public x: number;
        public y: number;
        public position: Vector;
        public occupied: boolean = false;
        public fillLevel: number;
        

        constructor(_x: number, _y: number) {
          this.x = _x;
          this.y = _y;
        }

        public draw(): void {
            // console.log("Moveable move");
        }


        public fill(_timeslice: number): void {
            // console.log("fill");
        }

    }
}

