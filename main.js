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
    
    play() {
        // Implementace herní logiky zde
        console.log(`Hra začíná na pozici: (${this.posx}, ${this.posy})`);
        setInterval(() => {
            this.updateGameArea();
        }, 1000); // Aktualizace každou sekundu


    }

    updateGameArea() {
        const tile0 = document.getElementById('gameAreaCell0');
        const tile1 = document.getElementById('gameAreaCell1');
        const tile2 = document.getElementById('gameAreaCell2');
        const tile3 = document.getElementById('gameAreaCell3');
        const tile4 = document.getElementById('gameAreaCell4');
        const tile5 = document.getElementById('gameAreaCell5');
        const tile6 = document.getElementById('gameAreaCell6');
        const tile7 = document.getElementById('gameAreaCell7');
        const tile8 = document.getElementById('gameAreaCell8');

        const tiles = [tile0, tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8];

        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            const x = this.posx + (i % 3) - 1;
            const y = this.posy + Math.floor(i / 3) - 1;
            let textContent;
            if (x >= 0 && x < this.map[0].length && y >= 0 && y < this.map.length) {
                textContent = this.map[y][x];
            } else {
                textContent = ' ';
            }
            
            tile.classList.remove('bgWallBasic', 'bgWallGreen', 'bgGrass');
            if (textContent === '#') {
                console.log(`Tile: (${textContent})`);
                // random two options for wall
                const randomOption = Math.random() < 0.5 ? 'bgWallBasic' : 'bgWallGreen';
                tile.classList.add(randomOption);
            } else {
                tile.classList.add('bgGrass');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const game = new Game(mapText);
    output.textContent = `Startovní pozice: (${game.posx}, ${game.posy})\n\nMapa:\n${game.map.join('\n')}`;

    game.play();
});
