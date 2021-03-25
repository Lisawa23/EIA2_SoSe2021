namespace randomPoem {
    //3 verschiedene Arrays mit Subjekt, Prädikat und Objekt
    //haben die gleiche Länge
    let subject: string[] = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let predicate: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let object: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
    
    
    //for-Schleife lässt Laufvariable rückwerts laufen, entsprechend der Länge der Arrays (deshalb subject.length)
    //man hätte aber auch predicate.length oder object.length nehmen können
    //das funktioniert auch nur, da alle drei Arrays die gleiche Länge haben!!
    //alternativ kann man auch 6?? als Länge schreiben

    //in der Schleife wird die Funktion getVerse aufgerufen

    //mit console.log wird das Gedicht anschließend in der Konsolenausgabe angezeigt.
    for (let i: number = subject.length ; i > 0; i--) {
       let phrase: string = getVerse(subject, predicate, object);
       console.log(phrase);
    }
   
   
    //Funktion nimmt drei Werte vom Typ string[] entgegen und gibt ein Wert vom Typ string zurück
    //Variable all nimmt die Wörter der Arrays auf
    //mit Math.random wird eine zufällige Zahl entsprechend der Länge der Arrays ausgewählt
    //Math.floor schneidet die Nachkommastellen der gewählten Zahl ab
    //mit splice wird das Wort aus dem Array entfernt
    //return all: Variable wird geleert und der Vorgang wird erneut ausgeführt
    function getVerse(_subject: string[], _predicate: string[], _object: string[]): string {
        let all: string = "";
        let randomSubject: number = Math.floor(Math.random() * _subject.length);
        let randomPredicate: number = Math.floor(Math.random() * _predicate.length);
        let randomObject: number = Math.floor(Math.random() * _object.length);
        all = subject[randomSubject] + " " + predicate[randomPredicate] + " " + object[randomObject];
        
        _subject.splice(randomSubject, 1);
        _predicate.splice(randomPredicate, 1);
        _object.splice(randomObject, 1);
        return all;
    }

}