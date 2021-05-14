namespace Blumenwiese {

    interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let golden: number = 0.5;
    
    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d"); 

        let horizon: number = crc2.canvas.height * golden;
        let posMountains: Vector = { x: 0, y: horizon };
        let posTreesStart: Vector = { x: 28, y: horizon + 5 };
        let posTreesEnd: Vector = { x: crc2.canvas.width , y: horizon + 5 };
        let posBush: Vector = { x: 400, y: horizon + 100 };

        drawBackground();
        drawSun({ x: 100, y: 75 });
        drawCloud({ x: 400, y: 50 }, { x: 250, y: 75 });
        drawCloud({ x: 600, y: 225 }, { x: 250, y: 75 });
        drawMountains(posMountains, 75, 200, "grey", "white"); //min: 75, max: 200
        drawMountains(posMountains, 50, 150, "grey", "lightgrey");
        drawTrees(14, posTreesStart, posTreesEnd, 0.25, 0.37, 1);
        posTreesStart.y = horizon + 15;
        drawTrees(14, posTreesStart, posTreesEnd, 0.20, 0.37, 1);
        drawBush(posBush, {x: 60, y: 30});
        posBush = { x: 100, y: horizon + 50 };
        drawBush(posBush, {x: 60, y: 30});
        posBush = { x: 500, y: horizon + 200 };
        drawBush(posBush, {x: 60, y: 30});
       
        for (let i: number = 0; i < 10; i++) {
        drawFlowerRed();
        drawFlowerBlue();
        drawFlowerPink();   
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
    function drawCloud(_position: Vector, _size: Vector): void {
        let nParticles: number = 20;
        let radiusParticle: number = 50;
        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

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

    
    function drawFlowerRed(): void {
        let horizon: number = crc2.canvas.height * golden;
        let posX: number = Math.floor(Math.random() * crc2.canvas.width);
        let posY: number = horizon + Math.floor(Math.random() * 250);
        // Blumenstiel
        crc2.beginPath();
        crc2.strokeStyle = "green";
        crc2.fillStyle = "green";
        crc2.fillRect(posX, posY, 4, 50); //PositionX, PositionY, Stielbreite, Stiellänge
        //Blätter
        crc2.moveTo(posX, posY + 50);
        crc2.lineTo(posX + 10, posY + 10);
        crc2.moveTo(posX, posY + 40);
        crc2.lineTo(posX - 10, posY + 20);

        crc2.stroke();
        crc2.fill();
        crc2.save();

        //Blütenblätter
        crc2.translate(posX, posY);
        for (let i: number = 0; i < 5; i++) {
        crc2.rotate(Math.PI * 2 / 5);
        crc2.beginPath();
        crc2.moveTo(10, 10);
        crc2.lineTo(-7, -10);
        crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
        crc2.closePath();
        crc2.fillStyle = "red";
        crc2.fill();
        }
        crc2.restore();

        //Blüte
        crc2.save();
        crc2.translate(posX, posY);
        crc2.beginPath();
        crc2.arc(0, 0, 7, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.fillStyle = "yellow";
        crc2.fill();

        crc2.restore();
    }

    function drawFlowerBlue(): void {
        let horizon: number = crc2.canvas.height * golden;
        let posX: number = Math.floor(Math.random() * crc2.canvas.width);
        let posY: number = horizon + Math.floor(Math.random() * 250);
        // Blumenstiel
        crc2.beginPath();
        crc2.strokeStyle = "green";
        crc2.fillStyle = "green";
        crc2.fillRect(posX, posY, 4, 50);
        //Blätter
        crc2.moveTo(posX, posY + 50);
        crc2.lineTo(posX + 10, posY + 10);
        crc2.moveTo(posX, posY + 40);
        crc2.lineTo(posX - 10, posY + 20);

        crc2.stroke();
        crc2.fill();
       
        crc2.beginPath();
        moveTo(posX + 10, posY + 20);
        crc2.arc(posX, posY , 9, 0, 1 * Math.PI);

        crc2.fillStyle = "blue";
        crc2.strokeStyle = "blue";
        crc2.fill();
        crc2.stroke();
        moveTo(posX, posY + 20);
        crc2.lineTo(posX - 10, posY - 10);
        crc2.lineTo(posX - 3, posY + 2);
        crc2.lineTo(posX + 1, posY - 10);
        crc2.lineTo(posX + 4, posY + 2);
        crc2.lineTo(posX + 9, posY - 10);
        crc2.lineTo(posX + 9, posY + 3);
        crc2.closePath();
        crc2.fillStyle = "blue";
        crc2.fill();
        crc2.stroke();
    }


    function drawFlowerPink(): void {
        let horizon: number = crc2.canvas.height * golden;
        let posX: number = Math.floor(Math.random() * crc2.canvas.width);
        let posY: number = horizon + Math.floor(Math.random() * 250);
        // Blumenstiel
        crc2.beginPath();
        crc2.strokeStyle = "green";
        crc2.fillStyle = "green";
        crc2.fillRect(posX, posY, 4, 50);
        //Blätter
        crc2.moveTo(posX, posY + 50);
        crc2.lineTo(posX + 10, posY + 10);
        crc2.moveTo(posX, posY + 40);
        crc2.lineTo(posX - 10, posY + 20);

        crc2.stroke();
        crc2.fill();

        crc2.save();
        crc2.translate(posX, posY);
        for (let i: number = 80; i > 8; i -= 8) {
            crc2.rotate(45 * Math.PI / 20);
            crc2.beginPath();
            crc2.moveTo(10, 20);
            crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
            crc2.fillStyle = "pink";
            crc2.strokeStyle = "pink";
            crc2.fill();

            crc2.stroke();

        }
        crc2.restore();

        //Blüte
        crc2.save();
        crc2.beginPath();
        moveTo(posX + 10, posY + 20);
        crc2.arc(posX, posY, 5, 0, 2 * Math.PI);
        crc2.fillStyle = "yellow";
        crc2.strokeStyle = "yellow";
        crc2.fill();
        crc2.stroke();
        crc2.restore();
    }
    


}