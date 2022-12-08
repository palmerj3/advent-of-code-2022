const fs = require('fs');
const os = require('os');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

const RUBRIC = {
    'A': 1, // rock
    'B': 2, // paper
    'C': 3, // scissors
    'X': 1, // rock
    'Y': 2, // paper
    'Z': 3, // scissors
    'WIN': 6,
    'LOSE': 0,
    'DRAW': 3
};

const SCENARIO = {
    'A': {
        'WIN': 'Y',
        'LOSE': 'Z',
        'DRAW': 'X'
    },
    'B': {
        'WIN': 'Z',
        'LOSE': 'X',
        'DRAW': 'Y'
    },
    'C': {
        'WIN': 'X',
        'LOSE': 'Y',
        'DRAW': 'Z'
    }
}

let my_total_score = 0;

DATA.split(os.EOL).forEach((round) => {
    const op_move = round.split(' ')[0];
    let my_outcome = round.split(' ')[1];

    switch(my_outcome) {
        case 'X':
            my_outcome = 'LOSE';
            break;
        case 'Y':
            my_outcome = 'DRAW';
            break;
        case 'Z':
            my_outcome = 'WIN';
            break;
    }

    const round_score = RUBRIC[SCENARIO[op_move][my_outcome]] + RUBRIC[my_outcome];
    my_total_score += round_score;
});

console.log(my_total_score);