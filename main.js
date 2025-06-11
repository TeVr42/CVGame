const mapText = `
###################
#########...i.#####
##.7..8.#####h.####
##6####.#a..##.g..#
##.#.#.9..#.#..##.#
##.5.######b###.f.#
####4#2.1.#.#.e.###
####.#.##0#k.d#####
####.3..#s#.#######
###################
`;

class Game {
    constructor(mapData) {
        this.map = mapData.trim().split('\n');
        const position = this.findStartPosition('s');
        this.posx = position.x;
        this.posy = position.y;
    }

    findStartPosition(char) {
        for (let y = 0; y < this.map.length; y++) {
            const x = this.map[y].indexOf(char);
            if (x !== -1) {
                return { x, y };
            }
        }
        throw new Error(`Znak '${char}' nebyl nalezen v mapě.`);
    }
}

// Spuštění hry po načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const game = new Game(mapText);

    output.textContent = `Startovní pozice: (${game.posx}, ${game.posy})\n\nMapa:\n${game.map.join('\n')}`;
});
