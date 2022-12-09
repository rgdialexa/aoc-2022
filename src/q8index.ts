import { readFileSync } from 'fs';

async function main() {
  const file = readFileSync('./q8input.txt', 'utf-8');
  const lines = file.split(/\n/);

  const grid: number[][] = [];
  for (const line of lines) {
    grid.push(line.split('').map((x) => +x));
  }

  // PART 1
  const visibleTreeCoordinates: any[] = [];

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid.length; c++) {
      if (r == 0 || r == grid.length - 1 || c == 0 || c == grid.length - 1) {
        addToArrayUnique(visibleTreeCoordinates, { r, c });
      }
    }
  }
  for (let r = 1; r < grid.length - 1; r++) {
    for (let c = 1; c < grid[r].length - 1; c++) {
      // Visible from east
      let visibleFromEast = true;
      for (let m = c + 1; m < grid[r].length; m++) {
        if (grid[r][c] <= grid[r][m]) {
          visibleFromEast = false;
          break;
        }
      }

      // Visible from west
      let visibleFromWest = true;
      for (let m = c - 1; m > -1; m--) {
        if (grid[r][c] <= grid[r][m]) {
          visibleFromWest = false;
          break;
        }
      }

      // Visible from south
      let visibleFromSouth = true;
      for (let m = r + 1; m < grid[r].length; m++) {
        if (grid[r][c] <= grid[m][c]) {
          visibleFromSouth = false;
          break;
        }
      }

      // Visible from north
      let visibleFromNorth = true;
      for (let m = r - 1; m > -1; m--) {
        if (grid[r][c] <= grid[m][c]) {
          visibleFromNorth = false;
          break;
        }
      }

      if (visibleFromEast || visibleFromWest || visibleFromSouth || visibleFromNorth) {
        addToArrayUnique(visibleTreeCoordinates, { r, c });
      }
    }
  }

  console.log('part 1:', visibleTreeCoordinates.length);

  // PART 2
  let maxScore = 0;
  for (let r = 1; r < grid.length - 1; r++) {
    for (let c = 1; c < grid.length - 1; c++) {
      let totalScenicScore = 0;

      // Looking East
      let lookingEastScore = 0;
      for (let m = c + 1; m < grid.length; m++) {
        if (grid[r][c] > grid[r][m]) {
          lookingEastScore++;
        } else {
          lookingEastScore++;
          break;
        }
      }

      // Looking South
      let lookingSouthScore = 0;
      for (let m = r + 1; m < grid.length; m++) {
        if (grid[r][c] > grid[m][c]) {
          lookingSouthScore++;
        } else {
          lookingSouthScore++;
          break;
        }
      }

      // Looking West
      let lookingWestScore = 0;
      for (let m = c; m > 0; m--) {
        if (grid[r][c] > grid[r][m - 1]) {
          lookingWestScore++;
        } else {
          lookingWestScore++;
          break;
        }
      }

      // Looking North
      let lookingNorthScore = 0;
      for (let m = r; m > 0; m--) {
        if (grid[r][c] > grid[m - 1][c]) {
          lookingNorthScore++;
        } else {
          lookingNorthScore++;
          break;
        }
      }

      const totalScore = lookingEastScore * lookingNorthScore * lookingWestScore * lookingSouthScore;
      if (totalScore > maxScore) {
        maxScore = totalScore;
      }
    }
  }

  console.log('part 2:', maxScore);
}

function addToArrayUnique(array: any[], value: any) {
  const exists = array.filter((v) => v.r == value.r && v.c == value.c).length;
  if (!exists) {
    array.push(value);
  }
}

main();
