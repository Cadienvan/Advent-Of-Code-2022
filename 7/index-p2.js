const { folders } = require("./folders");

// P2 - Delete enough free space
const FILESYSTEM_SPACE = 70000000;
const NEEDED_SPACE = 30000000;
const OCCUPIED_SPACE = folders["/"].totalSize;
const FREE_SPACE = FILESYSTEM_SPACE - OCCUPIED_SPACE;
const MINIMUM_FOLDER_SPACE_NEEDED = NEEDED_SPACE - FREE_SPACE;

// Find the smallest folder which has a totalSize greater than MINIMUM_FOLDER_SPACE_NEEDED
const smallestFolder = Object.values(folders)
  .filter((folder) => folder.totalSize >= MINIMUM_FOLDER_SPACE_NEEDED)
  .sort((a, b) => a.totalSize - b.totalSize)[0];

console.log(smallestFolder.totalSize);
