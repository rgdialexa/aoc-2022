import { readFileSync } from 'fs';

async function main() {
  const file = readFileSync('./q7input.txt', 'utf-8');
  const lines = file.split(/\n/);
}

main();
