const fs = require('fs');
const os = require('os');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

// Build priority lookup table
let PRIORITY = {};

['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].forEach((p, i) => {
    PRIORITY[p] = i+1;
});

let priority_total = 0;
let elf_cnt = 0;
let component_lookup = {};

DATA.split(os.EOL).forEach((rucksack) => {
    const unique_items = [...new Set(rucksack.split(''))];

    unique_items.forEach((c) => {
        if (!component_lookup[c]) {
            component_lookup[c] = 0;
        }

        component_lookup[c]++;
    });

    if (elf_cnt === 2) {
        Object.keys(component_lookup).forEach((c) => {
            if (component_lookup[c] === 3) {
                priority_total += PRIORITY[c];
            }
        });

        elf_cnt = 0;
        component_lookup = {};
    } else {
        elf_cnt++;
    }
});

console.log(priority_total);

