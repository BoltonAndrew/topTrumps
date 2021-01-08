/*jshint esversion: 8*/
const start = document.querySelector("#start");
const pokeSprite1 = document.querySelector("#poke1");
const pokeSprite2 = document.querySelector("#poke2");
const pokeName1 = document.querySelector("#p1Name");
const pokeName2 = document.querySelector("#p2Name");
const p1H = document.querySelector("#p1H");
const p1P = document.querySelector("#p1P");
const p1D = document.querySelector("#p1D");
const p1SA = document.querySelector("#p1SA");
const p1SD = document.querySelector("#p1SD");
const p2H = document.querySelector("#p2H");
const p2P = document.querySelector("#p2P");
const p2D = document.querySelector("#p2D");
const p2SA = document.querySelector("#p2SA");
const p2SD = document.querySelector("#p2SD");
let winCondition;


class PlayerConstructor {
    constructor() {
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

const compare = (p1Att, p2Att) => {
    if (p1Att > p2Att) {
        return "p1";
    } else if (p1Att < p2Att) {
        return "p2";
    } else {
        return "draw";
    }
};

const gameLoop = async () => {
    let player1 = new PlayerConstructor();
    await player1.deckBuilder();
    let player2 = new PlayerConstructor();
    await player2.deckBuilder();
    let currentPlayer = 0;
    while (player1.deck.length > 0 && player2.deck.length > 0) {
        if (currentPlayer === 0) {
            pokeSprite1.src = player1.deck[0].sprite;
            pokeName1.textContent += player1.deck[0].name;
            p1H.textContent += player1.deck[0].health;
            p1P.textContent += player1.deck[0].power;
            p1D.textContent += player1.deck[0].defense;
            p1SA.textContent += player1.deck[0].specAtt;
            p1SD.textContent += player1.deck[0].specDef;
            p1H.addEventListener("click", compare(player1.deck[0].health, player2.deck[0].health));
            p1P.addEventListener("click", compare(player1.deck[0].power, player2.deck[0].power));
            p1D.addEventListener("click", compare(player1.deck[0].defense, player2.deck[0].defense));
            p1SA.addEventListener("click", compare(player1.deck[0].specAtt, player2.deck[0].specAtt));
            p1SD.addEventListener("click", compare(player1.deck[0].specDef, player2.deck[0].specDef));

        }
    }

};

start.addEventListener("click", gameLoop);