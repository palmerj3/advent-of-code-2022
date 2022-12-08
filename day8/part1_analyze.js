const fs = require('fs');
const OS = require('os');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

let numVisible = 0;
const l = DATA.split(OS.EOL);
let grid = [];

// Process strings as integers
l.forEach((line) => {
    let trees = line.split('').map(i => parseInt(i, 10));
    grid.push(trees);
});

grid.forEach((trees, i) => {
    let isProcessable = true;
    if (i === 0 || i === grid.length - 1) {
        // All of the trees in the first and last row are visible so don't process them
        isProcessable = false;
    }

    if (isProcessable) {
        trees.forEach((t, x) => {
            let isVisible = false;
            if (x === 0 || x === trees.length - 1) {
                isVisible = true;
            } else {
                // Check above
                let aboveTrees = [];
                for (let y = i-1; y >= 0; y--) {
                    aboveTrees.push(grid[y][x] < t);
                }

                // Check below
                let belowTrees = [];
                for (let y = i+1; y < grid.length; y++) {
                    belowTrees.push(grid[y][x] < t);
                }

                // Check right
                let rightTrees = [];
                for (let y = x+1; y < trees.length; y++) {
                    rightTrees.push(trees[y] < t);
                }

                // Check left
                let leftTrees = [];
                for (let y = x-1; y >= 0; y--) {
                    leftTrees.push(trees[y] < t);
                }

                if (!aboveTrees.includes(false)) {
                    isVisible = true;
                }
                if (!belowTrees.includes(false)) {
                    isVisible = true;
                }
                if (!rightTrees.includes(false)) {
                    isVisible = true;
                }
                if (!leftTrees.includes(false)) {
                    isVisible = true;
                }
            }

            if (isVisible) {
                numVisible++;
            }
        });
    } else {
        numVisible += trees.length;
    }

    console.log(i, numVisible);
});

console.log(numVisible);