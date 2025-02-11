const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to the directory where we need to run the rebuild
const rebuildDir = path.resolve(__dirname, 'node_modules/better-sqlite3');

// Marker file to track if the rebuild has already been done
const markerFile = path.join(rebuildDir, '.rebuild-done');

// Step 1: Check if the marker file exists
if (fs.existsSync(markerFile)) {
  console.log('better-sqlite3 already rebuilt. Skipping...');
  process.exit(0); // Exit the script early
}

// Step 2: Run `npx node-gyp rebuild` in `node_modules/better-sqlite3`
console.log('Running `npx node-gyp rebuild` in better-sqlite3...');
exec('npx node-gyp rebuild', { cwd: rebuildDir }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error rebuilding better-sqlite3: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);

  // Step 3: Create the marker file after successful rebuild
  fs.writeFileSync(markerFile, 'Rebuild completed.');
  console.log('Rebuild completed. Marker file created.');
});
