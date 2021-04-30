"use strict";
var L03NewMemory;
(function (L03NewMemory) {
    window.addEventListener("load", handleLoad);
    let div;
    let cardArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y"];
    let playCardArray = [];
    let choosenArray = [];
    let hideCards = [];
    let inputNo = 0;
    let startTime = 0;
    let endTime = 0;
    function handleLoad(_event) {
        let start = document.querySelector("button");
        start.addEventListener("click", createCards);
    }
    function createCards(_event) {
        let formData = new FormData(document.forms[0]);
        let inputString = formData.get("Number");
        if (inputString) {
            inputNo = Number(inputString);
        }
        else {
            inputNo = 5;
        }
        if (inputNo < 5 || inputNo > 25) {
            createCards(_event);
        }
        let slider = formData.get("Slider");
        let bColor = formData.get("Color1");
        let cardBackColor = formData.get("Color2");
        let fontColor = formData.get("Color3");
        let fontFamily = formData.get("Radiogroup");
        div = document.querySelector(".form");
        div.innerHTML = "";
        div.style.backgroundColor = bColor.toString();
        for (let i = 0; i < inputNo; i++) {
            let card = document.createElement("div");
            card.innerHTML = "<p>" + cardArray[i] + "</p>";
            card.style.width = slider + "px";
            card.style.height = slider + "px";
            card.setAttribute("class", "front is-hidden");
            card.style.backgroundColor = cardBackColor.toString();
            card.style.color = fontColor.toString();
            card.style.fontFamily = fontFamily.toString();
            playCardArray.push(card);
            div.appendChild(card);
            let secCard = document.createElement("div");
            secCard.innerHTML = "<p>" + cardArray[i] + "</p>";
            secCard.style.width = slider + "px";
            secCard.style.height = slider + "px";
            secCard.setAttribute("class", "front is-hidden");
            secCard.style.backgroundColor = cardBackColor.toString();
            secCard.style.color = fontColor.toString();
            secCard.style.fontFamily = fontFamily.toString();
            playCardArray.push(secCard);
            div.appendChild(secCard);
            card.addEventListener("click", function () {
                if (choosenArray.length < 2 && card.classList.contains("is-hidden") && card != choosenArray[0]) {
                    card.classList.remove("is-hidden");
                    card.classList.add("open");
                    console.log(card);
                    choosenArray.push(card);
                    checkForMatch(_event);
                }
            });
            secCard.addEventListener("click", function () {
                if (choosenArray.length < 2 && secCard.classList.contains("is-hidden") && secCard != choosenArray[0]) {
                    secCard.classList.remove("is-hidden");
                    secCard.classList.add("open");
                    choosenArray.push(secCard);
                    checkForMatch(_event);
                }
            });
            playCardArray.sort(() => 0.5 - Math.random());
            div.appendChild(playCardArray[i]);
        }
        startTime = new Date().getTime();
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
                    choosenArray[0].classList.remove("open");
                    choosenArray[1].classList.add("is-hidden");
                    choosenArray[1].classList.remove("open");
                    choosenArray = [];
                }
                choosenArray = [];
                endGame();
            }, 2000);
        }
    }
    function endGame() {
        if (hideCards.length == playCardArray.length) {
            endTime = new Date().getTime() - startTime;
            let timeCounter = Math.floor(endTime / 1000);
            console.log(timeCounter);
            div.innerHTML = "";
            let message = document.createElement("div");
            message.innerHTML = "<br><br><br><p>Congratulation you won!</p><br><p>Time: " + timeCounter + " sec</p>";
            div.appendChild(message);
            let again = document.createElement("div");
            again.innerHTML = "<button>Again</button>";
            div.appendChild(again);
            again.addEventListener("click", function (e) {
                e.preventDefault();
                location.reload();
            });
        }
    }
})(L03NewMemory || (L03NewMemory = {}));
//# sourceMappingURL=memory_script.js.map