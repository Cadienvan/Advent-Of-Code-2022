const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

// Take every line
const lines = input.split("\n");

// For every line, do the following:
// 1: Split the line into words
// 2: If the first word is a $, it is a command
// 2.1: If the command is "cd", the next word is the path to change to.
// 2.2: If the command is "ls", create an array and save somewhere the fact that the next words are the files in the current directory
// 3. If the first word is not a $, it is a definition. Split the line into words
// 3.1 If the first word is "dir", the next word is the path to the directory
// 3.2 If the first word is a number, the next word is the name of the file and the first word is its size.

// Create and store folders data
const folders = {};
let currentFolder = cd("/");

function dirExists(path) {
  return folders[path] !== undefined;
}

function cd(dirName) {
  let path = "";
  if (dirName == "/") path = "/";
  else if (dirName == "..") {
    path = currentFolder.path.split("/").slice(0, -1).join("/");
    if (path === "") path = "/";
  } else {
    path = currentFolder.path + "/" + dirName;
  }
  if (dirExists(path)) return folders[path];
  const folder = {
    name: path.split("/").pop(),
    path,
    files: [],
    folders: [],
  };
  folders[path] = folder;
  return folder;
}

for (const line of lines) {
  const words = line.split(" ");
  if (words[0] === "$") {
    if (words[1] === "cd") {
      // Change directory
      currentFolder = cd(words[2]);
      continue;
    } else if (words[1] === "ls") {
      // List files, do nothing and wait for the following lines to be processed.
      continue;
    }
  } else {
    if (words[0] === "dir") {
      // Create a folder
      const folder = cd(words[1]);
      currentFolder.folders.push(folder);
    } else if (parseInt(words[0])) {
      // Create a file
      const file = {
        name: words[1],
        size: parseInt(words[0]),
      };
      currentFolder.files.push(file);
    }
  }
}

// Save the folder specific size and the folder total size (including subfolders)
function saveFolderSizes(folder) {
  folder.size = folder.files.reduce((acc, file) => acc + file.size, 0);
  folder.totalSize = folder.size;
  for (const subfolder of folder.folders) {
    saveFolderSizes(subfolder);
    folder.totalSize += subfolder.totalSize;
  }
}

// Save the folder sizes
Object.values(folders).forEach(saveFolderSizes);

module.exports.folders = folders;

