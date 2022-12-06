import { readFileSync } from 'fs';

async function main() {
  const file = readFileSync('./q6input.txt', 'utf-8');

  const dataSets = file;

  const array = Array.from(dataSets);

  let i = 0;
  let windowEnd = 4;

  // Part 1
  while (i + windowEnd < array.length) {
    const exArray = array.slice(i, windowEnd);
    let allUnique = false;
    for (let j = 0; j < 5; j++) {
      if (exArray.filter((x) => x === exArray[j]).length > 1) {
        allUnique = false;
        j = 5;
      } else {
        allUnique = true;
      }
    }
    windowEnd++;
    i++;

    if (allUnique) {
      break;
    }
  }

  console.log(windowEnd - 1);

  // Part 2
  i = 0;
  windowEnd = 14;
  while (i < array.length) {
    const exArray = array.slice(i, windowEnd);
    let allUnique = false;
    for (let j = 0; j < 15; j++) {
      if (exArray.filter((x) => x === exArray[j]).length > 1) {
        allUnique = false;
        j = 15;
      } else {
        allUnique = true;
      }
    }
    windowEnd++;
    i++;

    if (allUnique) {
      break;
    }
  }

  console.log(windowEnd - 1);
}

main();
