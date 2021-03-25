namespace randomPoem {

    let subject: string[] = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
    let predicate: string[] = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
    let object: string[] = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];

    for (let i: number = subject.length ; i > 0; i--) {
       let phrase: string = getVerse(subject, predicate, object);
       console.log(phrase);
    }

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