const fs = require("fs");
const path = require("path");

function renameFilesWithSpaces(rootDir) {
  console.log(`Scanning directory: ${rootDir}`);
  let renamedCount = 0;

  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walk(filePath);
      } else {
        if (file.includes(" ")) {
          const newFilename = file.replace(/ /g, "-");
          const newPath = path.join(dir, newFilename);

          if (fs.existsSync(newPath)) {
            console.log(
              `Skipping ${file} -> ${newFilename} (Target already exists)`,
            );
            continue;
          }

          try {
            fs.renameSync(filePath, newPath);
            console.log(`Renamed: ${file} -> ${newFilename}`);
            renamedCount++;
          } catch (err) {
            console.error(`Error renaming ${file}: ${err.message}`);
          }
        }
      }
    }
  }

  if (fs.existsSync(rootDir)) {
    walk(rootDir);
    console.log(`\nTotal files renamed: ${renamedCount}`);
  } else {
    console.log(`Directory not found: ${rootDir}`);
  }
}

const targetDir = path.join(process.cwd(), "src", "assets");
renameFilesWithSpaces(targetDir);
