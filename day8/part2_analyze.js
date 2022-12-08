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

let highestScore = 0;

grid.forEach((trees, i) => {
    trees.forEach((t, x) => {
        let aboveScore = 0;
        let belowScore = 0;
        let rightScore = 0;
        let leftScore = 0;

        let aboveTrees = [];
        let belowTrees = [];
        let rightTrees = [];
        let leftTrees = [];

        // Check above
        if (i > 0) {
            for (let y = i-1; y >= 0; y--) {
                aboveTrees.push(grid[y][x] < t);
            }
            if (aboveTrees.length > 0) {
                aboveTrees.indexOf(false) === -1 ? aboveScore = aboveTrees.length : aboveScore = aboveTrees.indexOf(false) + 1;
            }
        }

        // Check below
        if (i < grid.length-1) {
            for (let y = i+1; y < grid.length; y++) {
                belowTrees.push(grid[y][x] < t);
            }
            if (belowTrees.length > 0) {
                belowTrees.indexOf(false) === -1 ? belowScore = belowTrees.length : belowScore = belowTrees.indexOf(false) + 1;
            }        
        }

        // Check right
        if (x < trees.length - 1) {
            for (let y = x+1; y < trees.length; y++) {
                rightTrees.push(trees[y] < t);
            }
            if (rightTrees.length > 0) {
                rightTrees.indexOf(false) === -1 ? rightScore = rightTrees.length : rightScore = rightTrees.indexOf(false) + 1;
            } 
        }

        // Check left
        if (x > 0) {
            for (let y = x-1; y >= 0; y--) {
                leftTrees.push(trees[y] < t);
            }
            if (leftTrees.length > 0) {
                leftTrees.indexOf(false) === -1 ? leftScore = leftTrees.length : leftScore = leftTrees.indexOf(false) + 1;
            } 
        }

        let score = aboveScore * belowScore * rightScore * leftScore;
        if (score > highestScore) {
            highestScore = score;
        }
    });
});

console.log(highestScore);