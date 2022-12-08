const fs = require('fs');
const OS = require('os');
const util = require('util');

const DATA = fs.readFileSync('./input', { encoding: 'utf-8' });

let tree = {
    '/': {
        files: {},
        dirs: {},
        name: '/',
        parent: null,
        size: 0
    }
};
let currentDirectory = tree['/'];

function changeDir(dir) {
    switch (dir) {
        case '/':
            currentDirectory = tree['/'];
            break;
        case '..':
            currentDirectory = currentDirectory.parent;
            break;
        default:
            currentDirectory = currentDirectory.dirs[dir];
            break;
    }
};

function calculateDirectorySize(currentDirTree, size = 0) {
    Object.keys(currentDirTree.files).forEach((f) => {
        size += currentDirTree.files[f].size;
    });

    Object.keys(currentDirTree.dirs).forEach((d) => {
        size += calculateDirectorySize(currentDirTree.dirs[d]);
    });

    currentDirTree.size = size;
    return size;
}

function getDirectorySizes(currentDirTree, arr = []) {
    Object.keys(currentDirTree.dirs).forEach((d) => {
        getDirectorySizes(currentDirTree.dirs[d], arr);
    });

    arr.push({name: currentDirTree.name, size: currentDirTree.size});
    return arr;
}

function addDir(name, currentDirTree) {
    currentDirTree.dirs[name] = {
        files: {},
        dirs: {},
        name: name,
        parent: currentDirTree,
        size: 0
    }
}

function addFile(name, size, currentDirTree) {
    currentDirTree.files[name] = {
        size: size
    }
}

DATA.split(OS.EOL).forEach((line, i) => {
    let contents = line.split(' ');

    if (contents[0] === '$') {
        // Command
        let cmd = contents[1];
        let arg = contents[2];

        switch (cmd) {
            case 'cd':
                changeDir(arg);
                break;
            case 'ls':
                // list(currentDirectory);
                break;
        }
    } else {
        // Output
        if (contents[0] === 'dir') {
            addDir(contents[1], currentDirectory);
        } else {
            // File listing
            addFile(contents[1], parseInt(contents[0], 10), currentDirectory);
        }
    }
});

// Find directories with more than 100000 bytes
calculateDirectorySize(tree['/']);

const totalSystemSize = 70000000;
const sizeNeeded = 30000000;
const minimumSpaceToFree = sizeNeeded - (totalSystemSize - tree['/'].size);

console.log(getDirectorySizes(tree['/']).filter(d => d.size >= minimumSpaceToFree).sort((a, b) => a.size-b.size)[0]);

