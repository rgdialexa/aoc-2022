import { readFileSync, appendFile } from 'fs';

async function main(): Promise<void> {
  const file = readFileSync('./q1input.txt', 'utf-8');
  let countArray: number[] = [];
  let max = 0;
  let topThreeSummed = 0;
  for (const line of file.split(/\r?\n\r?\n/)) {
    let current = 0;
    for (const i of line.split(/\r?\n/)) {
      current += parseInt(i);
    }
    countArray.push(current);
    if (max < current) {
      max = current;
    }
    countArray = countArray.sort((a: number, b: number) => a - b);
  }

  console.log(max);

  let lastThreeElvCargo = 0;
  for (let i = countArray.length - 3; i < countArray.length; i++) {
    lastThreeElvCargo += countArray[i];
  }
  console.log(lastThreeElvCargo);
}

main();
