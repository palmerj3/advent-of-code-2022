const fs = require('fs');
const OS = require('os');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

let tailUniquePositions = new Set();

let headPosition = {
    x: 0,
    y: 0
};

let tailPosition = {
    x: 0,
    y: 0
};

function drawGrid(h, t) {
    console.log(h, t);
    // Always center visualization on head
    let grid = {};

    for (let y = h.y-2; y <= h.y+2; y++) {
        if (!grid[y]) {
            grid[y] = {};
        }
        for (let x = h.x-2; x <= h.x+2; x++) {
            grid[y][x] = '.';
        }
    }

    if (h.x === t.x && h.y === t.y) {
        grid[h.y][h.x] = 'S';
    } else {
        grid[h.y][h.x] = 'H';
        grid[t.y][t.x] = 'T';
    }

    let gridStr = '';
    Object.keys(grid).map((y) => parseInt(y, 10)).sort((function(a,b){return a - b})).reverse().forEach((y) => {
        Object.keys(grid[y]).map((x) => parseInt(x, 10)).sort((function(a,b){return a - b})).forEach((x) => {
            gridStr += grid[y][x];
        });
        gridStr += "\n";
    });

    return gridStr;

    // let grid = [
    //     ['.','.','.','.','.'],
    //     ['.','.','.','.','.'],
    //     ['.','.','H','.','.'],
    //     ['.','.','.','.','.'],
    //     ['.','.','.','.','.'],
    // ];

    // if (h.y === t.y && h.x === t.x) {
    //     return grid;
    // };

    // Calculate tail position relative to H
    // let rX;
    // let rY;

    // if (t.x === h.x) {
    //     rX = 2;
    // } else if (t.x < h.x) {
    //     rX = (h.x - t.x);
    // } else {
    //     rX = (t.x - h.x);
    // }

    // if (t.y === h.y) {
    //     rY = 2;
    // } else if (t.y < h.y) {
    //     rY = (h.y - t.y);
    // } else {
    //     rY = (t.y - h.y);
    // }

    // grid[rY][rX] = 'T';
    // return grid;
}

function calculateTailPosition(h, t) {
    // Determine if we're touching
    if ((h.x === t.x && h.y === t.y) || (Math.abs(h.y - t.y) <= 1 && Math.abs(h.x - t.x) <= 1)) {
        return t;
    }

    if (h.x === t.x && h.y !== t.y) {
        // Move vertically
        if (h.y > t.y) {
            return {y: t.y+1, x: t.x};
        } else if (h.y < t.y) {
            return {y: t.y-1, x: t.x}
        }
    } else if (h.y === t.y && h.x !== t.x) {
        // Move horizontally
        if (h.x > t.x) {
            return {y: t.y, x: t.x+1};
        } else if (h.x < t.x) {
            return {y: t.y, x: t.x-1}
        }
    } else {
        // Head is diagonal to tail
        
        if (h.y > t.y && Math.abs(h.y - t.y) > 1) {
            return {y: h.y-1, x: h.x };
        } else if (h.y < t.y && Math.abs(t.y - h.y) > 1) {
            return {y: h.y+1, x: h.x };
        } else if (h.x > t.x && Math.abs(h.x - t.x) > 1) {
            return {y: h.y, x: h.x-1};
        } else {
            return {y: h.y, x: h.x+1}; 
        }
    }
}

console.log(drawGrid(headPosition, tailPosition));
tailUniquePositions.add(`{"x":${tailPosition.x},"y":${tailPosition.y}}`);

DATA.split(OS.EOL).forEach((line, i) => {
    let direction = line.split(' ')[0];
    let amount = parseInt(line.split(' ')[1], 10);

    for (let i = 0; i < amount; i++) {
        switch(direction) {
            case 'U':
                headPosition.y++;                
                break;
            case 'D':
                headPosition.y--;
                break;
            case 'L':
                headPosition.x--;
                break;
            case 'R':
                headPosition.x++
                break;
        }
        console.log(direction);
        console.log(drawGrid(headPosition, tailPosition));

        tailPosition = calculateTailPosition(headPosition, tailPosition);

        tailUniquePositions.add(`{"x":${tailPosition.x},"y":${tailPosition.y}}`);
        console.log(drawGrid(headPosition, tailPosition));
    }
});

console.log(tailUniquePositions.size);


// 6104 too high
// 5679 too low