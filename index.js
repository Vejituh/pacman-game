const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
let gridDivs = [];
let score = 0;

//28 * 28
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//Create Board
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        let gridDiv = document.createElement('div')
        gridDiv.classList.add('square')
        grid.appendChild(gridDiv);
        gridDivs.push(gridDiv);

        if (layout[i] === 0) {
            gridDivs[i].classList.add('pac-dot');
        } else if (layout[i] === 1) {
            gridDivs[i].classList.add('wall');
        } else if (layout[i] === 2) {
            gridDivs[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            gridDivs[i].id = 'power-pellet';
        }
    }
}
createBoard();

//starting posision of pacman
let pacmanCurrentIndex = 490;
gridDivs[pacmanCurrentIndex].id = 'pacman';

//movement control
function control(e) {
    if (e.defaultPrevented) {
        return;
    }
    gridDivs[pacmanCurrentIndex].id = '';

    switch(e.code) {
        case 'ArrowDown':
            if (!gridDivs[pacmanCurrentIndex + width].classList.contains('wall') && 
                !gridDivs[pacmanCurrentIndex + width].classList.contains('ghost-lair') && 
                pacmanCurrentIndex + width < width *  width ) {
                pacmanCurrentIndex += width;
            }
            break;
        case 'ArrowUp':
            if (!gridDivs[pacmanCurrentIndex - width].classList.contains('wall') &&
                !gridDivs[pacmanCurrentIndex - width].classList.contains('ghost-lair') && 
                pacmanCurrentIndex - width >= 0 ) {
                pacmanCurrentIndex -= width;
            }
            break;
        case 'ArrowLeft':
            if (!gridDivs[pacmanCurrentIndex -1].classList.contains('wall') &&
                !gridDivs[pacmanCurrentIndex -1].classList.contains('ghost-lair') && 
                pacmanCurrentIndex % width !== 0) {
                pacmanCurrentIndex -= 1;
                if(pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391
                }
            }
            break;
        case 'ArrowRight':
            if (!gridDivs[pacmanCurrentIndex +1].classList.contains('wall') &&
                !gridDivs[pacmanCurrentIndex +1].classList.contains('ghost-lair') && 
                pacmanCurrentIndex % width < width -1) {
                pacmanCurrentIndex += 1;
                if(pacmanCurrentIndex === 391) {
                    pacmanCurrentIndex = 364
                }
            }
            break;
    }
    e.preventDefault();
    gridDivs[pacmanCurrentIndex].id = 'pacman'
    pacDotEat()
}
document.addEventListener('keydown', control);

//Checking if pacman index contains a pc-dots and add score and remove class
function pacDotEat() {
    if (gridDivs[pacmanCurrentIndex].classList.contains('pac-dot')) {
        gridDivs[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.textContent = score;
    }
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost ('blinky', 348, 250),
    new Ghost ('pinky', 376, 400),
    new Ghost ('inky', 351, 300),
    new Ghost ('clyde', 379, 500)
]

//Draw ghost onto grid
for(const ghost of ghosts) {
    gridDivs[ghost.currentIndex].classList.add(ghost.className);
    gridDivs[ghost.currentIndex].classList.add('ghost');
}

//Move ghost
for (const ghost of ghosts) {
    moveGhost(ghost)
}

//function to move ghost
function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)]
    ghost.timerId = setInterval(function() {
        if (!gridDivs[ghost.currentIndex + direction].classList.contains('wall') &&
            !gridDivs[ghost.currentIndex + direction].classList.contains('ghost')) {
                gridDivs[ghost.currentIndex].classList.remove(ghost.className)
                gridDivs[ghost.currentIndex].classList.remove('ghost')
                ghost.currentIndex += direction;
                gridDivs[ghost.currentIndex].classList.add(ghost.className)
                gridDivs[ghost.currentIndex].classList.add('ghost')
            } else direction = directions[Math.floor(Math.random() * directions.length)]
    }, ghost.speed)
}