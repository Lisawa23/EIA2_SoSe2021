namespace L02memory {

    window.addEventListener("load", handleLoad);

    let div: HTMLDivElement;
    let cardArray: string [] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y"];
    let playCardArray: HTMLElement [] = [];
    let choosenArray: HTMLElement [] = [];
    let hideCards: HTMLElement [] = [];


    function handleLoad(_event: Event): void { 
    let start: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button");
    start.addEventListener("click", createCards);
    }

    function createCards(_event: Event): void {  
    let formData: FormData = new FormData(document.forms[0]);
    let inputString: FormDataEntryValue = <FormDataEntryValue>formData.get("Number");
    let inputStringToNo: number = +inputString;
    let slider: FormDataEntryValue = <FormDataEntryValue>formData.get("Slider"); 
    let bColor: FormDataEntryValue = <FormDataEntryValue>formData.get("Color1");
    let cardBackColor: FormDataEntryValue = <FormDataEntryValue>formData.get("Color2");
    let fontColor: FormDataEntryValue = <FormDataEntryValue>formData.get("Color3");
    let fontFamily: FormDataEntryValue = <FormDataEntryValue>formData.get("Radiogroup");
   

    div = <HTMLDivElement>document.querySelector(".form");
    div.innerHTML = "";
    div.style.backgroundColor = bColor.toString();
    for (let i: number = 0; i < inputStringToNo; i++) {
        let card: HTMLElement = document.createElement("div");
        card.innerHTML = "<p>" + cardArray[i] + "</p>";
        card.style.width = slider + "px";
        card.style.height = slider + "px";
        card.setAttribute("class", "front is-hidden");
        card.style.backgroundColor = cardBackColor.toString();
        card.style.color = fontColor.toString();
        card.style.fontFamily = fontFamily.toString();
        playCardArray.push(card);
        div.appendChild(card);

        let secCard: HTMLElement = document.createElement("div");
        secCard.innerHTML = "<p>" + cardArray[i] + "</p>";
        secCard.style.width = slider + "px";
        secCard.style.height = slider + "px";
        secCard.setAttribute("class", "front is-hidden");
        secCard.style.backgroundColor = cardBackColor.toString();
        secCard.style.color = fontColor.toString();
        secCard.style.fontFamily = fontFamily.toString();
        playCardArray.push(secCard);
        div.appendChild(secCard);

        card.addEventListener("click", function(): void {
        card.classList.remove("is-hidden");
        card.classList.add("open");
        choosenArray.push(card);
        checkForMatch(_event);
        });
        secCard.addEventListener("click", function(): void {
        secCard.classList.remove("is-hidden");
        secCard.classList.add("open");
        choosenArray.push(secCard);
        checkForMatch(_event);
        });
    }
    }

    function checkForMatch(_event: Event): void {
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
        },             1000);
        }
    }

    let startTime: number = new Date().getTime();
    let timeCounter: number = 0;
    function timer(): void {
    if (hideCards.length !== playCardArray.length) {
        let time: number = new Date().getTime() - startTime;
        timeCounter = Math.floor(time / 1000);
    }
    }
   
    function endGame(): void {
        if (hideCards.length == playCardArray.length) {
            div.innerHTML = "";
            let congrat: HTMLElement = document.createElement("div");
            congrat.innerHTML = "<p>Congratulation you won!</p><br><p>Time:" + timeCounter + "</p>";
            div.appendChild(congrat);
        }
    }
    function arrangeCards(): void {
        playCardArray.sort(() => 0.5 - Math.random());
    }

}
