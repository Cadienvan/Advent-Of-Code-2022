const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
// Save every line of the file till an empty one in the array
const crateLines = [];
for (const line of input.split("\n")) {
  if (line === "") {
    break;
  }
  crateLines.push(line);
}

// The last element of the array is the sequence of crates
const sequence = crateLines.pop().split("   ").map(x => x.trim());

// Split every crateLine every 3 characters. If not empty, add it to the correspinding sequence
const crates = sequence.map(x => []);
for (const line of crateLines) {
  for (let i = 0; i < line.length; i += 4) {
    const crate = line.substring(i, i + 3).trim();
    if (crate !== "") {
      if (crates[i / 4] === undefined) {
        crates[i / 4] = [];
      }
      crates[i / 4].push(crate);
    }
  }
}

// Reverse the crates
for (let i = 0; i < crates.length; i++) {
  crates[i] = crates[i].reverse();
}

// Print the result
for (const crate of crates) {
  console.log(crate.join(""));
}

// Save every line of the file starting from the empty one in the array
const moveLines = [];
let start = false;
for (const line of input.split("\n")) {
  if (start) {
    moveLines.push(line);
  }
  if (line === "") {
    start = true;
  }
}

console.log('---------');
// For every move, move the specified amount of items from the source to the destination
for (const line of moveLines) {
  const [_1, amount, _2, from, _3, to] = line.split(" ");
  crates[to - 1].push(...crates[from - 1].splice(crates[from - 1].length - amount, amount));
}

// Print the result
for (const crate of crates) {
  console.log(crate.join(""));
}