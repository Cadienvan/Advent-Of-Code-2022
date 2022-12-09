const fs = require("fs");

const startTime = new Date().getTime();
let part1 = (part2 = time = 0);
let moves = fs
  .readFileSync(__dirname + "/input.txt", "utf8")
  .split("\n")
  .map((a) => a.split(" "));

const dirs = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, -1],
  D: [0, 1],
};

function solve(ropeLength) {
  let tSet = new Set();
  let rope = Array.from(
    {
      length: ropeLength,
    },
    () => [0, 0]
  );

  moves.map((move) => {
    let [direction, steps] = move;
    steps = +steps;

    for (let i = 0; i < steps; i++) {
      rope[0] = [
        rope[0][0] + dirs[direction][0],
        rope[0][1] + dirs[direction][1],
      ];
      for (let j = 1; j < ropeLength; j++) {
        let dx = rope[j - 1][0] - rope[j][0];
        let dy = rope[j - 1][1] - rope[j][1];
        if (Math.abs(dx) > 1) {
          rope[j][0] += dx > 0 ? 1 : -1;
          if (dy != 0) rope[j][1] += dy > 0 ? 1 : -1;
        } else if (Math.abs(dy) > 1) {
          rope[j][1] += dy > 0 ? 1 : -1;
          if (dx != 0) rope[j][0] += dx > 0 ? 1 : -1;
        }
      }
      tSet.add(rope[ropeLength - 1].join("-"));
    }
  });
  return tSet.size;
}
time = new Date().getTime() - startTime;
part1 = solve(2);
part2 = solve(10);
console.log(`Part 1: ${part1}\nPart 2: ${part2}\nTimer: ${time} ms`);
