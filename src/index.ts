import { readFileSync } from 'fs';

async function main(): Promise<void> {
  const file = readFileSync('./q5input.txt', 'utf-8');

  for (const line of file.split(/\n/)) {
  }
}

main();
