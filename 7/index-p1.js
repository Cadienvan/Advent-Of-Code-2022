const { folders } = require("./folders");

// P1 - Get the sum of all totalSize where totalSize is less than 100000
console.log(
  Object.values(folders)
    .filter((folder) => folder.totalSize < 100000)
    .reduce((acc, folder) => acc + folder.totalSize, 0)
);
