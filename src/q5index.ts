import { readFileSync } from 'fs';

async function main(): Promise<void> {
  const file = readFileSync('./q5input.txt', 'utf-8');

  const dataSets = file.split(/\n\n/);
  let containerStacksP1: string[][] = [];
  let containerStacksP2: string[][] = [];
  const x = dataSets[0].split('\n');
  const numRows = x.length - 1;
  const numCols = +x[numRows].charAt(x[numRows].length - 2);
  for (let i = 0; i < numCols; i++) {
    let newArrayP1: string[] = [];
    let newArrayP2: string[] = [];
    containerStacksP1.push(newArrayP1);
    containerStacksP2.push(newArrayP2);
  }
  for (const line of dataSets[0].split('\n').slice(0, -1)) {
    const shelf = line
      .replace(/\s{2,2}/g, ' ')
      .replace(/\[/g, '')
      .replace(/\]/g, '')
      .replace(/\s{1,1}/g, '|')
      .replace(/\|\|/g, '|');
    const shelfSplit = shelf.split('|');
    for (let i = 0; i < numCols; i++) {
      if (shelfSplit[i] != '') {
        containerStacksP1[i].push(shelfSplit[i]);
        containerStacksP2[i].push(shelfSplit[i]);
      }
    }
  }

  // Part 1
  for (const line of dataSets[1].split('\n')) {
    const lineSplit = line.split(' ');
    const numberToMove = +lineSplit[1];
    const fromStack = +lineSplit[3] - 1;
    const toStack = +lineSplit[5] - 1;

    for (let i = 0; i < numberToMove; i++) {
      const boxToMove = containerStacksP1[fromStack].shift();
      containerStacksP1[toStack].unshift(boxToMove || 'error');
    }
  }

  let part1 = '';
  containerStacksP1.map((x) => (part1 += x[0]));

  console.log('part1', part1);

  // Part 2
  for (const line of dataSets[1].split('\n')) {
    const lineSplit = line.split(' ');
    const numberToMove = +lineSplit[1];
    const fromStack = +lineSplit[3] - 1;
    const toStack = +lineSplit[5] - 1;

    const boxesToMove = containerStacksP2[fromStack].splice(0, numberToMove);
    containerStacksP2[toStack].unshift(...boxesToMove);
  }

  let part2 = '';
  containerStacksP2.map((x) => (part2 += x[0]));

  console.log('part2', part2);
}

main();
