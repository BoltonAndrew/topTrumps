/*jshint esversion: 8*/
//DOM selectors

const start = document.querySelector("#start");
const heading = document.querySelector("#header");
let activePlayer;
let floatArr = [];
const playerDomSelectorsArr = [{pokeSprite: document.querySelector("#poke1"),
 pokeName: document.querySelector("#p1Name"),
 pH: document.querySelector("#p1H"),
 pP: document.querySelector("#p1P"),
 pD: document.querySelector("#p1D"),
 pSA: document.querySelector("#p1SA"),
 pSD: document.querySelector("#p1SD")},
 {pokeSprite: document.querySelector("#poke2"), 
 pokeName: document.querySelector("#p2Name"),
 pH: document.querySelector("#p2H"),
 pP: document.querySelector("#p2P"),
 pD: document.querySelector("#p2D"),
 pSA: document.querySelector("#p2SA"),
 pSD: document.querySelector("#p2SD")}];

//functions 

const drawCard = (playerNum) => {
    playerDomSelectorsArr[playerNum].pokeSprite.src = players[playerNum].deck[0].sprite;
    playerDomSelectorsArr[playerNum].pokeName.textContent += players[playerNum].deck[0].name;
    playerDomSelectorsArr[playerNum].pH.textContent += players[playerNum].deck[0].health;
    playerDomSelectorsArr[playerNum].pP.textContent += players[playerNum].deck[0].power;
    playerDomSelectorsArr[playerNum].pD.textContent += players[playerNum].deck[0].defense;
    playerDomSelectorsArr[playerNum].pSA.textContent += players[playerNum].deck[0].specAtt;
    playerDomSelectorsArr[playerNum].pSD.textContent += players[playerNum].deck[0].specDef;      
};
const unDrawCard = () => {
    playerDomSelectorsArr[0].pokeSprite.src = "./assets/58-589803_pokeball-png-transparent-image-pokeball-png-clipart.png";
    playerDomSelectorsArr[0].pokeName.textContent = "Name: ";
    playerDomSelectorsArr[0].pH.textContent = "HP: ";
    playerDomSelectorsArr[0].pP.textContent = "Power: ";
    playerDomSelectorsArr[0].pD.textContent = "Defense: ";
    playerDomSelectorsArr[0].pSA.textContent = "Special Attack: ";
    playerDomSelectorsArr[0].pSD.textContent = "Special Defense: ";
    playerDomSelectorsArr[1].pokeSprite.src = "./assets/58-589803_pokeball-png-transparent-image-pokeball-png-clipart.png";
    playerDomSelectorsArr[1].pokeName.textContent = "Name: ";
    playerDomSelectorsArr[1].pH.textContent = "HP: ";
    playerDomSelectorsArr[1].pP.textContent = "Power: ";
    playerDomSelectorsArr[1].pD.textContent = "Defense: ";
    playerDomSelectorsArr[1].pSA.textContent = "Special Attack: ";
    playerDomSelectorsArr[1].pSD.textContent = "Special Defense: ";
    drawCard(activePlayer);
};
const winCardMove = (winner, loser) => {
    players[winner].deck.push(players[winner].deck[0], players[loser].deck[0]);
    players[0].deck.shift();
    players[1].deck.shift();
    if (floatArr.length > 0) {
        for (let i = 0; i < floatArr.length; i++) {
            players[winner].deck.push(floatArr[i]);
        }
        floatArr = [];
    }
    if (players[0].deck.length === 0 || players[1].deck.length === 0) {
        winnerFunc(activePlayer);
    }
};
const drawCardMove = () => {
    floatArr.push(players[0].deck[0], players[1].deck[0]);
    players[0].deck.shift();
    players[1].deck.shift();

    if (players[0].deck.length === 0) {
        winnerFunc(0);
    } else if (players[1].deck.length === 0) {
        winnerFunc(1);
    }
};
const winnerFunc = (playerNum) => {
    heading.textContent = `Player ${playerNum + 1} Wins!`;
};
const compare = (attrib1, attrib2) => {
    drawCard(players[activePlayer].opposingPlayer);
    if (attrib1 > attrib2) {
        activePlayer = 0;
        console.log("player 1 wins");
        setTimeout(unDrawCard, 3000);
        winCardMove(0, 1);
    } else if (attrib2 > attrib1) {
        activePlayer = 1;
        console.log("player 2 wins");
        setTimeout(unDrawCard, 3000);
        winCardMove(1, 0);
    } else {
        console.log("draw");
        setTimeout(unDrawCard, 3000);
        drawCardMove();
    } 
};
const addEveListFunc = (playerNum) => {
    playerDomSelectorsArr[playerNum].pH.addEventListener("click", () => {
        if (playerNum === activePlayer) {
            compare(players[0].deck[0].health, players[1].deck[0].health);

        }
    });
    playerDomSelectorsArr[playerNum].pP.addEventListener("click", () => {
        if (playerNum === activePlayer) {
            compare(players[0].deck[0].power, players[1].deck[0].power);
        }
    });
    playerDomSelectorsArr[playerNum].pD.addEventListener("click", () => {
        if (playerNum === activePlayer) {
            compare(players[0].deck[0].defense, players[1].deck[0].defense);
        }
    });
    playerDomSelectorsArr[playerNum].pSA.addEventListener("click", () => {
        if (playerNum === activePlayer) {
            compare(players[0].deck[0].specAtt, players[1].deck[0].specAtt);
        }
    });
    playerDomSelectorsArr[playerNum].pSD.addEventListener("click", () => {
        if (playerNum === activePlayer) {
            compare(players[0].deck[0].specDef, players[1].deck[0].specDef);
        }
    });
};

//constructors

class PlayerConstructor {
    constructor(playerNumber) {
        this.opposingPlayer = playerNumber;
        this.deck = [];
    }
    async deckBuilder() {
        for (let i=0; i < 15; i++) {
            let ranNum = Math.floor(Math.random() * 151) + 1;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ranNum}/`);
            const poki = await response.json();
            this.deck.push({
                name: poki.name,
                health: poki.stats[0].base_stat,
                power: poki.stats[1].base_stat,
                defense: poki.stats[2].base_stat,
                specAtt: poki.stats[3].base_stat,
                specDef: poki.stats[4].base_stat,
                sprite: poki.sprites.front_default});
            }
    }
}
//main body

let players = [new PlayerConstructor(1), new PlayerConstructor(0)];
players[0].deckBuilder();
players[1].deckBuilder();
const gameLoop = () => {
    activePlayer = 0;
    drawCard(activePlayer);
    addEveListFunc(0);
    addEveListFunc(1);
    
};

start.addEventListener("click", gameLoop);