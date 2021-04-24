"use strict";
var L02memory;
(function (L02memory) {
    window.addEventListener("load", handleLoad);
    let input;
    let div;
    let inputString;
    function handleLoad(_event) {
        div = document.querySelector(".form");
        let title = document.createElement("h1");
        title.innerHTML = "MEMORY";
        div.appendChild(title);
        input = document.createElement("input");
        input.placeholder = "Write a number from 5 to 25";
        input.type = "number";
        div.appendChild(input);
        let start = document.createElement("button");
        start.innerHTML = "Start";
        div.appendChild(start);
        start.addEventListener("touchmove", startButton);
        start.addEventListener("click", startButton);
    }
    function startButton(_event) {
        div.removeAttribute("h1");
        div.removeAttribute("input");
        div.removeAttribute("button");
        createCards(_event);
        arrangeCards();
        // timer();
    }
    let cardArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
    let playCardArray = [];
    let choosenArray = [];
    // let hideCards: string [] = [];
    function createCards(_event) {
        inputString = input.value;
        let inputStringToNumber = +inputString;
        div = document.querySelector(".form");
        div.innerHTML = "";
        let secondTitle = document.createElement("h2");
        secondTitle.innerHTML = "MEMORY";
        div.appendChild(secondTitle);
        let playGround = document.createElement("div");
        playGround.classList.add("playGround");
        playGround.innerHTML = "";
        div.appendChild(playGround);
        for (let i = 0; i < inputStringToNumber; i++) {
            let card = document.createElement("div");
            card.classList.add("is-hidden");
            let identicalCard = document.createElement("div");
            identicalCard.classList.add("is-hidden");
            let backCard = document.createElement("div");
            backCard.classList.add("back");
            backCard.innerHTML = "";
            playGround.appendChild(backCard);
            let identicalBackCard = document.createElement("div");
            identicalBackCard.classList.add("back");
            identicalBackCard.innerHTML = "";
            playGround.appendChild(identicalBackCard);
            let cardOne = cardArray[i];
            playCardArray.push(cardOne);
            card.innerHTML = "";
            playGround.appendChild(card);
            let cardTwo = cardArray[i];
            playCardArray.push(cardTwo);
            identicalCard.innerHTML = "";
            playGround.appendChild(identicalCard);
            backCard.addEventListener("click", function () {
                backCard.classList.remove("back");
                backCard.classList.add("is-hidden");
                card.classList.remove("is-hidden");
                card.classList.add("front");
                choosenArray.push(playCardArray[i]);
                createCards(_event);
            });
            identicalBackCard.addEventListener("click", function () {
                choosenArray.push(playCardArray[i]);
                identicalBackCard.classList.remove("back");
                identicalBackCard.classList.add("is-hidden");
                identicalCard.classList.remove("is-hidden");
                identicalCard.classList.add("front");
                createCards(_event);
            });
            // if (choosenArray.length == 2) {
            //     if (choosenArray[0] == choosenArray[1]) {
            //         card.classList.add("hide");
            //         identicalCard.classList.add("hide");
            //         card.classList.remove("front");
            //         identicalCard.classList.remove("front");
            //         hideCards.push(choosenArray[0]);
            //         hideCards.push(choosenArray[1]);
            //     }
            //     else {
            //         card.classList.add("back");
            //         identicalCard.classList.add("back");
            //     }
            // }
        }
    }
    function arrangeCards() {
        playCardArray.sort(() => 0.5 - Math.random());
    }
    //     let startTime: number = new Date().getTime();
    //     let timeCounter: number = 0;
    //     function timer(): void {
    //     if (hideCards.length !== playCardArray.length) {
    //         let time: number = new Date().getTime() - startTime;
    //         timeCounter = Math.floor(time / 1000);
    //         }
    //     }
    // //     let timerGo: number = setInterval(timer, 1000);
    // // //stop der timer Funktion
    // //     function stopMyTimer(): void {
    // //     clearInterval(timerGo);
    // //     }
})(L02memory || (L02memory = {}));
//# sourceMappingURL=memory_script.js.map