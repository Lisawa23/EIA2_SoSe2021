"use strict";
var L;
(function (L) {
    // Lisa Waletzko
    // Matrikelnummer: 267281
    // MKB-2 B
    window.addEventListener("load", handleload);
    L.scale = 5;
    let div;
    let canvasDiv;
    let teamName;
    let formColors = [];
    let formNumbers = [];
    let formNames = [];
    let homeScore = 0;
    let awayScore = 0;
    let currentPlayer;
    let scoreElement = document.getElementById("score");
    scoreElement = document.createElement("span");
    let scoreTeamA = document.createElement("span");
    let scoreTeamB = document.createElement("span");
    let textField;
    textField = document.createElement("div");
    let playerInfoField;
    let divPlayer;
    divPlayer = document.createElement("p");
    let draggedPlayer;
    let listenToMouseMove = false;
    let animation = false;
    let moveables = [];
    let field;
    let ball;
    let mousePos;
    let currentPossession = [];
    //get current mouse position relative to canvas
    function getMousePos(_ev) {
        let rect = L.canvas.getBoundingClientRect();
        return new L.Vector((_ev.clientX - rect.left) / (rect.right - rect.left) * L.canvas.width, (_ev.clientY - rect.top) / (rect.bottom - rect.top) * L.canvas.height);
    }
    function startGame(_e) {
        //click space key to start the animation
        if (_e.code === "Space") {
            startAnimation();
        }
    }
    function handleload(_event) {
        let start = document.querySelector("button");
        start.addEventListener("click", getFormData);
    }
    function getFormData(_event) {
        let formData = new FormData(document.forms[0]);
        div = document.querySelector(".form");
        div.innerHTML = "";
        div.classList.add("visible");
        canvasDiv = document.querySelector(".canvasDiv");
        canvasDiv.classList.remove("visible");
        teamName = document.querySelector(".teams");
        //FormElements
        let shirtT1;
        let shirtT2;
        let shirtReferee;
        let shirtAsReferee;
        let velocityMin;
        let velocityMax;
        let precisionMin;
        let precisionMax;
        let inputTeam1 = String(formData.get("Text1"));
        let inputTeam2 = String(formData.get("Text2"));
        let teamA = document.querySelector(".teamA");
        teamA.innerHTML = "" + inputTeam1 + " <th> vs. </th> ";
        teamName.appendChild(teamA);
        let teamB = document.querySelector(".teamB");
        teamB.innerHTML = "" + inputTeam2 + "";
        teamName.appendChild(teamB);
        shirtT1 = String(formData.get("Color1"));
        shirtT2 = String(formData.get("Color2"));
        shirtReferee = String(formData.get("Color3"));
        shirtAsReferee = String(formData.get("Color4"));
        velocityMin = Number(formData.get("Slider1"));
        velocityMax = Number(formData.get("Slider2"));
        precisionMin = Number(formData.get("Slider3"));
        precisionMax = Number(formData.get("Slider4"));
        formColors.push(shirtT1);
        formColors.push(shirtT2);
        formColors.push(shirtReferee);
        formColors.push(shirtAsReferee);
        formNumbers.push(velocityMin);
        formNumbers.push(velocityMax);
        formNumbers.push(precisionMin);
        formNumbers.push(precisionMax);
        formNames.push(inputTeam1);
        formNames.push(inputTeam2);
        handleload2();
    }
    // load scene
    function handleload2() {
        L.canvas = document.getElementsByTagName("canvas")[0];
        L.crc2 = L.canvas.getContext("2d"); // ! damit nicht null ist
        field = new L.SoccerField();
        // set canvas dimensions handled by scene
        L.canvas.width = field.width + (2 * field.padding) + 200;
        L.canvas.height = field.height + (2 * field.padding);
        L.canvas.addEventListener("mousedown", getPlayer); // Checken ob shootBall, getPlayer oder showplayerInformation passieren soll
        L.canvas.addEventListener("mousemove", dragPlayer);
        L.canvas.addEventListener("mouseup", switchPlayer);
        document.addEventListener("keyup", startGame);
        L.canvas.addEventListener("mousemove", currentMousePos);
        L.canvas.addEventListener("click", getPlayerInfo);
        L.canvas.addEventListener("click", ballRolls);
        updateScore();
        createGame();
        // requests frame to update animation
        window.requestAnimationFrame(update);
    }
    function createGame() {
        moveables = [];
        ball = new L.Ball(new L.Vector(field.padding + (field.width / 2), field.padding + (field.height / 2)));
        console.log(field.padding);
        console.log(field.height);
        console.log(field.width);
        createHomeTeam();
        createAwayTeam();
        createAssistance();
        moveables.push(ball);
    }
    //resets players and ball to origin or random positions
    function reset(_randomBallPosition = false) {
        for (let p of moveables) {
            if (p instanceof L.Player) {
                if (!_randomBallPosition) {
                    // set player position to its origin
                    p.position = new L.Vector(p.origin.X, p.origin.Y);
                }
            }
            else if (p instanceof L.Ball) {
                // sets ball position
                p.position = new L.Vector(_randomBallPosition ? getRandom(field.padding, field.padding + field.width) : field.padding + field.width / 2, _randomBallPosition ? getRandom(field.padding, field.padding + field.height) : field.padding + field.height / 2);
                p.target = new L.Vector(p.position.X, p.position.Y);
            }
        }
    }
    function currentMousePos(_e) {
        // catch mousemove events to get current mouse position
        mousePos = getMousePos(_e);
        for (let movable of moveables) {
            if (movable instanceof L.Player && movable.active == true) {
                movable.highlighted = false;
                if (distance(mousePos, movable.position) - movable.radius <= 0) {
                    movable.highlighted = true;
                }
            }
        }
    }
    function getPlayerInfo(_e) {
        //get info of Player by click and altKey
        textField.classList.add("playerTextDesign");
        playerInfoField = document.querySelector("#playerText");
        mousePos = getMousePos(_e);
        for (let movable of moveables) {
            if (movable instanceof L.Player && movable.active == true) {
                if (distance(mousePos, movable.position) - movable.radius <= 0) {
                    if (_e.altKey) {
                        textField.innerHTML = "";
                        playerInfoField.appendChild(textField);
                        textField.innerHTML = "<p \" style=\"color:" + movable.color + ";\"> Player: " + movable.tricotNumber + "</p><p \" style=\"color:" + movable.color + ";\"> Team: " + movable.team + "<p \" style=\"color:" + movable.color + ";\"> Velocity: " + movable.speed + "</p><p \" style=\"color:" + movable.color + ";\"> Precision: " + movable.precision + "";
                        playerInfoField.appendChild(textField);
                    }
                }
            }
        }
    }
    function ballRolls() {
        let distanceBM = (distance(mousePos, ball.position) / 100);
        // combine precision factors
        let precisionR = ((10 - (currentPossession[0].precision / 10)) + distanceBM) * L.scale;
        console.log(precisionR);
        // get random pos inside precision radius of the player
        let randomX = getRandom(-precisionR, precisionR);
        let randomY = getRandom(-precisionR, precisionR);
        // ball speed relative to players shotpower
        ball.speed = currentPossession[0].shotPower;
        // updates target where the ball should follow
        ball.target = new L.Vector(mousePos.X + randomX, mousePos.Y + randomY);
        startAnimation();
    }
    // Spielerinformation bekommen
    function getPlayer(_event) {
        mousePos = getMousePos(_event);
        let playerClicked = getPlayerClick(mousePos);
        for (let movable of moveables) {
            if (movable instanceof L.Player) {
                if (distance(mousePos, movable.position) - movable.radius <= 0) {
                    if (_event.shiftKey && movable.active == false) {
                        listenToMouseMove = true; //soll erst hören wenn altkey gedrückt wird
                        draggedPlayer = playerClicked; // Zuweisung
                    }
                }
            }
        }
    }
    function dragPlayer(_event) {
        mousePos = getMousePos(_event);
        // Bekomme Mausposition die ganze Zeit
        if (listenToMouseMove == true && _event.shiftKey) {
            // Die Position vom gedraggten Spieler wird an die Mausposition geheftet
            if (draggedPlayer) {
                draggedPlayer.position = mousePos; // Damit Spieler an der Maus bleibt
            }
        }
    }
    // Es wird gecheckt ob der gedraggte Player mit einem anderen Spieler überlappt...
    // Wenn ja, dann sollen sie ihre Plätze tauschen.
    function switchPlayer(_event) {
        mousePos = getMousePos(_event);
        let mousePositionNew = mousePos;
        // getPlayerClick von der aktuellen Mausposition
        let playerAtMousePosition = getPlayerClick(mousePositionNew);
        if (playerAtMousePosition) {
            if (draggedPlayer) {
                // save Startposition von dem Spieler der ausgetauscht werden soll
                let draggedPlayerStartposition = draggedPlayer;
                if (draggedPlayerStartposition.team == playerAtMousePosition.team) {
                    playerAtMousePosition.position = draggedPlayerStartposition.origin;
                    playerAtMousePosition.origin = draggedPlayerStartposition.origin;
                    draggedPlayerStartposition.origin = playerAtMousePosition.position;
                    draggedPlayerStartposition.origin = draggedPlayerStartposition.position;
                    //draggedPlayerStartPosition = AUswechselspieler vor drag
                    draggedPlayer.active = true;
                    draggedPlayer.actionRadius = 30 * L.scale;
                    draggedPlayer.highlighted = false;
                    //PlayerAtMousePosition = Spieler im SPielfeld vor drag
                    playerAtMousePosition.active = false;
                    playerAtMousePosition.actionRadius = 0;
                    playerAtMousePosition.highlighted = false;
                }
                else {
                    playerAtMousePosition.position = playerAtMousePosition.origin;
                    draggedPlayerStartposition.position = draggedPlayerStartposition.origin;
                }
                draggedPlayer = null;
            }
        }
    }
    // Den geklickten Spieler bekommen
    function getPlayerClick(_clickPosition) {
        for (let player of moveables) {
            if (player instanceof L.Player) {
                if (player.isClicked(_clickPosition) && player != draggedPlayer) { // Wenn die Person unter der Maus nicht der gedraggte Spieler ist
                    return player;
                }
            }
        }
        return null; // Rückgabewert null, wenn kein Spieler unter der Mausposition ist
    }
    //stops animation by blocking movement and time
    function stopAnimation() {
        animation = false;
    }
    //start animation
    function startAnimation() {
        animation = true;
    }
    function getPosession(_tricotnumber, _teamColor) {
        currentPlayer = document.querySelector("#current-player");
        divPlayer.innerHTML = "";
        currentPlayer.appendChild(divPlayer);
        divPlayer.innerHTML = "Possession: " + _tricotnumber + "";
        divPlayer.style.color = _teamColor;
        currentPlayer.appendChild(divPlayer);
    }
    function createHomeTeam() {
        let teamnumberA = formNames[0];
        let teamColorA = formColors[0];
        // 3 rows; 4 lines
        let segmentY = (field.height / 4);
        let segmentX = (field.width / 3);
        let preColor = document.querySelector(".scoreA");
        preColor.style.background = teamColorA;
        // creates goalkeeper
        let goalkeeper = new L.Player(new L.Vector(field.padding, field.padding + (field.height / 2)), getRandom(0, 100), getRandom(formNumbers[2], formNumbers[3]), getRandom(formNumbers[0], formNumbers[1]), teamColorA, teamnumberA, 1, 20);
        // creates defence and midfield
        for (let j = 1; j <= 4; j++) {
            let player = new L.Player(new L.Vector(field.padding + ((segmentX * 1) - (segmentX / 2)) - 10, field.padding + ((segmentY * j) - (segmentY / 2))), getRandom(0, 100), getRandom(formNumbers[2], formNumbers[3]), getRandom(formNumbers[0], formNumbers[1]), teamColorA, teamnumberA, j + 1, 20);
            moveables.push(player);
        }
        for (let i = 2; i <= 2; i++) {
            for (let j = 1; j <= 4; j++) {
                let player = new L.Player(new L.Vector(field.padding + ((segmentX * i) - (segmentX / 2)) - 10, field.padding + ((segmentY * j) - (segmentY / 2))), getRandom(0, 100), getRandom(formNumbers[2], formNumbers[3]), getRandom(formNumbers[0], formNumbers[1]), teamColorA, teamnumberA, 5 + j, 20);
                moveables.push(player);
            }
        }
        // create offensive players
        let playerFront1 = new L.Player(new L.Vector(field.padding + ((segmentX * 3) - (segmentX / 2)), field.padding + ((segmentY * 2) / 2)), getRandom(0, 100), getRandom(formNumbers[2], formNumbers[3]), getRandom(formNumbers[0], formNumbers[1]), teamColorA, teamnumberA, 10, 20);
        let playerFront2 = new L.Player(new L.Vector(field.padding + ((segmentX * 3) - (segmentX / 2)), field.padding + ((segmentY * 4) - (segmentY))), getRandom(0, 100), getRandom(formNumbers[2], formNumbers[3]), getRandom(formNumbers[0], formNumbers[1]), teamColorA, teamnumberA, 11, 20);
        moveables.push(goalkeeper, playerFront1, playerFront2);
        // creates substitutes
        for (let i = 0; i < 6; i++) {
            let p = new L.Player(new L.Vector(650, 100 + i * 30), getRandom(30, 90), getRandom(formNumbers[2], formNumbers[3]), getRandom(formNumbers[0], formNumbers[1]), teamColorA, teamnumberA, 12 + i, 0);
            p.active = false;
            p.highlighted = false;
            moveables.push(p);
        }
    }
    function createAwayTeam() {
        let teamnumberB = formNames[1];
        // 3 rows; 4 lines
        let segmentY = (field.height / 4);
        let segmentX = (field.width / 3);
        let teamColorB = formColors[1];
        let postColorB = document.querySelector(".scoreB");
        postColorB.style.background = teamColorB;
        // creates goalkeeper
        let goalkeeper = new L.Player(new L.Vector(field.padding + field.width, field.padding + (field.height / 2)), getRandom(0, 100), getRandom(formNumbers[2], formNumbers[3]), getRandom(formNumbers[0], formNumbers[1]), teamColorB, teamnumberB, 1, 20);
        // creates defensive and midfield players
        for (let j = 1; j <= 4; j++) {
            let player = new L.Player(new L.Vector((field.padding + field.width) - (((segmentX * 1) - (segmentX / 2))) + 10, (field.padding + field.height) - (((segmentY * j) - (segmentY / 2)))), getRandom(0, 100), getRandom(formNumbers[2], formNumbers[3]), getRandom(formNumbers[0], formNumbers[1]), teamColorB, teamnumberB, j + 1, 20);
            moveables.push(player);
        }
        for (let i = 2; i <= 2; i++) {
            for (let j = 1; j <= 4; j++) {
                let player = new L.Player(new L.Vector((field.padding + field.width) - (((segmentX * i) - (segmentX / 2))) + 10, (field.padding + field.height) - (((segmentY * j) - (segmentY / 2)))), getRandom(0, 100), getRandom(formNumbers[2], formNumbers[3]), getRandom(formNumbers[0], formNumbers[1]), teamColorB, teamnumberB, 5 + j, 20);
                moveables.push(player);
            }
        }
        // creates offensive players
        let playerFront1 = new L.Player(new L.Vector((field.padding + field.width) - (((segmentX * 3) - (segmentX / 2))), field.padding + ((segmentY * 2) / 2)), getRandom(0, 100), getRandom(formNumbers[2], formNumbers[3]), getRandom(formNumbers[0], formNumbers[1]), teamColorB, teamnumberB, 11, 20);
        let playerFront2 = new L.Player(new L.Vector((field.padding + field.width) - (((segmentX * 3) - (segmentX / 2))), field.padding + ((segmentY * 4) - (segmentY))), getRandom(0, 100), getRandom(formNumbers[2], formNumbers[3]), getRandom(formNumbers[0], formNumbers[1]), teamColorB, teamnumberB, 10, 20);
        // creates substitutes
        for (let i = 0; i < 6; i++) {
            let p = new L.Player(new L.Vector(750, 100 + i * 30), getRandom(30, 90), getRandom(30, 90), getRandom(formNumbers[0], formNumbers[1]), teamColorB, teamnumberB, 12 + i, 0);
            p.active = false;
            p.highlighted = false;
            moveables.push(p);
        }
        moveables.push(goalkeeper, playerFront1, playerFront2);
    }
    //create assistant
    function createAssistance() {
        // creates referee with random position
        let referee = new L.Referee(new L.Vector(ball.position.X - (20 * L.scale), ball.position.Y - (20 * L.scale)));
        referee.color = formColors[2];
        let speedReferee = getRandom(formNumbers[0], formNumbers[1]);
        referee.speed = speedReferee;
        // creates upper Assistant
        let assistant1 = new L.Assistant(new L.Vector(getRandom(field.padding, field.padding + field.width / 2), field.padding));
        assistant1.color = formColors[3];
        let speedLinesman = getRandom(formNumbers[0], formNumbers[1]);
        assistant1.speed = speedLinesman;
        // creates bottom Assistant
        let assistant2 = new L.Assistant(new L.Vector(getRandom(field.padding + field.width / 2, field.padding + field.width), field.padding + field.height));
        assistant2.color = formColors[3];
        assistant2.speed = speedLinesman;
        moveables.push(referee, assistant2, assistant1);
    }
    //updates animation on each frame
    function update() {
        field.draw();
        for (let movable of moveables) {
            if (movable instanceof L.Assistant) {
                // move only if animation is running
                if (animation) {
                    let pos = new L.Vector(ball.position.X, movable.position.Y);
                    movable.move(pos);
                }
                movable.draw();
            }
            else if (movable instanceof L.Player) {
                // distance between player and ball (subtract radius of both for real collision detection)
                let distancePB = distance(movable.position, ball.position) - movable.radius - ball.radius;
                let p = movable;
                // check if current player is one of the surrounding players 
                let ballPossession = currentPossession.findIndex((l) => l.tricotNumber === p.tricotNumber && l.team === p.team);
                // if player is one of the surrounding players remove it from the list so the player can again get the ball
                if (ballPossession >= 0 && distancePB > 0) {
                    currentPossession.splice(ballPossession);
                }
                if (distancePB <= 0 && ballPossession === -1) {
                    // check if the current player isn't the ball leading player
                    if (!(currentPossession.length > 0 && movable?.tricotNumber === currentPossession[0].tricotNumber && movable?.team === currentPossession[0].team)) {
                        // set player as surrounding player
                        currentPossession.push(movable);
                    }
                    if (currentPossession.length > 0 && movable.tricotNumber === currentPossession[0].tricotNumber && movable.team === currentPossession[0].team) {
                        getPosession(movable.tricotNumber, movable.color);
                    }
                    stopAnimation();
                    // if distance is smaller than action radius, move player to ball
                }
                else if (distancePB <= movable.actionRadius && animation) {
                    // move player to current ball position
                    movable.move(ball.position);
                }
                else if (animation) {
                    // move player to its original position
                    movable.move(movable.origin);
                }
                movable.draw();
            }
            else if (movable instanceof L.Referee) {
                // move only if animation is running
                if (animation) {
                    movable.target = new L.Vector(ball.position.X - 20, ball.position.Y - 20);
                    movable.move(movable.target);
                }
                movable.draw();
                // if ball
            }
            else if (movable instanceof L.Ball) {
                // if ball has a target and animation is running, move ball
                if (ball.target && animation) {
                    // get distance between ball and balls target
                    let distanceBT = distance(movable.position, ball.target);
                    if (distanceBT > 0) {
                        movable.move(ball.target);
                        // if ball is in right goal
                        if (field.awayGoal(movable)) {
                            homeScore++;
                            updateScore();
                            stopAnimation();
                            reset();
                            //ball out of field
                        }
                        else if (field.ballOut(movable)) {
                            stopAnimation();
                            // reset positions and give ball random position
                            reset(true);
                            //ball in left goal
                        }
                        else if (field.homeGoal(movable)) {
                            awayScore++;
                            updateScore();
                            stopAnimation();
                            reset();
                        }
                    }
                }
                movable.draw();
            }
        }
        // requests next frame
        window.requestAnimationFrame(update);
    }
    function updateScore() {
        let playerUi = document.getElementById("upper-ui");
        scoreTeamA.classList.add("scoreA");
        scoreTeamB.classList.add("scoreB");
        scoreElement.classList.add("score");
        playerUi.appendChild(scoreTeamA);
        playerUi.appendChild(scoreElement);
        playerUi.appendChild(scoreTeamB);
        scoreElement.innerHTML = "" + homeScore + " : " + awayScore + "";
    }
    //get number between min and max
    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    function getRandom(_min, _max) {
        return Math.floor(Math.random() * (_max - _min + 1)) + _min;
    }
    L.getRandom = getRandom;
    //gets distance between two vectors
    //https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
    function distance(_v1, _v2) {
        let d = Math.sqrt(Math.pow(_v2.X - _v1.X, 2) + Math.pow(_v2.Y - _v1.Y, 2));
        return d;
    }
    L.distance = distance;
})(L || (L = {}));
//# sourceMappingURL=main.js.map