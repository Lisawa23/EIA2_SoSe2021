"use strict";
var L09_Blumenwiese;
(function (L09_Blumenwiese) {
    let imageData;
    let cloudArray = [];
    let beeArray = [];
    window.addEventListener("load", handleLoad);
    L09_Blumenwiese.golden = 0.5;
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L09_Blumenwiese.crc2 = canvas.getContext("2d");
        let horizon = L09_Blumenwiese.crc2.canvas.height * L09_Blumenwiese.golden;
        let posMountains = { x: 0, y: horizon };
        let posTreesStart = { x: 28, y: horizon + 5 };
        let posTreesEnd = { x: L09_Blumenwiese.crc2.canvas.width, y: horizon + 5 };
        let posBush = { x: 400, y: horizon + 100 };
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
        for (let i = 0; i < 10; i++) {
            drawFlowerRed();
            drawFlowerBlue();
            drawFlowerPink();
        }
        drawHome();
        imageData = L09_Blumenwiese.crc2.getImageData(0, 0, L09_Blumenwiese.crc2.canvas.width, L09_Blumenwiese.crc2.canvas.height);
        createBee();
        window.setInterval(moveBee, 20);
    }
    function createBee() {
        for (let i = 0; i < 10; i++) {
            let bee = new L09_Blumenwiese.Bee(0.8);
            beeArray.push(bee);
        }
    }
    function moveBee() {
        for (let bee of beeArray) {
            bee.move(1 / 50); //20 ms = 1/50
            bee.draw();
        }
    }
    function createClouds() {
        for (let i = 0; i < 1; i++) {
            let cloud = new L09_Blumenwiese.Cloud();
            cloudArray.push(cloud);
        }
    }
    function moveCloud() {
        L09_Blumenwiese.crc2.clearRect(0, 0, L09_Blumenwiese.crc2.canvas.width, L09_Blumenwiese.crc2.canvas.height);
        L09_Blumenwiese.crc2.putImageData(imageData, 0, 0);
        for (let cloud of cloudArray) {
            cloud.move(1 / 50);
            cloud.draw();
        }
    }
    function drawBackground() {
        let gradient = L09_Blumenwiese.crc2.createLinearGradient(0, 0, 0, L09_Blumenwiese.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(L09_Blumenwiese.golden, "white");
        gradient.addColorStop(1, "green");
        L09_Blumenwiese.crc2.fillStyle = gradient;
        L09_Blumenwiese.crc2.fillRect(0, 0, L09_Blumenwiese.crc2.canvas.width, L09_Blumenwiese.crc2.canvas.height);
    }
    function drawSun(_position) {
        let r1 = 30;
        let r2 = 150;
        let gradient = L09_Blumenwiese.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(40, 100%, 50%, 0)");
        L09_Blumenwiese.crc2.save();
        L09_Blumenwiese.crc2.translate(_position.x, _position.y);
        L09_Blumenwiese.crc2.fillStyle = gradient;
        L09_Blumenwiese.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        L09_Blumenwiese.crc2.save();
        L09_Blumenwiese.crc2.translate(_position.x, _position.y);
        L09_Blumenwiese.crc2.beginPath();
        L09_Blumenwiese.crc2.moveTo(0, 0);
        L09_Blumenwiese.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            L09_Blumenwiese.crc2.lineTo(x, y);
        } while (x < L09_Blumenwiese.crc2.canvas.width);
        L09_Blumenwiese.crc2.lineTo(x, 0);
        L09_Blumenwiese.crc2.closePath();
        let gradient = L09_Blumenwiese.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        L09_Blumenwiese.crc2.fillStyle = gradient;
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.restore();
    }
    function drawTrees(_nTrees, _posStart, _posEnd, _minScale, _stepPos, _stepScale) {
        let transform = L09_Blumenwiese.crc2.getTransform();
        let step = {
            x: (_posEnd.x - _posStart.x) * _stepPos,
            y: (_posEnd.y - _posStart.y) * _stepPos
        };
        L09_Blumenwiese.crc2.translate(_posStart.x, _posStart.y);
        L09_Blumenwiese.crc2.scale(_minScale, _minScale);
        do {
            drawTree();
            L09_Blumenwiese.crc2.translate(step.x, step.y);
            L09_Blumenwiese.crc2.scale(_stepScale, _stepScale);
        } while (--_nTrees > 0);
        L09_Blumenwiese.crc2.setTransform(transform);
    }
    function drawTree() {
        let nBranches = 50;
        let maxRadius = 60;
        let branch = new Path2D();
        branch.arc(0, 0, maxRadius, 0, 2 * Math.PI);
        L09_Blumenwiese.crc2.fillStyle = "brown";
        L09_Blumenwiese.crc2.fillRect(0, 0, 20, -200); //Position, breite des Stammes
        L09_Blumenwiese.crc2.save();
        L09_Blumenwiese.crc2.translate(0, -120); //Position der Blätter
        do {
            let y = Math.random() * 350;
            let size = 1 - y / 700;
            let x = (Math.random() - 0.5) * 2 * maxRadius;
            L09_Blumenwiese.crc2.save();
            L09_Blumenwiese.crc2.translate(0, -y);
            L09_Blumenwiese.crc2.scale(size, size);
            L09_Blumenwiese.crc2.translate(x, 0);
            let colorAngle = 120 - Math.random() * 60;
            let color = "HSLA(" + colorAngle + ", 50%, 30%, 0.5)";
            L09_Blumenwiese.crc2.fillStyle = color;
            L09_Blumenwiese.crc2.fill(branch);
            L09_Blumenwiese.crc2.restore();
        } while (--nBranches > 0);
        L09_Blumenwiese.crc2.restore();
    }
    function drawBush(_position, _size) {
        let nParticles = 20;
        let radiusParticle = 15;
        let particle = new Path2D();
        let gradient = L09_Blumenwiese.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(60, 100%, 30%, 0.5)");
        gradient.addColorStop(1, "HSLA(120, 100%, 30%, 0)");
        L09_Blumenwiese.crc2.save();
        L09_Blumenwiese.crc2.translate(_position.x, _position.y);
        L09_Blumenwiese.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            L09_Blumenwiese.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            L09_Blumenwiese.crc2.translate(x, y);
            L09_Blumenwiese.crc2.fill(particle);
            L09_Blumenwiese.crc2.restore();
        }
        L09_Blumenwiese.crc2.restore();
    }
    function drawHome() {
        L09_Blumenwiese.crc2.restore();
        //main house
        L09_Blumenwiese.crc2.beginPath();
        L09_Blumenwiese.crc2.arc(300, 400, 50, 0, 2 * Math.PI);
        L09_Blumenwiese.crc2.fillStyle = "#d3a309";
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.closePath();
        L09_Blumenwiese.crc2.beginPath();
        L09_Blumenwiese.crc2.arc(300, 360, 50, 0, 2 * Math.PI);
        L09_Blumenwiese.crc2.fillStyle = "#d3a309";
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.closePath();
        //stripes
        L09_Blumenwiese.crc2.beginPath();
        L09_Blumenwiese.crc2.moveTo(345, 420);
        L09_Blumenwiese.crc2.lineTo(255, 420);
        L09_Blumenwiese.crc2.moveTo(350, 400);
        L09_Blumenwiese.crc2.lineTo(250, 400);
        L09_Blumenwiese.crc2.moveTo(345, 380);
        L09_Blumenwiese.crc2.lineTo(255, 380);
        L09_Blumenwiese.crc2.moveTo(350, 360);
        L09_Blumenwiese.crc2.lineTo(250, 360);
        L09_Blumenwiese.crc2.moveTo(345, 340);
        L09_Blumenwiese.crc2.lineTo(255, 340);
        L09_Blumenwiese.crc2.moveTo(330, 320);
        L09_Blumenwiese.crc2.lineTo(270, 320);
        L09_Blumenwiese.crc2.strokeStyle = "black";
        L09_Blumenwiese.crc2.lineWidth = 2;
        L09_Blumenwiese.crc2.stroke();
        L09_Blumenwiese.crc2.closePath();
        //entrance
        L09_Blumenwiese.crc2.beginPath();
        L09_Blumenwiese.crc2.arc(300, 420, 10, 0, 2 * Math.PI);
        L09_Blumenwiese.crc2.fillStyle = "black";
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.closePath();
        //Ast
        L09_Blumenwiese.crc2.beginPath();
        // crc2.moveTo(0, 300);
        L09_Blumenwiese.crc2.fillStyle = "brown";
        L09_Blumenwiese.crc2.fillRect(250, 440, 100, 20);
        L09_Blumenwiese.crc2.closePath();
        L09_Blumenwiese.crc2.save();
    }
    function drawFlowerRed() {
        let horizon = L09_Blumenwiese.crc2.canvas.height * L09_Blumenwiese.golden;
        let posX = Math.floor(Math.random() * L09_Blumenwiese.crc2.canvas.width);
        let posY = horizon + Math.floor(Math.random() * 250);
        // Blumenstiel
        L09_Blumenwiese.crc2.beginPath();
        L09_Blumenwiese.crc2.strokeStyle = "green";
        L09_Blumenwiese.crc2.fillStyle = "green";
        L09_Blumenwiese.crc2.fillRect(posX, posY, 4, 50); //PositionX, PositionY, Stielbreite, Stiellänge
        //Blätter
        L09_Blumenwiese.crc2.moveTo(posX, posY + 50);
        L09_Blumenwiese.crc2.lineTo(posX + 10, posY + 10);
        L09_Blumenwiese.crc2.moveTo(posX, posY + 40);
        L09_Blumenwiese.crc2.lineTo(posX - 10, posY + 20);
        L09_Blumenwiese.crc2.stroke();
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.save();
        //Blütenblätter
        L09_Blumenwiese.crc2.translate(posX, posY);
        for (let i = 0; i < 5; i++) {
            L09_Blumenwiese.crc2.rotate(Math.PI * 2 / 5);
            L09_Blumenwiese.crc2.beginPath();
            L09_Blumenwiese.crc2.moveTo(10, 10);
            L09_Blumenwiese.crc2.lineTo(-7, -10);
            L09_Blumenwiese.crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
            L09_Blumenwiese.crc2.closePath();
            L09_Blumenwiese.crc2.fillStyle = "red";
            L09_Blumenwiese.crc2.fill();
        }
        L09_Blumenwiese.crc2.restore();
        //Blüte
        L09_Blumenwiese.crc2.save();
        L09_Blumenwiese.crc2.translate(posX, posY);
        L09_Blumenwiese.crc2.beginPath();
        L09_Blumenwiese.crc2.arc(0, 0, 7, 0, 2 * Math.PI);
        L09_Blumenwiese.crc2.closePath();
        L09_Blumenwiese.crc2.fillStyle = "yellow";
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.restore();
    }
    function drawFlowerBlue() {
        let horizon = L09_Blumenwiese.crc2.canvas.height * L09_Blumenwiese.golden;
        let posX = Math.floor(Math.random() * L09_Blumenwiese.crc2.canvas.width);
        let posY = horizon + Math.floor(Math.random() * 250);
        // Blumenstiel
        L09_Blumenwiese.crc2.beginPath();
        L09_Blumenwiese.crc2.strokeStyle = "green";
        L09_Blumenwiese.crc2.fillStyle = "green";
        L09_Blumenwiese.crc2.fillRect(posX, posY, 4, 50);
        //Blätter
        L09_Blumenwiese.crc2.moveTo(posX, posY + 50);
        L09_Blumenwiese.crc2.lineTo(posX + 10, posY + 10);
        L09_Blumenwiese.crc2.moveTo(posX, posY + 40);
        L09_Blumenwiese.crc2.lineTo(posX - 10, posY + 20);
        L09_Blumenwiese.crc2.stroke();
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.beginPath();
        moveTo(posX + 10, posY + 20);
        L09_Blumenwiese.crc2.arc(posX, posY, 9, 0, 1 * Math.PI);
        L09_Blumenwiese.crc2.fillStyle = "blue";
        L09_Blumenwiese.crc2.strokeStyle = "blue";
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.stroke();
        moveTo(posX, posY + 20);
        L09_Blumenwiese.crc2.lineTo(posX - 10, posY - 10);
        L09_Blumenwiese.crc2.lineTo(posX - 3, posY + 2);
        L09_Blumenwiese.crc2.lineTo(posX + 1, posY - 10);
        L09_Blumenwiese.crc2.lineTo(posX + 4, posY + 2);
        L09_Blumenwiese.crc2.lineTo(posX + 9, posY - 10);
        L09_Blumenwiese.crc2.lineTo(posX + 9, posY + 3);
        L09_Blumenwiese.crc2.closePath();
        L09_Blumenwiese.crc2.fillStyle = "blue";
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.stroke();
    }
    function drawFlowerPink() {
        let horizon = L09_Blumenwiese.crc2.canvas.height * L09_Blumenwiese.golden;
        let posX = Math.floor(Math.random() * L09_Blumenwiese.crc2.canvas.width);
        let posY = horizon + Math.floor(Math.random() * 250);
        // Blumenstiel
        L09_Blumenwiese.crc2.beginPath();
        L09_Blumenwiese.crc2.strokeStyle = "green";
        L09_Blumenwiese.crc2.fillStyle = "green";
        L09_Blumenwiese.crc2.fillRect(posX, posY, 4, 50);
        //Blätter
        L09_Blumenwiese.crc2.moveTo(posX, posY + 50);
        L09_Blumenwiese.crc2.lineTo(posX + 10, posY + 10);
        L09_Blumenwiese.crc2.moveTo(posX, posY + 40);
        L09_Blumenwiese.crc2.lineTo(posX - 10, posY + 20);
        L09_Blumenwiese.crc2.stroke();
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.save();
        L09_Blumenwiese.crc2.translate(posX, posY);
        for (let i = 80; i > 8; i -= 8) {
            L09_Blumenwiese.crc2.rotate(45 * Math.PI / 20);
            L09_Blumenwiese.crc2.beginPath();
            L09_Blumenwiese.crc2.moveTo(10, 20);
            L09_Blumenwiese.crc2.bezierCurveTo(-12, -25, 12, -25, 7, -10);
            L09_Blumenwiese.crc2.fillStyle = "pink";
            L09_Blumenwiese.crc2.strokeStyle = "pink";
            L09_Blumenwiese.crc2.fill();
            L09_Blumenwiese.crc2.stroke();
        }
        L09_Blumenwiese.crc2.restore();
        //Blüte
        L09_Blumenwiese.crc2.save();
        L09_Blumenwiese.crc2.beginPath();
        moveTo(posX + 10, posY + 20);
        L09_Blumenwiese.crc2.arc(posX, posY, 5, 0, 2 * Math.PI);
        L09_Blumenwiese.crc2.fillStyle = "yellow";
        L09_Blumenwiese.crc2.strokeStyle = "yellow";
        L09_Blumenwiese.crc2.fill();
        L09_Blumenwiese.crc2.stroke();
        L09_Blumenwiese.crc2.restore();
    }
})(L09_Blumenwiese || (L09_Blumenwiese = {}));
//# sourceMappingURL=Blumenwiese_script.js.map