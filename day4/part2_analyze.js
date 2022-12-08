const fs = require('fs');
const os = require('os');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });



let overlaps = 0;
DATA.split(os.EOL).forEach((elf_pair) => {
    let elf1 = elf_pair.split(',')[0];
    let elf2 = elf_pair.split(',')[1];

    let elf1_start = parseInt(elf1.split('-')[0], 10);
    let elf1_end = parseInt(elf1.split('-')[1], 10);

    let elf2_start = parseInt(elf2.split('-')[0], 10);
    let elf2_end = parseInt(elf2.split('-')[1], 10);

    let lookup = {};

    for(let i = elf1_start; i <= elf1_end; i++) {
        if(!lookup[i]) {
            lookup[i] = 1;
        } else {
            lookup[i]++;
        }
    }

    for(let x = elf2_start; x <= elf2_end; x++) {
        if(!lookup[x]) {
            lookup[x] = 1;
        } else {
            overlaps++;
            break;
        }
    }
});

console.log(overlaps);

