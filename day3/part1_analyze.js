const fs = require('fs');
const os = require('os');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

// Build priority lookup table
let PRIORITY = {};

['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].forEach((p, i) => {
    PRIORITY[p] = i+1;
});

let priority_total = 0;
DATA.split(os.EOL).forEach((rucksack) => {
    let component_lookup = {};
    let duplicate_components = [];

    let compartment1 = rucksack.slice(0, rucksack.length / 2);
    let compartment2 = rucksack.slice(rucksack.length / 2, rucksack.length);

    compartment1.split('').forEach((c) => {
        if (!component_lookup[c]) {
            component_lookup[c] = 'not found';
        }
    });

    compartment2.split('').forEach((c) => {
        if (component_lookup[c] && component_lookup[c] !== 'found') {
            duplicate_components.push(c);
            component_lookup[c] = 'found';

            priority_total += PRIORITY[c];
        }
    });
});

console.log(priority_total);

