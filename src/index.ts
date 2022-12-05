import { readFileSync } from 'fs';

async function main(): Promise<void> {
  const file = readFileSync('./q5input.txt', 'utf-8');

  const dataSets = file.split(/\n\n/);
}

main();
