import { readFileSync } from 'fs';

async function main(): Promise<void> {
  const file = readFileSync('./q4input.txt', 'utf-8');

  let totalFullRangeEnclosed = 0;
  let totalAnyOverlap = 0;
  for (const line of file.split(/\n/)) {
    const twoGroups = line.split(',');
    const firstGroup = twoGroups[0].split('-').map((x) => +x);
    const secondGroup = twoGroups[1].split('-').map((x) => +x);

    // Part 1
    if (
      (firstGroup[0] >= secondGroup[0] && firstGroup[1] <= secondGroup[1]) ||
      (secondGroup[0] >= firstGroup[0] && secondGroup[1] <= firstGroup[1])
    ) {
      totalFullRangeEnclosed++;
    }

    // Part 2
    const group1Numbers = [];
    const group2Numbers = [];
    for (let i = firstGroup[0]; i < firstGroup[1] + 1; i++) {
      group1Numbers.push(i);
    }
    for (let i = secondGroup[0]; i < secondGroup[1] + 1; i++) {
      group2Numbers.push(i);
    }
    const totalArray = [...group1Numbers, ...group2Numbers];
    totalAnyOverlap += totalArray.filter((x, index) => totalArray.indexOf(x) != index).length > 0 ? 1 : 0;
  }

  console.log('part1', totalFullRangeEnclosed);
  console.log('part2', totalAnyOverlap);
}

main();
