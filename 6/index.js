const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

// Find the first 4 character sequence which contains all different characters
const findFirstSequence = (input, length) => {
  for (let i = 0; i < input.length - length; i++) {
    const sequence = input.slice(i, i + length);
    if (sequence.length === new Set(sequence).size) {
      return { sequence, index: i };
    }
  }
};

// P1
console.log(findFirstSequence(input, 4).index + 4);
// P2
console.log(findFirstSequence(input, 14).index + 14);
