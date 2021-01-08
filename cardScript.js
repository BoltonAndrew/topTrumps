/*jshint esversion: 8*/

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


const gameLoop = async () => {
    let player1 = new PlayerConstructor();
    await player1.deckBuilder();
    let player2 = new PlayerConstructor();
    await player2.deckBuilder();
    console.log(player1.deck);

};

gameLoop();