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
        
        window.addEventListener('load', function(){

            oGameData.initGlobalObject(); // anroppar funktionen InitGlobalObj
            this.document.getElementById('gameArea').classList.add('d-none');
            this.document.getElementById('newGame').addEventListener('click', validateForm); //När newGame klickas så anropas funktionen validateForm
        
        });
        
        function validateForm(){
            
            let Spelare1 = document.getElementById('nick1').value; //variablar
            let Spelare2 = document.getElementById('nick2').value; 
            let error = document.getElementById('errorMsg');

            try{
                if(Spelare1.length < 5)  throw 'Namnet måste vara mer en 5 bokstäver';
                if (Spelare2.length < 5) throw 'Namnet måste vara mer en 5 bokstäver';
                if (Spelare1 === Spelare2)
                throw 'Spelare 1 & 2 får inte ha samma namn';
            }
            catch(fel){
            error.textContent = fel; //catch fångar upp möjliga fel med throwsen ovan
            }

            let Färg1 = document.getElementById('color1').value;
            let Färg2 = document.getElementById('color2').value;

            try{
                if(Färg1 === '#000000') throw 'Spelare får inte välja svart eller vit';
                if(Färg2 === '#000000') throw 'Spelare får inte välja svart eller vit';
                if(Färg2 === '#ffffff') throw 'Spelare får inte välja svart eller vit';
                if(Färg1 === '#ffffff') throw 'Spelare får inte välja svart eller vit';
                if(Färg1 === Färg2) throw 'Spelare får inte välja samma färg'
                oGameData.InitiateGame();
            }
            catch(fel) {
                error.textContent = fel;
            }
        }

        oGameData.InitiateGame = function(){

            document.getElementById('divInForm').classList.add('d-none');
            document.getElementById('gameArea').classList.remove('d-none');
            document.getElementById('errorMsg').innerHTML=''; // hittade på https://www.w3schools.com/jsref/prop_html_innerhtml.asp

            oGameData.nickNamePlayerOne = document.getElementById('nick1').value;
            oGameData.nickNamePlayerTwo = document.getElementById('nick2').value;
            oGameData.colorPlayerOne = document.getElementById('color1').value;
            oGameData.colorPlayerTwo = document.getElementById('color2').value;
            
            let spelplan = document.querySelectorAll('td');
            for(let i = 0; i < spelplan.length; i++) {
              spelplan[i].textContent = '';
              spelplan[i].setAttribute('style', 'background-color: #ffffff');
        }
        let playerChar;
        let playerName;

        let random;
        random = Math.random();
        if( random<0.5){
            playerChar = oGameData.playerOne;
            playerName=oGameData.nickNamePlayerOne;
            oGameData.currentPlayer=oGameData.playerOne; 
        }
        if( random>=0.5){
            playerChar = oGameData.playerTwo 
            playerName=oGameData.nickNamePlayerTwo 
            oGameData.currentPlayer=oGameData.playerTwo
    }
    document.querySelector('h1').innerHTML = 'Din tur att börja! ' + playerName;
    document.querySelector('table').addEventListener('click', executeMove);
}


function executeMove(ExM) {
    let target = ExM.target;

      if((target.tagName == 'TD')&&(target.textContent=== '') ){//Om man klickar på en TD som inte innehåller någon symbol 

            oGameData.gameField[target.getAttribute('data-id')]= oGameData.currentPlayer;//sätter data-id till current player

              if(oGameData.currentPlayer === oGameData.playerOne) {
                target.textContent = oGameData.playerOne;//placerar markör
                target.style.backgroundColor = oGameData.colorPlayerOne;//ändrar rutan till spelarens färg
                document.querySelector('h1').innerHTML = 'Det är ' + oGameData.nickNamePlayerTwo + 's tur att spela ';
                oGameData.currentPlayer = oGameData.playerTwo; //sätter current player till den andra spelaren

              } else if(oGameData.currentPlayer === oGameData.playerTwo) {
                target.textContent = oGameData.playerTwo;//placerar markör
                target.style.backgroundColor = oGameData.colorPlayerTwo;//ändrar rutan till spelarens färg
                document.querySelector('h1').innerHTML = 'Det är ' + oGameData.nickNamePlayerOne + 's tur att spela ';
                oGameData.currentPlayer = oGameData.playerOne;//sätter current player till den andra spelaren
             }
  
              let resultat = oGameData.checkForGameOver(); 
  
              if(resultat === 1 || resultat === 2 || resultat === 3) {
    
                  document.querySelector('table').removeEventListener('click', executeMove); //tar bort lyssnaren
                  document.getElementById('divInForm').classList.remove('d-none'); //visar upp formuläret igen
  
                if(resultat === 1) //spelare 1 vinner
                    document.querySelector('h1').innerHTML = oGameData.nickNamePlayerOne + ' vann rundan! Spela igen?';
                 
                else if(resultat === 2) //spelare 2 vinner
                    document.querySelector('h1').innerHTML = oGameData.nickNamePlayerTwo + ' vann rundan! Spela igen?';
                 
                else if(resultat === 3 || resultat === 0) //spelet blir oavgjort
                    document.querySelector('h1').innerHTML = 'Ingen vann :( Spela igen?';
  
                  document.getElementById('gameArea').classList.add('d-none');//gömmer spelplanen
                  oGameData.initGlobalObject();
              }
          }
      }
    