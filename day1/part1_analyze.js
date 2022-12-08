const fs = require('fs');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

const ELF_CALORIES = {};
let current_elf = 1;

// Organize total calories by Elf
DATA.split("\n").forEach((line) => {
    if (line) {
        if (!ELF_CALORIES[current_elf]) {
            ELF_CALORIES[current_elf] = 0;
        }

        ELF_CALORIES[current_elf] += parseInt(line, 10);
    } else {
        current_elf++;
    }
});

// Determine else with highest calories
let highestCalories = 0;
let highestElf = 0;
Object.keys(ELF_CALORIES).forEach((elf) => {
    if (ELF_CALORIES[elf] > highestCalories) {
        highestCalories = ELF_CALORIES[elf];
        highestElf = elf;
    }
});

console.log(`Elf #${highestElf}: ${highestCalories}`);