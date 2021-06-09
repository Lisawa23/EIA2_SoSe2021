"use strict";
var L10_Blumenwiese;
(function (L10_Blumenwiese) {
    let moveables = [];
    L10_Blumenwiese.golden = 0.5;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L10_Blumenwiese.crc2 = canvas.getContext("2d");
        let horizon = L10_Blumenwiese.crc2.canvas.height * L10_Blumenwiese.golden;
        let posMountains = { x: 0, y: horizon };
        let posTreesStart = { x: 28, y: horizon + 5 };
        let posTreesEnd = { x: L10_Blumenwiese.crc2.canvas.width, y: horizon + 5 };
        let posBush = { x: 400, y: horizon + 100 };
        drawBackground();
        drawSun({ x: 100, y: 75 });
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
        L10_Blumenwiese.imageData = L10_Blumenwiese.crc2.getImageData(0, 0, L10_Blumenwiese.crc2.canvas.width, L10_Blumenwiese.crc2.canvas.height);
        createFlower();
        createClouds();
        createBee();
        window.setInterval(update, 20);
    }
    function createBee() {
        for (let i = 0; i < 10; i++) {
            let bee = new L10_Blumenwiese.Bee(0.8);
            moveables.push(bee);
        }
    }
    function createClouds() {
        let cloud = new L10_Blumenwiese.Cloud();
        moveables.push(cloud);
    }
    function drawBackground() {
        let gradient = L10_Blumenwiese.crc2.createLinearGradient(0, 0, 0, L10_Blumenwiese.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(L10_Blumenwiese.golden, "white");
        gradient.addColorStop(1, "green");
        L10_Blumenwiese.crc2.fillStyle = gradient;
        L10_Blumenwiese.crc2.fillRect(0, 0, L10_Blumenwiese.crc2.canvas.width, L10_Blumenwiese.crc2.canvas.height);
    }
    function drawSun(_position) {
        let r1 = 30;
        let r2 = 150;
        let gradient = L10_Blumenwiese.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(40, 100%, 50%, 0)");
        L10_Blumenwiese.crc2.save();
        L10_Blumenwiese.crc2.translate(_position.x, _position.y);
        L10_Blumenwiese.crc2.fillStyle = gradient;
        L10_Blumenwiese.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
        L10_Blumenwiese.crc2.fill();
        L10_Blumenwiese.crc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        L10_Blumenwiese.crc2.save();
        L10_Blumenwiese.crc2.translate(_position.x, _position.y);
        L10_Blumenwiese.crc2.beginPath();
        L10_Blumenwiese.crc2.moveTo(0, 0);
        L10_Blumenwiese.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            let y = -_min - Math.random() * (_max - _min);
            L10_Blumenwiese.crc2.lineTo(x, y);
        } while (x < L10_Blumenwiese.crc2.canvas.width);
        L10_Blumenwiese.crc2.lineTo(x, 0);
        L10_Blumenwiese.crc2.closePath();
        let gradient = L10_Blumenwiese.crc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        L10_Blumenwiese.crc2.fillStyle = gradient;
        L10_Blumenwiese.crc2.fill();
        L10_Blumenwiese.crc2.restore();
    }
    function drawTrees(_nTrees, _posStart, _posEnd, _minScale, _stepPos, _stepScale) {
        let transform = L10_Blumenwiese.crc2.getTransform();
        let step = {
            x: (_posEnd.x - _posStart.x) * _stepPos,
            y: (_posEnd.y - _posStart.y) * _stepPos
        };
        L10_Blumenwiese.crc2.translate(_posStart.x, _posStart.y);
        L10_Blumenwiese.crc2.scale(_minScale, _minScale);
        do {
            drawTree();
            L10_Blumenwiese.crc2.translate(step.x, step.y);
            L10_Blumenwiese.crc2.scale(_stepScale, _stepScale);
        } while (--_nTrees > 0);
        L10_Blumenwiese.crc2.setTransform(transform);
    }
    function drawTree() {
        let nBranches = 50;
        let maxRadius = 60;
        let branch = new Path2D();
        branch.arc(0, 0, maxRadius, 0, 2 * Math.PI);
        L10_Blumenwiese.crc2.fillStyle = "brown";
        L10_Blumenwiese.crc2.fillRect(0, 0, 20, -200); //Position, breite des Stammes
        L10_Blumenwiese.crc2.save();
        L10_Blumenwiese.crc2.translate(0, -120); //Position der Blätter
        do {
            let y = Math.random() * 350;
            let size = 1 - y / 700;
            let x = (Math.random() - 0.5) * 2 * maxRadius;
            L10_Blumenwiese.crc2.save();
            L10_Blumenwiese.crc2.translate(0, -y);
            L10_Blumenwiese.crc2.scale(size, size);
            L10_Blumenwiese.crc2.translate(x, 0);
            let colorAngle = 120 - Math.random() * 60;
            let color = "HSLA(" + colorAngle + ", 50%, 30%, 0.5)";
            L10_Blumenwiese.crc2.fillStyle = color;
            L10_Blumenwiese.crc2.fill(branch);
            L10_Blumenwiese.crc2.restore();
        } while (--nBranches > 0);
        L10_Blumenwiese.crc2.restore();
    }
    function drawBush(_position, _size) {
        let nParticles = 20;
        let radiusParticle = 15;
        let particle = new Path2D();
        let gradient = L10_Blumenwiese.crc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(60, 100%, 30%, 0.5)");
        gradient.addColorStop(1, "HSLA(120, 100%, 30%, 0)");
        L10_Blumenwiese.crc2.save();
        L10_Blumenwiese.crc2.translate(_position.x, _position.y);
        L10_Blumenwiese.crc2.fillStyle = gradient;
        for (let drawn = 0; drawn < nParticles; drawn++) {
            L10_Blumenwiese.crc2.save();
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            L10_Blumenwiese.crc2.translate(x, y);
            L10_Blumenwiese.crc2.fill(particle);
            L10_Blumenwiese.crc2.restore();
        }
        L10_Blumenwiese.crc2.restore();
    }
    function drawHome() {
        //main house
        L10_Blumenwiese.crc2.beginPath();
        L10_Blumenwiese.crc2.arc(300, 400, 50, 0, 2 * Math.PI);
        L10_Blumenwiese.crc2.fillStyle = "#d3a309";
        L10_Blumenwiese.crc2.fill();
        L10_Blumenwiese.crc2.closePath();
        L10_Blumenwiese.crc2.beginPath();
        L10_Blumenwiese.crc2.arc(300, 360, 50, 0, 2 * Math.PI);
        L10_Blumenwiese.crc2.fillStyle = "#d3a309";
        L10_Blumenwiese.crc2.fill();
        L10_Blumenwiese.crc2.closePath();
        //stripes
        L10_Blumenwiese.crc2.beginPath();
        L10_Blumenwiese.crc2.moveTo(345, 420);
        L10_Blumenwiese.crc2.lineTo(255, 420);
        L10_Blumenwiese.crc2.moveTo(350, 400);
        L10_Blumenwiese.crc2.lineTo(250, 400);
        L10_Blumenwiese.crc2.moveTo(345, 380);
        L10_Blumenwiese.crc2.lineTo(255, 380);
        L10_Blumenwiese.crc2.moveTo(350, 360);
        L10_Blumenwiese.crc2.lineTo(250, 360);
        L10_Blumenwiese.crc2.moveTo(345, 340);
        L10_Blumenwiese.crc2.lineTo(255, 340);
        L10_Blumenwiese.crc2.moveTo(330, 320);
        L10_Blumenwiese.crc2.lineTo(270, 320);
        L10_Blumenwiese.crc2.strokeStyle = "black";
        L10_Blumenwiese.crc2.lineWidth = 2;
        L10_Blumenwiese.crc2.stroke();
        L10_Blumenwiese.crc2.closePath();
        //Eingang
        L10_Blumenwiese.crc2.beginPath();
        L10_Blumenwiese.crc2.arc(300, 420, 10, 0, 2 * Math.PI);
        L10_Blumenwiese.crc2.fillStyle = "black";
        L10_Blumenwiese.crc2.fill();
        L10_Blumenwiese.crc2.closePath();
        //Ast
        L10_Blumenwiese.crc2.beginPath();
        L10_Blumenwiese.crc2.fillStyle = "brown";
        L10_Blumenwiese.crc2.fillRect(250, 440, 100, 20);
        L10_Blumenwiese.crc2.closePath();
    }
    function createFlower() {
        for (let i = 0; i < 10; i++) {
            let flowerRed = new L10_Blumenwiese.FlowerRed();
            moveables.push(flowerRed);
        }
        for (let i = 0; i < 10; i++) {
            let flowerBlue = new L10_Blumenwiese.FlowerBlue();
            moveables.push(flowerBlue);
        }
        for (let i = 0; i < 10; i++) {
            let flowerPink = new L10_Blumenwiese.FlowerPink();
            moveables.push(flowerPink);
        }
    }
    function update() {
        // console.log("Update");
        L10_Blumenwiese.crc2.fillRect(0, 0, L10_Blumenwiese.crc2.canvas.width, L10_Blumenwiese.crc2.canvas.height);
        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }
    }
    console.log(moveables);
})(L10_Blumenwiese || (L10_Blumenwiese = {}));
//# sourceMappingURL=Blumenwiese_script.js.map