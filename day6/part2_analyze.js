const fs = require('fs');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

let buff = [];
let answer = 0;

DATA.split('').every((char, i) => {
    if (i < 14) {
        buff.push(char);
    } else {
        let lookup = new Set();
        buff.forEach((b) => { lookup.add(b) });

        if (buff.length === lookup.size) {
            answer = i;
            return false;
        } else {
            buff.shift();
            buff.push(char);
        }
    }
    return true;
});

console.log(answer);
