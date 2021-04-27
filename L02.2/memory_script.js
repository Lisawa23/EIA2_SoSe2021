"use strict";
var L02memory;
(function (L02memory) {
    window.addEventListener("load", handleLoad);
    let div;
    let cardArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
    let playCardArray = [];
    let choosenArray = [];
    let hideCards = [];
    function handleLoad(_event) {
        let start = document.querySelector("button");
        start.addEventListener("click", createCards);
        //Input Number from 5-25
        // let number: HTMLInputElement = <HTMLInputElement>document.querySelector("#number");
        // let inputString: string = number.value;
        // let inputStringToNumber: number = +inputString;
        // if (inputStringToNumber < 5 || inputStringToNumber > 25) {
        //     handleLoad(_event);
        // }
        // else {
        //     start.addEventListener("click", createCards);
        // }
    }
    function createCards(_event) {
        //Input Number from 5-25
        let number = document.querySelector("#number");
        let inputString = number.value;
        let inputStringToNumber = +inputString;
        //Input Slider
        let slider = document.querySelector("#slider");
        let sliderNumber = slider.value;
        //Button für font funktioniert nicht
        let radioButton = document.querySelector(".radio");
        let font = radioButton.value;
        let cardName = document.querySelector("p");
        cardName.style.fontFamily = font;
        //Playground background-color
        let bColor = document.querySelector(".background");
        let background = bColor.value;
        console.log(background);
        div = document.querySelector(".form");
        div.innerHTML = "";
        div.style.backgroundColor = background;
        for (let i = 0; i < inputStringToNumber; i++) {
            let card = document.createElement("div");
            card.innerHTML = "<p>" + cardArray[i] + "</p>";
            card.style.width = sliderNumber + "px";
            card.style.height = sliderNumber + "px";
            card.setAttribute("class", "front is-hidden");
            playCardArray.push(card);
            div.appendChild(card);
            let secCard = document.createElement("div");
            secCard.innerHTML = "<p>" + cardArray[i] + "</p>";
            secCard.style.width = sliderNumber + "px";
            secCard.style.height = sliderNumber + "px";
            secCard.setAttribute("class", "front is-hidden");
            playCardArray.push(secCard);
            div.appendChild(secCard);
            card.addEventListener("click", function () {
                card.classList.remove("is-hidden");
                card.classList.add("open");
                choosenArray.push(card);
                checkForMatch(_event);
            });
            secCard.addEventListener("click", function () {
                secCard.classList.remove("is-hidden");
                secCard.classList.add("open");
                choosenArray.push(secCard);
                checkForMatch(_event);
            });
        }
    }
    function checkForMatch(_event) {
        if (choosenArray.length == 2) {
            setTimeout(() => {
                if (choosenArray[0].innerHTML == choosenArray[1].innerHTML) {
                    choosenArray[0].classList.remove("open");
                    choosenArray[0].classList.add("visible");
                    choosenArray[1].classList.remove("open");
                    choosenArray[1].classList.add("visible");
                    hideCards.push(choosenArray[0]);
                    hideCards.push(choosenArray[1]);
                }
                else {
                    choosenArray[0].classList.add("is-hidden");
                    choosenArray[1].classList.add("is-hidden");
                    choosenArray = [];
                }
                choosenArray = [];
                endGame();
            }, 1000);
        }
    }
    let startTime = new Date().getTime();
    let timeCounter = 0;
    function timer() {
        if (hideCards.length !== playCardArray.length) {
            let time = new Date().getTime() - startTime;
            timeCounter = Math.floor(time / 1000);
        }
    }
    function endGame() {
        if (hideCards.length == playCardArray.length) {
            div.innerHTML = "";
            let congrat = document.createElement("div");
            congrat.innerHTML = "<p>Congratulation you won!</p><br><p>Time:" + timeCounter + "</p>";
            div.appendChild(congrat);
        }
    }
    function arrangeCards() {
        playCardArray.sort(() => 0.5 - Math.random());
    }
})(L02memory || (L02memory = {}));
//# sourceMappingURL=memory_script.js.map