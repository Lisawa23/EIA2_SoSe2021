"use strict";
var randomPoem;
(function (randomPoem) {
    //3 verschiedene Arrays mit Subjekt, Prädikat und Objekt
    //haben die gleiche Länge
    let subject = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let predicate = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let object = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    //for-Schleife lässt Laufvariable rückwerts laufen, entsprechend der Länge der Arrays (deshalb subject.length)
    //man hätte aber auch predicate.length oder object.length nehmen können
    //das funktioniert auch nur, da alle drei Arrays die gleiche Länge haben!!
    //alternativ kann man auch 6?? als Länge schreiben
    //in der Schleife wird die Funktion getVerse aufgerufen
    //mit console.log wird das Gedicht anschließend in der Konsolenausgabe angezeigt.
    for (let i = subject.length; i > 0; i--) {
        let phrase = getVerse(subject, predicate, object);
        console.log(phrase);
    }
    //Funktion nimmt drei Werte vom Typ string[] entgegen und gibt ein Wert vom Typ string zurück
    //Variable all nimmt die Wörter der Arrays auf
    //mit Math.random wird eine zufällige Zahl entsprechend der Länge der Arrays ausgewählt
    //Math.floor schneidet die Nachkommastellen der gewählten Zahl ab
    //mit splice wird das Wort aus dem Array entfernt
    //die 1 bei splice gibt die Anzahl an zu entfernende Elemente an
    //mit [0] wird auf die 0. Stelle im Array zugegriffen
    //return all: der Vorgang wird erneut ausgeführt
    function getVerse(_subject, _predicate, _object) {
        let all = "";
        let randomSubject = Math.floor(Math.random() * _subject.length);
        let randomPredicate = Math.floor(Math.random() * _predicate.length);
        let randomObject = Math.floor(Math.random() * _object.length);
        all = _subject.splice(randomSubject, 1)[0] + " " + _predicate.splice(randomPredicate, 1)[0] + " " + _object.splice(randomObject, 1)[0];
        return all;
    }
})(randomPoem || (randomPoem = {}));
//# sourceMappingURL=poem_script.js.map