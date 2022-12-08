const fs = require('fs');
const os = require('os');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });


let original_stack = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

DATA.split(os.EOL).forEach((line, i) => {
    let parsedStack = line.match(/(\[[\w]{1}\]|[\s]{4})/g);
    
    // Still parsing original stack
    if (parsedStack) {
        parsedStack.forEach((s,i) => {
            let val = s.trim().replace(/\[|\]/g,'');

            if (val !== '') {
                original_stack[i].unshift(val);
            }
        });
    }

    const move_regex = /move ([\d]+) from ([\d]+) to ([\d]+)/g;
    let parsedMove = move_regex.exec(line);

    // We are parsing move statements now
    if (parsedMove) {
        const move_amount = parseInt(parsedMove[1], 10);
        const target_stack = parseInt(parsedMove[2], 10);
        const destination_stack = parseInt(parsedMove[3], 10);

        for( let i=0; i < move_amount; i++) {
            original_stack[destination_stack-1].push(original_stack[target_stack-1].pop());
        }
    }
});

let finalStr = '';
original_stack.forEach((s) => {
    finalStr += s[s.length-1];
});

console.log(original_stack);
console.log(finalStr);

