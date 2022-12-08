const fs = require('fs');
const os = require('os');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });



let fully_contains = 0;
DATA.split(os.EOL).forEach((elf_pair) => {
    let elf1 = elf_pair.split(',')[0];
    let elf2 = elf_pair.split(',')[1];

    let elf1_start = parseInt(elf1.split('-')[0], 10);
    let elf1_end = parseInt(elf1.split('-')[1], 10);

    let elf2_start = parseInt(elf2.split('-')[0], 10);
    let elf2_end = parseInt(elf2.split('-')[1], 10);

    if (elf1_start <= elf2_start && elf1_end >= elf2_end) {
        fully_contains++;
    } else if (elf2_start <= elf1_start && elf2_end >= elf1_end) {
        fully_contains++
    }
});

console.log(fully_contains);

