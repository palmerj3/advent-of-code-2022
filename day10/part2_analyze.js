const { count } = require('console');
const fs = require('fs');
const OS = require('os');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

let cycle = 1;
let x = 1;
let signalStrengths = [];

let instructions = {
    'noop': 1,
    'addx': 2
};

let row = 0;
let col = 0;

let screen = '';

function tick(num) {
    for (let i = 0; i < num; i++) {  
        if (col > 39) {
            row++;
            col = 0;
            screen += "\n";
        }
    
        if (col === x-1 || col === x || col === x+1) {
            screen += '#';
        } else {
            screen += '.';
        }
    
        col++;  
        cycle++;
    }
}

DATA.split(OS.EOL).forEach((line, i) => {
    let instruction = line.split(' ')[0];
    let value = line.split(' ')[1] ? parseInt(line.split(' ')[1], 10) : null;
    
    switch(instruction) {
        case 'noop':
            tick(instructions[instruction]);
            break;
        case 'addx':
            tick(instructions[instruction]);
            x += value;
            break;
    }
});

console.log(screen);

