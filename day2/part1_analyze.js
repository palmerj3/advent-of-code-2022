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
    'LOSS': 0,
    'DRAW': 3
};

let my_total_score = 0;

DATA.split(os.EOL).forEach((round) => {
    const op_move = round.split(' ')[0];
    const my_move = round.split(' ')[1];

    let outcome = 'LOSS';
    if (RUBRIC[op_move] === RUBRIC[my_move]) {
        outcome = 'DRAW';
    } else {
        if (op_move === 'A' && my_move === 'Y') {
            outcome = 'WIN';
        } else if (op_move === 'B' && my_move === 'Z') {
            outcome = 'WIN';
        } else if (op_move === 'C' && my_move === 'X') {
            outcome = 'WIN';
        }
    }

    const round_score = RUBRIC[my_move] + RUBRIC[outcome];
    console.log(op_move, my_move, outcome, `${RUBRIC[my_move]} + ${RUBRIC[outcome]} = ${round_score}`);

    my_total_score += round_score;
});

console.log(my_total_score);