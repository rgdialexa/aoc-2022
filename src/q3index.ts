import { readFileSync } from 'fs';

async function main(): Promise<void> {
  const file = readFileSync('./q3input.txt', 'utf-8');
  const rucksacks: string[] = [];
  for (const line of file.split(/\n/)) {
    rucksacks.push(line);
  }

  const priorities = await generatePrioritiesMap();

  // Part 1
  let totalPriorityP1 = 0;
  for (const rucksack of rucksacks) {
    const rucksackLength = rucksack.length;
    const comp1 = rucksack.slice(0, rucksackLength / 2);
    const comp2 = rucksack.slice(rucksackLength / 2, rucksackLength);

    const sharedLetter = await getSharedCargoLetterP1(comp1, comp2);
    totalPriorityP1 += priorities.get(sharedLetter) || 0;
  }

  console.log('part1:', totalPriorityP1);

  // Part 2
  let ruckSackGroups = await getRucksackGroups(rucksacks);
  let totalPriorityP2 = 0;
  for (const ruckSackGroup of ruckSackGroups) {
    let sharedLetter = await getSharedCargoLetterP2(ruckSackGroup[0], ruckSackGroup[1], ruckSackGroup[2]);
    totalPriorityP2 += priorities.get(sharedLetter) || 0;
  }

  console.log('part2:', totalPriorityP2);
}

async function getRucksackGroups(rucksacks: string[]) {
  let groups = [];
  let group = [];

  for (let i = 0; i < rucksacks.length; i++) {
    if ((i + 1) % 3 == 0) {
      group.push(rucksacks[i]);
      groups.push(group);
      group = [];
    } else {
      group.push(rucksacks[i]);
    }
  }

  return groups;
}

async function getSharedCargoLetterP1(c1: string, c2: string) {
  const comp1Unique = Array.from(new Set(c1));
  const comp2Unique = Array.from(new Set(c2));

  for (const letter of comp1Unique) {
    if (comp2Unique.filter((x) => x === letter).length) {
      return letter;
    }
  }

  return '';
}

async function getSharedCargoLetterP2(c1: string, c2: string, c3: string) {
  const comp1Unique = Array.from(new Set(c1));
  const comp2Unique = Array.from(new Set(c2));
  const comp3Unique = Array.from(new Set(c3));

  for (const letter of comp1Unique) {
    if (comp2Unique.filter((x) => x === letter).length && comp3Unique.filter((x) => x === letter).length) {
      return letter;
    }
  }

  return '';
}

async function getNextChar(c: string) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

async function generatePrioritiesMap() {
  let priorities = new Map<string, number>();

  let currentChar = 'a';
  for (let i = 1; i < 27; i++) {
    priorities.set(currentChar, i);
    currentChar = await getNextChar(currentChar);
  }
  currentChar = 'A';
  for (let i = 27; i < 53; i++) {
    priorities.set(currentChar, i);
    currentChar = await getNextChar(currentChar);
  }

  return priorities;
}

main();
