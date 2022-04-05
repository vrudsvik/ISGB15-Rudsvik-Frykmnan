"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', '');
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('O', 'O', 'O', '', '', '', '', '', '');
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', '');
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X');
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', '');
    //oGameData.gameField = Array('X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O');

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //Timerid om användaren har klickat för checkboxen. 
    oGameData.timerId = null;

}


function checkVertical() {  // vertikal visnst
    if(
    (oGameData.gameField[0] === "X") && 
    (oGameData.gameField[3] === "X") && //kollar om spelare X lagt vertikalt på rad 1
    (oGameData.gameField[6] === "X") || 

    (oGameData.gameField[1] === "X") && 
    (oGameData.gameField[4] === "X") && //kollar om spelare X lagt vertikalt på rad 2
    (oGameData.gameField[7] === "X") || 

    (oGameData.gameField[2] === "X") && 
    (oGameData.gameField[5] === "X") && //kollar om spelare X lagt vertikalt på rad 3
    (oGameData.gameField[8] === "X") )
        return 1;
    if(
    (oGameData.gameField[0] === "O") && 
    (oGameData.gameField[3] === "O") && //kollar om spelare O lagt vertikalt på rad 1
    (oGameData.gameField[6] === "O") || 

    (oGameData.gameField[1] === "O") && 
    (oGameData.gameField[4] === "O") &&  //kollar om spelare O lagt vertikalt på rad 2
    (oGameData.gameField[7] === "O") ||

    (oGameData.gameField[2] === "O") && 
    (oGameData.gameField[5] === "O") &&  //kollar om spelare O lagt vertikalt på rad 3
    (oGameData.gameField[8] === "O") ) 
        return 2;

        return 0;

}
function checkHorizontal() { //horsiontal vinst
    if(
    (oGameData.gameField[0] === "X") && 
    (oGameData.gameField[1] === "X") && //kollar om spelare X lagt horisontelt på rad 1
    (oGameData.gameField[2] === "X") || 

    (oGameData.gameField[3] === "X") && 
    (oGameData.gameField[4] === "X") && //kollar om spelare X lagt horisontelt på rad 2
    (oGameData.gameField[5] === "X") ||

    (oGameData.gameField[6] === "X") && 
    (oGameData.gameField[7] === "X") && //kollar om spelare X lagt horisontelt på rad 3
    (oGameData.gameField[8] === "X") )
    return 1;


    if(
    (oGameData.gameField[0] === "O") && 
    (oGameData.gameField[1] === "O") && //kollar om spelare O lagt horisontelt på rad 1
    (oGameData.gameField[2] === "O") || 

    (oGameData.gameField[3] === "O") && 
    (oGameData.gameField[4] === "O") && //kollar om spelare O lagt horisontelt på rad 2
    (oGameData.gameField[5] === "O") || 

    (oGameData.gameField[6] === "O") && 
    (oGameData.gameField[7] === "O") && //kollar om spelare O lagt horisontelt på rad 1
    (oGameData.gameField[8] === "O") )
    return 2;
    
    return 0;

    }
function checkDiagonal() {// diagonal vinst
    if(
    (oGameData.gameField[2] === "X") && 
    (oGameData.gameField[4] === "X") && //kollar om spelare X lagt diagonalt topphöger till nerevänster
    (oGameData.gameField[6] === "X") || 
    
    (oGameData.gameField[0] === "X") && 
    (oGameData.gameField[4] === "X") && //kollar om spelare X lagt diagonalt nerevänster till topphöger
    (oGameData.gameField[8] === "X") )
    return 1;
    

    if(
    (oGameData.gameField[2] === "O") && 
    (oGameData.gameField[4] === "O") && //kollar om spelare O lagt diagonalt topphöger till nerevänster
    (oGameData.gameField[6] === "O") || 

    (oGameData.gameField[0] === "O") && 
    (oGameData.gameField[4] === "O") && //kollar om spelare O lagt diagonalt nerevänster till topphöger
    (oGameData.gameField[8] === "O") ) 
    return 2;

    return 0;
}



/*
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
        


oGameData.checkForGameOver = function() {
        // kallar på check-funktioner och returnerar värde beroende på resulatat
        let horisontal = checkHorizontal();
        let vertical = checkVertical(); 
        let diagonal = checkDiagonal();
        
        if(
        (horisontal === 1) || 
        (vertical === 1) ||  //ifall någon av funktionerna retunerar 1 så skriv consolloggen ut
        (diagonal === 1)) {
        console.log("spelare 1 vann!");
            return 1;
        }
        if(
        (horisontal === 2) || 
        (vertical === 2) || //ifall någon av funktionerna retunerar 2 så skriv consolloggen ut
        (diagonal === 2)) {
        console.log("spelare 2 vann!");
            return 2;
        }
        oGameData.checkForDraw(); // kallar på funtionen CheckForDraw
        if (oGameData.checkForDraw() == 3) // checkar så spelplanen är full innan 3 retuneras
            return 3;
        return 0;
       }
       oGameData.checkForDraw = function(){
           let result = oGameData.gameField.includes(''); // kollar så hela Array Gamefield är full
            if(result == false) 
            return 3;

            return 0;
        }
        