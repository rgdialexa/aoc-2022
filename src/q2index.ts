import { readFileSync } from 'fs';

type weapon = 's' | 'p' | 'r';
let scores = { r: 1, p: 2, s: 3 };
const win = 6;
const draw = 3;
const lose = 0;
async function main(): Promise<void> {
  const file = readFileSync('./input.txt', 'utf-8');

  let totalScoreP1 = 0;
  let totalScoreP2 = 0;

  for (const line of file.split('\n')) {
    const both = line.split(' ');
    const opponentWeapon = await determineWeapon(both[0]);
    const myWeapon = await determineWeapon(both[1]);

    totalScoreP1 += await determinePointsForMeP1(opponentWeapon, myWeapon);
    totalScoreP2 += await determinePointsForMeP2(opponentWeapon, myWeapon);
  }

  console.log('p1', totalScoreP1);
  console.log('p2', totalScoreP2);
}

async function determineWeapon(x: string): Promise<weapon> {
  if (x === 'A' || x === 'X') {
    return 'r';
  } else if (x === 'C' || x === 'Z') {
    return 's';
  } else {
    return 'p';
  }
}

async function determinePointsForMeP1(opponentPlay: weapon, myPlay: weapon): Promise<number> {
  if (myPlay === 'p' && opponentPlay === 'r') {
    return scores[myPlay] + win;
  } else if (myPlay === 's' && opponentPlay === 'p') {
    return scores[myPlay] + win;
  } else if (myPlay === 'r' && opponentPlay === 's') {
    return scores[myPlay] + win;
  } else if (myPlay === opponentPlay) {
    return scores[myPlay] + draw;
  } else {
    return scores[myPlay] + lose;
  }
}

async function determinePointsForMeP2(opponentPlay: weapon, myPlay: weapon): Promise<number> {
  if (myPlay === 'p') {
    // Need to Draw
    return scores[opponentPlay] + draw;
  } else if (myPlay === 'r') {
    // Need to Lose
    if (opponentPlay === 'r') {
      return scores['s'];
    } else if (opponentPlay === 's') {
      return scores['p'];
    } else {
      return scores['r'];
    }
  } else {
    // Need to win
    if (opponentPlay === 'r') {
      return scores['p'] + win;
    } else if (opponentPlay === 's') {
      return scores['r'] + win;
    } else {
      return scores['s'] + win;
    }
  }
}

main();
