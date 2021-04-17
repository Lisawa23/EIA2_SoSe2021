namespace L02 {
window.addEventListener("load", handleLoad);

function handleLoad(_event: Event): void {
    document.addEventListener("mousemove", setInfoBox);
    let body: HTMLElement = <HTMLElement>document.querySelector("body");
    let div0: HTMLDivElement = <HTMLDivElement>document.querySelector(".div0");
    let div1: HTMLDivElement = <HTMLDivElement>document.querySelector(".div1");
    let button: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button");
    document.addEventListener("click", logInfo);
    document.addEventListener("keyup", logInfo);
    body.addEventListener("click", logInfo);
    body.addEventListener("keyup", logInfo);
    div0.addEventListener("click", logInfo);
    div0.addEventListener("keyup", logInfo);
    div1.addEventListener("click", logInfo);
    div1.addEventListener("keyup", logInfo);
    document.addEventListener("riseup", buttonOutput);
    button.addEventListener("click", bubbleFunction);
}

function setInfoBox(_event: MouseEvent): void {
    let span: HTMLSpanElement = <HTMLSpanElement>document.querySelector("span");

    let x: number = _event.pageX + 15;
    let y: number = _event.pageY + 20;

    span.style.left = x + "px";
    span.style.top = y + "px";
}

function logInfo(_event: Event): void {
    console.log("Event type: " + _event.type);
    console.log("Target: " + _event.target);
    console.log("CurrentTarget = " + _event.currentTarget);
    console.log(_event);
}

let buttonCustomEvent: CustomEvent = new CustomEvent("riseup", {detail: null});

function bubbleFunction(_event: Event): void {
    document.dispatchEvent(buttonCustomEvent);
}

function buttonOutput(_event: Event): void {
    console.log(_event);
}
}