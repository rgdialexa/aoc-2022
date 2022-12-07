import { readFileSync } from 'fs';

class File {
  parent?: Directory;
  name: string;
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

class Directory {
  name: string;
  parent?: Directory;
  directories: Directory[] = [];
  files: File[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addFile(file: File) {
    file.parent = this;
    this.files.push(file);
  }

  addDirectory(directory: Directory) {
    directory.parent = this;
    this.directories.push(directory);
  }

  getSize() {
    let size = 0;
    for (const file of this.files) {
      size += file.size;
    }
    return size;
  }

  getSizeR() {
    let size = 0;
    for (const file of this.files) {
      size += file.size;
    }
    for (const dir of this.directories) {
      size += dir.getSizeR();
    }
    return size;
  }

  getTree(previousIndent: string = '') {
    let indent = previousIndent;
    console.log(`${indent}- ${this.name} (dir)`);
    indent += '  ';
    for (const dir of this.directories) {
      console.log(`${indent}- ${dir.name} (dir)`);
    }
    for (const f of this.files) {
      console.log(`${indent}- ${f.name} (file, size=${f.size})`);
    }
  }

  getTreeR(previousIndent: string = '') {
    let readOut = '';
    let indent = previousIndent;
    readOut += `${indent}- ${this.name} (dir) (${this.getSizeR()})\n`;
    indent += '  ';
    for (const dir of this.directories) {
      readOut += dir.getTreeR(indent);
    }
    for (const f of this.files) {
      readOut += `${indent}- ${f.name} (file, size=${f.size})\n`;
    }
    return readOut;
  }
}

async function main() {
  const file = readFileSync('./q7input.txt', 'utf-8');
  const lines = file.split(/\n/);

  let root = new Directory('/');
  let currentDir = root;
  for (const line of lines) {
    if (line[0] === '$') {
      const lineSplit = line.split(' ');
      const cmd = lineSplit[1];
      switch (cmd) {
        case 'cd':
          const option = lineSplit[2];
          if (option === '/') {
            currentDir = root;
          } else if (option === '..') {
            currentDir = currentDir?.parent || root;
          } else {
            currentDir = currentDir?.directories.filter((x) => x.name === option)[0];
          }
          break;
        default:
          break;
      }
    } else {
      const lineSplit = line.split(' ');
      if (lineSplit[0] === 'dir') {
        const newDirName = lineSplit[1];
        if (currentDir.directories.filter((x) => x.name === newDirName).length == 0) {
          currentDir.addDirectory(new Directory(newDirName));
        }
      } else {
        currentDir.addFile(new File(lineSplit[1], +lineSplit[0]));
      }
    }
  }

  const directoriesSortedBySize = root
    .getTreeR()
    .split(/\n/)
    .filter((x) => x.indexOf('(dir)') >= 0)
    .map((y) => {
      return +y.split(' ')[y.split(' ').length - 1].replace(/\(/g, '').replace(/\)/g, '');
    })
    .sort((a, b) => b - a);

  // Part 1
  const totalSize = directoriesSortedBySize.filter((x) => x <= 100000).reduce((a, b) => a + b);

  console.log('part1: ', totalSize);

  // Part 2
  const spaceToBeFreed = 70000000 - directoriesSortedBySize[0];
  const reversedDirectories = directoriesSortedBySize.reverse();

  for (const dir of reversedDirectories) {
    if (dir + spaceToBeFreed >= 30000000) {
      console.log('part2: ', dir);
      break;
    }
  }
}

main();
