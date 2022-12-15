const fs = require('fs');
const OS = require('os');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

let tailUniquePositions = new Set();

let positions = {
    0: {
        x: 0,
        y: 0
    },
    1: {
        x: 0,
        y: 0
    },
    2: {
        x: 0,
        y: 0
    },
    3: {
        x: 0,
        y: 0
    },
    4: {
        x: 0,
        y: 0
    },
    5: {
        x: 0,
        y: 0
    },
    6: {
        x: 0,
        y: 0
    },
    7: {
        x: 0,
        y: 0
    },
    8: {
        x: 0,
        y: 0
    },
    9: {
        x: 0,
        y: 0
    },
};

function drawGrid() {
    // Always center visualization on head
    let grid = {};

    let ys = Object.keys(positions).map((k) => positions[k].y);
    let xs = Object.keys(positions).map((k) => positions[k].x);

    let maxY = Math.max(...ys) + 2;
    let minY = Math.min(...ys) - 2;
    let maxX = Math.max(...xs) + 2;
    let minX = Math.min(...xs) - 2;

    for (let y = minY; y <= maxY; y++) {
        if (!grid[y]) {
            grid[y] = {};
        }
        for (let x = minX; x <= maxX; x++) {
            grid[y][x] = '.';
        }
    }

    Object.keys(positions).sort().reverse().forEach((k) => {
        grid[positions[k].y][positions[k].x] = k;
    });

    let gridStr = '';
    Object.keys(grid).sort((a, b) => b-a).forEach((y) => {
        Object.keys(grid[y]).sort((a, b) => a-b).forEach((x) => {
            gridStr += grid[y][x];
        });
        gridStr += "\n";
    });


    return gridStr;
}

function calculateTailPosition(h, t) {
    const [tx, ty] = [t.x, t.y];
    const [lx, ly] = [h.x, h.y];
  
    const xDiff = lx - tx
    const yDiff = ly - ty
  
    // touching, don't need to move
    if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) return t
  
    const nextTx = tx + Math.sign(xDiff)
    const nextTy = ty + Math.sign(yDiff)
  
    return {x:nextTx, y:nextTy};
}

tailUniquePositions.add(`{"x":${positions[9].x},"y":${positions[9].y}}`);

DATA.split(OS.EOL).forEach((line, i) => {
    let direction = line.split(' ')[0];
    let amount = parseInt(line.split(' ')[1], 10);

    for (let i = 0; i < amount; i++) {
        switch(direction) {
            case 'U':
                positions[0].y++;                
                break;
            case 'D':
                positions[0].y--;
                break;
            case 'L':
                positions[0].x--;
                break;
            case 'R':
                positions[0].x++
                break;
        }

        console.log(direction);
        console.log(drawGrid());
        positions[1] = calculateTailPosition(positions[0], positions[1]);
        console.log(drawGrid());
        positions[2] = calculateTailPosition(positions[1], positions[2]);
        console.log(drawGrid());
        positions[3] = calculateTailPosition(positions[2], positions[3]);
        console.log(drawGrid());
        positions[4] = calculateTailPosition(positions[3], positions[4]);
        console.log(drawGrid());
        positions[5] = calculateTailPosition(positions[4], positions[5]);
        console.log(drawGrid());
        positions[6] = calculateTailPosition(positions[5], positions[6]);
        console.log(drawGrid());
        positions[7] = calculateTailPosition(positions[6], positions[7]);
        console.log(drawGrid());
        positions[8] = calculateTailPosition(positions[7], positions[8]);
        console.log(drawGrid());
        positions[9] = calculateTailPosition(positions[8], positions[9]);
        console.log(drawGrid());

        tailUniquePositions.add(`{"x":${positions[9].x},"y":${positions[9].y}}`);
    }

});

console.log(tailUniquePositions.size);


// 2412 too low
// 2706 too high