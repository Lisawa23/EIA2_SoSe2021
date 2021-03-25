"use strict";
var randomPoem;
(function (randomPoem) {
    let subject = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let predicate = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let object = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    for (let i = subject.length; i > 0; i--) {
        let phrase = getVerse(subject, predicate, object);
        console.log(phrase);
    }
    function getVerse(_subject, _predicate, _object) {
        let all = "";
        let randomSubject = Math.floor(Math.random() * _subject.length);
        let randomPredicate = Math.floor(Math.random() * _predicate.length);
        let randomObject = Math.floor(Math.random() * _object.length);
        all = subject[randomSubject] + " " + predicate[randomPredicate] + " " + object[randomObject];
        _subject.splice(randomSubject, 1);
        _predicate.splice(randomPredicate, 1);
        _object.splice(randomObject, 1);
        return all;
    }
})(randomPoem || (randomPoem = {}));
//# sourceMappingURL=poem_script.js.map