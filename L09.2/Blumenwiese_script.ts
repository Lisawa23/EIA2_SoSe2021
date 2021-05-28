namespace L09_Blumenwiese {
    
    interface Vector {
        x: number;
        y: number;
    }

    let imageData: ImageData;
    let cloudArray: Cloud [] = [];
    let beeArray: Bee [] = [];
    let flowerArray: Flower [] = [];

    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;
    export let golden: number = 0.5;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let horizon: number = crc2.canvas.height * golden;
        let posMountains: Vector = { x: 0, y: horizon };
        let posTreesStart: Vector = { x: 28, y: horizon + 5 };
        let posTreesEnd: Vector = { x: crc2.canvas.width, y: horizon + 5 };
        let posBush: Vector = { x: 400, y: horizon + 100 };

        drawBackground();
        drawSun({ x: 100, y: 75 });
        createClouds();
        window.setInterval(moveCloud, 50);
        drawMountains(posMountains, 75, 200, "grey", "white"); //min: 75, max: 200
        drawMountains(posMountains, 50, 150, "grey", "lightgrey");
        drawTrees(14, posTreesStart, posTreesEnd, 0.25, 0.37, 1);
        posTreesStart.y = horizon + 15;
        drawTrees(14, posTreesStart, posTreesEnd, 0.20, 0.37, 1);
        drawBush(posBush, { x: 60, y: 30 });
        posBush = { x: 100, y: horizon + 50 };
        drawBush(posBush, { x: 60, y: 30 });
        posBush = { x: 500, y: horizon + 200 };
        drawBush(posBush, { x: 60, y: 30 });
        drawHome();
        createFlower();
        // drawFlower();

        imageData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
        
        createBee();
        window.setInterval(moveBee, 20);

    }

    function createBee(): void {
        for (let i: number = 0; i < 10; i++) {
            let bee: Bee = new Bee(0.8);
            beeArray.push(bee);    
        }
    }

    function moveBee(): void {
        for (let bee of beeArray) {
            bee.move(1 / 50); //20 ms = 1/50
            bee.draw();
        }
    }

    function createClouds(): void {
        for (let i: number = 0; i < 1; i++) {
            let cloud: Cloud = new Cloud(); 
            cloudArray.push(cloud);                 
        }
    }

    function moveCloud(): void {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.putImageData(imageData, 0, 0);

        for (let cloud of cloudArray) {
            cloud.move(1 / 50);
            cloud.draw();
        }
    }

    function drawBackground(): void {
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "green");

        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }


    function drawSun(_position: Vector): void {
        let r1: number = 30;
        let r2: number = 150;
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);

        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(40, 100%, 50%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;
        crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        crc2.fill();
        crc2.restore();
    }

    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        let stepMin: number = 50;
        let stepMax: number = 150;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y: number = -_min - Math.random() * (_max - _min);

            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);

        crc2.lineTo(x, 0);
        crc2.closePath();

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);

        crc2.fillStyle = gradient;
        crc2.fill();

        crc2.restore();
    }

    function drawTrees(_nTrees: number, _posStart: Vector, _posEnd: Vector, _minScale: number, _stepPos: number, _stepScale: number): void {
        let transform: DOMMatrix = crc2.getTransform();
        let step: Vector = {
            x: (_posEnd.x - _posStart.x) * _stepPos,
            y: (_posEnd.y - _posStart.y) * _stepPos
        };

        crc2.translate(_posStart.x, _posStart.y);
        crc2.scale(_minScale, _minScale);

        do {
            drawTree();

            crc2.translate(step.x, step.y);
            crc2.scale(_stepScale, _stepScale);

        } while (--_nTrees > 0);

        crc2.setTransform(transform);
    }

    function drawTree(): void {
        let nBranches: number = 50;
        let maxRadius: number = 60;
        let branch: Path2D = new Path2D();
        branch.arc(0, 0, maxRadius, 0, 2 * Math.PI);

        crc2.fillStyle = "brown";
        crc2.fillRect(0, 0, 20, -200); //Position, breite des Stammes

        crc2.save();
        crc2.translate(0, -120); //Position der Blätter

        do {
            let y: number = Math.random() * 350;
            let size: number = 1 - y / 700;
            let x: number = (Math.random() - 0.5) * 2 * maxRadius;

            crc2.save();
            crc2.translate(0, -y);
            crc2.scale(size, size);
            crc2.translate(x, 0);

            let colorAngle: number = 120 - Math.random() * 60;
            let color: string = "HSLA(" + colorAngle + ", 50%, 30%, 0.5)";

            crc2.fillStyle = color;
            crc2.fill(branch);

            crc2.restore();
        } while (--nBranches > 0);
        crc2.restore();
    }
    function drawBush(_position: Vector, _size: Vector): void {
        let nParticles: number = 20;
        let radiusParticle: number = 15;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(60, 100%, 30%, 0.5)");
        gradient.addColorStop(1, "HSLA(120, 100%, 30%, 0)");

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            crc2.save();
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            crc2.translate(x, y);
            crc2.fill(particle);
            crc2.restore();
        }
        crc2.restore();
    }

    function drawHome(): void {
        crc2.restore();
        //main house
        crc2.beginPath();
        crc2.arc(300, 400, 50, 0, 2 * Math.PI);
        crc2.fillStyle = "#d3a309";
        crc2.fill();
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(300, 360, 50, 0, 2 * Math.PI);
        crc2.fillStyle = "#d3a309";
        crc2.fill();
        crc2.closePath();
        //stripes
        crc2.beginPath();
        crc2.moveTo(345, 420);
        crc2.lineTo(255, 420);
        crc2.moveTo(350, 400);
        crc2.lineTo(250, 400);
        crc2.moveTo(345, 380);
        crc2.lineTo(255, 380);
        crc2.moveTo(350, 360);
        crc2.lineTo(250, 360);
        crc2.moveTo(345, 340);
        crc2.lineTo(255, 340);
        crc2.moveTo(330, 320);
        crc2.lineTo(270, 320);
        crc2.strokeStyle = "black";
        crc2.lineWidth = 2;
        crc2.stroke();
        crc2.closePath();
        //entrance
        crc2.beginPath();
        crc2.arc(300, 420, 10, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();
         //Ast
        crc2.beginPath();
         // crc2.moveTo(0, 300);
        crc2.fillStyle = "brown";
        crc2.fillRect(250, 440, 100, 20);
 
        crc2.closePath();
 
        crc2.save();
    }

    function createFlower(): void {
        for (let i: number = 0; i < 10; i++) {
            let flowerRed: Flower = new Flower();
            flowerRed.drawFlowerRed();
            flowerArray.push(flowerRed);
        }
        for (let i: number = 0; i < 10; i++) {
            let flowerBlue: Flower = new Flower();
            flowerBlue.drawFlowerBlue();
            flowerArray.push(flowerBlue);
        }
        for (let i: number = 0; i < 10; i++) {
            let flowerPink: Flower = new Flower();
            flowerPink.drawFlowerPink();
            flowerArray.push(flowerPink);
        }
    }

}