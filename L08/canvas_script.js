"use strict";
var L08Canvas;
(function (L08Canvas) {
    window.addEventListener("load", start);
    let crc2;
    let canvas;
    let letters = "0123456789ABCDEF".split("");
    let color = "#";
    let color2 = "#";
    let color3 = "#";
    let color4 = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
        color2 += letters[Math.round(Math.random() * 15)];
        color3 += letters[Math.round(Math.random() * 15)];
        color4 += letters[Math.round(Math.random() * 15)];
    }
    function start() {
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        patternFunc();
        createMoreCircles();
        paintPicture();
        createCircle();
        createSquare();
        createTriangle();
    }
    function patternFunc() {
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;
        pattern.fillStyle = "#fec";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, Math.random() * 10);
        pattern.lineTo(Math.random() * 10, Math.random() * 10);
        pattern.lineTo(Math.random() * 20, 0);
        pattern.lineTo(Math.random() * 30, 0);
        pattern.lineTo(Math.random() * 40, Math.random() * 10);
        pattern.lineTo(Math.random() * 30, 20);
        pattern.lineTo(Math.random() * 20, 20);
        pattern.lineTo(Math.random() * 10, Math.random() * 10);
        pattern.stroke();
        crc2.fillStyle = crc2.createPattern(pattern.canvas, "repeat");
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }
    function paintPicture() {
        crc2.beginPath();
        for (let i = 0; i <= 10; i++) {
            let number1 = Math.floor(Math.random() * canvas.width);
            let number2 = Math.floor(Math.random() * canvas.width);
            let number3 = Math.floor(Math.random() * canvas.width);
            let number4 = Math.floor(Math.random() * canvas.width);
            let lineSize = Math.floor(Math.random() * 4);
            crc2.moveTo(number1, number2);
            crc2.lineTo(number3, number4);
            crc2.strokeStyle = color;
            crc2.lineWidth = lineSize;
        }
        crc2.stroke();
    }
    // inspiriert von: https://stackoverflow.com/questions/22237497/draw-a-circle-filled-with-random-color-sqares-on-canvas
    function createCircle() {
        let dia = canvas.width / 2; // get context 
        let radius = dia * 0.5;
        crc2.translate(0.5, 0.5); // to make pixels sharper
        for (let y = 0; y < dia; y++) { // walk x/y grid
            for (let x = 0; x < dia; x++) {
                let gradient = crc2.createLinearGradient(50, 50, 200, 400);
                gradient.addColorStop(0, color);
                gradient.addColorStop(.5, color2);
                gradient.addColorStop(1, color3);
                crc2.fillStyle = gradient; // set random color
                crc2.fillRect(x, y, 1, 1); // draw a pixel
            }
        }
        // create circle
        let posx = Math.floor(Math.random() * canvas.width);
        let posy = Math.floor(Math.random() * canvas.height);
        // removes pixels outside next shape
        crc2.globalCompositeOperation = "destination-in";
        crc2.arc(posx, posy, radius, posx, 2 * Math.PI);
        crc2.fill();
        crc2.lineWidth = 1;
        // reset
        crc2.globalCompositeOperation = "source-over";
        createSquare();
    }
    let positionY = 0;
    let positionX = 0;
    let size = 0;
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 100);
    let l = Math.floor(Math.random() * 100);
    let a = 0.6;
    function createSquare() {
        positionY += Math.round(Math.random() * (canvas.height / 2));
        positionX += Math.round(Math.random() * (canvas.width / 2));
        size += Math.round(Math.random() * (canvas.width / 4));
        crc2.fillStyle = "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
        crc2.strokeStyle = color2;
        crc2.strokeRect(positionX, positionY, size, size);
        crc2.fillRect(positionX + 10, positionY + 10, size, size);
        createTriangle();
    }
    function createTriangle() {
        positionY += Math.round(Math.random() * (canvas.height / 2));
        positionX += Math.round(Math.random() * (canvas.width / 2));
        for (let index = 0; index < 10; index++) {
            crc2.beginPath();
            crc2.moveTo(positionX, positionX);
            crc2.lineTo(positionX, positionY + 200);
            crc2.lineTo(positionY + 200, positionY + 200);
            crc2.closePath();
            crc2.fillStyle = color2;
            crc2.strokeStyle = color4;
            crc2.fill();
            crc2.rotate(Math.PI * 90 / 180);
            crc2.stroke();
        }
        createMoreCircles();
    }
    function createMoreCircles() {
        var xKoord = Math.floor(Math.random() * 200);
        var yKoord = Math.floor(Math.random() * 200);
        var durchmesser = Math.floor(Math.random() * 100);
        for (var x = 0; x < 5; x++) {
            crc2.arc(xKoord, yKoord, durchmesser, durchmesser, 2 * Math.PI);
            crc2.fillStyle = color4;
            crc2.fill();
            crc2.stroke();
        }
    }
})(L08Canvas || (L08Canvas = {}));
//# sourceMappingURL=canvas_script.js.map