const mapText = `
###################
#########k....#####
##.4....#####b.####
##.####5#.7.##...a#
##.#.#..6.#.#..##.#
##3..######8###...#
####.#..0.#.#.9.###
####2#1##.#...#####
####....#s#.#######
###################
`;

const texts = {
    "0": {"texts": [{"sec": "favLang", "text": "Python"}, {"sec": "skills", "text": "Python"}], "img": "python.png"},
    "1": {"texts": [{"sec": "skills", "text": "HTML/CSS"}], "img": "experience.png"},
    "2": {"texts": [{"sec": "skills", "text": "JavaScript"}], "img": "experience.png"},
    "3": {"texts": [{"sec": "cert", "text": "100 Days of code: Complete Python Pro Bootcamp"}], "img": "parchment.png"},
    "4": {"texts": [{"sec": "exp", "text": "Lecturer, coach and workshopist in Czehitas"}], "img": "experience.png"},
    "5": {"texts": [{"sec": "cert", "text": "First Certificate in English: Level C1"}], "img": "parchment.png"},
    "6": {"texts": [{"sec": "skills", "text": "Matlab"}], "img": "experience.png"},
    "7": {"texts": [{"sec": "skills", "text": "SQL"}], "img": "experience.png"},
    "8": {"texts": [{"sec": "skills", "text": "Machine Learning and Neural Networks"}], "img": "experience.png"},
    "9": {"texts": [{"sec": "cert", "text": "International Summer School on AI"}], "img": "parchment.png"},
    "a": {"texts": [{"sec": "edu", "text": "Thesis: Hybrid system for speech extraction"}], "img": "thesis.png"},
    "b": {"texts": [{"sec": "edu", "text": "Bachelor's degree: Information Technology - Intelligent Systems, FM TUL"}], "img": "eduHat.png"},
    "k": {"texts": [{"sec": "next", "text": "Maybe we'll meet on my journey..."}], "img": "levelUp.png"}
}

class Game {
    constructor(mapData) {
        this.map = mapData.trim().split('\n');
        const position = this.findStartPosition('s');
        this.posx = position.x;
        this.posy = position.y;
        this.playerDirection = 'front';
        this.listOfCollectedItems = [];
        this.playerElement = document.getElementById('imgCell4');
        this.playerElement.src = './resources/characterBack.png';
        this.playerElement.alt = 'Player Character';
        this.playerElement.classList.remove('hidden');
        this.playerElement.classList.add('visible');

        const playerTile = document.getElementById('gameAreaCell4');
        playerTile.appendChild(this.playerElement); 

        this.infoText = document.getElementById('infoText');
        this.infoTextBold = document.getElementById('infoTextBold');
        this.infoTextBold.textContent = 'Controls:';
        this.infoText.textContent = 'WSAD or buttons';

        this.isGameOver = false;
        this.fireworkInterval = null;
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
        game.updateGameArea();
    }

    movePlayer(direction) {
        const directions = {
            up: { dx: 0, dy: -1, img: 'characterBack.png' },
            down: { dx: 0, dy: 1, img: 'characterFront.png' },
            left: { dx: -1, dy: 0, img: 'characterLeft.png' },
            right: { dx: 1, dy: 0, img: 'characterRight.png' }
        };
        this.playerElement.src = `./resources/${directions[direction].img}`;

        if (this.map[directions[direction].dy + this.posy] &&
            this.map[directions[direction].dy + this.posy][directions[direction].dx + this.posx] !== '#') {
            this.posx += directions[direction].dx;
            this.posy += directions[direction].dy;
        }

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
            let tileCharContent;
            if (x >= 0 && x < this.map[0].length && y >= 0 && y < this.map.length) {
                tileCharContent = this.map[y][x];
            } else {
                tileCharContent = ' ';
            }

            if (i === 4 && tileCharContent === 'k' && !this.isGameOver) {
                this.isGameOver = true;
                this.fireworkInterval = setInterval(() => {
                    this.updateGameArea();
                }, 200);
                return
            }
            
            tile.classList.remove('bgWallBasic', 'bgWallGreen', 'bgGrass', 'bgFirework1', 'bgFirework2', 'bgFirework3');
            if (this.isGameOver) {
                const randomOption = Math.random();
                if (randomOption < 0.33) {
                    tile.classList.add('bgFirework1');
                } else if (randomOption < 0.66) {
                    tile.classList.add('bgFirework2');
                } else {
                    tile.classList.add('bgFirework3');
                }

            } else {
                if (tileCharContent === '#') {
                // const randomOption = Math.random() < 0.5 ? 'bgWallBasic' : 'bgWallGreen';
                const randomOption = 'bgWallGreen';
                tile.classList.add(randomOption);
                } else {
                    tile.classList.add('bgGrass');
                }
            }

            const imgElement = document.getElementById(`imgCell${i}`);
            if (texts[tileCharContent] && i !== 4 && !this.listOfCollectedItems.includes(tileCharContent)) {
                const imgSrc = `./resources/${texts[tileCharContent]["img"]}`;
                const tempImage = new Image();
                tempImage.src = imgSrc;
                tempImage.onload = () => {
                    imgElement.src = imgSrc;
                    imgElement.alt = `Tile ${tileCharContent}`;
                    imgElement.classList.remove('hidden');
                    imgElement.classList.add('visible');
                    tile.appendChild(imgElement);
                };
            } else if (i !== 4) {
                imgElement.classList.add('hidden');
                imgElement.classList.remove('visible');
            } else if (i === 4 && texts[tileCharContent] && !this.listOfCollectedItems.includes(tileCharContent)) { // collect item
                this.infoTextBold.textContent = this.mapSecToName(texts[tileCharContent]["texts"][0]["sec"]);
                this.infoText.textContent = texts[tileCharContent]["texts"][0]["text"];
                this.listOfCollectedItems.push(tileCharContent);
            
                for (let j = 0; j < texts[tileCharContent]["texts"].length; j++) {
                    const section = texts[tileCharContent]["texts"][j]["sec"];
                    const text = texts[tileCharContent]["texts"][j]["text"];

                    let ulElement;

                    switch (section) {
                        case "favLang":
                            ulElement = document.getElementById('pAchievFavLan');
                            break;
                        case "skills":
                            ulElement = document.getElementById('pAchievSkill');
                            break;
                        case "cert":
                            ulElement = document.getElementById('pAchievCertif');
                            break;
                        case "exp":
                            ulElement = document.getElementById('pAchievExp');
                            break;
                        case "edu":
                            ulElement = document.getElementById('pAchievEdu');
                            break;
                    }

                    if (ulElement) {
                        const li = document.createElement('li');
                        li.textContent = text;
                        ulElement.appendChild(li);
                    }
                }

            }
            
        }
    }

    mapSecToName(sec) {
        switch (sec) {
            case "favLang":
                return "Favorite Language:";
            case "skills":
                return "Skills:";
            case "cert":
                return "Certificates:";
            case "exp":
                return "Experience:";
            case "edu":
                return "Education:";
            case "next":
                return "What's next?:";
            default:
                return "";
        }
    }
}

function moveSectionForResponsibility() {
    const movable = document.getElementById('movableToFirst');
    const first = document.getElementById('firstContainer');
    const third = document.getElementById('thirdContainer');

    if (window.innerWidth > 640) {
        if (!first.contains(movable)) {
        first.appendChild(movable);
        }
    } else {
        if (!third.contains(movable)) {
        third.appendChild(movable);
        }
    }
}

const game = new Game(mapText);

document.addEventListener('DOMContentLoaded', () => {
    game.play();
});

document.addEventListener('keydown', (e) => {
const map = {
    w: 'up',
    s: 'down',
    a: 'left',
    d: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right'
};
if (map[e.key]) game.movePlayer(map[e.key]);
game.updateGameArea();
});

document.querySelectorAll('.containerControls img').forEach(btn =>
btn.addEventListener('click', () => {
    game.movePlayer(btn.dataset.dir)
    game.updateGameArea()
})
);

window.addEventListener('DOMContentLoaded', moveSectionForResponsibility);
window.addEventListener('resize', moveSectionForResponsibility);

document.addEventListener('keydown', function(event) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
  }
});
