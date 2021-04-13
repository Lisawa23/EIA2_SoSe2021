"use strict";
var L02;
(function (L02) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.addEventListener("mousemove", setInfoBox);
        let body = document.querySelector("body");
        let div0 = document.querySelector(".div0");
        let div1 = document.querySelector(".div1");
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
        div0.addEventListener("click", logInfo);
        div0.addEventListener("keyup", logInfo);
        div1.addEventListener("click", logInfo);
        div1.addEventListener("keyup", logInfo);
    }
    function setInfoBox(_event) {
        let span = document.querySelector("span");
        let mousePosition = _event.target;
        mousePosition.appendChild(span);
        let x = _event.offsetX;
        let y = _event.offsetY;
        span.style.left = x + "px";
        span.style.top = y + "px";
    }
    function logInfo(_event) {
        console.log("Event type: " + _event.type);
        console.log("Target: " + _event.target);
        console.log("CurrentTarget = " + _event.currentTarget);
        console.log("Event: " + _event);
        console.groupEnd();
    }
})(L02 || (L02 = {}));
//# sourceMappingURL=Events-Exercises.js.map