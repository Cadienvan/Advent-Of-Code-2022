const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
const isVisible = (tree) => {
  if (
    tree.x === 1 ||
    tree.y === 1 ||
    tree.x === treesMaxX ||
    tree.y === treesMaxY
  ) {
    return true;
  }
  return Object.values(tree.treesInLine).some((treesInLine) => {
    return treesInLine.every((t) => {
      return t.height < tree.height;
    });
  });
};

const getScenicScore = (tree) => {
  let scores = {
    left: 1,
    right: 1,
    top: 1,
    bottom: 1,
  };
  for (let t of tree.treesInLine.left.reverse()) {
    if (t.height >= tree.height || t.x === 1) break;
    scores.left++;
  }
  for (let t of tree.treesInLine.right) {
    if (t.height >= tree.height || t.x === treesMaxX) break;
    scores.right++;
  }
  for (let t of tree.treesInLine.top.reverse()) {
    if (t.height >= tree.height || t.y === 1) break;
    scores.top++;
  }
  for (let t of tree.treesInLine.bottom) {
    if (t.height >= tree.height || t.y === treesMaxY) break;
    scores.bottom++;
  }

  return scores.left * scores.right * scores.top * scores.bottom;
};

const trees = [];
// For every line, save every character in a x-y coordinate
for (const [y, line] of input.split("\n").entries()) {
  for (const [x, char] of line.split("").entries()) {
    trees.push({ x: x + 1, y: y + 1, height: parseInt(char) });
  }
}

for (let tree of trees) {
  const treesInSameX = trees.filter((t) => t.x === tree.x);
  const treesInSameY = trees.filter((t) => t.y === tree.y);

  tree.treesInLine = {
    left: treesInSameY.filter((t) => t.x < tree.x),
    right: treesInSameY.filter((t) => t.x > tree.x),
    top: treesInSameX.filter((t) => t.y < tree.y),
    bottom: treesInSameX.filter((t) => t.y > tree.y),
  };
}

const treesMaxX = Math.max(...trees.map((t) => t.x));
const treesMaxY = Math.max(...trees.map((t) => t.y));

for (let tree of trees) {
  tree.score = getScenicScore(tree);
}

// P1 - Print the amount of visible trees
console.log(trees.filter(isVisible).length);

// P2 - Print the highest score
console.log(Math.max(...trees.map((t) => t.score)));
