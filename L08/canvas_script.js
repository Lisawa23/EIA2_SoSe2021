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
        paintPicture();
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
            crc2.lineWidth = lineSize;
        }
        crc2.stroke();
        createCircle();
    }
    //https://stackoverflow.com/questions/22237497/draw-a-circle-filled-with-random-color-sqares-on-canvas
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
    function createSquare() {
        positionY += Math.round(Math.random() * (canvas.height / 2));
        positionX += Math.round(Math.random() * (canvas.width / 2));
        size += Math.round(Math.random() * (canvas.width / 4));
        crc2.fillStyle = color4;
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
            crc2.fill();
            crc2.rotate(Math.PI * 90 / 180);
            crc2.stroke();
        }
        // createMoreCircles();
    }
    // function createMoreCircles(): void {
    //     var xKoord: number = Math.floor(Math.random() * canvas.width);
    //     var yKoord: number = Math.floor(Math.random() * canvas.width);
    //     var durchmesser: number = Math.floor(Math.random() * canvas.width / 2);
    //     console.log(xKoord);
    //     crc2.arc(xKoord, yKoord, durchmesser, durchmesser, 2 * Math.PI);
    //     crc2.fillStyle = color;
    //     crc2.fill();
    //     crc2.stroke();
    // }
})(L08Canvas || (L08Canvas = {}));
//# sourceMappingURL=canvas_script.js.map