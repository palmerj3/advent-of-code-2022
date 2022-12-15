const { count } = require('console');
const fs = require('fs');
const OS = require('os');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

let monkeys = {};
let currentMonkey = null;

DATA.split(OS.EOL).forEach((line, i) => {
    let l = line.trim();

    if (l.startsWith('Monkey')) {
        let monkeyNum = parseInt(line.split('Monkey')[1].split(':')[0], 10);
        currentMonkey = monkeyNum;

        monkeys[monkeyNum] = {
            items: [],
            operation: null,
            test: {
                divisibleBy: '',
                t: -1,
                f: -1
            },
            inspections: 0
        };
    } else if (l.startsWith('Starting items:')) {
        monkeys[currentMonkey].items = l.split('Starting items:')[1].split(',').map((i) => parseInt(i, 10));
    } else if (l.startsWith('Operation:')) {
        monkeys[currentMonkey].operation = l.split('Operation: ')[1];
    } else if (l.startsWith('Test: ')) {
        monkeys[currentMonkey].test.divisibleBy = parseInt(l.split('Test: divisible by ')[1], 10);
    } else if (l.startsWith('If true: ')) {
        monkeys[currentMonkey].test.t = parseInt(l.split('If true: throw to monkey ')[1], 10);
    } else if (l.startsWith('If false: ')) {
        monkeys[currentMonkey].test.f = parseInt(l.split('If false: throw to monkey ')[1]);
    }
});

const numRounds = 20;

for (let round = 1; round <= numRounds; round++) {
    Object.keys(monkeys).sort().forEach((m) => {
        let monkey = monkeys[m];

        while(monkey.items.length > 0) {
            let item = monkey.items.shift();
            let operation = monkey.operation.replace('new = ', '').replace(/old/g, item);
            
            monkey.inspections++;

            // I did what I did
            let worryLevel = eval(operation);

            let finalWorryLevel = Math.floor(worryLevel / 3);

            let targetMonkey = finalWorryLevel % monkey.test.divisibleBy === 0 ? monkey.test.t : monkey.test.f;

            monkeys[targetMonkey].items.push(finalWorryLevel);
        }
    });

    console.log('========= ROUND', round, '============');
    console.log(monkeys);
}

let sortedMonkeys = Object.keys(monkeys).sort((a, b) => monkeys[b].inspections - monkeys[a].inspections);

let monkeyBusiness = monkeys[sortedMonkeys[0]].inspections * monkeys[sortedMonkeys[1]].inspections;

console.log(monkeys);

console.log(monkeyBusiness);