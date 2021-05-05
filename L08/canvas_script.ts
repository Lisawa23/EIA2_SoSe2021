namespace L08Canvas {
    window.addEventListener("load", start);

    let crc2: CanvasRenderingContext2D;
    let canvas: HTMLCanvasElement;

    let letters: string[] = "0123456789ABCDEF".split("");
    let color: string = "#";
    let color2: string = "#";
    let color3: string = "#";
    let color4: string = "#";
    for (var i: number = 0; i < 6; i++ ) {
    color += letters[Math.round(Math.random() * 15)];
    color2 += letters[Math.round(Math.random() * 15)];
    color3 += letters[Math.round(Math.random() * 15)];
    color4 += letters[Math.round(Math.random() * 15)];
    }

    function start(): void {
        canvas = document.querySelector("canvas")!;
        crc2 = canvas.getContext("2d")!;

        paintPicture();
    }

    function paintPicture(): void {
    crc2.beginPath();
    for (let i: number = 0; i <= 10; i++) {
        let number1: number = Math.floor(Math.random() * canvas.width);
        let number2: number = Math.floor(Math.random() * canvas.width);
        let number3: number = Math.floor(Math.random() * canvas.width);
        let number4: number = Math.floor(Math.random() * canvas.width);
        crc2.moveTo(number1, number2);
        crc2.lineTo(number3, number4);
    }
    crc2.stroke();
    createCircle();
    }
    //https://stackoverflow.com/questions/22237497/draw-a-circle-filled-with-random-color-sqares-on-canvas


    function createCircle(): void {                               
    let dia: number = canvas.width / 2;    // get context 

    
    let radius: number = dia * 0.5;

    crc2.translate(0.5, 0.5);                        // to make pixels sharper

    for (let y: number = 0;  y < dia; y++) {                           // walk x/y grid
    for (let x: number = 0; x < dia; x++) {
        let gradient: CanvasGradient = crc2.createLinearGradient(50, 50, 200, 400);

        gradient.addColorStop(0, color);
        gradient.addColorStop(.5, color2);
        gradient.addColorStop(1, color3);
        crc2.fillStyle = gradient;          // set random color
        crc2.fillRect(x, y, 1, 1);               // draw a pixel
    }
    }

    // create circle
    let posx: number = Math.floor(Math.random() * canvas.width);
    let posy: number = Math.floor(Math.random() * canvas.height);

// removes pixels outside next shape
    crc2.globalCompositeOperation = "destination-in"; 
    crc2.arc(posx, posy, radius, posx, 2 * Math.PI);
    crc2.fill();

// reset
    crc2.globalCompositeOperation = "source-over"; 
    createSquare();
    }

    let positionY: number = 0;
    let positionX: number = 0;
    let size: number = 0;

    function createSquare(): void {
    positionY += Math.round(Math.random() * (canvas.height / 2));
    positionX += Math.round(Math.random() * (canvas.width / 2));
    size += Math.round(Math.random() * (canvas.width / 4));
    crc2.fillStyle = color4;
    crc2.strokeRect(positionX, positionY, size, size);
    crc2.fillRect(positionX + 10, positionY + 10, size, size);
    createTriangle();
    }

    function createTriangle(): void {
    positionY += Math.round(Math.random() * (canvas.height / 2));
    positionX += Math.round(Math.random() * (canvas.width / 2));  

    for (let index: number = 0; index < canvas.height; index++) {
        
    }
    }

}