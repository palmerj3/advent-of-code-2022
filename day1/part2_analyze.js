const fs = require('fs');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

const ELFS = [];
let current_elf_id = 1;
let current_elf = {
    id: 0,
    total: 0
};
let current_elf_total = 0;

// Organize total calories by Elf
DATA.split("\n").forEach((line) => {
    if (line) {
        current_elf_total += parseInt(line, 10);
    } else {

        ELFS.push({
            id: current_elf_id,
            total: current_elf_total
        });

        // reset current elf
        current_elf_id++;
        current_elf_total = 0;
    }
});

// Determine else with highest calories
ELFS.sort((e1, e2) => {
    return e2.total - e1.total;
});

const top3Total = ELFS[0].total + ELFS[1].total + ELFS[2].total;

console.log(top3Total);